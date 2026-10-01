# Kumpulan Dokumentasi Express

Express adalah framework web untuk Node.js. Minimalis dan *unopinionated* — ia menyediakan routing dan middleware, sisanya kamu susun sendiri.

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Berjalan di http://localhost:3000')
})
```

## Mengapa Express

- **Minimalis** — inti kecil, ditambah lewat middleware.
- **Ekosistem middleware raksasa** — auth, CORS, logging, upload, dll.
- **Fleksibel** — bebas memilih struktur & database.
- **Banyak dipakai** — fondasi dari banyak framework Node lain.
- **Dokumentasi**: <https://expressjs.com/>

## Versi Terbaru

| Versi | Status |
| --- | --- |
| **5.2.1** | stabil terbaru (v5) |
| 4.x | masih dipakai luas, maintenance |

Catatan rilis: <https://github.com/expressjs/express/releases>

::: warning Perbedaan utama v5
Express 5 menaikkan minimum Node.js, memperbaiki penanganan error pada `async`, dan mengubah beberapa sintaks path (`*` kini harus bernama, mis. `/*splat`). Saat migrasi dari v4, baca panduan migrasinya.
:::

## Instalasi Cepat

```bash
mkdir proyek && cd proyek
npm init -y
npm install express
node index.js
```

## Daftar Materi

- [Instalasi & Setup](/express/instalasi) — pasang Node.js & Express, struktur proyek
- [Routing & Middleware](/express/routing) — route, middleware, penanganan error

## Ekosistem

| Paket | Fungsi |
| --- | --- |
| `nodemon` | auto-restart saat file berubah |
| `cors` | izin akses lintas origin |
| `morgan` | logging request |
| `dotenv` | variabel environment |
| `express-validator` / `zod` | validasi input |
| `helmet` | header keamanan |
| `multer` | upload file |
