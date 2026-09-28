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
          text: 'Dasar',
          items: [
            { text: 'Overview', link: '/git/' },
            { text: 'Alur Kerja Harian', link: '/git/daily-workflow' },
            { text: 'Membuat Repository', link: '/git/repo' }
          ]
        },
        {
          text: 'Dokumentasi Perintah',
          items: [
            { text: 'git commit', link: '/git/commit' },
            { text: 'git branch', link: '/git/branch' },
            { text: 'git checkout', link: '/git/checkout' },
            { text: 'git merge', link: '/git/merge' },
            { text: 'git push', link: '/git/push' },
            { text: 'git pull', link: '/git/pull' },
            { text: 'git stash', link: '/git/stash' },
            { text: 'Fork', link: '/git/fork' }
          ]
        },
        {
          text: 'Lainnya',
          items: [
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