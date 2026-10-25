# Performa & Memori

Penyebab scene 3D jadi lambat, urut dari yang paling sering:

| Gejala | Penyebab |
| --- | --- |
| FPS turun makin lama (bocor) | objek/texture tidak di-`dispose()` |
| FPS turun saat objek banyak | terlalu banyak draw call, geometri tidak dipakai ulang |
| FPS rendah dari awal | lampu & bayangan terlalu banyak |
| Frame tersendat (stutter) | membuat objek baru di dalam loop |
| Layar hitam setelah beberapa lama | GPU kehabisan memori → konteks WebGL hilang |

## 1. Cache Geometri dan Material

Objek baru = `new Geometry` + `new Material` = alokasi GPU baru. Untuk objek yang diulang ratusan kali, **bagi** geometri **dan** material.

SIMRS 3D memakai dua pola:

### Geometri global

```js
const GEO = {
  torso: new THREE.CapsuleGeometry(0.24, 0.5, 6, 12),
  arm:   new THREE.CapsuleGeometry(0.055, 0.34, 4, 8),
  leg:   new THREE.CapsuleGeometry(0.075, 0.4, 4, 8),
  head:  new THREE.SphereGeometry(0.25, 16, 16),
  eye:   new THREE.SphereGeometry(0.028, 8, 8),
}

// dipakai ulang untuk setiap pasien
const torso = new THREE.Mesh(GEO.torso, clothMat)
```

100 pasien → 1 geometri torso di GPU, 100 mesh yang hanya merujuk padanya.

### Cache material

```js
const matCache = new Map()

const mat = (color, rough = 0.7) => {
  const k = color + ':' + rough
  if (!matCache.has(k)) {
    matCache.set(k, new THREE.MeshStandardMaterial({ color, roughness: rough }))
  }
  return matCache.get(k)
}
```

Karena warna kulit & rambut diambil dari palet kecil, ratusan pasien hanya butuh segelintir material.

::: tip Kenapa material penting
Material membawa **program shader**. Material berbeda = shader berbeda = kompilasi baru + state GPU baru saat render. Menyatukan material memungkinkan Three.js menggambar banyak mesh sekaligus.
:::

### Kapan **tidak** memakai cache

Kalau properti material akan diubah per objek secara independen:

```js
// ❌ semua pasien berubah warna bersamaan
p.body.material.color.setHex(0xff0000)

// ✓ buat material sendiri (clone) bila perlu diubah terpisah
p.body.material = mat(color).clone()
```

SIMRS 3D mengubah `material.color` pada bar progres dan `selRing` — keduanya material unik, jadi aman.

## 2. `dispose()` — Wajib

`scene.remove(obj)` hanya melepas referensi dari pohon. GPU **tetap** menyimpan geometri, tekstur, dan program shader. Tanpa `dispose()`, memori naik setiap kali objek dibuang.

```js
function disposeGroup(obj) {
  obj.traverse(o => {
    o.geometry?.dispose?.()
    if (o.isSprite && o.material?.map) o.material.map.dispose?.()
    o.material?.dispose?.()
  })
  scene.remove(obj)
}
```

Yang harus di-`dispose()`:

| Resource | Dipanggil pada |
| --- | --- |
| geometri | `mesh.geometry` |
| material | `mesh.material` |
| tekstur | `material.map`, `emissiveMap`, dsb |
| render target | `new WebGLRenderTarget(...)` |

Yang **tidak perlu** di-`dispose()`: `Vector3`, `Color`, array biasa.

### Kasus SIMRS 3D

Setiap kali tanggal registrasi diganti, semua ruangan dibangun ulang:

```js
function clearRooms() {
  for (const r of rooms) disposeGroup(r.node)
  rooms = []
  for (const n of deptNodes) disposeGroup(n)
  deptNodes = []
}
```

Tanpa ini, berpindah tanggal 20× akan menghabiskan memori GPU dan tab crash.

### Tekstur label

Setiap label = satu `CanvasTexture`. Saat teks berubah, tekstur lama harus dibuang:

```js
p.nameTag.material.map?.dispose()
p.nameTag.material.map = newTex
p.nameTag.material.needsUpdate = true
```

## 3. Jagalah Jumlah Draw Call

Satu `Mesh` = satu draw call. Target praktis: **< 1000 draw call** untuk desktop, **< 300** untuk HP kelas menengah.

Cek:

```js
console.log(renderer.info.render.calls)   // per frame
console.log(renderer.info.memory)         // geometri & tekstur aktif
```

SIMRS 3D membatasi karena alasan ini:

```js
const MAX_ROOMS = 18
const MAX_ROOMS_PER_DEPT = 12
const SLOTS = 3
```

18 ruangan × (dinding + kursi + dokter + label) ≈ ratusan objek. Masih aman; 200 ruangan tidak.

### `InstancedMesh` untuk objek identik

Kalau ada 500 kursi dengan geometri & material sama, `InstancedMesh` menggambarnya dalam **satu** draw call:

