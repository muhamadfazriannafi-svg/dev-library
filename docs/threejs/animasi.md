# Animasi & Game Loop

## `setAnimationLoop` — Bukan `requestAnimationFrame`

```js
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera)
})
```

`renderer.setAnimationLoop` memakai `requestAnimationFrame` di dalamnya, tapi juga:

- otomatis berhenti saat tab tidak aktif (hemat baterai);
- **wajib** untuk WebXR (VR/AR);
- bisa dimatikan dengan `renderer.setAnimationLoop(null)`.

Jangan campur dengan `requestAnimationFrame` sendiri.

## Delta Time — Jangan Mengandalkan 60 FPS

Kalau animasi memakai konstanta tetap per frame:

```js
cube.rotation.y += 0.01        // ❌
```

...maka di layar 144 Hz kotak berputar 2,4× lebih cepat dari layar 60 Hz. Di laptop yang sedang sibuk, animasi malah melambat. Selalu kalikan dengan **delta time** (detik sejak frame lalu).

```js
const clock = new THREE.Clock()

renderer.setAnimationLoop(() => {
  const dt = clock.getDelta()          // detik sejak panggilan terakhir
  cube.rotation.y += 1.5 * dt          // 1,5 radian per DETIK
  renderer.render(scene, camera)
})
```

Sekarang kecepatan sama di semua perangkat.

### `dt` Dibatasi

Saat pindah tab atau koneksi macet, `dt` bisa melompat ke 2 detik — dan objek melesat jauh melewati tujuan.

```js
const dt = Math.min(clock.getDelta(), 0.08)   // maksimal 80 ms per frame
```

Ini potongan dari SIMRS 3D. Angka `0.08` = batas bawah 12,5 FPS; di bawah itu game "slow-motion" ketimbang melompat.

## Pola Loop SIMRS 3D

```js
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.08)
  applyPanKeys(dt)      // input → kamera
  tick(dt)              // simulasi: pasien bergerak, antre, status
  updateHud(dt)         // UI HTML (di-throttle)
  controls.update()     // kamera damping
  composer.render()     // gambar + post-processing
})
```

Urutannya penting: **update state dulu, render terakhir.** Render hanya "memotret" kondisi saat itu.

## Gerak Menuju Target (Manual Lerp)

Pola paling sering: objek bergerak menuju titik dengan kecepatan konstan.

```js
const tmp = new THREE.Vector3()

function moveTo(p, dt) {
  tmp.copy(p.target).sub(p.mesh.position)
  tmp.y = 0                              // gerak hanya di bidang lantai
  const dist = tmp.length()
  const speed = 4.0                      // unit per detik

  if (dist > 0.12 && speed > 0) {
    const step = Math.min(dist, speed * dt)   // jangan melewati target
    p.mesh.position.addScaledVector(tmp.normalize(), step)
  }
  return dist
}
```

`Math.min(dist, speed * dt)` mencegah objek "melesat" melewati target ketika target sudah dekat — bug klasik.

### Menghadap Arah Gerak

```js
const want = Math.atan2(tmp.x, tmp.z)     // sudut dari vektor arah
let d = want - p.mesh.rotation.y
d = Math.atan2(Math.sin(d), Math.cos(d))  // normalisasi ke [-π, π]
p.mesh.rotation.y += d * Math.min(1, dt * 9)
```

::: tip Kenapa `atan2(sin, cos)`
Selisih sudut `want - current` bisa `350°` padahal artinya hanya `-10°`. Objek akan berputar hampir satu lingkaran penuh. `atan2(sin(d), cos(d))` membungkusnya ke jalur terpendek.
:::

`Math.min(1, dt * 9)` = faktor rotasi maksimal per frame, jadi putaran tidak terlalu cepat.

## Interpolasi (Easing)

Ada dua gaya:

### Eksponensial — mendekati target makin lambat

```js
mesh.position.y += (0.82 - mesh.position.y) * Math.min(1, dt * 6)
```

Murah, tanpa state tambahan, cocok untuk "menyesuaikan diri". Dipakai SIMRS 3D untuk badan pasien kembali ke posisi diam.

### Lerp linear dengan `t`

```js
mesh.position.lerp(target, 0.1)              // 10% jarak per frame
camera.position.lerpVectors(a, b, t)          // t dari 0..1
```

