# Studi Kasus: SIMRS 3D

Membedah proyek nyata — simulator alur pasien rumah sakit dalam 3D, dari data PostgreSQL.

```text
PostgreSQL (pasien_m, pasien_daftar_t, antrian_pasien_diperiksa_t, ruangan_m, pegawai_m)
        │
        │  Node.js /api/data   (read-only, poll 30 detik)
        ▼
index.html  →  Three.js scene  →  bangunan + orang bergerak
```

## Struktur Berkas

```text
simrs3d/
├── server.js      # HTTP server + endpoint /api/data + serve index.html
├── patients.js    # SQL pasien + registrasi + antrean + kasir
├── rooms.js       # SQL ruangan_m
├── staff.js       # SQL pegawai_m (dokter/perawat)
└── index.html     # seluruh aplikasi 3D (~1500 baris)
```

Seluruh frontend ada di **satu file**. Keputusan yang wajar untuk visualisasi internal: tanpa build step, tanpa `node_modules` di sisi klien, bisa dibuka dari mana saja.

## Bagian 1 — Bootstrap (baris 29–53)

```html
<script type="importmap">
{ "imports": {
  "three": "https://unpkg.com/three@0.169.0/build/three.module.js",
  "three/addons/": "https://unpkg.com/three@0.169.0/examples/jsm/"
} }
</script>
```

Plus penampil error di layar — berguna karena aplikasi ini dijalankan di komputer petugas, bukan di laptop developer.

```js
function showErr(...a) {
  errLog.push(a.map(x => (x && x.stack) || String(x)).join(' '))
  errBox.textContent = errLog.slice(-6).join('\n')
  errBox.style.display = 'block'
}
addEventListener('error', e => showErr(e.message, e.filename + ':' + e.lineno))
addEventListener('unhandledrejection', e => showErr('promise:', e.reason))
```

Pola ini layak ditiru untuk semua aplikasi internal: **jangan andalkan pengguna membuka DevTools.**

## Bagian 2 — Konstanta (baris 55–69)

```js
const ROOM_W = 7.4, ROOM_D = 9.4   // footprint satu ruangan (meter)
const GAP_X = 1.6, GAP_Z = 12.0    // jarak antar ruangan
const PER_ROW = 6                  // ruangan per baris per departemen
const MAX_ROOMS = 18               // batas render (performa)
const MAX_ROOMS_PER_DEPT = 12
const SLOTS = 3                    // kursi per ruangan
const REG_TIME = 2.0               // detik registrasi
const DOCTOR_TIME = 6.5            // detik layanan dokter

const DEPT_COLORS = [0x3fb950, 0x58a6ff, 0xd29922, 0xbc8cff, 0x39c5cf, 0xf85149, 0xffa657, 0xa5b7c9]
```

Semua angka ajaib di satu tempat di atas file. Tidak ada `7.4` yang berserakan di 1500 baris.

## Bagian 3 — Renderer, Scene, Kamera, Kontrol (baris 76–113)

```js
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.05
document.body.appendChild(renderer.domElement)
```

Lihat pembahasan tiap baris di [Scene, Renderer, Kamera](/threejs/scene-renderer-kamera) dan [Kontrol Kamera](/threejs/kontrol-kamera).

Poin desain: **kamera tidak dipilih manual** — ia dihitung ulang setiap kali bangunan dibangun ulang (baris 353–361), supaya seluruh gedung selalu masuk layar apa pun jumlah ruangannya.

## Bagian 4 — Label Teks (baris 155–183)

```js
function makeLabel(text, { size = 46, color = '#ffffff', bg = 'rgba(0,0,0,0.55)', pad = 26, max = 0 } = {}) {
  // ukur → gambar di canvas → CanvasTexture → { tex, aspect }
}
function spriteLabel(text, pos, opts = {}) {
  // SpriteMaterial({ map: tex, depthTest: false }) + scale proporsional
}
```

Dipakai untuk semua teks di scene: `PENDAFTARAN`, `KASIR`, nama departemen, nama ruangan, nomor antre, nama pasien. Detail di [Tekstur & Label](/threejs/tekstur-label).

## Bagian 5 — Dari Data ke Bangunan (baris 260–364)

Ini inti proyek: array baris DB → gedung.

```js
function buildRooms(rows) {
  clearRooms()                     // 1. bersihkan (dengan dispose)

  const groups = new Map()          // 2. kelompokkan per departemen
  for (const row of rows) {
    const key = String(row.dept ?? 0)
    if (!groups.has(key)) groups.set(key, { id: row.dept ?? 0, name: row.departemen, rooms: [] })
    groups.get(key).rooms.push(row)
  }
  const depts = [...groups.values()].sort((a, b) => b.rooms.length - a.rooms.length)

  // 3. tata letak: blok per departemen, 2 kolom ke belakang (−Z)
  // 4. per baris: hitung x/z, buat Group, panggil buildRoomContent()
  // 5. setelah selesai: sesuaikan lantai, grid, kamera, fog
}
```

