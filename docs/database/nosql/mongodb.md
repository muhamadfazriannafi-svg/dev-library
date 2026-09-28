# MongoDB

Basis data *document-oriented*: data disimpan sebagai dokumen mirip JSON (sebenarnya BSON) di dalam *collection*.

## Istilah

| SQL | MongoDB |
| --- | --- |
| tabel | collection |
| baris | document |
| kolom | field |
| JOIN | `$lookup` / embed |

## CRUD Dasar (mongosh)

```js
// INSERT
db.users_m.insertOne({ name: "Fazri", email: "fazri@mail.com", aktif: true })
db.users_m.insertMany([{ name: "Budi" }, { name: "Sari" }])

// SELECT
db.users_m.find({ aktif: true })
db.users_m.findOne({ email: "fazri@mail.com" })

// UPDATE
db.users_m.updateOne({ _id: 1 }, { $set: { aktif: false } })
db.users_m.updateMany({ aktif: false }, { $set: { arsip: true } })

// DELETE
db.users_m.deleteOne({ _id: 1 })
db.users_m.deleteMany({ aktif: false })
```

Filter bergaya query:

```js
db.orders_t.find({ total: { $gt: 100000 } })
db.orders_t.find({ status: { $in: ["paid", "shipped"] } })
db.orders_t.find({ "alamat.kota": "Jakarta" })
db.orders_t.find().sort({ created_at: -1 }).limit(10)
```

## Embed vs Reference

**Embed** — data anak disimpan di dalam dokumen induk. Cepat dibaca sekali ambil, cocok bila selalu diakses bersama.

```js
{
  _id: 1,
  nama: "Fazri",
  alamat: { kota: "Jakarta", kode_pos: "12345" }
}
```

**Reference** — simpan `_id` dokumen lain. Dipakai bila data dipakai bersama atau tumbuh tanpa batas.

```js
{ _id: 10, user_id: 1, total: 250000 }
```

## Aggregation Pipeline

Pengganti `GROUP BY` / `JOIN`, berupa tahap berurutan:

```js
db.orders_t.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$user_id", total: { $sum: "$total" }, jumlah: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 5 }
])
```

Menggabungkan collection lain dengan `$lookup`:

```js
db.orders_t.aggregate([
  { $lookup: {
      from: "users_m",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
  }}
])
```

## Index

```js
db.users_m.createIndex({ email: 1 }, { unique: true })
db.orders_t.createIndex({ user_id: 1, created_at: -1 })
db.orders_t.find({ status: "paid" }).explain("executionStats")
```

## Soft Delete & Konvensi `_m` / `_t`

Konvensi penamaan yang sama bisa dipakai: `users_m`, `orders_t`. Soft delete tinggal menambah field:

```js
db.users_m.updateOne({ _id: 5 }, { $set: { deleted_at: new Date() } })
db.users_m.find({ deleted_at: null })
```

::: tip
Di MongoDB, desain skema dimulai dari **cara data dibaca**, bukan dari normalisasi. Embed kalau selalu dibaca bersama; reference kalau sering berubah atau dibagi.
:::

::: warning
Satu dokumen dibatasi 16 MB. Jangan embed array yang bisa tumbuh tanpa batas (mis. semua komentar sebuah artikel populer) — pakai collection terpisah.
:::