`lerp(target, 0.1)` **tidak** sama dengan 10% per detik — ia 10% per frame, jadi bergantung FPS. Kalau ingin per detik, pakai eksponensial:

```js
const k = 1 - Math.pow(0.001, dt)     // ~99,9% tercapai dalam 1 detik
mesh.position.lerp(target, k)
```

### Ease-out untuk transisi terasa "hidup"

```js
const e = 1 - Math.pow(1 - t, 3)      // cubic ease-out
```

Cepat di awal, lembut di akhir. Inilah yang membedakan animasi terasa premium dan animasi kaku.

## Animasi Berbasis Fungsi (Procedural)

Tidak butuh data animasi. Cukup `sin`/`cos` dari waktu.

### Bob saat berjalan

```js
const ph = performance.now() * 0.012 + p.id     // + id agar tiap orang berbeda fase
const bob = Math.abs(Math.sin(ph)) * 0.05
p.body.position.y = 0.82 + bob
p.person.head.position.y = 1.26 + bob
```

### Ayun tangan dan kaki

```js
const swing = Math.sin(ph) * 0.55
p.person.legL.rotation.x = swing
p.person.legR.rotation.x = -swing       // berlawanan
p.person.armL.rotation.x = -swing * 0.8 // berlawanan dengan kaki se sisi
p.person.armR.rotation.x = swing * 0.8
```

Empat baris = animasi jalan yang meyakinkan tanpa satu file animasi pun.

### Kembali ke posisi diam saat berhenti

```js
for (const k of ['legL', 'legR', 'armL', 'armR']) {
  p.person[k].rotation.x *= 1 - Math.min(1, dt * 6)   // menuju 0
}
```

## Animasi Berbasis State Machine

Untuk perilaku (bukan sekadar gerak), gunakan state eksplisit. SIMRS 3D punya alur pasien:

```text
tunggu-pasienm → jalan-daftar → daftar → antre-poli → dilayani → ke-kasir → kasir → pulang
```

```js
function tick(dt) {
  for (const p of patients.slice()) {
    p.timer += dt
    const dist = moveTo(p, dt)

    if (p.state === 'jalan-daftar') {
      if (dist < 0.3) { p.state = 'daftar'; p.timer = 0 }
    } else if (p.state === 'daftar') {
      if (p.timer > REG_TIME) register(p)        // transisi
    }
    // ...
  }
}
```

Aturan emas: **satu state aktif, transisi eksplisit, timer di-reset tiap pindah state.** Ini membuat perilaku mudah dibaca dan di-debug.

::: tip `patients.slice()`
Iterasi atas **salinan** array, karena di dalam loop bisa terjadi `removePatient()` yang mengubah array aslinya. Tanpa `slice()`, elemen terlewat atau index kacau.
:::

## Animasi Material

Tidak hanya posisi. Opacity, warna, dan skala bar juga bisa dianimasikan:

```js
// bar progres dokter
const t = Math.min(1, r.doctorBusy / r.doctorBusyMax)
r.bar.scale.x = Math.max(0.001, t)
r.bar.position.x = 2.4 - 0.8 * (1 - t)        // tetap terpusat
r.bar.material.color.setHex(t > 0.999 ? 0x3fb950 : r.color)

// glow kursi terisi
s.glow.material.opacity += (0.35 - s.glow.material.opacity) * 0.15
```

`setHex()` mengubah warna material di tempat — tidak perlu material baru.

## Throttle Update UI

HUD berbasis HTML tidak perlu 60×/detik. Mengubah `innerHTML` 60×/detik memicu layout ulang terus-menerus.

```js
let hudAcc = 0
function updateHud(dt) {
  hudAcc += dt
  if (hudAcc < 0.4) return          // 2,5× per detik saja
  hudAcc = 0
  hud.innerHTML = `...`
}
```

## Ringkasan

| Butuh | Pakai |
| --- | --- |
| sumber waktu | `clock.getDelta()` |
| batas aman | `Math.min(dt, 0.08)` |
| gerak konstan | `addScaledVector(dir, speed * dt)` |
| menyesuaikan diri | `x += (target - x) * Math.min(1, dt * k)` |
| transisi terlihat mahal | ease-out `1 - (1-t)**3` |
| perilaku | state machine + `timer` |
| UI HTML | throttle 0,2–0,5 detik |
