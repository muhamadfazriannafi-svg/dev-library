# Layout: Flexbox & Grid

## Flexbox

Prefix `flex-*` mengatur *container*, `grow` / `shrink` / `basis-*` mengatur *item*.

```html
<div class="flex items-center justify-between gap-4">
  <span>Kiri</span>
  <button class="shrink-0">Tombol</button>
</div>
```

| Class | CSS |
| --- | --- |
| `flex` | `display: flex` |
| `inline-flex` | `display: inline-flex` |
| `flex-row` / `flex-col` | arah |
| `flex-wrap` | boleh pindah baris |
| `items-start/center/end/stretch` | `align-items` |
| `justify-start/center/end/between/around/evenly` | `justify-content` |
| `gap-4` / `gap-x-4` / `gap-y-2` | jarak antar item |
| `grow` / `grow-0` | `flex-grow` |
| `basis-1/2` | `flex-basis` |

Pola umum:

```html
<!-- header: kiri kanan -->
<header class="flex items-center justify-between px-6 py-4">…</header>

<!-- sidebar + konten -->
<div class="flex min-h-screen">
  <aside class="w-64 shrink-0 border-r">Sidebar</aside>
  <main class="flex-1 p-8">Konten</main>
</div>

<!-- center sempurna -->
<div class="flex min-h-screen items-center justify-center">Tengah</div>
```

## Grid

```html
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <div class="rounded-lg border p-4">Kartu</div>
  <div class="rounded-lg border p-4">Kartu</div>
  <div class="rounded-lg border p-4">Kartu</div>
</div>
```

| Class | CSS |
| --- | --- |
| `grid-cols-{1..12}` | `grid-template-columns: repeat(n, minmax(0,1fr))` |
| `grid-rows-{1..6}` | baris |
| `col-span-2` | rentang kolom |
| `col-start-2` | mulai kolom ke-2 |
| `auto-rows-auto` / `auto-rows-fr` | tinggi baris |
| `place-items-center` | center isi sel |

Kolom otomatis tanpa breakpoint:

```html
<div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">…</div>
```

::: tip `minmax(0,1fr)` vs `1fr`
`1fr` = `minmax(auto,1fr)` → anak yang panjang (mis. tabel/kode) bisa memaksa kolom melebar. `grid-cols-*` Tailwind sudah pakai `minmax(0,1fr)`, aman.
:::

## Positioning

```html
<div class="relative">
  <img src="foto.jpg" class="w-full rounded-xl" />
  <span class="absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
    Baru
  </span>
</div>
```

Positioning offset: `inset-0` (memenuhi parent), `top-0`, `bottom-4`, `left-1/2 -translate-x-1/2` (center horizontal).

`sticky` header:

```html
<nav class="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">…</nav>
```

## Container & Lebar Konten

```html
<div class="mx-auto max-w-6xl px-4">…</div>
```

`mx-auto` = center horizontal, harus ada `max-w-*` agar terlihat.

## Aspek Rasio & Media

```html
<div class="aspect-video overflow-hidden rounded-lg">
  <img src="video.jpg" class="size-full object-cover" />
</div>
```

- `object-cover` — isi tanpa distorsi, sisi berlebih dipotong
- `object-contain` — seluruh gambar terlihat
- `aspect-square`, `aspect-video`, `aspect-[4/3]`

## Contoh: Layout Dashboard

```html
<div class="grid min-h-screen grid-cols-[240px_1fr]">
  <aside class="border-r bg-slate-900 p-4 text-slate-100">Menu</aside>
  <div class="flex flex-col">
    <header class="flex items-center justify-between border-b px-6 py-3">
      <h1 class="font-semibold">Dashboard</h1>
      <button class="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white">Logout</button>
    </header>
    <main class="grid flex-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-xl border p-4">Total: 120</div>
      <div class="rounded-xl border p-4">Hari ini: 8</div>
      <div class="rounded-xl border p-4">Pending: 3</div>
    </main>
  </div>
</div>
```

Referensi: <https://tailwindcss.com/docs/flex> · <https://tailwindcss.com/docs/grid-template-columns>
