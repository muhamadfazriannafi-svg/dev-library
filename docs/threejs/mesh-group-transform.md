# Mesh, Group & Transformasi

## Properti Transformasi

Setiap `Object3D` (termasuk `Mesh` dan `Group`) punya tiga properti transformasi:

```js
mesh.position.set(x, y, z)          // geser
mesh.rotation.set(rx, ry, rz)       // putar (radian, urutan XYZ)
mesh.scale.set(sx, sy, sz)          // skala
```

Semuanya juga bisa diakses per sumbu:

```js
mesh.position.y = 0.575
mesh.rotation.x = -Math.PI / 2      // telentang (cincin lantai)
mesh.scale.x = 0.001                // bar progres kosong
```

::: tip Radian, bukan derajat
`180°` = `Math.PI`. Geser cincin penanda agar rata di lantai: `rotation.x = -Math.PI / 2`. Bukan `-90`.
:::

### `position` vs `translate`

```js
mesh.position.set(1, 0, 0)      // absolut, relatif ke induk
mesh.translateX(1)              // tambah 1 relatif terhadap arah lokal (setelah rotasi)
```

Untuk benda yang diletakkan sekali, pakai `position`. `translate*` untuk gerak bertahap.

## Group — Komposisi Objek

`Group` adalah `Object3D` kosong: tidak punya bentuk, hanya wadah. Ini alat paling penting untuk merapikan scene.

Contoh nyata dari SIMRS 3D — **kasur rawat inap**:

```js
function buildBed() {
  const g = new THREE.Group()
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x8d99a8, roughness: 0.45, metalness: 0.6 })
  const linenMat = new THREE.MeshStandardMaterial({ color: 0xdfe8f2, roughness: 0.9 })

  const base = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.16, 2.25), frameMat)
  base.position.y = 0.55
  base.castShadow = base.receiveShadow = true
  g.add(base)

  const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.2, 2.2), linenMat)
  mattress.position.y = 0.73
  g.add(mattress)

  const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.14, 0.42), linenMat)
  pillow.position.set(0, 0.87, -0.82)
  g.add(pillow)

  return g
}
```

Lalu dipakai berkali-kali tanpa tahu isinya:

```js
const bed = buildBed()
bed.position.set(sx, 0, sz)   // pindahkan seluruh kasur sekaligus
room.node.add(bed)
```

**Manfaat utama:** kalau kasur perlu diputar 90°, cukup `bed.rotation.y = Math.PI / 2`. Semua bagian ikut. Tidak ada satu pun koordinat yang perlu dihitung ulang.

## Transformasi Bersarang (Nested)

Urutan penumpukan: **induk didahulukan**.

```text
scene
└── ruangan (posisi 20, 0, -40)
    └── kursi (posisi 4.6, 0, 2.7)
        └── sandaran (posisi 0, 0.85, -0.46)
```

Posisi sandaran di dunia = `(20 + 4.6 + 0, 0 + 0.85, -40 + 2.7 - 0.46)`. Cukup letakkan benda secara **lokal**, induk yang mengurus sisanya.

Ini pola ruangan SIMRS 3D:

```js
const node = new THREE.Group()
node.position.set(x, 0, z)            // posisi ruangan di dunia
scene.add(node)
// semua isi ruangan memakai koordinat lokal 0,0 di tengah ruangan
```

## Rotasi dan Gizmo Visual (opsional)

Untuk membetulkan orientasi, pasang sementara:

```js
scene.add(new THREE.AxesHelper(5))    // X merah, Y hijau, Z biru
```

Cabut setelah selesai.

## Skala

Skala bisa negatif (efek cermin) dan non-uniform (gepeng).

```js
torso.scale.set(0.82, 1, 0.8)   // badan agak lonjong
```

::: warning
Skala non-uniform pada objek **induk** akan membuat bentuk anak-anaknya gepeng. Untuk koreksi bentuk kecil, terapkan pada mesh daun saja — seperti `torso` di atas.
:::

Animasi "muncul" dengan skala (dipakai saat pasien baru lahir di SIMRS 3D):

```js
mesh.scale.setScalar(0.05)
// lalu tiap frame:
const s = mesh.scale.x + (1 - mesh.scale.x) * Math.min(1, dt * 8)
mesh.scale.setScalar(s)
```

Ini *easing* eksponensial: cepat di awal, melambat mendekati 1.

## Mengganti Kondisi Visual

`visible` mematikan render tanpa menghapus dari scene — jauh lebih murah daripada `remove`/`add` bolak-balik.

```js
p.nameTag.visible = camera.position.distanceTo(p.mesh.position) < 34
```

SIMRS 3D memakai ini agar label nama pasien tidak menumpuk saat kamera jauh.

## Menghapus Objek dengan Benar

`scene.remove(obj)` hanya melepas dari pohon. **Tidak** membebaskan memori GPU. Wajib `dispose()`:

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

Ini dipakai setiap kali SIMRS 3D membangun ulang ruangan (`clearRooms()`). Tanpa `dispose()`, buka-tutup tanggal 10× = memori GPU naik terus sampai tab crash. Detail di [Performa](/threejs/performa).

## Pola Ringkas: Factory Function

Satu fungsi per benda yang diulang. Selalu kembalikan `Group` atau `Mesh`, jangan menaruh benda langsung ke `scene` di dalamnya — biar pemanggil yang menentukan posisi.

```js
function buildChair() {
  const seat = new THREE.Group()
  // ... isi
  return seat
}

// pemakaian
for (let k = 0; k < 3; k++) {
  const s = buildChair()
  s.position.set(k * 2, 0, 0)
  room.node.add(s)
}
```

Pemisahan ini yang membuat SIMRS 3D bisa membangun 18 ruangan dengan 3 kursi masing-masing tanpa kode berulang.
