# Component

Component adalah blok UI yang bisa dipakai ulang. Di Vue, satu component umumnya ditulis sebagai file `.vue` (Single File Component) berisi `<script>`, `<template>`, dan `<style>`.

## Membuat & Memakai Component

```vue
<!-- components/TombolCounter.vue -->
<script setup>
import { ref } from 'vue'
const hitungan = ref(0)
</script>

<template>
  <button @click="hitungan++">Klik: {{ hitungan }}</button>
</template>
```

```vue
<!-- App.vue -->
<script setup>
import TombolCounter from './components/TombolCounter.vue'
</script>

<template>
  <TombolCounter />
  <TombolCounter />
</template>
```

Setiap instance punya state sendiri.

## Props — Data dari Induk

```vue
<!-- components/KartuUser.vue -->
<script setup>
defineProps({
  nama: { type: String, required: true },
  umur: { type: Number, default: 0 },
  aktif: { type: Boolean, default: false },
})
</script>

<template>
  <div class="kartu">
    <h3>{{ nama }}</h3>
    <p>{{ umur }} tahun</p>
    <span v-if="aktif">Aktif</span>
  </div>
</template>
```

```vue
<template>
  <KartuUser nama="Fazri" :umur="20" :aktif="true" />
</template>
```

Props bersifat **read-only** — anak tidak boleh mengubahnya langsung.

## Emit — Event dari Anak ke Induk

```vue
<!-- components/TombolHapus.vue -->
<script setup>
const emit = defineEmits(['hapus'])

function konfirmasi() {
  emit('hapus', 5)          // kirim data ke induk
}
</script>

<template>
  <button @click="konfirmasi">Hapus</button>
</template>
```

```vue
<script setup>
function tanganiHapus(id) {
  console.log('Hapus id:', id)
}
</script>

<template>
  <TombolHapus @hapus="tanganiHapus" />
</template>
```

## Slot — Konten dari Induk

```vue
<!-- components/Panel.vue -->
<template>
  <div class="panel">
    <header>
      <slot name="judul">Judul default</slot>
    </header>
    <main>
      <slot>Konten default</slot>
    </main>
  </div>
</template>
```

```vue
<template>
  <Panel>
    <template #judul>Daftar User</template>
    <p>Isi konten di sini.</p>
  </Panel>
</template>
```

## `v-model` pada Component

```vue
<!-- components/InputNama.vue -->
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model">
</template>
```

```vue
<script setup>
import { ref } from 'vue'
const nama = ref('')
</script>

<template>
  <InputNama v-model="nama" />
  <p>{{ nama }}</p>
</template>
```

`defineModel()` (Vue 3.4+) menyederhanakan pembuatan component two-way binding.

## Siklus Hidup

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('component sudah tampil')     // cocok memanggil API
})

onUnmounted(() => {
  console.log('component dihapus')           // bersihkan timer/listener
})
</script>
```

Referensi: <https://vuejs.org/guide/essentials/component-basics.html>
