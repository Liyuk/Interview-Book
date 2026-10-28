import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Interview Book',
  description: '前端面试题以及前端知识点梳理',
  base: '/Interview-Book/',
  outDir: '../dist',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/' },
    ],
    socialLinks: [
      {
        icon: 'github',
        ariaLabel: 'GitHub repository',
        link: 'https://github.com/Mountain-Buzhou/Interview-Book',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          collapsed: false,
          items: [
            { text: 'Introduce', link: '/guide/' },
            { text: 'Entry', link: '/guide/entry' },
            { text: 'Basic', link: '/guide/basic' },
            { text: 'Advanced', link: '/guide/advanced' },
            { text: 'Framework', link: '/guide/framework' },
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Team', link: '/guide/team' },
            { text: 'Foundation', link: '/guide/foundation' },
          ],
        },
      ],
    },
    editLink: {
      pattern: 'https://github.com/Mountain-Buzhou/Interview-Book/edit/vuepress/docs/:path',
      text: '帮助我们改善此页面！',
    },
    search: {
      provider: 'local',
    },
  },
})
