# Interaksi: Raycaster

`Raycaster` menembakkan sinar dari kamera melewati posisi kursor ke dalam scene, lalu melaporkan objek apa yang kena.

Ini dasar semua interaksi 3D: klik, hover, drag, tembak.

## Alur Klik → Objek

```text
event pointer (piksel)  →  NDC (-1..1)  →  raycaster.setFromCamera  →  intersectObjects  →  objek
```

## Implementasi SIMRS 3D

Klik pasien → panel detail terbuka.

```js
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
let downPos = null

renderer.domElement.addEventListener('pointerdown', e => {
  downPos = { x: e.clientX, y: e.clientY }
})

renderer.domElement.addEventListener('pointerup', e => {
  if (!downPos) return
  const moved = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y)
  downPos = null
  if (moved > 5) return                     // itu drag orbit, bukan klik

  // piksel → NDC
  pointer.x = (e.clientX / innerWidth) * 2 - 1
  pointer.y = -(e.clientY / innerHeight) * 2 + 1

  raycaster.setFromCamera(pointer, camera)
  const hits = raycaster.intersectObjects(patients.map(p => p.mesh), true)
  if (!hits.length) return hideDetail()

  // naik ke Group induk (= satu pasien)
  let o = hits[0].object
  while (o && !patients.some(p => p.mesh === o)) o = o.parent
  const p = patients.find(q => q.mesh === o)
  if (p) showDetail(p)
})
```

## Tiga Hal yang Sering Salah

### 1. Koordinat NDC

Raycaster tidak menerima piksel. Ia menerima **Normalized Device Coordinates**: rentang `-1..1` di kedua sumbu, dengan **Y dibalik** (atas = +1).

```js
pointer.x =  (e.clientX / innerWidth)  * 2 - 1     // 0..W → -1..1
pointer.y = -(e.clientY / innerHeight) * 2 + 1     // 0..H → +1..-1
```

::: tip
Pakai `renderer.domElement.clientWidth/clientHeight`, bukan `innerWidth/innerHeight`, kalau canvas tidak memenuhi layar. Kalau ada CSS padding/border, pakai `getBoundingClientRect()`.
:::

### 2. Beda Klik vs Drag

OrbitControls memakai tombol kiri untuk memutar. Tanpa filter ini, **setiap kali selesai memutar kamera** akan terhitung sebagai klik objek.

```js
const moved = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y)
if (moved > 5) return                      // ambang 5 piksel
```

5 piksel adalah ambang yang terasa wajar — gerakan tangan kecil tidak dihitung sebagai drag.

### 3. Hasil Raycast adalah Mesh Anak, Bukan Group

`intersectObjects(objects, true)` — argumen kedua `true` = rekursif menembus anak-anak. Hasilnya mesh daun (`torso`, `head`, `arm`), bukan `Group` pasien.

```js
let o = hits[0].object
while (o && !patients.some(p => p.mesh === o)) o = o.parent   // naik ke Group pasien
```

## Optimasi: Batasi Kandidat Objek

Raycast memeriksa **semua** objek yang diberikan. Jangan berikan seluruh `scene`:

```js
raycaster.intersectObjects(scene.children, true)   // ❌ bisa 5000+ objek
raycaster.intersectObjects(pickables, true)        // ✓ hanya yang bisa diklik
```

Simpan array objek interaktif saat dibuat:

```js
const pickables = []
// saat membuat pasien:
pickables.push(p.mesh)
// saat menghapus:
pickables.splice(pickables.indexOf(p.mesh), 1)
```

## Hover (Kursor di Atas Objek)

Jangan raycast di setiap `pointermove` — itu event yang sangat sering (120×/detik di trackpad). Simpan koordinat, raycast di loop dengan throttle.

```js
let hoverAt = null
renderer.domElement.addEventListener('pointermove', e => {
  hoverAt = { x: e.clientX, y: e.clientY }
})

let hoverAcc = 0
function updateHover(dt) {
  if (!hoverAt) return
  hoverAcc += dt
  if (hoverAcc < 0.1) return           // 10× per detik saja
  hoverAcc = 0

  pointer.x = (hoverAt.x / innerWidth) * 2 - 1
  pointer.y = -(hoverAt.y / innerHeight) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  const hit = raycaster.intersectObjects(pickables, true)[0]
  renderer.domElement.style.cursor = hit ? 'pointer' : ''
  hoverAt = null
}
```

## Efek Hover: Outline

Cara termurah: tambah `EdgesGeometry` saat hover, buang saat keluar.

```js
let hovered = null
function setHovered(mesh) {
  if (hovered === mesh) return
  if (hovered) hovered.parent?.remove(hovered.__edge)
  hovered = mesh
  if (mesh) {
    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry),
      new THREE.LineBasicMaterial({ color: 0x58a6ff })
    )
    edge.position.copy(mesh.position)
    edge.rotation.copy(mesh.rotation)
    mesh.parent.add(edge)
    mesh.__edge = edge
  }
}
```

`EdgesGeometry` dibuat saat hover — mahal kalau dilakukan 60×/detik, tapi aman di sini karena hanya terjadi saat target berubah.

## Penanda Seleksi

SIMRS 3D menandai objek terpilih dengan cincin berputar datar di lantai:

```js
selRing = new THREE.Mesh(
  new THREE.RingGeometry(0.55, 0.72, 28),
  new THREE.MeshBasicMaterial({ color: 0x58a6ff, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
)
selRing.rotation.x = -Math.PI / 2
selRing.renderOrder = 5
scene.add(selRing)
```

Posisinya diperbarui tiap HUD tick:

```js
selRing.position.set(selected.mesh.position.x, selected.mesh.position.y + 0.03, selected.mesh.position.z)
```

## Klik di Lantai untuk Bergerak

Pola standar game RTS/isometric:

```js
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshBasicMaterial())
floor.rotation.x = -Math.PI / 2
floor.name = 'floor'

// saat klik
const hits = raycaster.intersectObject(floor)
if (hits.length) character.target.copy(hits[0].point)   // titik di dunia
```

`hits[0].point` adalah koordinat dunia — bukan lokal. Ini yang kamu pakai untuk target gerak.

## Data Tambahan dari Hasil Raycast

Setiap hasil berisi lebih dari sekadar objek:

```js
{
  distance: 12.4,          // jarak dari kamera
  point: Vector3,          // titik tumbukan di dunia
  face: { normal },        // normal permukaan
  object: Mesh,            // objek yang kena
  uv: Vector2,             // koordinat tekstur
}
```

Gunakan `point` untuk menaruh penanda tepat di lokasi klik, `distance` untuk menyaring objek yang terlalu jauh.

## Menyaring dengan `layers`

Kalau ada objek dekoratif (label, grid) yang tidak boleh pernah kena raycast:

```js
const UI_LAYER = 1
label.layers.set(UI_LAYER)
raycaster.layers.set(0)              // hanya objek di layer 0
```

Layer juga berguna untuk kamera (objek layer 1 tidak tampil di kamera utama).

## Ringkasan

| Butuh | Kunci |
| --- | --- |
| piksel → NDC | `x = (px/W)*2-1`, `y = -(py/H)*2+1` |
| klik vs drag | simpan `pointerdown`, bandingkan jarak > 5 px |
| objek → Group | naik lewat `.parent` |
| performa | batasi array objek raycast |
| hover | throttle 0,1 s, jangan di `pointermove` |
| titik di dunia | `hits[0].point` |
