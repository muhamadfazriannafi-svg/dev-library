# Instalasi & Setup Tailwind CSS

## Prasyarat

- Node.js 20+ (untuk Tailwind v4)
- Proyek dengan bundler (Vite, Next.js, Laravel Vite, dll.)

```bash
node -v
```

## Vite (Vue, React, Svelte, Vanilla)

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

Import di entry CSS (`src/style.css` atau `src/index.css`):

```css
@import "tailwindcss";
```

Pastikan CSS di-import di entry JS:

```js
import './style.css'
```

## Next.js

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

`postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}
```

`app/globals.css`:

```css
@import "tailwindcss";
```

## Laravel

```bash
npm install tailwindcss @tailwindcss/vite
```

`vite.config.js`:

```js
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    laravel({ input: ['resources/css/app.css', 'resources/js/app.js'], refresh: true }),
    tailwindcss()
  ]
})
```

`resources/css/app.css`:

```css
@import "tailwindcss";
```

```bash
npm run dev
```

## PostCSS (bundler lain)

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

`postcss.config.js`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}
```

## CDN (Eksperimen Saja)

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

::: warning
CDN bukan untuk produksi. Class di-scan saat runtime → lambat dan tidak bisa dikustomisasi penuh. Pakai hanya untuk prototipe cepat atau latihan.
:::

## Cara Kerja: Scan Otomatis

Tailwind v4 **tidak butuh** array `content`. Ia otomatis memindai semua file proyek (kecuali `.gitignore`) dan hanya menghasilkan CSS untuk class yang benar-benar muncul di source.

Class dinamis hasil string concat **tidak terdeteksi**:

```js
// ❌ tidak terdeteksi
const cls = 'text-' + color

// ✅ tulis utuh
const cls = color === 'red' ? 'text-red-500' : 'text-blue-500'
```

## Menambah Sumber yang Di-scan

Kalau ada file di luar folder proyek (mis. template di `vendor/`):

```css
@import "tailwindcss";
@source "../vendor/my-package/views";
```

## Mematikan Scan Otomatis

```css
@import "tailwindcss" source(none);
@source "./src";
```

## Konfigurasi Lama (`tailwind.config.js`)

Tailwind v4 masih bisa memuat config JS lama, tapi **tidak wajib**:

```css
@config "../tailwind.config.js";
```

Untuk proyek baru, pakai `@theme` di CSS (lihat [Kustomisasi](/tailwind/kustomisasi)).

## Cek Cepat Berhasil

`index.html`:

```html
<h1 class="text-3xl font-bold text-sky-600 underline">Tailwind jalan</h1>
```

Teks harus biru, tebal, besar, dan bergaris bawah. Kalau tidak: cek import CSS dan plugin.

Referensi: <https://tailwindcss.com/docs/installation>
