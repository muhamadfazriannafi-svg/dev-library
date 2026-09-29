# Kumpulan Dokumentasi Vue

Vue adalah framework JavaScript progresif untuk membangun antarmuka pengguna. Ia dipakai untuk membuat tampilan web yang reaktif: saat data berubah, tampilan ikut berubah otomatis.

```vue
<script setup>
import { ref } from 'vue'

const hitungan = ref(0)
</script>

<template>
  <button @click="hitungan++">Klik: {{ hitungan }}</button>
</template>
```

## Mengapa Vue

- **Progresif** — bisa dipakai sedikit (menempel di satu bagian HTML) atau penuh untuk SPA.
- **Reaktif** — data berubah, DOM ikut menyesuaikan tanpa manipulasi manual.
- **Single File Component** — HTML, JS, dan CSS satu file `.vue`.
- **Ekosistem lengkap** — Vue Router, Pinia, Vite, Nuxt.
- **Dokumentasi bagus** — <https://vuejs.org/>.

## Versi Terbaru

| Versi | Catatan |
| --- | --- |
| **3.5** | versi stabil saat ini (Composition API, `<script setup>`) |
| 3.4 | mendukung `defineModel` stabil |
| 3.3 | tipe generik di `<script setup>` |
| 2.x | EOL, tidak lagi dipelihara |

Referensi:
- Rilis: <https://github.com/vuejs/core/releases>
- Panduan: <https://vuejs.org/guide/introduction.html>

## Dua Gaya Penulisan

**Options API** — mengenal `data`, `methods`, `computed`:

```vue
<script>
export default {
  data() {
    return { hitungan: 0 }
  },
  methods: {
    tambah() { this.hitungan++ }
  }
}
</script>
```

**Composition API** (disarankan untuk proyek baru) — logika dibungkus fungsi, lebih mudah dipakai ulang:

```vue
<script setup>
import { ref, computed } from 'vue'

const hitungan = ref(0)
const ganda = computed(() => hitungan.value * 2)
</script>
```

## Ekosistem

| Perkakas | Fungsi | Tautan |
| --- | --- | --- |
| Vue Router | routing SPA | <https://router.vuejs.org/> |
| Pinia | manajemen state | <https://pinia.vuejs.org/> |
| Vite | build tool & dev server | <https://vite.dev/> |
| Nuxt | framework full-stack Vue | <https://nuxt.com/> |
| VueUse | kumpulan composable siap pakai | <https://vueuse.org/> |
| Vitest | pengujian unit | <https://vitest.dev/> |

## Instalasi Cepat

```bash
npm create vue@latest
cd nama-proyek
npm install
npm run dev
```

## Daftar Materi

- [Reaktivitas](/vue/dasar/reaktivitas) — `ref`, `reactive`, `computed`
- [Template & Binding](/vue/dasar/template) — `v-bind`, `v-model`, interpolasi
- [Direktif](/vue/dasar/direktif) — `v-if`, `v-for`, `v-show`
- [Component](/vue/dasar/component) — props, emit, slot
- [Composition API](/vue/dasar/composition) — `setup`, composable
- [Vue Router](/vue/router) — navigasi antar halaman
- [Pinia](/vue/pinia) — state management
