# SELECT

Mengambil data dari tabel. Perintah SQL yang paling sering dipakai.

## Dasar

```sql
SELECT * FROM users_m;
SELECT id, name, email FROM users_m;
SELECT name AS nama_lengkap FROM users_m;
```

## WHERE — Menyaring

```sql
SELECT * FROM users_m WHERE is_active = TRUE;
SELECT * FROM orders_t WHERE total > 100000;
SELECT * FROM users_m WHERE name LIKE 'A%';
SELECT * FROM orders_t WHERE created_at BETWEEN '2026-01-01' AND '2026-01-31';
SELECT * FROM users_m WHERE id IN (1, 2, 3);
SELECT * FROM users_m WHERE email IS NOT NULL;
```

## ORDER BY — Mengurutkan

```sql
SELECT * FROM orders_t ORDER BY created_at DESC;
SELECT * FROM users_m ORDER BY name ASC, id DESC;
```

## LIMIT & OFFSET — Membatasi

```sql
SELECT * FROM orders_t ORDER BY created_at DESC LIMIT 10;
SELECT * FROM orders_t ORDER BY id LIMIT 10 OFFSET 20;   -- halaman ke-3
```

## DISTINCT — Nilai Unik

```sql
SELECT DISTINCT status FROM orders_t;
```

## Agregasi & GROUP BY

Ringkasnya: `GROUP BY` mengelompokkan baris, fungsi agregat merangkum tiap kelompok.

```sql
SELECT status, COUNT(*) AS jumlah, SUM(total) AS omzet
FROM orders_t
GROUP BY status
HAVING COUNT(*) > 5
ORDER BY jumlah DESC;
```

Fungsi agregat: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`. Pembahasan lengkap, `HAVING` vs `WHERE`, dan `ROLLUP` ada di [GROUP BY & Agregasi](/database/sql/group-by).

::: warning
Semua kolom di `SELECT` yang bukan fungsi agregat **wajib** muncul di `GROUP BY`.
:::

::: tip
Hindari `SELECT *` di kode produksi: ambil kolom yang benar-benar dipakai agar tidak boros I/O dan lebih tahan perubahan skema.
:::
