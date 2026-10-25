# Kumpulan Dokumentasi Three.js

Three.js adalah library JavaScript untuk menggambar grafik 3D di browser di atas WebGL. Kamu tidak menulis shader atau memanggil WebGL sendiri — cukup menyusun *scene*, menambah objek, lalu merender.

```js
import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100)
camera.position.z = 3

scene.add(new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x58a6ff })
))
scene.add(new THREE.AmbientLight(0xffffff, 1.5))

renderer.setAnimationLoop(() => renderer.render(scene, camera))
```

## Mengapa Three.js

- **Industri standar** — contoh, tutorial, dan addon paling lengkap di ekosistem 3D web.
- **Tanpa build tool** — bisa jalan langsung dari `<script type="module">`.
- **Banyak kontrol siap pakai** — orbit kamera, post-processing, environment, loader model.
- **Dokumentasi**: <https://threejs.org/docs/>

## Kaitannya dengan SIMRS 3D

Materi di rubrik ini disusun dari kode nyata proyek **SIMRS 3D** — simulator rumah sakit yang menampilkan alur pasien (ruang tunggu → pendaftaran → antre poli → dilayani dokter → kasir) sebagai bangunan 3D, dengan data asli dari PostgreSQL lewat API `fetch`.

Contoh nyata yang dipakai di materi:

| Materi | Diambil dari SIMRS 3D |
| --- | --- |
| Scene, renderer, kamera | `WebGLRenderer` + `PerspectiveCamera` + `ACESFilmicToneMapping` |
| Geometri & material | `BoxGeometry`, `CapsuleGeometry`, `MeshStandardMaterial` |
| Group & transformasi | `buildBed()`, `buildPerson()` |
| Cahaya & bayangan | `DirectionalLight` + `PCFSoftShadowMap` |
| Label teks | `makeLabel()` — canvas → `CanvasTexture` → `Sprite` |
| Kamera interaktif | `OrbitControls` + pan keyboard WASD |
| Animasi | `renderer.setAnimationLoop` + `clock.getDelta()` |
| Picking | `Raycaster` untuk klik pasien → panel detail |
| Post-processing | `EffectComposer` + `UnrealBloomPass` |
| Perf | cache material & geometri, `dispose()` saat rebuild |

## Versi Terbaru

| Versi | Status |
| --- | --- |
| **r169** | versi yang dipakai SIMRS 3D |
| r17x | garis utama saat ini |

Rilis: <https://github.com/mrdoob/three.js/releases>

## Struktur Dasar Setiap Aplikasi Three.js

Selalu empat benda ini, urutannya tetap:

```text
renderer  → yang menggambar
scene     → wadah objek
camera    → mata yang melihat
loop      → render berulang tiap frame
```

## Daftar Materi

- [Instalasi & Setup](/threejs/instalasi) — import map dari CDN, bundler, hello world
- [Arsitektur Inti](/threejs/arsitektur) — scene graph, vector, transformasi, satuan
- [Scene, Renderer, Kamera](/threejs/scene-renderer-kamera) — konfigurasi renderer, kamera perspektif, resize
- [Geometri & Material](/threejs/geometri-material) — bentuk siap pakai, material standar, emissive
- [Mesh, Group & Transformasi](/threejs/mesh-group-transform) — menempel objek, posisi, rotasi, skala
- [Cahaya & Bayangan](/threejs/cahaya-bayangan) — hemisphere, directional, point, shadow bias
- [Tekstur & Label Teks](/threejs/tekstur-label) — canvas → `CanvasTexture` → `Sprite`
- [Kontrol Kamera](/threejs/kontrol-kamera) — `OrbitControls`, pan keyboard, animasi kamera
- [Animasi & Game Loop](/threejs/animasi) — delta time, `setAnimationLoop`, interpolasi
- [Interaksi: Raycaster](/threejs/raycaster) — klik objek, hover, drag vs klik
- [Post-processing](/threejs/post-processing) — `EffectComposer`, bloom, output pass
- [Performa & Memori](/threejs/performa) — cache, instancing, `dispose()`
- [Studi Kasus: SIMRS 3D](/threejs/studi-kasus-simrs3d) — membedah proyek utuh

## Referensi

- Dokumentasi: <https://threejs.org/docs/>
- Contoh resmi: <https://threejs.org/examples/>
- Manual (konsep, bukan API): <https://threejs.org/manual/>
- Editor: <https://threejs.org/editor/>
