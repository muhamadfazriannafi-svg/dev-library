# Utility Dasar

Setiap class Tailwind = satu properti CSS. Nama class mengikuti pola `{properti}-{nilai}`.

## Spacing (pada `p-` / `m-` / `gap-` / `space-`)

Skala 0–96, 1 unit = `0.25rem` = `4px`.

| Class | CSS |
| --- | --- |
| `p-0` | `padding: 0` |
| `p-1` | `padding: 0.25rem` |
| `p-4` | `padding: 1rem` |
| `p-8` | `padding: 2rem` |

Varian arah:

```html
<div class="px-4 py-2">      <!-- kiri-kanan / atas-bawah -->
  atas-bawah & kiri-kanan
</div>
<div class="pt-2 pr-4 pb-6 pl-8">satu sisi</div>
<div class="p-4 space-y-2">  <!-- jarak antar anak -->
  <p>Paragraf 1</p>
  <p>Paragraf 2</p>
</div>
```

Nilai bebas (arbitrary value) pakai kurung siku:

```html
<div class="p-[13px] mt-[7rem]">spesifik</div>
```

## Warna

Format `{properti}-{warna}-{shade}`. Shade: 50 (terang) → 950 (gelap).

```html
<p class="text-gray-700">teks</p>
<div class="bg-blue-500 border border-blue-700">kotak</div>
<svg class="fill-current text-red-500"></svg>
```

Atribut tambahan: `bg-blue-500/50` (opasitas 50%), `text-black/70`.

Palet bawaan: `slate gray zinc neutral stone red orange amber yellow lime green emerald teal cyan sky blue indigo violet purple fuchsia pink rose`.

Color palette lengkap: <https://tailwindcss.com/docs/colors>

## Tipografi

```html
<h1 class="text-4xl font-bold tracking-tight">Judul</h1>
<p class="text-sm text-gray-600 leading-relaxed">Teks kecil, tinggi baris longgar.</p>
<span class="text-xs uppercase tracking-widest">LABEL</span>
<p class="truncate">Teks yang sangat panjang akan dipotong dengan elipsis...</p>
```

| Class | Efek |
| --- | --- |
| `text-xs` … `text-9xl` | ukuran font |
| `font-thin` … `font-black` | ketebalan |
| `italic` / `not-italic` | miring |
| `uppercase` / `lowercase` / `capitalize` | transformasi |
| `text-left` / `center` / `right` / `justify` | perataan |
| `leading-none` … `leading-loose` | line-height |
| `tracking-tighter` … `tracking-widest` | letter-spacing |
| `line-clamp-2` | potong setelah 2 baris |

Font family: `font-sans` (default), `font-serif`, `font-mono`.

## Ukuran & Batas

```html
<div class="w-full max-w-md h-40">…</div>
<div class="w-1/2 h-screen">…</div>
<img class="size-12 rounded-full object-cover" />
```

| Class | Efek |
| --- | --- |
| `w-64` / `h-64` | lebar / tinggi tetap |
| `w-full` / `w-screen` | 100% parent / lebar viewport |
| `size-10` | width + height sekaligus |
| `max-w-prose` | lebar maksimal nyaman baca |
| `min-h-screen` | minimal setinggi layar |

## Border & Radius

```html
<div class="border border-gray-200 rounded-lg">…</div>
<div class="border-2 border-dashed border-red-500 rounded-full">…</div>
```

`rounded-none` → `rounded-sm` → `rounded` → `rounded-md` → `rounded-lg` → `rounded-xl` → `rounded-2xl` → `rounded-3xl` → `rounded-full`.

## Bayangan, Opasitas, Efek

```html
<div class="shadow-md">…</div>
<div class="shadow-lg hover:shadow-xl transition-shadow">…</div>
<p class="opacity-50">pudar</p>
<div class="backdrop-blur-sm bg-white/30">kaca</div>
```

## Display & Visibilitas

```html
<div class="hidden">tak tampil, tak makan ruang</div>
<div class="invisible">tak tampil, tetap makan ruang</div>
<div class="block">block</div>
<span class="inline-flex items-center">inline</span>
```

## Ringkasan Properti Sering Dipakai

| Properti CSS | Class Tailwind |
| --- | --- |
| `display` | `block` `inline` `flex` `grid` `hidden` |
| `position` | `static` `relative` `absolute` `fixed` `sticky` |
| `overflow` | `overflow-hidden` `overflow-auto` `overflow-y-scroll` |
| `z-index` | `z-0` `z-10` `z-50` |
| `cursor` | `cursor-pointer` `cursor-not-allowed` |
| `transition` | `transition` `transition-all` `duration-300` |

## Urutan Class Tidak Penting…

```html
<div class="p-4 bg-blue-500">sama</div>
<div class="bg-blue-500 p-4">sama</div>
```

…tapi **urutan di CSS hasil build** yang menentukan pemenang saat konflik. `p-4 p-8` → yang menang bergantung urutan generated CSS, bukan urutan tulis. Hindari dua class yang mengatur properti sama; itu bug menunggu.

Referensi: <https://tailwindcss.com/docs/styling-with-utility-classes>
