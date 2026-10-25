# Praktik Terbaik

## 1. Utamakan Komponen, Bukan `@apply`

Masalah utama Tailwind: daftar class panjang di markup. Solusi termurah di Vue/React = jadikan komponen, bukan menulis CSS baru.

```vue
<!-- components/Button.vue -->
<script setup>
defineProps({ variant: { type: String, default: 'primary' } })
</script>

<template>
  <button
    class="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
    :class="variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'border border-slate-300 text-slate-700 hover:bg-slate-50'"
  >
    <slot />
  </button>
</template>
```

Class tetap terlihat utuh → terdeteksi scanner. Tidak ada CSS tambahan.

## 2. Gabung Class Bersyarat — Hati-hati Konflik

```js
// ❌ dua class konflik, pemenang tak pasti
class="p-2 ${isLarge ? 'p-4' : ''}"
```

`clsx`/`tailwind-merge` hanya kalau sudah ada konflik nyata:

```bash
npm install clsx tailwind-merge
```

```js
// utils/cn.js
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs) => twMerge(clsx(inputs))
```

```js
cn('p-2', isLarge && 'p-4')  // → 'p-4'
```

`cn()` berguna untuk komponen yang menerima `class` dari luar (pass-through). Untuk komponen internal sendiri, ternary biasa cukup.

## 3. Jangan Bangun Nama Class Dinamis

```js
// ❌ scanner tidak bisa menebak
`bg-${color}-500`

// ✅ peta eksplisit
const BG = { red: 'bg-red-500', green: 'bg-green-500' }
```

Aturan: string class harus **lengkap dan literal** di source.

## 4. Satu Class Per Properti

```html
<!-- ❌ konflik, hasil bergantung urutan CSS -->
<div class="text-sm text-lg">

<!-- ✅ -->
<div class="text-lg">
```

## 5. Batasi Arbitrary Value

```html
<!-- ❌ tersebar, tidak konsisten -->
<p class="text-[13px] mt-[7px] text-[#3b82f690]">

<!-- ✅ jadikan token -->
```

```css
@theme {
  --text-note: 0.8125rem;
  --color-muted: rgb(59 130 246 / 0.56);
}
```

```html
<p class="text-note text-muted">
```

Pengecualian wajar: satu-off layout (`grid-cols-[240px_1fr]`), integrasi library pihak ketiga.

## 6. Ekstrak Anatomi, Bukan Setiap Class

Ukuran elemen mirip: ekstrak ke komponen/layout (`<Card>`, `<PageHeader>`, `<StatTile>`). Yang tidak perlu diekstrak: `<h1 class="text-2xl font-bold">` satu kali.

Tes singkat: **kalau muncul 3+ kali, ekstrak. Kalau sekali, tulis langsung.**

## 7. Jaga Urutan Grup di Markup

Konvensi yang dipakai tim Tailwind sendiri:

`layout → box (display/flex/grid) → spacing → size → typography → background → border → efek → state/varian`

```html
<div class="grid grid-cols-3 items-center gap-4 p-4 text-sm bg-white border rounded-lg shadow-sm hover:shadow-md md:gap-6">
```

Konsistensi urutan memudahkan review diff.

## 8. Varian, Bukan Media Query Manual

```css
/* ❌ */
@media (min-width: 768px) { .hero { padding: 2rem; } }
```

```html
<div class="p-4 md:p-8">…</div>
```

## 9. Aksesibilitas Jangan Dikorbankan

```html
<button class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">…</button>
<span class="sr-only">Tutup dialog</span>
<img src="..." alt="Deskripsi" class="aspect-square w-12 rounded-full object-cover" />
```

- `sr-only` untuk teks khusus screen reader.
- Jangan `outline-none` tanpa pengganti fokus yang terlihat.
- Kontras warna tetap tanggung jawabmu — Tailwind tidak memvalidasi `text-gray-400` di atas `bg-gray-100`.

## 10. Daftar Periksa Kode Review

- [ ] Tidak ada nama class hasil concat
- [ ] Tidak ada dua utility konflik pada properti sama
- [ ] Tidak ada `@apply` untuk pemakaian sekali
- [ ] Breakpoint mobile-first (`md:` menambah, bukan mengurangi)
- [ ] State `hover`/`focus-visible`/`disabled` ada di elemen interaktif
- [ ] `dark:` konsisten kalau proyek mendukung dark mode
- [ ] Arbitrary value punya alasan, bukan kebiasaan

## Contoh Sebelum / Sesudah

```html
<!-- Sebelum: markup berisik, logika di template -->
<div class="rounded-lg border p-4 ${active ? 'bg-blue-50 border-blue-300' : 'bg-white'}">
```

```html
<!-- Sesudah: logika di komponen, markup bersih -->
<StatCard :active="active" label="Pending" :value="3" />
```

Tujuannya bukan markup tanpa class, tapi markup yang **mudah dibaca sekali lihat**.

Referensi: <https://tailwindcss.com/docs/styling-with-utility-classes#managing-duplication>
