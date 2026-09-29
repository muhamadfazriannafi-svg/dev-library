# Direktif

Direktif adalah atribut khusus berawalan `v-` yang memberi instruksi pada elemen. Selain `v-bind`, `v-on`, dan `v-model`, ada direktif untuk kondisi, perulangan, dan lainnya.

## `v-if` / `v-else-if` / `v-else` — Kondisi

Elemen benar-benar ditambah/dihapus dari DOM.

```vue
<script setup>
import { ref } from 'vue'
const nilai = ref(85)
const login = ref(false)
</script>

<template>
  <p v-if="nilai >= 90">Grade A</p>
  <p v-else-if="nilai >= 80">Grade B</p>
  <p v-else>Grade C</p>
</template>
```

Kelompokkan beberapa elemen dengan `<template>`:

```vue
<template>
  <template v-if="login">
    <h1>Selamat datang</h1>
    <p>Kamu sudah masuk.</p>
  </template>
  <p v-else>Silakan login.</p>
</template>
```

## `v-show` — Sembunyikan dengan CSS

Elemen tetap ada di DOM, hanya disembunyikan lewat `display: none`.

```vue
<template>
  <p v-show="login">Teks ini hanya disembunyikan</p>
</template>
```

| | `v-if` | `v-show` |
| --- | --- | --- |
| DOM | ditambah/dihapus | selalu ada |
| Biaya awal | besar bila jarang tampil | selalu dirender |
| Cocok untuk | kondisi jarang berubah | toggle sering |

## `v-for` — Perulangan

```vue
<script setup>
import { ref } from 'vue'
const buah = ref(['apel', 'jeruk', 'mangga'])
const users = ref([
  { id: 1, nama: 'Budi' },
  { id: 2, nama: 'Sari' },
])
</script>

<template>
  <ul>
    <li v-for="item in buah" :key="item">{{ item }}</li>
  </ul>

  <ul>
    <li v-for="(user, index) in users" :key="user.id">
      {{ index + 1 }}. {{ user.nama }}
    </li>
  </ul>

  <div v-for="(nilai, kunci) in { a: 1, b: 2 }" :key="kunci">
    {{ kunci }} = {{ nilai }}
  </div>
</template>
```

`v-for` juga bisa atas angka: `v-for="n in 5"` menghasilkan 1–5.

::: warning Selalu pakai `:key`
`key` membantu Vue melacak elemen. Gunakan ID unik dan stabil; hindari index array bila daftar bisa berubah urutan.
:::

## `v-for` + `v-if` Tidak Satu Elemen

`v-if` lebih tinggi prioritas daripada `v-for`, jadi keduanya tidak bisa dipakai di elemen yang sama dengan benar (di Vue 3 `v-if` tidak punya akses variabel loop). Pisahkan:

```vue
<template>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.aktif">{{ user.nama }}</li>
  </template>
</template>
```

Atau saring dulu dengan `computed`:

```vue
<script setup>
import { computed } from 'vue'
const userAktif = computed(() => users.value.filter(u => u.aktif))
</script>
```

Cara `computed` lebih bersih dan lebih cepat.

## Ringkasan

| Direktif | Kegunaan |
| --- | --- |
| `v-if` / `v-else-if` / `v-else` | render kondisional (DOM) |
| `v-show` | tampil/sembunyi lewat CSS |
| `v-for` | perulangan (wajib `:key`) |
| `v-bind` `:` | ikat atribut |
| `v-on` `@` | event |
| `v-model` | two-way binding |
| `v-html` | HTML mentah (hati-hati) |
| `v-once` | render sekali, tak reaktif lagi |

Referensi: <https://vuejs.org/guide/essentials/conditional.html>
