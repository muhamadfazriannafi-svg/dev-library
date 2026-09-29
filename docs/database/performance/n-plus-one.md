# N+1 Query Problem

Masalah performa paling sering di aplikasi yang memakai ORM. Namanya "N+1" karena satu query awal diikuti N query tambahan — padahal seharusnya cukup satu atau dua query.

## Penyebabnya

Terjadi saat mengambil data induk, lalu di dalam *loop* mengakses relasi anak satu per satu.

```php
<?php
// 1 query untuk ambil semua order
$orders = Order::all();

foreach ($orders as $order) {
    // N query, satu untuk tiap order
    echo $order->user->name;
}
```

Kalau ada 100 order, query yang jalan = **1 + 100 = 101**, bukan 2. Tambah 10.000 order, jalan 10.001 query.

Pemicunya *lazy loading*: relasi baru di-*query* saat pertama diakses, bukan saat data induk diambil.

## Contoh SQL-nya

```sql
-- query 1: ambil induk
SELECT * FROM orders_t;

-- query 2..N+1: satu per baris induk
SELECT * FROM users_m WHERE id = 1;
SELECT * FROM users_m WHERE id = 2;
SELECT * FROM users_m WHERE id = 3;
-- ... dan seterusnya
```

## Cara Mendeteksi

- **Query log** — jumlah query meledak seiring jumlah data.
- **Laravel** — Laravel Debugbar atau Laravel Telescope menampilkan query per request.
- **Symfony/Django/Rails** — profiler bawaan masing-masing.
- **Dugaan awal**: ada relasi yang diakses di dalam `foreach`/loop.

::: tip Gejala khas
Query yang sama (beda nilai `WHERE id = ...`) muncul berulang puluhan kali. Itu tanda N+1.
:::

## Cara Mengatasi

### 1. Eager Loading (paling umum)

Ambil relasi sekaligus di query awal.

```php
<?php
// sebelum: lazy loading -> 1 + N query
$orders = Order::all();

// sesudah: eager loading -> 2 query
$orders = Order::with('user')->get();

foreach ($orders as $order) {
    echo $order->user->name;   // sudah dimuat, tidak query lagi
}
```

Di bawahnya, Eloquent menjalankan:

```sql
SELECT * FROM orders_t;
SELECT * FROM users_m WHERE id IN (1, 2, 3, ...);   -- satu query untuk semua
```

Relasi bersarang:

```php
<?php
$orders = Order::with('user', 'items.product')->get();
```

### 2. JOIN

Kalau hanya butuh beberapa kolom dari relasi, JOIN bisa lebih hemat:

```sql
SELECT o.id, o.total, u.name
FROM orders_t o
JOIN users_m u ON u.id = o.user_id;
```

### 3. Batch / IN Query Manual

Bahasa-agnostik: kumpulkan dulu semua ID, ambil sekaligus, lalu cocokkan di memori.

```php
<?php
$orders  = Order::all();
$userIds = $orders->pluck('user_id')->unique();

$users = User::whereIn('id', $userIds)->get()->keyBy('id');

foreach ($orders as $order) {
    echo $users[$order->user_id]->name;
}
```

### 4. Cache Hasil yang Sering Dipakai

Untuk data referensi yang jarang berubah (kategori, setting), simpan di cache agar tidak query ulang sama sekali.

## Perbandingan

| Pendekatan | Jumlah query (100 order) |
| --- | --- |
| Lazy loading (N+1) | 101 |
| Eager loading `with()` | 2 |
| JOIN | 1 |
| Batch `whereIn` manual | 2 |

## Jebakan Lain

- **N+1 tersembunyi** — relasi diakses di dalam accessor, serialisasi API, atau template. Kode terlihat aman, query tetap meledak.
- **Eager loading berlebihan** — memuat relasi yang tidak dipakai sama borosnya; pilih relasi yang benar-benar dibutuhkan.
- **Loop di dalam loop** — bisa jadi N+1 bertingkat (N×M). Periksa tiap level relasi.

::: warning
N+1 tidak terlihat saat data uji cuma 5 baris. Uji dengan data besar, atau aktifkan peringatan jumlah query di lingkungan *development*.
:::

## Ringkasan

1. Curigai setiap relasi yang diakses di dalam loop.
2. Muat lebih awal: `with()`, JOIN, atau `whereIn`.
3. Ukur dengan query log/profiler, jangan menebak.
