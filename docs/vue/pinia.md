# Pinia

Pinia adalah pustaka manajemen state resmi Vue. Ia menyimpan data yang dipakai bersama antar component dalam satu *store* terpusat.

## Kapan Perlu State Management

- Data dipakai di banyak component yang berjauhan.
- Perlu satu sumber kebenaran (mis. data user yang login, isi keranjang).
- Prop drilling (mengoper props berlapis-lapis) mulai menyiksa.

Untuk state lokal satu component, cukup `ref`. Pinia untuk state yang dibagi.

## Instalasi

```bash
npm install pinia
```

```js
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')
```

## Mendefinisikan Store

Gaya **setup** (mirip Composition API):

```js
// stores/user.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || '')

  const sudahLogin = computed(() => Boolean(token.value))

  async function login(email, password) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    user.value = data.user
    token.value = data.token
    localStorage.setItem('token', token.value)
  }

  function logout() {
    user.value = null
    token.value = ''
    localStorage.removeItem('token')
  }

  return { user, token, sudahLogin, login, logout }
})
```

## Memakai Store di Component

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { user, sudahLogin } = storeToRefs(userStore)
</script>

<template>
  <p v-if="sudahLogin">Halo, {{ user?.nama }}</p>
  <button @click="userStore.logout()">Keluar</button>
</template>
```

::: tip
Pakai `storeToRefs()` untuk mengambil state/computed agar tetap reaktif. Method boleh diakses langsung (`userStore.logout`) karena tidak perlu dibungkus ref.
:::

## State, Getter, Action (Gaya Options)

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    hitungan: 0,
  }),
  getters: {
    ganda: (state) => state.hitungan * 2,
  },
  actions: {
    tambah() {
      this.hitungan++
    },
  },
})
```

| Konsep | Peran |
| --- | --- |
| **state** | data |
| **getter** | nilai turunan (seperti `computed`) |
| **action** | method yang mengubah state (boleh async) |

## Mengubah State

```js
const store = useCounterStore()

store.hitungan++                        // langsung
store.$patch({ hitungan: 10 })          // beberapa sekaligus
store.$reset()                          // kembali ke nilai awal (options store)
```

## Menghubungkan dengan API

Action adalah tempat yang tepat untuk memanggil API dan menyimpan hasilnya:

```js
async function muatUsers() {
  const res = await fetch('/api/users')
  users.value = await res.json()
}
```

## Praktik Terbaik

- Pisahkan store per domain: `stores/user.js`, `stores/cart.js`.
- Simpan hanya data yang benar-benar dibagi; sisanya state lokal.
- Jangan panggil API langsung di tengah template — taruh di action.
- Simpan token di `localStorage` hanya bila perlu; pertimbangkan cookie httpOnly untuk keamanan.

::: warning
Pinia tidak menyimpan data saat halaman di-*refresh*. Untuk persistensi, simpan manual ke `localStorage` atau pakai plugin seperti `pinia-plugin-persistedstate`.
:::

Referensi: <https://pinia.vuejs.org/>
