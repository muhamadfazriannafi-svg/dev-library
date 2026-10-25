# Instalasi & Setup

Three.js cukup satu file HTML. Tidak perlu Node.js, tidak perlu bundler.

## Cara 1 — CDN dengan Import Map (paling cepat)

Ini cara yang dipakai SIMRS 3D. Satu file `index.html`, langsung buka di browser.

```html
<!doctype html>
<html>
<body>
<script type="importmap">
{ "imports": {
  "three": "https://unpkg.com/three@0.169.0/build/three.module.js",
  "three/addons/": "https://unpkg.com/three@0.169.0/examples/jsm/"
} }
</script>
<script type="module">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

console.log(THREE.REVISION, OrbitControls.name)
</script>
</body>
</html>
```

Kenapa perlu **import map**? Kode Three.js di dalam `examples/jsm/` saling meng-`import 'three'`. Browser tidak tahu `'three'` itu apa tanpa import map. Import map memetakan nama pendek ke URL CDN.

::: tip
File `type="module"` **tidak bisa** dibuka lewat `file://` karena CORS. Jalankan server statis dulu:

```bash
npx serve .
# atau
python -m http.server 8000
```
:::

## Cara 2 — Bundler (Vite)

Untuk proyek nyata yang butuh npm, TypeScript, dan hot reload.

```bash
npm create vite@latest aplikasi-3d -- --template vanilla
cd aplikasi-3d
npm install three
npm run dev
```

```js
// main.js
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
```

`three/addons/` otomatis tersedia lewat field `exports` di paket `three` versi modern. Tidak perlu alias Vite.

## Cara 3 — `three` lewat `<script>` lama (tidak disarankan)

Build `three.min.js` sudah dihapus sejak r150. Gunakan Cara 1 atau 2.

## Memilih Versi

Pilih satu versi dan tulis lengkap (jangan `@latest` di produksi) supaya tidak tiba-tiba rusak.

```text
three@0.169.0   ← digit terakhir (169) = REVISION
```

`THREE.REVISION` mengembalikan `"169"`. Cek di console untuk memastikan versi yang benar-benar jalan.

## Hello World Lengkap

Simpan sebagai `index.html`, jalankan `npx serve .`, buka `http://localhost:3000`.

```html
<!doctype html>
<html>
<head>
<style>html,body{margin:0;height:100%;overflow:hidden;background:#0d1117}canvas{display:block}</style>
</head>
<body>
<script type="importmap">
{ "imports": {
  "three": "https://unpkg.com/three@0.169.0/build/three.module.js",
  "three/addons/": "https://unpkg.com/three@0.169.0/examples/jsm/"
} }
</script>
<script type="module">
import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0d1117)

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100)
camera.position.set(2, 2, 4)
camera.lookAt(0, 0, 0)

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x58a6ff })
)
scene.add(cube)

scene.add(new THREE.DirectionalLight(0xffffff, 2))
scene.add(new THREE.AmbientLight(0xffffff, 0.5))

renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
})

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})
</script>
</body>
</html>
```

Hasilnya: kotak biru berputar di atas latar gelap.

## Kalau Layar Hitam

| Gejala | Penyebab umum |
| --- | --- |
| Console: `Failed to resolve module specifier "three"` | import map tidak terbaca sebelum `<script type="module">` |
| Console: `CORS policy` / `file://` | dibuka langsung sebagai file, bukan lewat server |
| Tidak ada error, layar kosong | objek tidak ada di depan kamera, atau kamera di dalam objek |
| Objek hitam | belum ada cahaya — `MeshStandardMaterial` butuh light |
| Error `WebGL context lost` | GPU/memori habis, lihat [Performa](/threejs/performa) |
