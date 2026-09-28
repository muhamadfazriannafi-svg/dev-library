# Indexing

Index adalah struktur bantu (biasanya B-Tree) agar pencarian tidak perlu memindai seluruh tabel. Tanpa index, `WHERE` pada tabel besar jadi lambat.

## Membuat & Menghapus

```sql
CREATE INDEX idx_users_email ON users_m (email);
CREATE UNIQUE INDEX idx_users_email_unik ON users_m (email);
CREATE INDEX idx_orders_user_created ON orders_t (user_id, created_at);

DROP INDEX idx_users_email;
```

## Kapan Index Dipakai

Index mempercepat `WHERE`, `JOIN`, `ORDER BY`, dan `GROUP BY` pada kolom yang di-index. Kolom yang sering jadi kondisi cocok diberi index:

```sql
-- query ini butuh index pada user_id
SELECT * FROM orders_t WHERE user_id = 5;

-- dan pada (user_id, created_at) untuk query ini
SELECT * FROM orders_t
WHERE user_id = 5
ORDER BY created_at DESC
LIMIT 10;
```

## Composite Index & Aturan Kolom Kiri

Index `(user_id, created_at)` berguna untuk `WHERE user_id = ...` dan `WHERE user_id = ... AND created_at = ...`, **tidak** untuk `WHERE created_at = ...` saja. Kolom paling kiri adalah yang paling penting.

## Melihat Performa

```sql
-- PostgreSQL
EXPLAIN ANALYZE SELECT * FROM orders_t WHERE user_id = 5;

-- MySQL
EXPLAIN SELECT * FROM orders_t WHERE user_id = 5;
```

Perhatikan `Seq Scan` / `type: ALL` (pemindaian penuh) vs `Index Scan` (pakai index).

## Biaya Index

Index mempercepat baca tapi memperlambat tulis (`INSERT`/`UPDATE`/`DELETE` harus memperbarui index) dan memakai ruang disk.

::: warning
Jangan meng-index semua kolom. Index hanya yang benar-benar dipakai di `WHERE`/`JOIN`/`ORDER BY`. Index berlebih membebani tulis dan memakan disk.
:::

## Praktik yang Sering Dipakai

- Index pada semua **foreign key** (membantu JOIN).
- Index pada kolom yang sering dipakai untuk pencarian/urutan.
- **Partial index** untuk subset data:

```sql
CREATE INDEX idx_orders_pending ON orders_t (created_at)
WHERE status = 'pending';
```

- Cek index yang tidak terpakai secara berkala.

::: tip
Ukur dulu, optimalkan kemudian. Jangan menebak — pakai `EXPLAIN ANALYZE` untuk melihat rencana nyata query-mu.
:::
