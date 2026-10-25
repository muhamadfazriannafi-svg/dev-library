# Scene, Renderer, Kamera

Tiga benda pertama yang selalu dibuat. Urutannya: renderer → scene → kamera.

## Renderer

`WebGLRenderer` adalah jembatan ke GPU.

```js
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.05
document.body.appendChild(renderer.domElement)
```

Persis potongan dari SIMRS 3D. Perhatikan tiap baris:

| Baris | Fungsi |
| --- | --- |
| `antialias: true` | tepi objek halus. Matikan kalau GPU lemah |
| `setPixelRatio(Math.min(devicePixelRatio, 2))` | layar retina jadi tajam, tapi dibatasi 2× — 4× di HP = 4× piksel = 4× beban |
| `shadowMap.enabled` | bayangan butuh ini |
| `PCFSoftShadowMap` | bayangan bertepi lembut (`PCFShadowMap` lebih murah, `VSMShadowMap` lebih halus tapi bocor) |
| `ACESFilmicToneMapping` | peta warna sinematik; warna terang tidak langsung "pecah" putih |
| `toneMappingExposure` | analog "ISO"; 1.0 netral |
| `domElement` | elemen `<canvas>` yang bisa di-`append` ke mana saja |

::: tip
`setSize` **wajib** dipanggil ulang saat window resize, dan kamera juga harus diperbarui (lihat bawah).
:::

### `renderer.outputColorSpace`

Sejak r152, warna default sudah `SRGBColorSpace`. Tidak perlu diubah — kecuali kamu mengatur warna secara manual pada tekstur (lihat [Tekstur](/threejs/tekstur-label)).

## Scene

Wadah seluruh objek.

```js
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0d1117)          // warna solid
scene.fog = new THREE.Fog(0x0d1117, 45, 105)          // kabut
```

**Fog** menyamarkan batas pandang dan menyembunyikan objek yang muncul tiba-tiba di kejauhan. Parameternya `near` (jarak mulai berkabut) dan `far` (jarak objek hilang jadi warna fog). Warna fog dan background **harus sama** supaya tidak ada "garis horizon" palsu.

SIMRS 3D menyesuaikan jarak kabut saat bangunan dibangun ulang, karena kedalaman bangunan berubah:

```js
scene.fog.far = Math.max(105, spanZ * 2.1 + 120)
scene.fog.near = scene.fog.far * 0.5
```

### Environment

Untuk material ber-logam atau berkilau (PBR) tanpa lampu satu-satu:

```js
const pmrem = new THREE.PMREMGenerator(renderer)
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.05).texture
scene.environmentIntensity = 0.45
```

`RoomEnvironment` adalah ruangan studio virtual bawaan Three.js — menghasilkan pantulan lembut di seluruh objek. Murah dan realistis. Ini yang membuat lantai dan logam di SIMRS 3D tidak tampak datar.

## Kamera

### Perspective (paling umum)

```js
const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.1, 400)
camera.position.set(0, 30, 40)
camera.lookAt(0, 1, 4)
```

| Parameter | Nama | Pengaruh |
| --- | --- | --- |
| `46` | `fov` (derajat, vertikal) | kecil = tele/zoom, besar = lebar/distorsi |
| `innerWidth / innerHeight` | `aspect` | harus sama rasio canvas |
| `0.1` | `near` | lebih dekat dari ini → terpotong |
| `400` | `far` | lebih jauh dari ini → tidak tampil |

`fov` 40–50 untuk interior, 60–75 untuk dunia luar, 90+ untuk efek fisheye.

::: warning
Selalu **perbarui `aspect` saat resize** dan panggil `updateProjectionMatrix()`. Tanpa itu, layar melebar dan gambar gepeng.
:::

### Orthographic (tanpa perspektif)

Untuk tampilan isometric, gaya teknis/CAD, atau UI 3D.

```js
const d = 12
const camera = new THREE.OrthographicCamera(-d, d, d, -d, 0.1, 200)
camera.position.set(20, 20, 20)
camera.lookAt(0, 0, 0)
```

Objek jauh dan dekat tampak sama besar. Di SIMRS 3D yang dipakai tetap perspektif — tapi dengan sudut kamera tinggi supaya terasa seperti isometric.

### Posisi Kamera yang Enak

Bukan sekali set lalu beres. Di SIMRS 3D, kamera dihitung ulang setelah scene dibangun agar seluruh bangunan masuk frame:

```js
const dist = Math.max(60, Math.max(spanX, spanZ) * 1.02)
controls.target.set(0, 1, midZ)
camera.position.set(dist * 0.24, dist * 0.56, midZ + dist * 0.86)
```

Pola umum: `target` di tengah objek, kamera di `(0.24, 0.56, 0.86) × jarak` → sudut pandang sekitar 30° dari atas. Cocok untuk bangunan.

## Resize Handler

Wajib. Tanpa ini, tampilan gepeng saat window diubah ukurannya.

```js
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})
```

Kalau memakai composer (post-processing), tambah `composer.setSize(...)` — lihat [Post-processing](/threejs/post-processing).

## Handle untuk Debug

Simpan ke `window` saat development supaya bisa diutak-atik dari console browser:

```js
Object.assign(window, { THREE, scene, camera, renderer })
```

Lalu di console: `scene.children.length`, `camera.position.y = 50`.

## Full Code

```js
import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0d1117)
scene.fog = new THREE.Fog(0x0d1117, 45, 105)

const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.1, 400)
camera.position.set(0, 30, 40)
camera.lookAt(0, 1, 4)

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})
```
