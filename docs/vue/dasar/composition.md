# Composition API

Composition API menyusun logika component dengan fungsi yang bisa dikelompokkan dan dipakai ulang. Ia melengkapi Options API, bukan menggantinya.

## `<script setup>`

Sintaks paling ringkas. Semua yang dideklarasikan otomatis tersedia di template.

```vue
<script setup>
import { ref, computed } from 'vue'

const daftar = ref([])
const total = computed(() => daftar.value.length)

function tambah(item) {
  daftar.value.push(item)
}
</script>

<template>
  <button @click="tambah('baru')">Tambah</button>
  <p>Total: {{ total }}</p>
</template>
```

Tidak perlu `return` — berbeda dengan `setup()` biasa.

## Options API vs Composition API

```vue
<!-- Options API -->
<script>
export default {
  data() {
    return { hitungan: 0 }
  },
  computed: {
    ganda() { return this.hitungan * 2 }
  },
  methods: {
    tambah() { this.hitungan++ }
  }
}
</script>
```

```vue
<!-- Composition API -->
<script setup>
import { ref, computed } from 'vue'
const hitungan = ref(0)
const ganda = computed(() => hitungan.value * 2)
function tambah() { hitungan.value++ }
</script>
```

| | Options API | Composition API |
| --- | --- | --- |
| Susunan | berdasarkan opsi (`data`, `methods`) | berdasarkan logika/fitur |
| Reuse | mixin | composable (fungsi biasa) |
| TypeScript | kurang optimal | sangat baik |
| Cocok untuk | component sederhana | component kompleks, proyek besar |

## Composable — Mengemas Logika Reusable

Composable adalah fungsi yang mengembalikan state & perilaku. Nama-nya diawali `use`.

```js
// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(awal = 0) {
  const hitungan = ref(awal)
  const ganda = computed(() => hitungan.value * 2)

  function tambah() { hitungan.value++ }
  function kurang() { hitungan.value-- }
  function reset() { hitungan.value = awal }

  return { hitungan, ganda, tambah, kurang, reset }
}
```

```vue
<script setup>
import { useCounter } from '@/composables/useCounter'

const { hitungan, ganda, tambah, reset } = useCounter(10)
</script>

<template>
  <p>{{ hitungan }} / {{ ganda }}</p>
  <button @click="tambah">Tambah</button>
  <button @click="reset">Reset</button>
</template>
```

Contoh composable praktis — memuat data:

```js
// composables/useFetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function muat() {
    loading.value = true
    error.value = null
    try {
      data.value = await (await fetch(url)).json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  muat()
  return { data, loading, error, muat }
}
```

## Utilitas Composition API

Selain `ref`, `reactive`, `computed`, `watch`, tersedia:

| Fungsi | Kegunaan |
| --- | --- |
| `onMounted` / `onUnmounted` | siklus hidup |
| `provide` / `inject` | berbagi data antar level component |
| `nextTick` | tunggu DOM ter-update |
| `toRefs` | ubah reactive jadi ref per-properti |
| `useTemplateRef` | akses elemen DOM |

```vue
<script setup>
import { provide, inject } from 'vue'

// di induk
provide('tema', 'gelap')

// di anak (level berapa pun)
const tema = inject('tema', 'terang')
</script>
```

::: tip
Mulai dengan `<script setup>` + `ref`/`computed`. Saat logika component mulai panjang, pindahkan ke composable bernama `useXxx`. Itulah inti kekuatan Composition API.
:::

Referensi: <https://vuejs.org/guide/reusability/composables.html>
