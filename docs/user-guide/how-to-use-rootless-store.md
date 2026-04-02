---
title: 如何正确使用 Rootless Store
description: 面向用户的 Rootless Store 页面导览与基础使用说明。
---

# 如何正确使用 Rootless Store

第一次打开 Rootless Store 时，可以先按三个页面来理解它：

- `Home Screen` 负责展示设备状态与执行入口
- `Plugin Screen` 负责管理已经安装的插件
- `Source Screen` 负责管理已添加的源，并进入对应的 `Market`

## 1. Home Screen

`Home Screen` 是 Rootless Store 的首页，也是整个应用的数据看板。

### 顶部信息

顶部会显示两组基础信息：`Memory` 和 `Storage`。

- `Memory` 对应 `RAM`
- `Storage` 对应 `ROM`

这一部分主要用来帮助你快速了解当前设备的内存和存储状态。

### 左侧 Host Schedule

左侧区域是 `Host Schedule`。下面会有一个 `Badge`，其中最重要的一项是 `Overall`。

点击 `Overall` 后，会打开一个新的 `Activity`，用于连接 `Shizuku` 并进行提权相关操作。

### 中部数据看板

中部是设备状态看板，当前会显示以下项目：

- `Vision`
- `Kernel`
- `SELinux`
- `Plugins`
- `Temp`

这一部分会集中展示当前设备环境、内核状态、安全状态、插件数量和温度信息。

### 底部 Rootless Store 入口

最下面有一个 `Rootless Store` 入口。

点击后会跳转到插件开发相关页面，用来帮助你进一步了解 Rootless Store 插件是如何设计和实现的。

### 右下角执行窗口

`Home Screen` 右下角始终存在一个执行窗口。

无论当前环境是：

- `Enforcing`
- `Permissive`
- `ADB`
- `Root`

右下角的执行窗口都会保留。

当前它主要承担下面两类作用：

- 以软件自身的名义执行
- 作为调试入口使用

后续这里还会继续加入更多能力，例如：

- `Root` 上下文切换
- `Shizuku` 上下文切换

这些功能后续都会继续收敛到这个执行窗口中。

## 2. Plugin Screen

`Plugin Screen` 主要用来查看和管理当前已经安装的插件。

在这个页面中，你可以看到插件数量、插件当前状态，也可以直接完成删除操作。

### Plugin Card

每一个 `Plugin Card` 都会显示下面这些内容：

1. `Plugin` 名称
2. `Plugin` 图标
3. `Plugin Vision`
4. `Plugin` 作者
5. `Plugin Source`
6. `State`
7. `Required`

### 字段说明

- `Plugin` 名称
  用于显示插件名称。

- `Plugin` 图标
  用于显示插件图标。

- `Plugin Vision`
  用于显示插件版本信息。

- `Plugin` 作者
  用于显示插件作者。

- `Plugin Source`
  用于显示插件来源，例如 `Official`、第三方源或 `Local`。

- `State`
  用于显示当前插件的执行状态，也就是当前的开关状态和运行状态，例如 `Great`、`Permission Promotion` 或其他状态。

- `Required`
  用于显示插件运行所需的最低环境要求。只有先满足最低要求，插件才能继续运行更高权限的内容。

### 右下角本地导入

`Plugin Screen` 右下角提供本地导入入口。

如果你从这个页面直接安装插件，那么这个插件的 `Plugin Source` 会被标记为 `Local`。

### 当前限制

`Plugin Screen` 右上角的分类模块，也就是过滤模块，当前版本还没有完成。

这一部分会在后续版本中补上。

## 3. Source Screen

`Source Page` 用来展示当前已经添加的所有 Source，也是进入各个 `Market` 的入口。

### 顶部操作栏

`Source Page` 顶部有两个操作按钮：

- 左上角是 `Edit`
- 右上角是 `Add`

### 中间部分

中间区域会展示 `Source Page` 的主内容。

这里会显示：

- 当前 Source 列表
- `Append Source` 的数量，也就是当前一共添加了多少个源

### Source Card

每一个 Source 小卡片会显示下面这些内容：

- 左侧显示该 Source 的 `icon`
- 上方显示该 Source 的名称
- 下方显示该 Source 的端口，也就是客户端通过哪个端口与该 Source 进行请求

### 点击后的跳转

点击某一个 `Source Card` 后，会直接跳转到该 Source 对应的 `Market` 页面。

用户可以在该 `Market` 页面中继续下载并安装插件。

