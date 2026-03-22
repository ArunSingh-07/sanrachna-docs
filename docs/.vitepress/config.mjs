import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Sanrachna",
  description: "Privacy-First AI Productivity Platform",
  themeConfig: {
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
      { icon: 'github', link: 'https://github.com/yourusername/sanrachna-docs' }
    ]
  }
})
