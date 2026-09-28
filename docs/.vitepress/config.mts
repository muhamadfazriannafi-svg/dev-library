import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "DevLibrary",
  description: "Perpustakaan Dokumentasi Kodingan Open Source",
  base: '/dev-library/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Git', link: '/git/' },
      { text: 'GitHub', link: '/github/' },
      { text: 'Database', link: '/database/' },
    ],

    sidebar: {
      '/database/': [
        {
          text: 'Database',
          items: [
            { text: 'Overview', link: '/database/' },
            { text: 'Konvensi Penamaan', link: '/database/best-practices/naming' }
          ]
        },
        {
          text: 'SQL',
          items: [
            { text: 'Konsep SQL', link: '/database/sql/' },
            { text: 'SELECT', link: '/database/sql/select' },
            { text: 'INSERT / UPDATE / DELETE', link: '/database/sql/dml' },
            { text: 'JOIN', link: '/database/sql/join' },
            { text: 'Subquery', link: '/database/sql/subquery' },
            { text: 'CTE', link: '/database/sql/cte' },
            { text: 'Indexing', link: '/database/sql/indexing' },
            { text: 'Foreign Key', link: '/database/sql/foreign-key' },
            { text: 'Soft Delete', link: '/database/sql/soft-delete' },
            { text: 'MySQL vs PostgreSQL', link: '/database/sql/mysql-postgresql' }
          ]
        },
        {
          text: 'NoSQL',
          items: [
            { text: 'Konsep NoSQL', link: '/database/nosql/' },
            { text: 'MongoDB', link: '/database/nosql/mongodb' }
          ]
        }
      ],
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
      { icon: 'github', link: 'https://github.com/muhamadfazriannafi-svg/' }
    ],
    
    search: {
      provider: 'local'
    }
  }
})