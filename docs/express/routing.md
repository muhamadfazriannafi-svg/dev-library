# Routing & Middleware

Routing menghubungkan method HTTP dan path ke fungsi penangan.

```js
app.get('/', (req, res) => res.send('GET home'))
app.post('/users', (req, res) => res.send('Buat user'))
app.put('/users/:id', (req, res) => res.send('Update user'))
app.delete('/users/:id', (req, res) => res.send('Hapus user'))
app.all('/rahasia', (req, res) => res.send('Semua method'))
```

Method tersedia: `get`, `post`, `put`, `patch`, `delete`, `all`.

## Parameter & Query

```js
// parameter path
app.get('/users/:id', (req, res) => {
  res.send(`User id: ${req.params.id}`)
})

// query string: /cari?kata=fazri&urut=nama
app.get('/cari', (req, res) => {
  const { kata, urut } = req.query
  res.json({ kata, urut })
})

// body (butuh express.json())
app.post('/users', (req, res) => {
  const { nama, email } = req.body
  res.status(201).json({ nama, email })
})
```

## Respons

```js
res.send('teks')                     // teks/HTML
res.json({ ok: true })               // JSON
res.status(404).json({ error: 'x' }) // status + JSON
res.redirect('/login')               // alihkan
res.sendFile('/path/ke/file.pdf')    // kirim file
res.sendStatus(204)                  // status saja
```

## Router Modular

Pisahkan route per fitur dengan `express.Router()`.

```js
// routes/users.js
import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => res.json({ users: [] }))
router.get('/:id', (req, res) => res.json({ id: req.params.id }))

export default router
```

```js
// index.js
import usersRouter from './routes/users.js'

app.use('/users', usersRouter)
```

## Middleware

Middleware adalah fungsi `(req, res, next)` yang berjalan sebelum atau sesudah handler. Ia bisa mengubah request, menghentikan respons, atau meneruskan ke `next()`.

```js
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`)
  next()   // lanjut ke middleware/handler berikutnya
}

app.use(logger)
```

Middleware populer:

```js
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.json())
```

Middleware hanya untuk route tertentu:

```js
function hanyaLogin(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Belum login' })
  }
  next()
}

app.get('/dashboard', hanyaLogin, (req, res) => {
  res.json({ ok: true })
})
```

## Urutan Middleware Penting

Middleware berjalan berurutan sesuai pendaftaran.

```js
app.use(express.json())      // 1. parse body
app.use(logger)              // 2. log
app.use('/api', apiRouter)   // 3. route
app.use(notFound)            // 4. 404
app.use(errorHandler)        // 5. error (paling akhir)
```

## Penanganan 404 & Error

```js
// 404 (letakkan setelah semua route)
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' })
})

// Error handler: WAJIB 4 argumen
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    error: err.message || 'Kesalahan server',
  })
})
```

::: warning
Express mengenali error handler dari jumlah argumen (4 buah). Tanpa `next` di urutan keempat, Express menganggapnya middleware biasa.
:::

## Async Handler (Express 5)

Di Express 5, error dari `async` otomatis diteruskan ke error handler:

```js
app.get('/users', async (req, res) => {
  const users = await db.getUsers()   // bila throw, otomatis ditangkap
  res.json(users)
})
```

Di Express 4, error `async` tidak tertangkap otomatis. Bungkus dengan `try/catch` atau pembantu:

```js
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

app.get('/users', asyncHandler(async (req, res) => {
  res.json(await db.getUsers())
}))
```

## Ringkasan

| Konsep | Peran |
| --- | --- |
| Route | memetakan method + path ke handler |
| `req.params` | nilai dari `:id` di path |
| `req.query` | nilai setelah `?` |
| `req.body` | body request (butuh `express.json()`) |
| Middleware | fungsi `(req,res,next)` berantai |
| Error handler | middleware 4 argumen di paling akhir |

Referensi: <https://expressjs.com/en/5x/guide/routing.html>
