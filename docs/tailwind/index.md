# Kumpulan Dokumentasi Tailwind CSS

Tailwind CSS adalah framework CSS *utility-first*: alih-alih menulis CSS kustom, kamu menyusun tampilan langsung dari class kecil di HTML.

```html
<button class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
  Simpan
</button>
```

Tanpa menulis satu baris CSS. Semua class di atas sudah ada di framework.

## Mengapa Tailwind

- **Tidak pindah-pindah file** — styling ada di tempat yang sama dengan markup.
- **Tidak ada CSS mati** — build hanya mengeluarkan class yang dipakai.
- **Konsisten** — skala spacing, warna, dan tipografi sudah ditentukan.
- **Responsif mudah** — `md:`, `lg:` sebagai prefix.
- **Dokumentasi**: <https://tailwindcss.com/docs>

## Versi Terbaru

| Versi | Status |
| --- | --- |
| **4.x** | stabil terbaru |
| 3.x | masih dipakai luas |

::: warning Perbedaan utama v4
Tailwind v4 memakai engine baru (Oxide), konfigurasi berbasis CSS (`@theme`) menggantikan `tailwind.config.js`, dan instalasi lewat `@tailwindcss/vite` / `@tailwindcss/postcss`. Panduan lama dengan `npx tailwindcss init` **tidak berlaku** di v4.
:::

## Instalasi Cepat (Vite)

```bash
npm install tailwindcss @tailwindcss/vite
```

`vite.config.js`:

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()]
})
```

`style.css`:

```css
@import "tailwindcss";
```

Selesai. Tidak perlu file config.

## Daftar Materi

- [Instalasi & Setup](/tailwind/instalasi) — Vite, PostCSS, CDN, konfigurasi v4
- [Utility Dasar](/tailwind/utility-dasar) — spacing, warna, tipografi, layout
- [Layout: Flexbox & Grid](/tailwind/layout) — flex, grid, positioning
- [Responsif & State](/tailwind/responsif) — breakpoint, hover, focus, dark mode
- [Kustomisasi & Komponen](/tailwind/kustomisasi) — `@theme`, `@apply`, `@utility`
- [Praktik Terbaik](/tailwind/best-practices) — komponen, `clsx`, hindari kekacauan class
