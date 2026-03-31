---
title: Client：运行时插件
description: Rootless Store 在 client 层面对运行时插件的基本要求与开发思路。
---

# Client：运行时插件

这里讨论的 `client` 插件，不是服务端那边的插件，也不是单纯给 `Sources` 提供后端能力的模块，而是 Rootless Store 在运行时真正安装、管理、执行的插件。

它们直接面对三件事：

- 用户如何安装与删除。
- 运行器如何加载与执行。
- 插件自身如何在安卓环境里稳定存在。

## `PluginManifest`

```kotlin
interface PluginManifest {
    // 当前安装版本。
    // 建议遵循 SemVer，例如 `1.2.19`
    // 用于版本展示、更新判断和兼容性比较
    val installedVersion: String

    // 插件的 UI 展示名称。
    // 这是渲染字段，不具备唯一性语义
    val pluginRenderingName: String

    // 插件逻辑包名。
    // 建议使用稳定的 Android 风格命名，例如：
    // `com.baidaidai.testplugin`
    val pluginPackageName: String

    // 插件唯一 ID。
    // 推荐使用稳定高熵值，适合承担 Room 主键和跨版本识别
    val pluginID: String

    // 插件图标引用。
    // 允许为 `null`
    // 应存 URI 或路径引用，不应直接内嵌二进制
    val iconURI: String?

    // 插件作者 / 发布者名称
    val author: String

    // 插件短描述。
    // 适合列表页和详情页摘要展示
    val pluginDescription: String

    // 插件声明的最低宿主环境要求。
    // 这是声明值，不是运行时实时状态
    val requiredEnvironment: HosterOverallStatus

    // 插件入口。
    // 应当是包内稳定入口，例如 `index.sh`
    // 或某个二进制入口路径
    val entryPoint: String
}

enum class HosterOverallStatus {
    LIMITED, PERMISSIVE, ADB, ROOTD
}
```

```json
{
  "installedVersion": "1.0.0",
  "pluginRenderingName": "Test Plugin",
  "pluginPackageName": "com.baidaidai.testplugin",
  "pluginID": "29bb10c46772264df3c0d0fade57d2eb",
  "iconURI": "content://rootless_store/plugin_icon/test",
  "author": "Baidaidai",
  "pluginDescription": "A test runtime plugin for Rootless Store.",
  "requiredEnvironment": "PERMISSIVE",
  "entryPoint": "index.sh"
}
```

### 字段说明

- `installedVersion`
  版本声明字段。当前类型仅为 `String`，但语义上应视为可比较版本号，不建议把构建信息、日期或文件名直接塞进这里。

- `pluginRenderingName`
  纯展示字段。允许后续改名，不应用它承担唯一标识、依赖定位或安装记录关联。

- `pluginPackageName`
  插件逻辑命名空间。它应稳定、可重复，并尽量符合 Android 包名习惯。即便当前类型系统没有强校验，也不建议使用 `TestPlugin` 这类非规范值。

- `pluginID`
  插件主标识。这个字段的稳定性要求高于 `pluginPackageName`。如果后续 Room 以它作为主键，那么同一插件跨版本升级时不应变化。

- `iconURI`
  图标引用字段。`null` 表示插件没有独立图标。这里存的是引用，不是图标内容本体。引用形式可以是 `content://...`、文件路径或包内相对路径。

- `author`
  作者 / 发布者字段。适合用于展示、来源归属和问题追溯。

- `pluginDescription`
  插件摘要字段。建议保持短文本，不应承担长文档或完整 changelog。

- `requiredEnvironment`
  宿主环境声明字段。当前可序列化值来自 `HosterOverallStatus`，即：
  `LIMITED`、`PERMISSIVE`、`ADB`、`ROOTD`。  
  它表达的是插件要求，不是宿主机当前实时状态。

- `entryPoint`
  插件入口字段。它应当始终指向包内稳定入口，例如 `index.sh`。不建议把动态命令拼接逻辑直接塞进这个字段。

## 执行链路

当前 client 插件的执行链路，可以先按下面这条主路径理解：

1. 先通过 `SAF`（`Storage Access Framework`）选择插件文件。
2. 选择完成后，将插件内容解压并拷贝到应用程序内部存储位置。
3. 当用户开始执行时，由运行器解析 `entryPoint`，再把执行委派给 `ProcessBuilder`。

可以把它理解成这样一条链：

```text
SAF 选文件
-> 解压 / 拷贝到 App Internal Storage
-> 解析 entryPoint
-> 委派给 ProcessBuilder
-> 执行目标文件
```

这里 `entryPoint` 是否写对是关键条件。

- 如果 `entryPoint` 没有正确指向被解压后的目标文件，应用就无法正确访问到它。
- 如果 `entryPoint` 指到了错误路径，执行会直接落空。
- 如果目标文件本身没有正确可执行权限，或者当前执行位置的权限不足，`ProcessBuilder` 在真正启动时就会直接失败。

所以对插件作者来说，`entryPoint` 不是一个随便填的展示字段，而是整个执行链路中最敏感的入口声明之一。

## 插件包的组成

当前 Rootless Store 的插件包格式，默认是一个 `ZIP` 文件。

一个标准插件包内部，至少应包含下面两类内容：

1. 一个可执行目标
   例如：
   - 一个 `ELF` 文件
   - 一个 `index.sh`
   - 或者其他可执行程序

2. 一个 `PluginManifest.json`
   用于描述插件的版本、入口、环境要求和基础元信息。

也就是说，当前阶段只要一个 `ZIP` 文件中同时包含：

- 可执行目标
- `PluginManifest.json`

那么它就可以被视为一个相对标准的 Rootless Store Plugin 包。

推荐目录结构可以用 ASCII tree 表示成这样：

```text
test-plugin.zip
├── PluginManifest.json
└── index.sh
```

如果入口是二进制，则可以是这样：

```text
test-plugin.zip
├── PluginManifest.json
└── plugin(ELF)
```

目前 Rootless Store 只支持 `ZIP` 作为插件包格式。

## 目前的局限性

### 1. `require` 环境限制

当前系统还没办法完全强制遵守插件声明的 `requiredEnvironment`。

这意味着即便 manifest 已经声明了环境要求，插件在实际执行时仍然可能出现两种结果：

- 有可能执行成功
- 也有可能执行不成功

也就是说，`requiredEnvironment` 当前仍然更接近声明约束，而不是已经完全收敛成强制执行条件。

### 2. 执行状态的反馈

当前系统还没有把“这个插件到底能不能直接执行”这件事完整、稳定地反馈出来。

后续会逐渐收敛这一层行为：

- 主动通知当前插件是否可以直接执行
- 根据宿主环境上下文判断执行可行性
- 尽量把“可执行 / 不可执行 / 可降级执行”区分清楚

### 3. 模式限制与加权执行

当前 `entryPoint` 默认仍然是“单文件模式”，而不是“调用链模式”。后续会逐渐扩展，但现阶段还存在这些限制：

1. 如果要执行多个 `ELF` 或多个 `SH` 文件，通常还需要通过 `chmod` 全部做额外加权后才能运行。
2. 目前只能稳定执行单个 `SH` 文件或单个 `ELF` 文件。
3. 系统暂时还无法根据整个调用链，对所有相关文件执行全量的加权操作。

这属于当前已经明确存在的局限性，后续阶段仍然需要继续协商和解决。
