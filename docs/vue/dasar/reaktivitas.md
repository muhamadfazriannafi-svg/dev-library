# Reaktivitas

Reaktivitas adalah inti Vue: ketika data berubah, tampilan ikut berubah otomatis. Kamu cukup mendeklarasikan state, Vue yang mengurus DOM.

## `ref` — untuk Nilai Primitif

`ref` membungkus satu nilai (angka, string, boolean). Di `<script>` diakses lewat `.value`; di `<template>` otomatis di-*unwrap*.

```vue
<script setup>
import { ref } from 'vue'

const nama = ref('Fazri')
const hitungan = ref(0)

function tambah() {
  hitungan.value++        // di script pakai .value
}
</script>

<template>
  <p>{{ nama }}</p>          <!-- di template tanpa .value -->
  <button @click="tambah">Klik: {{ hitungan }}</button>
</template>
```

## `reactive` — untuk Objek

 `reactive` cocok untuk objek/array. Tidak perlu `.value`, tapi tidak bisa di-*reassign* seluruhnya.

```vue
<script setup>
import { reactive } from 'vue'

const user = reactive({
  nama: 'Fazri',
  umur: 20,
})

user.umur = 21     // reaktif
</script>

<template>
  <p>{{ user.nama }} - {{ user.umur }} tahun</p>
</template>
```

| | `ref` | `reactive` |
| --- | --- | --- |
| Untuk | nilai primitif & objek | objek/array |
| Akses di script | `.value` | langsung |
| Reassign penuh | bisa (`x.value = {}`) | tidak bisa |
| Bisa untuk primitif | ya | tidak |

::: tip
Untuk proyek baru, banyak yang memilih `ref` untuk hampir semuanya agar konsisten. `reactive` tetap berguna untuk state objek kompleks.
:::

## `computed` — Nilai Turunan

Nilai yang dihitung dari state lain. Otomatis diperbarui dan di-cache selama dependensinya tidak berubah.

```vue
<script setup>
import { ref, computed } from 'vue'

const harga = ref(10000)
const jumlah = ref(3)

const total = computed(() => harga.value * jumlah.value)
const formatRupiah = computed(() =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
    .format(total.value)
)
</script>

<template>
  <p>Total: {{ formatRupiah }}</p>
</template>
```

## `watch` — Reaksi Terhadap Perubahan

Menjalankan efek samping saat state berubah (mis. panggil API, simpan ke localStorage).

```vue
<script setup>
import { ref, watch } from 'vue'

const kata = ref('')

watch(kata, (baru, lama) => {
  console.log(`Berubah dari "${lama}" ke "${baru}"`)
})
</script>
```

`watchEffect` otomatis melacak dependensi:

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const kata = ref('')
watchEffect(() => {
  console.log('kata sekarang:', kata.value)   // dependensi dilacak otomatis
})
</script>
```

| | `computed` | `watch` |
| --- | --- | --- |
| Tujuan | hasil nilai turunan | efek samping |
| Mengembalikan nilai | ya | tidak |
| Kapan dipakai | menampilkan hasil | bereaksi pada perubahan |

::: warning
Jangan letakkan efek samping (fetch, ubah state lain) di dalam `computed`. `computed` seharusnya murni menghitung nilai.
:::

Referensi: <https://vuejs.org/guide/essentials/reactivity-fundamentals.html>
