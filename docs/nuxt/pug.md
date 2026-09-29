# Pug di Nuxt

Pug (dulu Jade) adalah *template engine* yang menulis HTML dengan indentasi, tanpa tag penutup. Di Nuxt, Pug dipakai untuk menulis `<template>` agar lebih ringkas.

Pug bukan bahasa baru atau framework — ia hanya cara lain menulis HTML.

## Kenapa Pug

- **Ringkas** — indentasi menggantikan tag penutup.
- **Sedikit pengulangan** — tidak perlu menulis `</div>` berulang.
- **Mudah dibaca** — struktur bersarang terlihat jelas dari indentasi.

## Instalasi di Nuxt

```bash
npm install -D pug
```

Cukup `pug` saja (tidak perlu `pug-plain-loader` seperti di Vue CLI lama). Nuxt/Vite mendeteksi `lang="pug"` otomatis.

## Memakai Pug di Component

Tambahkan `lang="pug"` pada `<template>`:

```vue
<template lang="pug">
div.kartu
  h2 {{ judul }}
  p Ini ditulis dengan Pug.
</template>

<script setup>
const judul = 'Halo Pug'
</script>
```

Hasil HTML-nya sama dengan:

```vue
<template>
  <div class="kartu">
    <h2>{{ judul }}</h2>
    <p>Ini ditulis dengan Pug.</p>
  </div>
</template>
```

## Sintaks Dasar

```pug
//- komentar (tidak muncul di HTML)

//- tag dengan class & id
div.container
  h1#judul Halo
  p.teks.besar Ini paragraf

//- urutan: tag + class + id + atribut
a(href="/tentang" title="Tentang") Tentang

//- atribut dinamis (Vue binding tetap jalan)
button(:disabled="!aktif" @click="simpan") Simpan
img(:src="gambar" alt="Logo")
```

| Pug | HTML |
| --- | --- |
| `div.kotak` | `<div class="kotak">` |
| `div#utama` | `<div id="utama">` |
| `a(href="#") Teks` | `<a href="#">Teks</a>` |
| `p Teks` | `<p>Teks</p>` |

## Interpolasi & Teks

```pug
p Halo, {{ nama }}!
p= nama
```

`{{ }}` tetap sintaks Vue dan cara yang disarankan untuk menampilkan data. Jangan tertukar dengan interpolasi Pug (`#{}`) yang dievaluasi saat compile.

## Kondisi & Perulangan (Vue)

Direktif Vue tetap dipakai, ditulis dengan indentasi Pug:

```pug
div
  p(v-if="sudahLogin") Selamat datang!
  p(v-else) Silakan login.

ul
  li(v-for="item in daftar" :key="item.id") {{ item.nama }}

button(v-show="aktif") Aktif
```

## Nesting & Blok Teks

```pug
div.artikel
  h2 Judul Artikel
  p
    | Ini teks panjang yang ditulis
    | di beberapa baris lalu digabung.
  p.
    Blok teks bebas.
    Bisa banyak baris.
```

## Menyisipkan HTML Mentah

```pug
div
  != kontenHtml
```

::: danger
Sama seperti `v-html`, `!=` menyisipkan HTML mentah tanpa escape — rentan XSS bila isinya dari user. Gunakan `{{ }}` untuk data teks.
:::

## Contoh Component Lengkap

```vue
<template lang="pug">
section.profil
  header
    h1 {{ user.nama }}
    span.badge(v-if="user.aktif") Aktif

  ul.kontak
    li Email: {{ user.email }}
    li(v-for="tel in user.telepon" :key="tel") Tel: {{ tel }}

  button(@click="kirim") Kirim Pesan
</template>

<script setup>
const props = defineProps({ user: Object })
const emit = defineEmits(['kirim'])
const kirim = () => emit('kirim', props.user)
</script>

<style scoped>
.profil { padding: 1rem; }
</style>
```

## Pug vs HTML Biasa

| Aspek | Pug | HTML |
| --- | --- | --- |
| Panjang | lebih ringkas | lebih panjang |
| Tag penutup | tidak ada | wajib |
| Belajar | perlu menyesuaikan | standar, familiar |
| Tooling | butuh `pug` | langsung |
| Deteksi error | indentasi salah bisa bikin bug | lebih toleran |

::: tip
Karena keunggulan utamanya adalah kerapian, Pug paling terasa manfaatnya pada template besar dengan struktur bersarang dalam. Untuk component kecil, HTML biasa sering lebih praktis.
:::

::: warning
Indentasi Pug harus konsisten (jangan campur spasi dan tab). Ini penyebab error paling umum saat pertama memakai Pug.
:::

Referensi:

- Pug: <https://pugjs.org/language/attributes.html>
- Nuxt: <https://nuxt.com/docs>
