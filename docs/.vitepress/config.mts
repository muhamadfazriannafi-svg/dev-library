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
      { text: 'Golang', link: '/golang/' },
      { text: 'PHP & Laravel', link: '/php/' },
    ],

    sidebar: {
      '/git/': [
        {
          text: 'Git',
          items: [
            { text: 'Overview', link: '/git/' },
            { text: 'Alur Kerja Harian', link: '/git/daily-workflow' },
            { text: 'Undo & Recovery', link: '/git/undo-recovery' }
          ]
        }
      ],
      '/golang/': [
        {
          text: 'Golang',
          items: [
            { text: 'Overview', link: '/golang/' },
            { text: 'Fiber: Routing & Middleware', link: '/golang/fiber-routing' }
          ]
        }
      ],
      '/php/': [
        {
          text: 'PHP & Laravel',
          items: [
            { text: 'Overview', link: '/php/' },
            { text: 'Laravel: Eager Loading Tips', link: '/php/laravel-eloquent' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/username/dev-library' }
    ],
    
    search: {
      provider: 'local'
    }
  }
})