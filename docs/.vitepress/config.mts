import { defineConfig } from 'vitepress'

const base = '/RootlessStore_WiKi/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rootless Store",
  description: "Rootless Store Wiki",
  base,
  head: [
    ['link', { rel: 'icon', type: 'image/webp', href: `${base}logo.webp` }],
    ['link', { rel: 'apple-touch-icon', href: `${base}logo.webp` }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.webp',
    nav: [
      { text: '首页', link: '/' },
      { text: '心智模型', link: '/articles/why-rootless' },
      { text: '插件开发', link: '/plugin-development/' },
      { text: '使用指引', link: '/user-guide/how-to-use-rootless-store' },
    ],

    sidebar: [
      {
        text: 'Rootless心智模型',
        items: [
          { text: '引出 Rootless 的思考', link: '/articles/why-rootless' },
          { text: 'Rootless 的生态模型', link: '/articles/ecosystem-cluster' },
          { text: 'Sources 与当前想法', link: '/articles/sources-and-ideas' },
          { text: '项目局限性与预期完成时间', link: '/articles/limitations-and-timeline' }
        ]
      },
      {
        text: '插件开发细节',
        items: [
          { text: '关于插件开发的细节', link: '/plugin-development/' },
          { text: 'Client：运行时插件', link: '/plugin-development/client-runtime-plugin' },
          { text: 'Server：Market 与 Source 接口', link: '/plugin-development/server-sources-backend' }
        ]
      },
      {
        text: '使用指引',
        items: [
          { text: '如何正确使用 Rootless Store', link: '/user-guide/how-to-use-rootless-store' }
        ]
      }
    ]
  }
})
