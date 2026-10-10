# DevLibrary

Perpustakaan dokumentasi kodingan — catatan belajar sebagai programmer sejak 2022. Dibangun dengan [VitePress](https://vitepress.dev/).

## Prasyarat

- **Node.js** 20 atau lebih baru ([unduh](https://nodejs.org/))
- **npm** (ikut terpasang bersama Node.js)
- **Git**

Cek versi:

```bash
node -v
npm -v
git --version
```

## Menjalankan Secara Lokal

### 1. Clone repositori

```bash
git clone https://github.com/muhamadfazriannafi-svg/dev-library.git
cd dev-library
```

### 2. Pasang dependensi

```bash
npm install
```

### 3. Jalankan mode development

```bash
npm run docs:dev
```

Situs berjalan di `http://localhost:5173`. Setiap perubahan file Markdown langsung ter-*refresh* otomatis (hot reload).

## Perintah yang Tersedia

| Perintah | Fungsi |
| --- | --- |
| `npm run docs:dev` | menjalankan server development (hot reload) |
| `npm run docs:build` | membangun situs produksi ke `docs/.vitepress/dist` |
| `npm run docs:preview` | pratinjau hasil build produksi secara lokal |

### Membangun & Pratinjau Produksi

```bash
npm run docs:build
npm run docs:preview
```

Build produksi menghasilkan file statis di `docs/.vitepress/dist/`, siap di-deploy ke hosting statis apa pun.

## Struktur Proyek

```
dev-library/
├── docs/                        # root VitePress (semua konten)
│   ├── .vitepress/
│   │   ├── config.mts           # konfigurasi situs (nav, sidebar, search)
│   │   ├── cache/               # cache build (diabaikan Git)
│   │   └── dist/                # hasil build (diabaikan Git)
│   ├── index.md                 # halaman home
│   ├── git/                     # rubrik Git
│   ├── github/                  # rubrik GitHub
│   ├── database/                # rubrik Database
│   ├── php/                     # rubrik PHP
│   ├── laravel/                 # rubrik Laravel
│   ├── vue/                     # rubrik Vue
│   ├── nuxt/                    # rubrik Nuxt
│   ├── express/                 # rubrik Express
│   └── golang/                  # rubrik Go
├── .github/workflows/deploy.yml # CI: build & deploy otomatis
├── .gitignore
└── package.json
```

## Alur Kerja Git

Repositori ini memakai satu branch utama: `main`.

```bash
# ambil perubahan terbaru
git pull

# buat branch untuk pekerjaan baru (opsional)
git switch -c docs/materi-baru

# simpan perubahan
git add .
git commit -m "docs: tambah materi baru"

# kirim ke GitHub
git push
```

## Deploy Otomatis (GitHub Pages)

Deploy berjalan otomatis lewat GitHub Actions di `.github/workflows/deploy.yml`.

Setiap `push` ke branch `main` akan:

1. Checkout kode.
2. Setup Node.js 20.
3. `npm install`.
4. `npx vitepress build docs`.
5. Upload hasil build sebagai artifact.
6. Deploy ke GitHub Pages.

Situs terbit di: `https://muhamadfazriannafi-svg.github.io/dev-library/`

Untuk mengaktifkan sekali saja: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Menambah Materi Baru

1. Buat file Markdown di dalam rubrik terkait, mis. `docs/golang/goroutine.md`.
2. Daftarkan di `docs/.vitepress/config.mts` pada bagian `themeConfig.sidebar`.
3. Jalankan `npm run docs:dev` untuk memeriksa hasilnya.
4. Commit & push.

Contoh menambah item sidebar:

```ts
// docs/.vitepress/config.mts
'/golang/': [
  {
    text: 'Go',
    items: [
      { text: 'Overview', link: '/golang/' },
      { text: 'Instalasi & Setup', link: '/golang/instalasi' },
      { text: 'Dasar & Sintaks', link: '/golang/dasar' }
    ]
  }
]
```

## Menambah Rubrik Baru

1. Buat folder `docs/<nama-rubrik>/` dengan `index.md` di dalamnya.
2. Tambahkan entri di `nav` dan blok sidebar `/<nama-rubrik>/` di `config.mts`.
3. Tambahkan kartu rubrik di `docs/index.md` pada bagian `features` (opsional).

## Catatan Konfigurasi

- **`base: '/dev-library/'`** di `config.mts` penting karena situs di-host sebagai *project page* GitHub Pages. Jika nama repo berubah, sesuaikan juga nilai ini.
- Pencarian memakai penyedia `local` (tanpa layanan eksternal).
- Jangan commit folder `node_modules/`, `docs/.vitepress/cache/`, dan `docs/.vitepress/dist/` — sudah ada di `.gitignore`.

## Pemecahan Masalah

| Masalah | Solusi |
| --- | --- |
| `npm run docs:dev` gagal | pastikan Node ≥ 20: `node -v` |
| Halaman tampil tanpa CSS di produksi | cek nilai `base` di `config.mts` sesuai nama repo |
| Perubahan tidak muncul saat dev | hentikan lalu jalankan ulang `npm run docs:dev` |
| Deploy gagal di Actions | buka tab **Actions** di GitHub, lihat log job yang error |
| Link 404 | pastikan path diawali `/` dan sesuai lokasi file |

## Lisensi

ISC
