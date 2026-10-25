# Post-processing

Post-processing = lapisan efek yang dipasang **setelah** scene dirender: bloom, blur, vignette, anti-alias lebih baik. Dipakai di SIMRS 3D untuk membuat lampu dan layar monitor tampak bercahaya.

## Cara Kerja

```text
scene → RenderPass → UnrealBloomPass → OutputPass → layar
        (render ke     (tekstur     (konversi
         tekstur)       diberi efek)  warna)
```

Alih-alih menggambar langsung ke canvas, renderer menggambar ke **render target** (tekstur GPU). Setiap pass memproses tekstur itu berantai.

## Setup SIMRS 3D

```js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.42, 0.7, 0.82))
composer.addPass(new OutputPass())
```

Lalu di loop: **ganti** `renderer.render(...)` dengan `composer.render()`.

```js
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.08)
  tick(dt)
  controls.update()
  composer.render()
})
```

## `OutputPass` — Jangan Dilewatkan

Pass terakhir ini melakukan dua hal yang sering dilupakan:

1. **Tone mapping** (ACES filmic) diterapkan
2. **Konversi ke sRGB**

Tanpa `OutputPass`, hasil render akan **terlalu gelap atau terlalu pucat**, karena `renderer.toneMapping` dan `outputColorSpace` tidak otomatis berlaku saat memakai composer.

Aturan: `OutputPass` **selalu pass terakhir**.

## `UnrealBloomPass`

Cahaya menyebar dari area terang.

```js
new UnrealBloomPass(resolution, strength, radius, threshold)
```

| Parameter | SIMRS 3D | Arti |
| --- | --- | --- |
| `resolution` | `Vector2(W, H)` | ukuran tekstur internal |
| `strength` | `0.42` | seberapa terang efeknya |
| `radius` | `0.7` | seberapa jauh menyebar |
| `threshold` | `0.82` | batas kecerahan sebelum mulai bercahaya |

### Memilih `threshold`

- `0.0` → seluruh scene bermimpi/berkabut (efek dreamy)
- `0.8`–`0.9` → hanya objek sangat terang (default pilihan aman)
- `1.0` → hanya maksimum

Nilainya diukur dalam **luminansi linear**, bukan 0–255. Objek dengan `emissiveIntensity: 3` melewati ambang `0.82` dan bercahaya — itulah yang membuat panel lampu di SIMRS 3D tampak menyala.

### Kapan Bloom Terasa Berlebihan

- Teks/label ikut bercahaya → turunkan `strength` atau naikkan `threshold`
- Seluruh layar terasa "berminyak" → naikkan `threshold`
- Lampu tidak bercahaya → pastikan `emissiveIntensity > 1` dan `toneMappingExposure` cukup

## Resize — Wajib

```js
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
  composer.setSize(innerWidth, innerHeight)     // WAJIB
})
```

Tanpa `composer.setSize`, render target tetap ukuran lama → gambar melar dan bloom salah posisi.

## Antialias dengan Composer

`antialias: true` di renderer **tidak berlaku** saat memakai composer, karena render pertama masuk ke tekstur, bukan canvas. Penggantinya:

```js
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'

composer.addPass(new RenderPass(scene, camera))
composer.addPass(new UnrealBloomPass(...))
composer.addPass(new SMAAPass(innerWidth, innerHeight))   // sebelum OutputPass
composer.addPass(new OutputPass())
```

Alternatif lebih sederhana dan seringkali cukup: render target dengan sampel MSAA.

```js
const target = new THREE.WebGLRenderTarget(innerWidth, innerHeight, { samples: 4 })
const composer = new EffectComposer(renderer, target)
```

Bloom sendiri sudah memberi sedikit penghalusan tepi, jadi di SIMRS 3D `antialias: true` tetap dibiarkan — hasilnya masih memadai untuk gaya low-poly.

## Pass Lain yang Berguna

| Pass | Efek | Import |
| --- | --- | --- |
| `BokehPass` | blur kedalaman (DOF) | `postprocessing/BokehPass.js` |
| `SSAOPass` | gelap di sudut/lekukan | `postprocessing/SSAOPass.js` |
| `OutlinePass` | outline objek terpilih | `postprocessing/OutlinePass.js` |
| `ShaderPass` | pass kustom dengan shader sendiri | `postprocessing/ShaderPass.js` |
| `FilmPass` | grain + scanline | `postprocessing/FilmPass.js` |
| `AfterimagePass` | jejak gerak | `postprocessing/AfterimagePass.js` |

Contoh vignette tanpa shader kustom: tempel `div` HTML dengan `radial-gradient` di atas canvas. Gratis, nol biaya GPU.

## Biaya

Setiap pass = satu (atau beberapa) draw ke full-screen. Bloom khususnya mahal — ia membuat 5 tekstur tingkat-blur.

| Konfigurasi | Perkiraan |
| --- | --- |
| tanpa composer | paling murah |
| RenderPass + OutputPass | +1 pass |
| + Bloom | +6 pass internal |
| + SMAA | +2 pass |

Untuk perangkat lemah, sediakan saklar:

```js
let useBloom = true
controls... // tombol / query param
renderer.setAnimationLoop(() => {
  tick(dt)
  useBloom ? composer.render() : renderer.render(scene, camera)
})
```

::: warning Saat `composer` tidak dipakai
Kalau `renderer.render()` dipanggil langsung, `renderer.toneMapping` dan `outputColorSpace` **aktif kembali**. Itu sebabnya saklar di atas tetap menghasilkan warna yang konsisten — berbeda dari memakai composer tanpa `OutputPass`.
:::

## Debug: Pass Demi Pass

Kalau hasilnya hitam, pasang satu pass saja dulu lalu tambah bertahap:

```js
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
composer.addPass(new OutputPass())
// composer.render() — harus sama seperti renderer.render()
```

Kalau di tahap ini sudah beda warna → ada masalah tone mapping/color space. Kalau sama, tambah `UnrealBloomPass`.

## Ringkasan

1. `EffectComposer` → `RenderPass` → (efek) → `OutputPass`
2. Render dengan `composer.render()`, bukan `renderer.render()`
3. Jangan lupa `composer.setSize()` saat resize
4. `antialias` renderer tidak berlaku; pakai MSAA target atau `SMAAPass`
5. Bloom butuh `emissiveIntensity > 1` untuk terlihat