### Pola tata letak otomatis

```js
const x = cx + (c - (PER_ROW - 1) / 2) * (ROOM_W + GAP_X)   // kolom ke-c, di-center
const z = startZ - r2 * (ROOM_D + 4)                        // baris ke-r2, mundur
```

`(c - (PER_ROW - 1) / 2)` adalah idiom **centering**: untuk 6 kolom, hasilnya `-2.5 … +2.5` — simetris terhadap sumbu tengah. Tidak perlu hitung `if` per posisi.

### Interpolasi ke ukuran scene

Setelah semua blok diletakkan, ukuran lantai, grid, kabut, dan jarak kamera dihitung dari bentang yang dihasilkan:

```js
const deepest = Math.min(...colZ)
const spanX = (widest + 8) * COLS_DEPT + 16
const spanZ = Math.abs(deepest) + 34

floor.geometry.dispose()
floor.geometry = new THREE.BoxGeometry(spanX + 12, 0.6, spanZ + 26)

scene.fog.far = Math.max(105, spanZ * 2.1 + 120)
scene.fog.near = scene.fog.far * 0.5
```

Inilah yang membuat simulator tetap enak dilihat dengan 3 ruangan maupun 18 ruangan.

## Bagian 6 — Satu Ruangan (baris 446–588)

`buildRoomContent(room, row, color, i, pts)`:

1. **Dinding** — 3 solid + 2 segmen depan mengapit pintu + 1 ambang atas
2. **Tepi** — `EdgesGeometry` berwarna departemen di tiap dinding
3. **Kusen & kepala dinding** — garis warna departemen sebagai identitas visual
4. **Lantai keramik**, **panel lampu** + `PointLight`
5. **Papan nama** di atas pintu (Sprite)
6. **3 kursi** (rawat jalan) atau **3 kasur + tiang infus** (rawat inap)
7. **Titik antre** di depan pintu (`waitSpots`), **titik pintu** (`door`)
8. **Dokter** — `CapsuleGeometry` badan + `SphereGeometry` kepala
9. **Bar progres** layanan dokter

```js
addWall(WALL_T, WALL_H, ROOM_D, -ROOM_W / 2, WALL_H / 2, 0)      // kiri
addWall(WALL_T, WALL_H, ROOM_D,  ROOM_W / 2, WALL_H / 2, 0)      // kanan
addWall(ROOM_W, WALL_H, WALL_T, 0, WALL_H / 2, -ROOM_D / 2)      // belakang
// depan: dua segmen + ambang, menyisakan celah DOOR_W untuk pintu
```

Pelajaran: **satu fungsi = satu ruangan lengkap**, termasuk data pendukungnya (`room.slots`, `room.waitSpots`). Bukan hanya geometri — state-nya juga.

## Bagian 7 — Orang (baris 590–713)

```js
const GEO = {
  torso: new THREE.CapsuleGeometry(0.24, 0.5, 6, 12),
  arm:   new THREE.CapsuleGeometry(0.055, 0.34, 4, 8),
  leg:   new THREE.CapsuleGeometry(0.075, 0.4, 4, 8),
  head:  new THREE.SphereGeometry(0.25, 16, 16),
  hairCap: new THREE.SphereGeometry(0.255, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.58),
}
```

`buildPerson(n, jk)` merakit satu orang dengan variasi dari **indeks** `n` (bukan warna acak, supaya sama setiap render):

| Bagian | Variasi |
| --- | --- |
| Baju | `PALETTE[n % PALETTE.length]` — warna = identitas |
| Kulit | `skinTones[n % skinTones.length]` |
| Rambut | `HAIR[n % HAIR.length]` + cepol kalau `jk === 2` |
| Badan | skala `x` beda antara laki-laki/perempuan |

```js
const female = jk === 2
const SW = female ? 0.92 : 1.05
const SX = female ? 1.12 : 1.0
```

Variasi bentuk hanya lewat **skala**, bukan geometri berbeda — satu set geometri untuk semua orang (lihat [Performa](/threejs/performa)).

Yang dikembalikan adalah **handle** untuk dianimasikan:

```js
return { g, torso, armL, armR, legL, legR, head, mouth, body: torso, female }
```

## Bagian 8 — Simulasi (baris 911–1317)

### `stepSlots()` — alokasi tempat

Setiap tick, slot dikosongkan lalu diisi ulang berdasarkan urutan antrean:

```js
waitSlots.forEach(s => (s.ocupant = null))
waitingQueue.forEach((p, i) => {
  const s = waitSlots[Math.min(i, waitSlots.length - 1)]
  if (s && !s.ocupant) {
    s.ocupant = p
    p.target = s.pos.clone()
  }
})
```

Pendekatan *rebuild setiap tick* ini sederhana dan selalu konsisten — tidak perlu logika "lepas slot" yang mudah salah. Biayanya kecil (12 slot).

