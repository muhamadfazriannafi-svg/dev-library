# Arsitektur Inti

Sebelum menulis kode, pahami dulu lima konsep yang dipakai di semua tempat.

## 1. Scene Graph (Pohon)

Semua yang tampil adalah **node** dalam pohon. `Scene` adalah akar; `Group` dan `Mesh` adalah cabang/daun.

```text
scene
├── floor          (Mesh)
├── grid           (GridHelper)
├── sun            (DirectionalLight)
└── roomGroup      (Group)
    ├── wallLeft   (Mesh)
    ├── chair      (Group)
    │   ├── seat   (Mesh)
    │   └── back   (Mesh)
    └── nameTag    (Sprite)
```

Konsekuensi penting: **transformasi induk berlaku ke anak**. Di SIMRS 3D, satu ruangan adalah `Group` yang diposisikan sekali; semua dinding dan kursi di dalamnya ikut bergeser tanpa hitung ulang koordinat.

```js
const node = new THREE.Group()
node.position.set(x, 0, z)   // pindahkan seluruh ruangan

const wall = new THREE.Mesh(new THREE.BoxGeometry(0.16, 3, 9.4), wallMat)
wall.position.set(-3.7, 1.5, 0)   // koordinat relatif terhadap node
node.add(wall)
scene.add(node)
```

## 2. Satuan

Tidak ada satuan baku. **Tentukan sendiri dan konsisten.** SIMRS 3D memakai **1 unit = 1 meter**: ruangan 7,4 × 9,4 unit, tinggi dinding 3 unit, orang ~1,6 unit.

```js
const ROOM_W = 7.4, ROOM_D = 9.4   // meter
const WALL_H = 3.0
```

Kamera `near`/`far` harus mengikuti skala ini:

```js
new THREE.PerspectiveCamera(46, aspect, 0.1, 400)   // 10 cm .. 400 m
```

Salah satuan = objek terpotong (`near`/`far` terlalu sempit) atau berkedip (z-fighting).

## 3. Sistem Koordinat

| Sumbu | Arah |
| --- | --- |
| **+X** | kanan |
| **+Y** | atas |
| **+Z** | ke arah penonton (keluar layar) |
| **−Z** | menjauh, "masuk" ke layar |

Kamera default menghadap **−Z**. Jadi objek dengan `z` negatif terlihat lebih jauh.

::: warning
Three.js memakai **right-handed** dengan Y ke atas. Berbeda dengan layar 2D (Y ke bawah) dan berbeda dengan Blender (Z ke atas). Saat import model dari Blender, pakai `GLTFLoader` — sudah otomatis dikonversi.
:::

## 4. Vector dan Objek Reusable

`Vector3` adalah objek biasa, bisa dipakai berulang:

```js
const target = new THREE.Vector3(0, 0, 14)

// jangan buat Vector3 baru di dalam loop tiap frame
tmp.copy(target).sub(mesh.position)
const dist = tmp.length()
```

Di SIMRS 3D ada satu `tmp` global yang dipakai ulang untuk semua perhitungan jarak:

```js
const tmp = new THREE.Vector3()
```

Membuat `new Vector3()` 1000× per detik = 60.000 objek per menit untuk garbage collector. Hindari.

## 5. Render = Gambar Ulang, Bukan Simpan

Tidak ada state visual. Setiap frame, seluruh scene digambar ulang dari posisi objek saat itu.

```js
renderer.setAnimationLoop(() => {
  // ubah state di sini
  cube.rotation.y += 0.01
  // lalu gambar
  renderer.render(scene, camera)
})
```

Artinya: animasi = mengubah `.position` / `.rotation` / `.scale` / properti material. Tidak ada `redraw()` per objek.

## Peta Hubungan Modul

```js
new THREE.WebGLRenderer()   // gambar ke <canvas>
new THREE.Scene()           // pohon objek
new THREE.PerspectiveCamera() // proyeksi
  ├── scene.add(mesh)
  ├── mesh.geometry         // bentuk (BoxGeometry, ...)
  ├── mesh.material         // tampilan (MeshStandardMaterial, ...)
  └── mesh.position/rotation/scale
renderer.render(scene, camera)
```

## Ringkasan SIMRS 3D

| Konsep | Wujud di SIMRS 3D |
| --- | --- |
| 1 unit = 1 meter | `ROOM_W = 7.4`, `WALL_H = 3.0` |
| Group per ruang | `node` di `buildRoomContent()` |
| Koordinat relatif | kursi di `(±4.6, 0, -2.7)` dari pusat ruangan |
| Vector reusable | `tmp`, `panDir`, `panRight`, `PAN_UP` |
| Render berulang | `renderer.setAnimationLoop(() => { tick(dt); composer.render() })` |
