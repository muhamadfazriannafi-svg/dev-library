# Instalasi & Setup Express

## Prasyarat: Node.js

Express berjalan di atas Node.js. Pasang Node.js dulu (versi LTS).

```bash
node -v      # cek versi Node
npm -v       # cek versi npm
```

Bila belum ada, unduh dari <https://nodejs.org/> (pilih **LTS**), atau lewat package manager:

```powershell
winget install OpenJS.NodeJS.LTS
```

## Membuat Proyek

```bash
mkdir proyek-express && cd proyek-express
npm init -y
npm install express
```

Buat `index.js`:

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Berjalan di http://localhost:${port}`)
})
```

Jalankan:

```bash
node index.js
```

## Menggunakan ES Modules

Tambahkan `"type": "module"` di `package.json`, lalu pakai `import`:

```json
{
  "name": "proyek-express",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

```js
import express from 'express'

const app = express()
app.listen(3000)
```

## Menjalankan Otomatis (Nodemon)

```bash
npm install -D nodemon
```

`package.json`:

```json
{
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  }
}
```

```bash
npm run dev
```

## Express Generator

Untuk struktur proyek siap pakai (folder routes, views, public):

```bash
npx express-generator proyek-saya --view=pug
cd proyek-saya
npm install
npm start
```

## Struktur Proyek yang Umum

```
proyek-express/
├── index.js            # entry point
├── package.json
├── .env                # variabel environment (jangan di-commit)
├── src/
│   ├── routes/         # definisi route
│   ├── controllers/    # logika request
│   ├── middlewares/    # middleware kustom
│   ├── services/       # logika bisnis
│   └── models/         # akses data
└── public/             # file statis
```

## Middleware Bawaan yang Sering Dipakai

```js
app.use(express.json())                         // parse JSON body
app.use(express.urlencoded({ extended: true })) // parse form
app.use(express.static('public'))               // file statis
```

## Variabel Environment

```bash
npm install dotenv
```

`.env`:

```ini
PORT=3000
DATABASE_URL=mysql://user:pass@localhost:3306/db
```

```js
import 'dotenv/config'

const port = process.env.PORT || 3000
```

::: tip
Tambahkan `.env` dan `node_modules/` ke `.gitignore`. Jangan pernah commit kredensial.
:::

## TypeScript (Opsional)

```bash
npm install -D typescript ts-node @types/node @types/express
npx tsc --init
```

```ts
import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript')
})

app.listen(3000)
```

## Cek Cepat Berhasil

```bash
curl http://localhost:3000
# Hello World!
```

Referensi: <https://expressjs.com/en/5x/starter/installing.html>