```js
const chairs = new THREE.InstancedMesh(chairGeo, chairMat, 500)
const m = new THREE.Matrix4()

for (let i = 0; i < 500; i++) {
  m.makeTranslation(xs[i], 0, zs[i])
  chairs.setMatrixAt(i, m)
}
chairs.instanceMatrix.needsUpdate = true
scene.add(chairs)
```

Konsekuensi: objek di dalam `InstancedMesh` tidak bisa di-animasikan per instance semudah mesh biasa (butuh update matriks). SIMRS 3D **tidak** memakainya, karena setiap pasien punya warna, label, dan gerak sendiri — kasus yang salah untuk instancing.

### Merge geometri statis

Dinding yang tidak pernah bergerak bisa digabung jadi satu `BufferGeometry` dengan `BufferGeometryUtils.mergeGeometries()`:

```js
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

const walls = roomDefs.map(d => new THREE.BoxGeometry(...).translate(...))
const merged = new THREE.Mesh(mergeGeometries(walls), wallMat)
```

18 ruangan × 6 dinding = 108 draw call → menjadi 1. Cocok untuk scene statis.

## 4. Tekstur

| Aturan | Alasan |
| --- | --- |
| Pangkat dua (256, 512, 1024) | mipmap & wrapping optimal untuk tekstur non-pow2 bisa dibatasi |
| Jangan > 2048² tanpa perlu | 4096² RGBA = 64 MB VRAM |
| `anisotropy` 4–8, jangan 16 | manfaat visual kecil, biaya bisa naik |
| Satu atlas untuk banyak ikon | mengurangi jumlah tekstur & draw call |

Tekstur label canvas SIMRS 3D berukuran ± 300×90 px — kecil, cepat, dan di-`anisotropy: 4`.

## 5. Lampu & Bayangan

- Setiap `PointLight` = loop tambahan di semua material. 8 lampu × 500 mesh mahal.
- Batasi `distance` supaya lampu tidak menjangkau seluruh scene.
- Bayangan `mapSize` 2048 cukup; 4096 hanya untuk render diam kualitas tinggi.
- Untuk scene statis: `renderer.shadowMap.autoUpdate = false` + manual `needsUpdate = true`.
- Objek kecil yang jumlahnya banyak (pasien) → **blob shadow**, bukan bayangan asli.

## 6. Jangan Buat Objek di Dalam Loop

```js
// ❌ 60 × new Vector3 per detik × jumlah pasien
for (const p of patients) {
  const v = new THREE.Vector3().subVectors(p.target, p.mesh.position)
}

// ✓ satu vector, dipakai ulang
const tmp = new THREE.Vector3()
for (const p of patients) {
  tmp.subVectors(p.target, p.mesh.position)
}
```

Hal yang sama berlaku untuk `new THREE.Color()`, array baru, dan closure baru di dalam loop frame.

## 7. Throttle Pekerjaan Non-Visual

```js
// HUD: 2,5×/detik, bukan 60×
if ((hudAcc += dt) < 0.4) return

// fetch data: 30 detik sekali
setInterval(loadData, 30000)
```

## 8. `setPixelRatio` — Penghemat Terbesar untuk Layar HiDPI

```js
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
```

iPad dengan `devicePixelRatio = 2` tetap dirender 2× piksel linear = 4× piksel — cukup. Membiarkan `3` di HP tertentu = 9× piksel dan frame rate jatuh separuh. Untuk HP kelas bawah, `Math.min(devicePixelRatio, 1.5)`.

## 9. Kurangi Saat FPS Rendah (Adaptif)

Deteksi dan turunkan kualitas otomatis:

```js
let fpsAcc = 0, frames = 0
function checkFps(dt) {
  fpsAcc += dt
  frames++
  if (fpsAcc < 2) return
  const fps = frames / fpsAcc
  fpsAcc = 0
  frames = 0
  if (fps < 40 && renderer.getPixelRatio() > 1) {
    renderer.setPixelRatio(1)
    composer.setSize(innerWidth, innerHeight)
  }
}
```

Ini satu-satunya "auto quality" yang benar-benar murah dan efektif.

## 10. Cek dengan `renderer.info`

```js
console.log(renderer.info.render)   // frame, calls, triangles, points, lines
console.log(renderer.info.programs) // jumlah shader terkompilasi
console.log(renderer.info.memory)   // geometries, textures
```

Bandingkan `memory.geometries` sebelum dan sesudah rebuild berulang. Kalau terus naik → ada `dispose()` yang terlewat.

## Checklist

1. Geometri & material yang diulang di-cache?
2. Setiap `remove()` disertai `dispose()`?
3. `renderer.info.render.calls` di bawah ±500?
4. `setPixelRatio` dibatasi 2 (atau 1,5 untuk mobile)?
5. Lampu < 8 dan `distance` di-set?
6. Tidak ada `new Object3D/Vector3` di dalam loop frame?
7. Update HTML di-throttle?
8. Tekstur berukuran wajar dan ber-pangkat-dua?
