# Geometri & Material

Satu `Mesh` = **geometri** (bentuk) + **material** (tampilan).

```js
const mesh = new THREE.Mesh(geometry, material)
```

## Geometri Bawaan

| Geometri | Dipakai untuk | Contoh SIMRS 3D |
| --- | --- | --- |
| `BoxGeometry(w, h, d)` | apa saja yang kotak | dinding, meja, lantai, layar monitor |
| `SphereGeometry(r, seg, seg)` | bola, kepala | `headGeo = new THREE.SphereGeometry(0.25, 16, 16)` |
| `CapsuleGeometry(r, len, cap, seg)` | badan, tangan, kaki | `new THREE.CapsuleGeometry(0.24, 0.5, 6, 12)` |
| `CylinderGeometry(rt, rb, h, seg)` | tiang, kaki kursi | tiang infus, penyekat antre |
| `PlaneGeometry(w, h)` | bidang datar 1 sisi | bar progres dokter |
| `RingGeometry(ri, ro, seg)` | cincin | penanda kursi, seleksi |
| `CircleGeometry(r, seg)` | lingkaran | bayangan blob pasien |
| `ConeGeometry(r, h, seg)` | kerucut | hidung |

```js
new THREE.BoxGeometry(11, 1.15, 1.8)          // meja pendaftaran
new THREE.CylinderGeometry(0.05, 0.05, 1, 8)  // tiang penyekat
new THREE.RingGeometry(0.34, 0.42, 24)        // cincin penanda antre
```

### Segmen: Kualitas vs Biaya

Angka terakhir = jumlah segmen. Bola `16, 16` sudah cukup untuk kepala di layar; `64, 64` hanya perlu untuk close-up.

```js
new THREE.SphereGeometry(0.25, 16, 16)   // 16 potongan horizontal, 16 vertikal
new THREE.SphereGeometry(0.25, 64, 64)   // 16× lebih banyak segitiga
```

SIMRS 3D mendefinisikan geometri orang **sekali** di objek `GEO` lalu memakainya ulang untuk semua pasien:

```js
const GEO = {
  torso: new THREE.CapsuleGeometry(0.24, 0.5, 6, 12),
  arm:   new THREE.CapsuleGeometry(0.055, 0.34, 4, 8),
  head:  new THREE.SphereGeometry(0.25, 16, 16),
}
```

Ratusan pasien × 1 set geometri = hemat memori GPU drastis. Detail di [Performa](/threejs/performa).

## Material

| Material | Karakter |
| --- | --- |
| `MeshBasicMaterial` | tidak kena cahaya — murah, untuk UI/penanda |
| `MeshStandardMaterial` | PBR standar, kena cahaya, default pilihan |
| `MeshPhysicalMaterial` | PBR + lapisan (clearcoat, transmission/kaca) |
| `MeshLambertMaterial` | kena cahaya, perhitungan per-vertex, murah |
| `MeshNormalMaterial` | warna dari arah normal — untuk debug |
| `LineBasicMaterial` | garis |
| `SpriteMaterial` | selalu menghadap kamera |

### `MeshStandardMaterial` — Yang Sering Dipakai

```js
new THREE.MeshStandardMaterial({
  color: 0x39424f,        // warna dasar (hex, bukan string)
  roughness: 0.85,        // 0 = cermin, 1 = matte
  metalness: 0.05,        // 0 = plastik/kayu, 1 = logam
})
```

Resep dari SIMRS 3D:

| Benda | `color` | `roughness` | `metalness` |
| --- | --- | --- | --- |
| Dinding | `0x39424f` | `0.85` | `0.05` |
| Lantai | `0x1c2430` | `0.35` | `0.25` |
| Rangka besi kasur | `0x8d99a8` | `0.45` | `0.6` |
| Top meja logam | `0x8b98a8` | `0.2` | `0.8` |
| Linen (kain) | `0xdfe8f2` | `0.9` | (0) |
| Kulit orang | `0xf1c8a8` | `0.8` | (0) |
| Tiang penyekat | `0x9aa7b8` | `0.25` | `0.9` |

Aturan cepat: **kain & organik → roughness tinggi**; **logam → metalness tinggi + roughness rendah**; **beton/kayu → keduanya sedang**.

### Emissive — Objek yang Menyala

Layar monitor, lampu, tanda pintu memakai `emissive` supaya tetap terlihat terang walau tidak kena cahaya:

```js
new THREE.MeshStandardMaterial({
  color: 0x0a1520,
  emissive: 0x1f6feb,
  emissiveIntensity: 1.6,
})
```

`emissive` = warna cahaya yang dipancarkan sendiri. Nilai `> 1` akan memicu bloom kalau [post-processing](/threejs/post-processing) aktif.

### Transparansi

```js
new THREE.MeshStandardMaterial({
  color: 0x58a6ff,
  transparent: true,
  opacity: 0.6,
})
```

::: warning Urutan transparan
Objek `transparent: true` dirender belakangan dan tidak melakukan depth-write. Dua objek transparan yang saling menembus akan tampak salah. Solusi: `depthWrite: false` untuk penanda datar, atau `renderOrder` untuk memaksa urutan.
:::

### Sisi Mana yang Digambar

Plane dan sebagian geometri hanya punya satu sisi. Untuk penanda yang dilihat dari dua arah:

```js
new THREE.MeshBasicMaterial({ color: 0x58a6ff, side: THREE.DoubleSide })
```

`THREE.FrontSide` (default), `THREE.BackSide`, `THREE.DoubleSide`.

## Geometri Kustom (BufferGeometry)

Kalau bentuk bawaan kurang, susun sendiri dari titik:

```js
const geo = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(5, 0, 10),
])
const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x58a6ff }))
```

Ini yang dipakai SIMRS 3D untuk garis alur pasien (`drawLinks()`).

## Outline dari Geometri Bawaan

Trik murah untuk memberi tepi dinding: `EdgesGeometry` mendeteksi tepi tajam, lalu digambar sebagai `LineSegments`.

```js
const edge = new THREE.LineSegments(
  new THREE.EdgesGeometry(mesh.geometry),
  new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.65 })
)
edge.position.copy(mesh.position)
```

Hasil: garis berwarna departemen di sekeliling setiap dinding, tanpa menambah geometri baru yang mahal.

## Ringkasan

- Satu geometri dipakai banyak mesh → aman, dan hemat.
- Material boleh beda per mesh; material yang sama sebisa mungkin di-cache.
- `MeshStandardMaterial` untuk hampir semua benda terlihat. `MeshBasicMaterial` untuk penanda.
- Angka segmen = biaya. Mulai kecil, naikkan hanya kalau terlihat kasar.
