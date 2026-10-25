# Kustomisasi & Komponen

Di v4 semua konfigurasi lewat CSS. `tailwind.config.js` opsional.

## `@theme` — Definisi Design Token

Nilai di `@theme` otomatis jadi utility class.

```css
@import "tailwindcss";

@theme {
  /* warna brand → bg-brand, text-brand-500, border-brand-700 */
  --color-brand-50: #eff6ff;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-700: #1d4ed8;

  /* font custom → font-display */
  --font-display: "Satoshi", sans-serif;

  /* spacing custom → p-13, gap-13 */
  --spacing: 0.25rem;
  --spacing-13: 3.25rem;

  /* radius → rounded-card */
  --radius-card: 1.25rem;

  /* breakpoint baru → xxl:... */
  --breakpoint-xxl: 120rem;
}
```

```html
<div class="rounded-card bg-brand-500 font-display p-13">…</div>
```

Namespace yang dikenal: `--color-*`, `--font-*`, `--text-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--breakpoint-*`, `--container-*`, `--animate-*`, `--ease-*`, `--blur-*`, `--tracking-*`, `--leading-*`, `--z-index-*`.

Pakai nilai di CSS biasa lewat `var()`:

```css
.hero {
  background: var(--color-brand-600);
}
```

## `@theme` vs `:root`

| | `@theme` | `:root` |
| --- | --- | --- |
| Buat utility class | ✅ | ❌ |
| Ikut tree-shake | ✅ | ❌ |
| Untuk nilai runtime (JS) | ❌ | ✅ |

Token yang perlu diubah JS (mis. warna tema user) taruh di `:root`.

## Override Palet Bawaan

```css
@theme {
  --color-*: initial;          /* hapus semua warna bawaan */
  --color-white: #fff;
  --color-black: #000;
  --color-ink: #111827;
}
```

Hati-hati: menghapus semua warna berarti class seperti `bg-red-500` hilang total.

## `@apply` — Pakai Utility di CSS

```css
@layer components {
  .btn {
    @apply inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors;
  }

  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }

  .card {
    @apply rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800;
  }
}
```

```html
<button class="btn btn-primary">Simpan</button>
<div class="card">…</div>
```

::: tip Kapan pakai `@apply`
Untuk class yang benar-benar berulang di banyak tempat dengan makna sama (`.btn`, `.input`, `.card`). Untuk satu-dua pemakaian, lebih baik utility langsung di markup. `@apply` berlebihan = kembali ke CSS kustom lama.
:::

## `@utility` — Utility Custom

```css
@utility content-auto {
  content-visibility: auto;
}

@utility scrollbar-hide {
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}
```

Bisa dipakai dengan varian (`hover:content-auto`, `md:scrollbar-hide`). Gunakan `@utility`, **bukan** `@layer utilities` + class biasa, agar varian bekerja.

## Custom Variant

```css
/* dark mode berbasis class */
@custom-variant dark (&:where(.dark, .dark *));

/* tampil hanya saat dicetak */
@custom-variant print (@media print);
```

## Plugin (v4)

```bash
npm install @tailwindcss/typography @tailwindcss/forms
```

```css
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";
```

```html
<article class="prose prose-slate lg:prose-lg">…</article>
```

Plugin populer: `@tailwindcss/forms`, `@tailwindcss/typography`, `@tailwindcss/aspect-ratio`, `@tailwindcss/container-queries`.

## Container Query

```html
<div class="@container">
  <div class="flex flex-col @md:flex-row">…</div>
</div>
```

Responsif terhadap lebar **parent**, bukan viewport. Cocok untuk komponen reusable (card di sidebar vs di main).

## Animasi Custom

```css
@theme {
  --animate-wiggle: wiggle 1s ease-in-out infinite;

  @keyframes wiggle {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
}
```

```html
<div class="animate-wiggle">…</div>
```

Referensi: <https://tailwindcss.com/docs/theme> · <https://tailwindcss.com/docs/functions-and-directives>
