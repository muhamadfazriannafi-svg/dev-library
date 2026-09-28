import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "DevLibrary",
  description: "Perpustakaan Dokumentasi Kodingan Open Source",
  // SESUAIKAN DENGAN NAMA REPOSITORY GITHUB-MU:
  base: '/dev-library/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Git', link: '/git/' },
      { text: 'GitHub', link: '/github/' },
    ],

    sidebar: {
      '/github/': [
        {
          text: 'GitHub',
          items: [
            { text: 'Overview', link: '/github/' },
            { text: 'GitHub Pages', link: '/github/github-pages' },
            { text: 'GitHub Actions', link: '/github/github-actions' }
          ]
        }
      ],
      '/git/': [
        {
          text: 'Git',
          items: [
            { text: 'Overview', link: '/git/' },
            { text: 'Alur Kerja Harian', link: '/git/daily-workflow' },
            { text: 'Undo & Recovery', link: '/git/undo-recovery' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/muhamadfazriannafi-svg/dev-library' }
    ],
    
    search: {
      provider: 'local'
    }
  }
})