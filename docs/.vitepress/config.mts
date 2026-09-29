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
      { text: 'PHP', link: '/php/' },
      {
        text: 'Framework',
        items: [
          {
            text: 'Backend',
            items: [
              { text: 'Laravel', link: '/laravel/' }
            ]
          },
          {
            text: 'Frontend',
            items: [
              { text: 'Vue', link: '/vue/' }
            ]
          }
        ]
      },
    ],

    sidebar: {
      '/vue/': [
        {
          text: 'Vue',
          items: [
            { text: 'Overview', link: '/vue/' }
          ]
        },
        {
          text: 'Vue Dasar',
          items: [
            { text: 'Reaktivitas', link: '/vue/dasar/reaktivitas' },
            { text: 'Template & Binding', link: '/vue/dasar/template' },
            { text: 'Direktif', link: '/vue/dasar/direktif' },
            { text: 'Component', link: '/vue/dasar/component' },
            { text: 'Composition API', link: '/vue/dasar/composition' }
          ]
        },
        {
          text: 'Ekosistem',
          items: [
            { text: 'Vue Router', link: '/vue/router' },
            { text: 'Pinia', link: '/vue/pinia' }
          ]
        }
      ],
      '/laravel/': [
        {
          text: 'Laravel',
          items: [
            { text: 'Overview', link: '/laravel/' }
          ]
        },
        {
          text: 'Dasar',
          items: [
            { text: 'Routing, Controller, View, Migration', link: '/laravel/basic/routing' },
            { text: 'Eloquent ORM', link: '/laravel/eloquent' }
          ]
        },
        {
          text: 'Arsitektur',
          items: [
            { text: 'Modular', link: '/laravel/arsitektur/modular' },
            { text: 'Repository Pattern', link: '/laravel/arsitektur/repository' }
          ]
        },
        {
          text: 'Asynchronous',
          items: [
            { text: 'Queue', link: '/laravel/async/queue' },
            { text: 'Job', link: '/laravel/async/job' },
            { text: 'Scheduler', link: '/laravel/async/scheduler' }
          ]
        },
        {
          text: 'Debugging & Keamanan',
          items: [
            { text: 'Laravel Telescope', link: '/laravel/telescope' },
            { text: 'SQL Injection', link: '/laravel/security/sql-injection' }
          ]
        }
      ],
      '/php/': [
        {
          text: 'PHP',
          items: [
            { text: 'Overview', link: '/php/' }
          ]
        },
        {
          text: 'PHP Dasar',
          items: [
            { text: 'Sintaks Dasar', link: '/php/dasar/sintaks' },
            { text: 'Variabel & Tipe Data', link: '/php/dasar/variabel' },
            { text: 'Operator & Aritmatika', link: '/php/dasar/operator' },
            { text: 'Kontrol Alur', link: '/php/dasar/kontrol' },
            { text: 'Array', link: '/php/dasar/array' },
            { text: 'String', link: '/php/dasar/string' },
            { text: 'Function', link: '/php/dasar/function' },
            { text: 'OOP', link: '/php/dasar/oop' }
          ]
        }
      ],
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
            { text: 'GROUP BY & Agregasi', link: '/database/sql/group-by' },
            { text: 'INSERT / UPDATE / DELETE', link: '/database/sql/dml' },
            { text: 'JOIN', link: '/database/sql/join' },
            { text: 'Subquery', link: '/database/sql/subquery' },
            { text: 'CTE', link: '/database/sql/cte' },
            { text: 'Indexing', link: '/database/sql/indexing' },
            { text: 'Foreign Key', link: '/database/sql/foreign-key' },
            { text: 'View', link: '/database/sql/view' },
            { text: 'Sequence', link: '/database/sql/sequence' },
            { text: 'Soft Delete', link: '/database/sql/soft-delete' },
            { text: 'User & Hak Akses', link: '/database/sql/users-privileges' },
            { text: 'MySQL vs PostgreSQL', link: '/database/sql/mysql-postgresql' }
          ]
        },
        {
          text: 'NoSQL',
          items: [
            { text: 'Konsep NoSQL', link: '/database/nosql/' },
            { text: 'MongoDB', link: '/database/nosql/mongodb' }
          ]
        },
        {
          text: 'Performance & Debugging',
          items: [
            { text: 'N+1 Query Problem', link: '/database/performance/n-plus-one' }
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