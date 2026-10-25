# Tekstur & Label Teks

Three.js tidak punya objek teks. Teks dibuat sebagai **gambar di canvas** → dijadikan tekstur → ditempel ke `Sprite` atau `Mesh`.

Ini trik paling berguna untuk dashboard/visualisasi 3D: label nama, angka antre, status ruangan.

## Alur: Canvas → Texture → Sprite

```text
canvas 2D  →  CanvasTexture  →  SpriteMaterial  →  Sprite
```

Sprite selalu **menghadap kamera**, jadi teks tetap terbaca dari sudut mana pun.

## `makeLabel()` — Fungsi Lengkap dari SIMRS 3D

```js
function makeLabel(text, { size = 46, color = '#ffffff', bg = 'rgba(0,0,0,0.55)', pad = 26, max = 0 } = {}) {
  if (max && text.length > max) text = text.slice(0, max - 1) + '…'

  // ukur dulu lebar teks — canvas harus dibuat sesuai ukuran teks
  const m = document.createElement('canvas').getContext('2d')
  m.font = `bold ${size}px system-ui,sans-serif`
  const w = Math.ceil(m.measureText(text).width + pad * 2)
  const h = size + pad * 1.4

  // gambar teks di canvas
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d')
  g.font = `bold ${size}px system-ui,sans-serif`
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  if (bg) {
    g.fillStyle = bg
    g.beginPath()
    g.roundRect(0, 0, w, h, 18)
    g.fill()
  }
  g.fillStyle = color
  g.fillText(text, w / 2, h / 2)

  // jadi tekstur
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4

  return { tex, aspect: w / h }   // aspect dipakai untuk skala sprite
}
```

Poin penting:

| Bagian | Kenapa |
| --- | --- |
| Dua canvas | pertama hanya untuk `measureText`, kedua untuk menggambar |
| `measureText` | canvas harus **pas** selebar teks, kalau tidak kena padding kosong |
| `roundRect` | sudut membulat, jauh lebih rapi dari kotak tajam |
| `tex.colorSpace = SRGBColorSpace` | tanpa ini warna teks kusam/pucat |
| `tex.anisotropy` | mencegah teks buram saat dilihat miring |
| `aspect` dikembalikan | sprite perlu rasio lebar/tinggi agar tidak gepeng |

## Membuat Sprite dari Label

```js
function spriteLabel(text, pos, opts = {}) {
  const { tex, aspect } = makeLabel(text, opts)
  const h = opts.h ?? 1.3

  const s = new THREE.Sprite(new THREE.SpriteMaterial({
    map: tex,
    depthTest: false,
    transparent: true,
  }))
  s.scale.set(h * aspect, h, 1)   // lebar mengikuti teks, tinggi tetap
  s.position.copy(pos)
  s.renderOrder = 10
  scene.add(s)
  return s
}
```

Pemakaian:

```js
spriteLabel('PENDAFTARAN', new THREE.Vector3(0, 3.1, 15), { size: 52, color: '#79c0ff', h: 1.6 })
spriteLabel('KASIR', new THREE.Vector3(-13, 2.9, 12.4), { size: 46, color: '#bc8cff', h: 1.2 })
```

### `depthTest: false` — Label Selalu Terlihat

Dengan `depthTest: false`, sprite digambar **di atas** semua objek lain, sehingga tidak tertutup dinding. Cocok untuk label penting dan badge nomor antre.

Konsekuensinya: label juga tampil walau objeknya di balik gedung. Kalau itu mengganggu, matikan `depthTest` atau sembunyikan pada jarak tertentu:

```js
p.nameTag.visible = camera.position.distanceTo(p.mesh.position) < 34
```

### `renderOrder` — Urutan Gambar

Angka lebih besar digambar belakangan (di atas). SIMRS 3D memakai bertingkat:

| `renderOrder` | Objek |
| --- | --- |
| 5 | cincin seleksi (di lantai) |
| 10 | nama ruangan, papan departemen |
| 11 | badge nomor antre |
| 12 | nama pasien |

Tanpa `renderOrder`, dua sprite dengan `depthTest: false` bisa saling menimpa secara acak.

## Mengganti Teks pada Sprite yang Sudah Ada

Sprite tidak bisa "ganti tulisan". Harus buat tekstur baru, lalu lepas yang lama — **termasuk `dispose()`** agar tidak bocor:

```js
function setPatientLabel(p, txt) {
  const { tex, aspect } = makeLabel(txt, { size: 30, color: '#e6edf3', bg: 'rgba(13,17,23,0.78)', pad: 14, max: 30 })
  p.nameTag.material.map?.dispose()       // lepas tekstur lama
  p.nameTag.material.map = tex
  p.nameTag.material.needsUpdate = true   // beri tahu Three.js material berubah
  p.nameTag.scale.set(1.05 * aspect, 1.05, 1)
}
```

Ini terjadi setiap pasien naik status (antre → diperiksa → selesai). Warna badge ikut berubah: hijau `#56d364` untuk antre, kuning `#d29922` untuk sedang diperiksa.

## Teks pada Bidang Datar (Billboard Manual)

Kalau tidak mau selalu menghadap kamera, tempel tekstur ke `PlaneGeometry`:

```js
const { tex, aspect } = makeLabel('RUANG 01', { size: 40 })
const sign = new THREE.Mesh(
  new THREE.PlaneGeometry(1.6 * aspect, 1.6),
  new THREE.MeshBasicMaterial({ map: tex, transparent: true })
)
sign.position.set(0, 3, 5)
scene.add(sign)
```

Papan nama di SIMRS 3D justru memakai Sprite, karena ruangan dilihat dari banyak sudut.

## Tekstur Gambar Biasa

```js
const tex = new THREE.TextureLoader().load('/gambar/lantai.jpg')
tex.wrapS = tex.wrapT = THREE.RepeatWrapping
tex.repeat.set(8, 8)                      // ubin 8×8

const mat = new THREE.MeshStandardMaterial({ map: tex })
```

Texture loader **asinkron** — mesh langsung tampil dengan warna rata dulu, tekstur menyusul saat selesai dimuat.

## Menghemat: Cache Tekstur Label

Setiap label = satu canvas + satu tekstur GPU. Ratusan label statis (nama ruangan, papan departemen) itu wajar. Tapi kalau ada label yang isinya berulang (misal nomor 1–99), simpan hasilnya:

```js
const labelCache = new Map()
function cachedLabel(text, opts) {
  const key = text + '|' + JSON.stringify(opts)
  if (!labelCache.has(key)) labelCache.set(key, makeLabel(text, opts))
  return labelCache.get(key)
}
```

::: tip Batas praktis
Di bawah ~200 sprite aktif masih nyaman di GPU kelas bawah. Di atas itu, mulai pertimbangkan hanya menampilkan label yang dekat kamera (`visible` berbasis jarak) — seperti yang dilakukan SIMRS 3D.
:::

## Checklist Label

1. `colorSpace = SRGBColorSpace` sudah? (kalau tidak, warna pucat)
2. `depthTest: false` untuk label yang harus selalu terlihat?
3. `renderOrder` diberi angka berbeda?
4. Skala sprite memakai `h * aspect` — bukan `h` untuk kedua sumbu?
5. Tekstur lama di-`dispose()` saat diganti?
