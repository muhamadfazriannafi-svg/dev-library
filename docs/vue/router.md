# Vue Router

Vue Router adalah router resmi untuk membuat aplikasi *single page* (SPA) dengan banyak halaman tanpa reload.

## Instalasi & Setup

```bash
npm install vue-router@4
```

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Users from '@/views/Users.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/users', name: 'users', component: Users },
  { path: '/users/:id', name: 'user-detail', component: () => import('@/views/UserDetail.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

## Menampilkan Halaman

`<RouterView>` adalah tempat halaman aktif dirender; `<RouterLink>` untuk navigasi tanpa reload.

```vue
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/users">Users</RouterLink>
    <RouterLink :to="{ name: 'user-detail', params: { id: 1 } }">User 1</RouterLink>
  </nav>

  <RouterView />
</template>
```

## Membaca Parameter & Query

**Composition API:**

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

console.log(route.params.id)      // dari /users/:id
console.log(route.query.cari)     // dari ?cari=fazri

function pindah() {
  router.push({ name: 'users' })
  // router.replace(...) -> tanpa tambah history
  // router.back() -> kembali
}
</script>
```

**Options API:** `this.$route` dan `this.$router`.

## Route Dinamis & Lazy Load

```js
const routes = [
  // lazy load: component dimuat saat route diakses
  { path: '/laporan', component: () => import('@/views/Laporan.vue') },

  // parameter opsional
  { path: '/cari/:kata?', component: () => import('@/views/Cari.vue') },

  // catch-all 404 (letakkan paling akhir)
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') },
]
```

## Route Bersarang

```js
const routes = [
  {
    path: '/admin',
    component: () => import('@/views/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('@/views/AdminDashboard.vue') },
      { path: 'users', component: () => import('@/views/AdminUsers.vue') },
    ],
  },
]
```

Anak dirender di `<RouterView>` milik `AdminLayout`.

## Navigation Guard (Proteksi)

```js
router.beforeEach((to, from) => {
  const sudahLogin = Boolean(localStorage.getItem('token'))

  if (to.meta.perluLogin && !sudahLogin) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  // return false untuk membatalkan navigasi
})
```

```js
{ path: '/dashboard', component: Dashboard, meta: { perluLogin: true } }
```

Guard global: `beforeEach`, `afterEach`. Per-route: `beforeEnter`. Per-component: `beforeRouteEnter`.

## Tips

- Pakai `name` pada route agar pengalihan tidak bergantung pada string path.
- Untuk SPA di server biasa, set *fallback* ke `index.html` (history mode).
- Lazy load route berat dengan `() => import(...)` agar bundle awal kecil.

Referensi: <https://router.vuejs.org/>
