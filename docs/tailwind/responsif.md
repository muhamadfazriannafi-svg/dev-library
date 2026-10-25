# Responsif & State

## Breakpoint

Mobile-first: style tanpa prefix berlaku untuk semua layar, prefix menambah kondisi **min-width**.

| Prefix | Min-width |
| --- | --- |
| `sm:` | 40rem (640px) |
| `md:` | 48rem (768px) |
| `lg:` | 64rem (1024px) |
| `xl:` | 80rem (1280px) |
| `2xl:` | 96rem (1536px) |

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">…</div>
```

Artinya: 1 kolom di HP, 2 kolom ≥768px, 3 kolom ≥1024px.

```html
<p class="text-sm md:text-base lg:text-lg">Teks membesar seiring layar.</p>
<nav class="hidden md:flex gap-6">menu desktop</nav>
<button class="md:hidden">☰</button>
```

Khusus < breakpoint (max-width), pakai varian arbitrary:

```html
<div class="max-md:hidden">hanya desktop</div>
```

## State Pseudo-class

```html
<button class="rounded-md bg-blue-600 px-4 py-2 text-white
               hover:bg-blue-700
               focus-visible:ring-2 focus-visible:ring-blue-300
               active:bg-blue-800
               disabled:cursor-not-allowed disabled:opacity-50">
  Simpan
</button>

<a class="text-blue-600 hover:underline visited:text-purple-600">tautan</a>

<div class="group rounded-lg p-4 hover:bg-slate-50">
  <h3 class="group-hover:text-blue-600">Judul berubah saat parent dihover</h3>
</div>

<input class="peer border p-2" />
<p class="hidden peer-invalid:block text-red-600">Input tidak valid</p>
```

Sering dipakai: `hover` `focus` `focus-visible` `active` `visited` `disabled` `checked` `first` `last` `odd` `even` `group-hover` `peer-*`.

`first:` / `last:` — hapus border di item terakhir:

```html
<li class="border-b last:border-b-0">Item</li>
```

## Dark Mode

Default v4: berdasarkan `prefers-color-scheme`.

```html
<div class="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
  Otomatis ikut OS
</div>
```

Toggle manual via class `.dark` pada `<html>`:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

```js
document.documentElement.classList.toggle('dark')
```

## Data Attribute & ARIA

```html
<li data-active="true" class="data-[active=true]:font-semibold">aktif</li>
<div aria-expanded="false" class="aria-expanded:text-gray-400">…</div>
```

## Varian Arbitrary

```html
<div class="min-[900px]:grid-cols-4">breakpoint custom</div>
<div class="[@supports(display:grid)]:grid">query fitur CSS</div>
```

## Menggabungkan Varian

```html
<div class="md:dark:bg-slate-800 lg:hover:underline">…</div>
```

Urutan bebas, tapi konvensi: breakpoint → state → tema.

## Contoh: Card Responsif

```html
<article class="flex flex-col gap-4 rounded-xl border p-4 transition-shadow
                hover:shadow-lg md:flex-row md:items-center md:gap-6
                dark:border-slate-700 dark:bg-slate-800">
  <img src="thumb.jpg" class="aspect-video w-full rounded-lg object-cover md:w-48" />
  <div class="flex-1">
    <h2 class="text-lg font-semibold md:text-xl">Judul</h2>
    <p class="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">Deskripsi…</p>
  </div>
  <button class="shrink-0 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
    Buka
  </button>
</article>
```

Referensi: <https://tailwindcss.com/docs/responsive-design> · <https://tailwindcss.com/docs/hover-focus-and-other-states>
