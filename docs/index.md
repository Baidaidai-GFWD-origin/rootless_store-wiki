---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Rootless Store"
  text: "为安卓生态补齐最后一枚拼图"
  tagline: This project belongs to Resilien Co., Ltd.
  image:
    src: /logo.webp
    alt: Rootless Store logo
  actions:
    - theme: brand
      text: Rootless的心智模型
      link: /articles/why-rootless
    - theme: alt
      text: 关于开发插件细节
      link: /plugin-development/

features:
  - title: 插件管理与执行
    icon: 🧩
    details: 支持下载、安装、引入插件与添加源，并可在 App 内直接通过 App Shell 执行插件，本质上就是一个免 Root 的 Rootless Store。
  - title: 手机看板功能
    icon: 🧭
    details: 提供类似手机 Linux 服务器看板的监测能力，可查看 RAM 与 ROM 使用情况、SELinux 状态、Linux kernel 版本，以及手机温度阈值等关键指标。
  - title: 免 Root 核心优势
    icon: 🔒
    details: 无需 Root 即可运行，兼容 SELinux 的 Permissive 或 Enhancing 模式，支持通过 ADB 运行；如果设备本身已有 Root，也可以调用 Root 权限执行已下载好的插件。
  - title: 指引友好
    icon: 📄
    details: 首页与后续文档可以将核心能力、使用路径和关键说明逐步指引出来，方便用户快速理解并上手整个 Rootless Store 体系。
  - title: 完全开源
    icon: 🕊️
    details: 项目完全开源，并采用 DDD 加上六边形架构组织代码，让实现边界和业务逻辑更清晰，真正做到代码即文档。
  - title: 去中心化
    icon: 🤝
    details: 资源并不是由项目方集中提供，而是允许用户自行添加和管理来源，这也是 Rootless Store 最鲜明的特点之一。
---
