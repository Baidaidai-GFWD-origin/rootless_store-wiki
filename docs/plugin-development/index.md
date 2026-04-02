---
title: 关于插件开发的细节
description: Rootless Store 的插件开发框架总览，分为 client 与 server 两个层面。
---

# 关于插件开发的细节

这一部分文档，不再讨论 Rootless Store 为什么存在，而是开始进入真正的插件开发框架。

目前整个框架会分成两个层面：

## 1. Client 层面

这里讨论的是运行时插件，也就是实际安装到 Rootless Store 本地、由运行器直接管理和执行的插件。

这类插件关心的是：

- 如何被安装、显示和删除。
- 如何声明入口、执行器与 `require` 条件。
- 如何在 GUI 环境下被用户理解、启动和调试。
- 如何在不破坏宿主机边界的前提下稳定运行。

当前已经先完成这一部分的第一版说明：

- [Client：运行时插件](/plugin-development/client-runtime-plugin)

## 2. Server 层面

这里讨论的不是本地运行时插件，而是和 `Sources`、索引、后端接口、官方源能力相关的服务端侧插件或扩展结构。

当前先完成第一版框架页：

- [Server：Sources 与后端框架](/plugin-development/server-sources-backend)

这部分暂时还没有进入字段级协议和接口级说明，当前先把后端分层、`Sources` 定位、hoster、索引、同步和契约这些章节骨架搭起来，方便后面继续往里填。

## 当前立场

插件开发这件事，在 Rootless Store 里不会被定义成“随便丢一个脚本就算接入”。无论是 client 还是 server，最终都要服务于同一件事：

- 把能力边界讲清楚。
- 把入口约定讲清楚。
- 把执行行为讲清楚。
- 把维护成本控制住。

只有这样，插件生态才不会从第一天开始就失控。
