# Kontrol Kamera

Kamera diam hanya cocok untuk scene yang sangat kecil. Untuk bangunan, dashboard, atau visualisasi data — biarkan pengguna menjelajah.

## `OrbitControls`

Addon resmi. Satu baris sudah memberi drag-putar, scroll-zoom, dan pan.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 1, 4)          // titik yang diputar/dilihat
controls.enableDamping = true
controls.dampingFactor = 0.06
```

::: warning `controls.update()` wajib di loop
Dengan `enableDamping`, gerakan kamera melambat halus — butuh `controls.update()` **setiap frame**. Tanpa itu, kamera tidak berhenti mulus dan input bisa terasa aneh.
:::

## Konfigurasi Lengkap SIMRS 3D

```js
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 1, 4)
controls.enableDamping = true
controls.dampingFactor = 0.06
controls.enablePan = true
controls.screenSpacePanning = false          // pan di bidang lantai, bukan bidang layar
controls.panSpeed = 1.2
controls.mouseButtons = {
  LEFT:   THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT:  THREE.MOUSE.PAN,
}
controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }
controls.maxPolarAngle = Math.PI / 2.05      // jangan sampai menembus lantai
controls.minDistance = 8
controls.maxDistance = 80
```

| Properti | Gunanya |
| --- | --- |
| `target` | titik pusat orbit. Semua gerak mengelilingi titik ini |
| `enableDamping` | inersia, terasa premium |
| `dampingFactor` | 0.05 = licin, 0.15 = responsif |
| `screenSpacePanning: false` | geser sejajar lantai (bukan sejajar layar) — penting untuk bangunan |
| `mouseButtons` | tombol mana untuk apa |
| `maxPolarAngle` | `Math.PI/2` = tepat di horizon. Sedikit lebih (`/2.05`) mencegah kamera di bawah lantai |
| `minDistance` / `maxDistance` | batas zoom |

### `maxPolarAngle` — Mencegah Kamera Menembus Lantai

Tanpa ini, pengguna dapat memutar sampai kamera ada di bawah lantai dan melihat "dunia terbalik". `Math.PI / 2.05` ≈ 88°, jadi kamera selalu di atas.

## Kamera Otomatis setelah Bangunan Dibangun

Target dan posisi kamera sering harus berubah saat isi scene berubah ukuran. SIMRS 3D menghitung dari bentang bangunan:

```js
const midZ = -Math.abs(deepest) / 2
const dist = Math.max(60, Math.max(spanX, spanZ) * 1.02)
controls.target.set(0, 1, midZ)
camera.position.set(dist * 0.24, dist * 0.56, midZ + dist * 0.86)
controls.maxDistance = Math.max(120, spanZ * 1.2)
```

Rasio `(0.24, 0.56, 0.86)` memberi sudut pandang tinggi (~33° dari horizontal) yang selalu enak untuk bangunan. Simpan rumus ini; berlaku untuk gedung, denah, atau dashboard 3D apa pun.

## Pan dengan Keyboard

`OrbitControls` tidak punya navigasi keyboard. SIMRS 3D menambahkannya — gerakan menggeser **kamera dan target secara bersamaan** agar orbit tetap konsisten.

```js
const panKeys = new Set()
addEventListener('keydown', e => {
  if (/^Arrow|^[wasdWASD]$/.test(e.key)) panKeys.add(e.key.toLowerCase())
})
addEventListener('keyup', e => panKeys.delete(e.key.toLowerCase()))

const panDir = new THREE.Vector3()
const panRight = new THREE.Vector3()

function applyPanKeys(dt) {
  if (!panKeys.size) return

  panDir.set(0, 0, 0)
  const fwd = camera.getWorldDirection(new THREE.Vector3()).setY(0).normalize()
  panRight.crossVectors(camera.up, fwd).normalize()

  if (panKeys.has('a') || panKeys.has('arrowleft'))  panDir.addScaledVector(panRight, 1)
  if (panKeys.has('d') || panKeys.has('arrowright')) panDir.addScaledVector(panRight, -1)
  if (panKeys.has('w') || panKeys.has('arrowup'))    panDir.add(fwd)
  if (panKeys.has('s') || panKeys.has('arrowdown'))  panDir.addScaledVector(fwd, -1)
  if (!panDir.lengthSq()) return

  panDir.normalize().multiplyScalar(40 * dt)   // 40 unit per detik
  camera.position.add(panDir)
  controls.target.add(panDir)                  // WAJIB: geser target juga
}
```

### Kenapa `panRight = cross(up, forward)`

- `forward` = arah kamera mendatar
- `up` = `(0, 1, 0)`
- hasil cross = vektor tegak lurus keduanya = arah kanan kamera

Ini membuat `A`/`D` **selalu** ke kiri/kanan layar, apa pun sudut kamera. Trik yang sama dipakai di semua game 3D.

::: warning `setY(0)` sebelum `normalize()`
`getWorldDirection()` mengembalikan arah kamera **tiga dimensi**. Kalau kamera menunduk, arahnya punya komponen Y — dan `W` akan membuat kamera terbang ke langit. `setY(0)` memaksa gerak hanya di bidang lantai.
:::

## Batas Layar (Clamping)

Agar pengguna tidak tersesat ke koordinat tak terhingga, batasi hasil gerak:

```js
const BOUNDS = { x: 60, z: 80 }
function clampTarget(v) {
  v.x = THREE.MathUtils.clamp(v.x, -BOUNDS.x, BOUNDS.x)
  v.z = THREE.MathUtils.clamp(v.z, -BOUNDS.z, BOUNDS.z)
}
```

Panggil setelah `applyPanKeys()` pada `camera.position` dan `controls.target`.

## Animasi Kamera (Fly To)

Untuk "klik ruangan → kamera mendekat", jangan set posisi langsung (kaget). Interpolasi:

```js
let fly = null

function flyTo(target, distance = 20) {
  const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize()
  fly = {
    from: camera.position.clone(),
    to: target.clone().addScaledVector(dir, distance),
    fromTarget: controls.target.clone(),
    toTarget: target.clone(),
    t: 0,
  }
}

// di loop
if (fly) {
  fly.t = Math.min(1, fly.t + dt * 1.6)
  const e = 1 - Math.pow(1 - fly.t, 3)     // ease-out cubic
  camera.position.lerpVectors(fly.from, fly.to, e)
  controls.target.lerpVectors(fly.fromTarget, fly.toTarget, e)
  if (fly.t >= 1) fly = null
}
```

`ease-out cubic` membuat gerak cepat lalu melambat — jauh lebih enak dari linear.

## Reset Kamera

Simpan posisi awal, sediakan tombol "reset view":

```js
const home = { pos: camera.position.clone(), target: controls.target.clone() }

function resetView() {
  flyTo(home.target, home.pos.distanceTo(home.target))
}
```

## Kontrol Lain yang Tersedia

| Kontrol | Untuk |
| --- | --- |
| `MapControls` | orbit dengan pan gaya peta (kiri = pan, kanan = putar) |
| `TrackballControls` | bebas 360° tanpa batas polar |
| `FirstPersonControls` / `PointerLockControls` | jalan di dalam gedung |
| `FlyControls` | kamera bebas seperti drone |

Semua diimpor dari `three/addons/controls/...`.

## Checklist Kontrol

1. `controls.update()` dipanggil tiap frame?
2. `dampingFactor` 0.05–0.1?
3. `maxPolarAngle` dibatasi?
4. `minDistance` / `maxDistance` di-set?
5. Saat menggeser kamera manual, `controls.target` **ikut** digeser?
