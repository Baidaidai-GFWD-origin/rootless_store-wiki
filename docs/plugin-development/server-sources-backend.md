---
title: Server：Market 与 Source 接口
description: Rootless Store 的 Source 与 Market 服务端接口说明。
---

# Server：Market 与 Source 接口

这一页只描述当前已经定下来的服务端接口契约。

## Source

### Endpoint

```text
GET ${endpoint}/source/getSourceInfo
```

示例：

```text
GET https://example.com/api/source/getSourceInfo
```

### 作用

返回 Source 基础信息，后续会进行 入库->SourceScreen 渲染源入口。

### Response DTO

```kotlin
@Serializable
data class PluginSourceDTO(
    override val sourceID: String,
    override val sourceName: String,
    override val sourceRemoteEndpoint: String,
): PluginSource.PluginSourceDTO
```

### Response JSON

```json
{
  "sourceID": "official-rootless-source",
  "sourceName": "Rootless Store Official Source",
  "sourceRemoteEndpoint": "https://example.com/api"
}
```

### 字段

- `sourceID`
  Source 主标识。本地持久化、去重、追踪都使用这个字段。

- `sourceName`
  Source 展示名称。用于 `SourceScreen` 和其他展示层。

- `sourceRemoteEndpoint`
  Source 远端基础 endpoint。后续所有 Source 相关请求都基于这个地址继续发起。

## Market

### Endpoint

```text
GET ${endpoint}/plugin/getAllPlugins
```

示例：

```text
GET https://example.com/api/plugin/getAllPlugins
```

### 作用

返回 Market 页面当前页的插件列表，供Paging使用。

### Response DTO

```kotlin
@Serializable
data class PluginPageResponseDTO(
    val data: List<PluginManifestRemote>,
    val meta: MetaDTO
)

@Serializable
data class MetaDTO(
    val limit: Int,
    val hasMore: Boolean
)
```

### Response JSON

```json
{
  "data": [
    {
      "installedVersion": "1.0.0",
      "pluginRenderingName": "Demo Plugin",
      "pluginPackageName": "com.baidaidai.demo",
      "pluginID": "demo-plugin-id",
      "iconURI": "https://example.com/assets/demo.png",
      "author": "Baidaidai",
      "pluginDescription": "A demo plugin from market.",
      "requiredEnvironment": "PERMISSIVE",
      "entryPoint": "index.sh",
      "pluginURI": "https://example.com/plugin/demo.zip"
    }
  ],
  "meta": {
    "limit": 10,
    "hasMore": false
  }
}
```

### 字段

- `data`
  当前页的 `PluginManifestRemote` 列表。

- `meta.limit`
  当前页分页大小。

- `meta.hasMore`
  后续是否还有下一页数据。

## 有关Paging

`Market` 页面采用 `Paging` 分页机制。

- 每页限制固定为 `10`
- 返回数量按 `10` 个为一组
- `hasMore = true` 表示后续还有下一页
- `hasMore = false` 表示当前已经到达尾页

开发者建议按 `10` 个插件为单位组织页面数据。

## 当前局限性

::: danger Unsupported
当前版本不支持付费源与不可见源。
:::

### 状态

- <Badge type="danger" text="付费源 Unsupported" />
- <Badge type="danger" text="不可见源 Unsupported" />
- <Badge type="danger" text="账户登录进入 Source Unsupported" />
- <Badge type="danger" text="激活码进入 Source Unsupported" />
- <Badge type="danger" text="Source 内部插件付费下载 Unsupported" />
- <Badge type="danger" text="Source 内部插件付费解锁 Unsupported" />

当前版本只支持公开 Source 模型，不支持受控分发模型。

开发者如果现在创建私有源、付费源或不可见源，当前版本无法提供保护能力。

### 风险

1. Source 被直接发现
2. Source 内部插件被直接泄露

以上风险由开发者自行承担。需要这类需求的Providers，请等待后续正式版本支持后，再创建对应 Source。
