import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Sanrachna",
  description: "Privacy-First AI Productivity Platform",
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Research', link: '/research/proposal' }
    ],
    sidebar: [
      {
        text: 'Research Documentation',
        items: [
          { text: 'Research Proposal', link: '/research/proposal' },
          { text: 'Architecture & Methodology', link: '/research/architecture' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ArunSingh-07/sanrachna-research' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Sanrachna Research'
    }
  }
})
