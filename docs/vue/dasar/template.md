# Template & Binding

Template Vue adalah HTML yang diperkaya sintaks khusus untuk menampilkan data dan bereaksi pada event.

## Interpolasi Teks

```vue
<template>
  <p>{{ pesan }}</p>
  <p>{{ 1 + 2 }}</p>
  <p>{{ nama.toUpperCase() }}</p>
</template>
```

Isi `{{ }}` adalah ekspresi JavaScript. Vue otomatis meng-*escape* HTML sehingga aman dari XSS.

## `v-bind` — Mengikat Atribut

```vue
<script setup>
import { ref } from 'vue'
const gambar = ref('/logo.png')
const aktif = ref(true)
</script>

<template>
  <img v-bind:src="gambar" alt="Logo">
  <img :src="gambar" alt="Logo">                 <!-- singkatan -->

  <button :disabled="!aktif">Simpan</button>
  <div :class="{ aktif: aktif }"></div>
  <div :style="{ color: aktif ? 'green' : 'red' }"></div>
</template>
```

`:` adalah singkatan dari `v-bind:`. Untuk class & style bisa berupa string, array, atau objek.

```vue
<template>
  <div :class="['kotak', { besar: aktif }]"></div>
  <div :style="[{ color: 'red' }, { fontWeight: 'bold' }]"></div>
</template>
```

## `v-model` — Two-Way Binding

Menghubungkan input dengan state: ketik di input, state berubah; state berubah, input ikut.

```vue
<script setup>
import { ref } from 'vue'
const nama = ref('')
const setuju = ref(false)
const pilihan = ref('A')
</script>

<template>
  <input v-model="nama">
  <p>Halo, {{ nama }}</p>

  <input type="checkbox" v-model="setuju">
  <select v-model="pilihan">
    <option>A</option>
    <option>B</option>
  </select>
</template>
```

Modifier:

```vue
<template>
  <input v-model.trim="nama">        <!-- hapus spasi tepi -->
  <input v-model.number="umur">      <!-- cast ke angka -->
  <input v-model.lazy="nama">        <!-- update saat blur, bukan tiap ketik -->
</template>
```

## `v-on` — Event

```vue
<script setup>
import { ref } from 'vue'
const hitungan = ref(0)

function tambah() { hitungan.value++ }
</script>

<template>
  <button v-on:click="tambah">Tambah</button>
  <button @click="tambah">Tambah</button>              <!-- singkatan -->
  <button @click="hitungan++">Langsung</button>
  <button @click="tambah()">Panggil fungsi</button>
  <input @keyup.enter="simpan">
</template>
```

Modifier event:

| Modifier | Arti |
| --- | --- |
| `@click.stop` | hentikan propagasi |
| `@submit.prevent` | cegah perilaku default |
| `@keyup.enter` | hanya tombol Enter |
| `@click.once` | hanya sekali |

## Menampilkan HTML Mentah

```vue
<template>
  <div v-html="kontenHtml"></div>
</template>
```

::: danger
`v-html` tidak meng-escape HTML — rentan XSS bila konten berasal dari user. Gunakan hanya untuk HTML tepercaya.
:::

## Ringkasan Direktif Binding

| Sintaks | Fungsi |
| --- | --- |
| `{{ }}` | menampilkan teks |
| `:attr` / `v-bind` | mengikat atribut |
| `@event` / `v-on` | menangani event |
| `v-model` | two-way binding input |

Referensi: <https://vuejs.org/guide/essentials/template-syntax.html>
