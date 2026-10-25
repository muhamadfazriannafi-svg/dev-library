# Cahaya & Bayangan

Tanpa cahaya, `MeshStandardMaterial` hitam total. Ini penyebab #1 layar kosong padahal objeknya ada.

## Jenis Cahaya

| Kelas | Ikon visual | Biaya | Dipakai untuk |
| --- | --- | --- | --- |
| `AmbientLight` | merata dari segala arah | sangat murah | pengisi dasar |
| `HemisphereLight` | langit + tanah | murah | cahaya luar ruangan |
| `DirectionalLight` | matahari paralel | sedang (bayangan mahal) | matahari/sinar utama |
| `PointLight` | bola lampu | mahal, per objek | lampu ruangan |
| `SpotLight` | sorot senter | paling mahal | panggung |
| `RectAreaLight` | panel lampu | sedang | lampu studio |

## Setup SIMRS 3D

Dua lapis cahaya: satu hemisphere untuk mengisi, satu directional untuk membentuk bayangan.

```js
scene.add(new THREE.HemisphereLight(0xbcd4ff, 0x0a0d12, 0.55))

const sun = new THREE.DirectionalLight(0xfff2e0, 2.4)
sun.position.set(16, 34, 18)
sun.castShadow = true
sun.shadow.mapSize.set(2048, 2048)
sun.shadow.bias = -0.0006
sun.shadow.normalBias = 0.03
Object.assign(sun.shadow.camera, { left: -34, right: 34, top: 34, bottom: -34, near: 1, far: 90 })
scene.add(sun)
```

### `HemisphereLight(skyColor, groundColor, intensity)`

Warna atas (langit) dan bawah (tanah). Memberi gradasi lembut: objek lebih terang dari atas. Murah dan selalu aman.

Karena scene memakai `environment` (lihat [Scene](/threejs/scene-renderer-kamera)), intensitas hemisphere cukup rendah — `0.55`. Kalau tidak ada environment, naikkan ke `1.0`.

### `DirectionalLight`

Arahnya ditentukan oleh `position` → `target` (default `(0,0,0)`). Cahaya **paralel** seperti matahari, jadi jarak lampu tidak memengaruhi terang — hanya arah.

```js
sun.position.set(16, 34, 18)   // arah sinar dari kanan-atas-depan
```

### Parameter Bayangan

| Properti | Nilai SIMRS 3D | Efek |
| --- | --- | --- |
| `castShadow` | `true` | menyalakan bayangan |
| `shadow.mapSize` | `2048 × 2048` | resolusi; naikkan kalau bayangan bergerigi |
| `shadow.bias` | `-0.0006` | geser kedalaman untuk hindari *shadow acne* |
| `shadow.normalBias` | `0.03` | dorong bayangan menjauh dari permukaan |
| `shadow.camera left/right/top/bottom` | `±34` | **area** yang dicakup bayangan directional |
| `shadow.camera far` | `90` | batas jarak bayangan |

::: warning Bayangan tidak muncul padahal `castShadow: true`
`DirectionalLight` punya kamera ortografis untuk bayangan, default `±5`. Kalau scene selebar 60 unit, sebagian besar bayangan terpotong. Lebarkan `shadow.camera` sesuai ukuran scene — seperti `±34` di atas.
:::

`bias` yang terlalu negatif → bayangan "lepas" dari benda (peter-panning). Terlalu positif → *shadow acne* (garis-garis aneh di permukaan). Mulai dari `-0.0005` lalu sesuaikan.

### Batch

Untuk bayangan melibatkan ratusan objek, `shadowMap.autoUpdate = false` lalu set `needsUpdate = true` hanya saat ada perubahan — cocok untuk scene statis. SIMRS 3D tidak memakai ini karena pasien terus bergerak.

## Merahasiakan Sisi: `castShadow` dan `receiveShadow`

Set keduanya **per mesh**:

```js
mesh.castShadow = true      // ikut membentuk bayangan
mesh.receiveShadow = true   // bisa menerima bayangan
```

Pola:

| Benda | `cast` | `receive` |
| --- | --- | --- |
| Lantai | ✗ | ✓ |
| Dinding | ✓ | ✓ |
| Orang | ✓ | ✗ |
| Cincin penanda datar | ✗ | ✗ |
| Sprite/label | ✗ | ✗ |

Sprite dan label **jangan** `castShadow` — hasilnya kotak aneh. Di SIMRS 3D semua `spriteLabel()` otomatis tanpa bayangan.

## Lampu Ruangan

`PointLight(color, intensity, distance, decay)`:

```js
function ceilingLamp(x, z, color, intensity = 40) {
  const g = new THREE.Group()

  // panel yang menyala
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 0.12, 1.1),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: color, emissiveIntensity: 3 })
  )
  panel.position.y = 4.2

  // cahaya sebenarnya
  const l = new THREE.PointLight(color, intensity, 16, 2)
  l.position.y = 3.9

  g.add(panel, l)
  g.position.set(x, 0, z)
  scene.add(g)
}
```

**Trik penting:** panel yang terlihat adalah mesh emissive; `PointLight`-nya transparan. Jadi kamu bisa mematikan lampu logis tanpa lampunya ikut hilang secara visual (dan sebaliknya, pakai panel emissive saja untuk lampu dekoratif tanpa biaya render).

Parameter `PointLight`:

| Parameter | Arti |
| --- | --- |
| `intensity` | terang. Sejak r155 satuan fisika — nilai 26–40 normal untuk lampu 4 m |
| `distance` | jarak maksimal jangkauan. `0` = tak terbatas (mahal) |
| `decay` | `2` = fisik (kuadrat jarak). Jangan diubah kecuali mau gaya khusus |

::: warning Biaya PointLight
Setiap `PointLight` tambahan menambah perhitungan di semua material. 18 ruangan × 1 lampu = 18 lampu → berat. Karena itu SIMRS 3D membatasi `MAX_ROOMS = 18` dan lampunya diberi `distance: 16` agar GPU bisa membatasi area.
:::

## Tanpa Cahaya: `MeshBasicMaterial`

Kalau objeknya penanda (cincin antre, bar progres, bayangan blob), pakai `MeshBasicMaterial` — tidak dihitung cahaya, selalu tampil sesuai warna.

```js
new THREE.CircleGeometry(0.4, 20),
new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 })
```

Ini "blob shadow" di bawah pasien — bayangan palsu yang jauh lebih murah daripada bayangan sungguhan untuk objek kecil yang terus bergerak.

## Bayangan Palsu (Blob Shadow)

Untuk objek yang berjumlah ratusan (pasien), bayangan asli terlalu mahal. Alternatif: lingkaran gelap datar di bawah objek.

```js
const blob = new THREE.Mesh(
  new THREE.CircleGeometry(0.4, 20),
  new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false })
)
blob.rotation.x = -Math.PI / 2
blob.position.y = 0.015          // sedikit di atas lantai, hindari z-fighting
g.add(blob)
```

## Checklist Cahaya

1. Ada `AmbientLight` atau `HemisphereLight` intensitas ~0.5–1?
2. Ada `DirectionalLight` dengan `position` yang tidak sejajar kamera?
3. `renderer.shadowMap.enabled = true`?
4. Kalau bayangan hilang: lebar `shadow.camera` cukup?
5. Kalau bayangan bergaris: atur `shadow.bias` / `normalBias`?
6. Kalau terlalu datar: tambah `scene.environment`?