### `tick(dt)` — state machine

```js
if (p.state === 'tunggu-pasienm') {
  if (p.waitSlot === waitSlots[0] && p.timer > REG_TIME) { /* → jalan-daftar */ }
} else if (p.state === 'jalan-daftar') {
  if (dist < 0.3) { p.state = 'daftar'; p.timer = 0 }
} else if (p.state === 'daftar') {
  if (p.timer > REG_TIME) register(p)
} else if (p.state === 'dilayani') {
  if (p.timer > DOCTOR_TIME) { /* → ke-kasir */ }
}
// ...
```

Setiap transisi juga **memperbarui representasi DB di memori** (`p.antrian.tanggal_panggil_perawat`, `status_antrian`, dst). Jadi klik pasien menampilkan data yang konsisten dengan tahap visualnya.

## Bagian 9 — Sinkronisasi DB (baris 1027–1134)

```js
async function loadData() {
  const r = await fetch('/api/data' + qs, { cache: 'no-store' })
  const j = await r.json()
  dbState.waiting    = j.waiting     // pasien_m belum registrasi
  dbState.queue      = j.queue       // antrian_pasien_diperiksa_t
  dbState.rooms      = j.rooms       // ruangan_m
  dbState.doctors    = j.staff?.doctors
  // ...
}
setInterval(loadData, 30000)
loadData()
```

**Bangunan hanya dibangun sekali** (`if (!roomBuilt && ...)`), sedangkan pasien terus diputar dari data. Membangun ulang seluruh gedung setiap 30 detik akan membuang memori dan membuat kamera melompat.

Ini pola yang benar untuk dashboard: **struktur statis, konten dinamis**.

## Bagian 10 — Klik Pasien (baris 1327–1424)

```js
raycaster.setFromCamera(pointer, camera)
const hits = raycaster.intersectObjects(patients.map(p => p.mesh), true)
// cari Group pasien dari mesh anak, lalu buka panel detail HTML
```

Panel detail adalah **HTML biasa**, bukan objek 3D. Untuk menampilkan 18 baris tabel data, HTML jauh lebih tepat. Pembahasannya di [Raycaster](/threejs/raycaster).

## Bagian 11 — Loop (baris 1462–1491)

```js
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.08)
  applyPanKeys(dt)
  tick(dt)
  updateHud(dt)
  controls.update()
  composer.render()
})
```

## Yang Bisa Ditiru

| Pola | Manfaat |
| --- | --- |
| Konstanta di satu blok atas | mudah di-tuning tanpa cari-cari |
| `buildX()` mengembalikan objek, bukan menambah ke scene sendiri | pemanggil yang mengatur tata letak |
| Geometri & material di-cache global | ratusan objek, sedikit resource GPU |
| Teks lewat canvas → `CanvasTexture` → `Sprite` | label tanpa font/aset eksternal |
| Kamera dihitung dari `spanX/spanZ` | selalu pas untuk skala apa pun |
| State machine + `timer` | perilaku mudah dibaca |
| `clearRooms()` dengan `dispose()` | rebuild tanpa bocor |
| Panel info pakai HTML | tabel data tidak perlu jadi objek 3D |

## Yang Bisa Diperbaiki

- **Satu file 1500 baris.** Pecah jadi modul (`scene.js`, `people.js`, `sim.js`, `ui.js`). Dengan import map, ini bisa tanpa bundler.
- **Kredensial DB di kode** (`patients.js`). Pindahkan ke `.env`.
- **`/api/data` tanpa autentikasi.** Data pasien adalah data medis — minimal batasi ke jaringan internal.
- **`MAX_ROOMS = 18`** adalah batas keras; ruangan di atasnya hilang dari visual tanpa peringatan jelas di UI.
- **Tidak ada tes.** Untuk geometri tata letak, tes sederhana pada hasil hitung koordinat (tanpa WebGL) sudah cukup mendeteksi regresi.

## Ringkasan Alur File

```js
// 1. konfigurasi     — konstanta, warna departemen
// 2. renderer/scene  — WebGLRenderer, Scene, fog, environment
// 3. kamera+kontrol  — PerspectiveCamera, OrbitControls, pan keyboard
// 4. cahaya          — Hemisphere, Directional (shadow), Point per ruang
// 5. helper          — makeLabel(), spriteLabel(), ceilingLamp()
// 6. area tetap      — pendaftaran, ruang tunggu, kasir
// 7. bangunan        — buildRooms() → buildRoomContent() → buildBed/buildChair
// 8. orang           — GEO, matCache, buildPerson(), spawn()
// 9. simulasi        — stepSlots(), register(), moveTo(), tick()
// 10. data           — loadData(), assignDoctors(), seedRegistered()
// 11. interaksi      — Raycaster, panel detail
// 12. loop           — setAnimationLoop, resize
```
