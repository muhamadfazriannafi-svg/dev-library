# Kumpulan Dokumentasi Nuxt

Nuxt adalah framework di atas Vue untuk membangun aplikasi web full-stack. Ia menambahkan routing otomatis, server-side rendering (SSR), auto-import, dan server API — hal-hal yang di Vue murni harus dirakit sendiri.

```vue
<!-- pages/index.vue -->
<script setup>
const { data: users } = await useFetch('/api/users')
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

## Mengapa Nuxt

- **File-based routing** — file di `pages/` otomatis jadi route.
- **SSR & SSG** — halaman dirender di server, baik untuk SEO & performa.
- **Auto-import** — `ref`, `useFetch`, component, composable otomatis tersedia.
- **Server API** — endpoint backend di folder `server/`.
- **Ekosistem Nuxt modules** — auth, SEO, image, PWA siap pakai.
- **Dokumentasi**: <https://nuxt.com/docs>

## Versi Terbaru

| Versi | Status |
| --- | --- |
| **4.5.2** | stabil terbaru |
| 4.x | garis utama saat ini |
| 3.x | **EOL 31 Juli 2026** — segera upgrade |

Catatan rilis: <https://github.com/nuxt/nuxt/releases>

## Instalasi Cepat

```bash
npm create nuxt@latest
cd nama-proyek
npm install
npm run dev
```

## Struktur Folder Penting

| Folder/File | Isi |
| --- | --- |
| `pages/` | halaman (route otomatis) |
| `components/` | component auto-import |
| `composables/` | composable auto-import |
| `layouts/` | layout halaman |
| `server/api/` | endpoint API backend |
| `middleware/` | middleware route |
| `plugins/` | plugin aplikasi |
| `nuxt.config.ts` | konfigurasi Nuxt |

## Konsep Kunci

```vue
<script setup>
// data fetching bawaan Nuxt
const { data, pending, error } = await useFetch('/api/products')

// route
const route = useRoute()
const router = useRouter()

// SEO
useSeoMeta({ title: 'Daftar Produk' })
</script>
```

| Composable | Fungsi |
| --- | --- |
| `useFetch` / `useAsyncData` | ambil data SSR-friendly |
| `useRoute` / `useRouter` | akses route |
| `useState` | state lintas component |
| `useSeoMeta` | atur meta SEO |
| `definePageMeta` | opsi per-halaman |

## Daftar Materi

- [Pug di Nuxt](/nuxt/pug) — menulis template dengan Pug
