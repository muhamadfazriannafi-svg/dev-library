# INSERT, UPDATE, DELETE

Perintah untuk mengubah isi data.

## INSERT

```sql
INSERT INTO users_m (name, email) VALUES ('Fazri', 'fazri@mail.com');

-- banyak baris sekaligus
INSERT INTO users_m (name, email) VALUES
  ('Budi', 'budi@mail.com'),
  ('Sari', 'sari@mail.com');
```

MySQL/PostgreSQL bisa mengembalikan `id` yang terbentuk:

```sql
INSERT INTO users_m (name, email)
VALUES ('Fazri', 'fazri@mail.com')
RETURNING id;                       -- PostgreSQL / SQLite
SELECT LAST_INSERT_ID();            -- MySQL
```

## UPDATE

```sql
UPDATE users_m SET is_active = FALSE WHERE id = 5;
UPDATE users_m SET name = 'Fazri A', updated_at = NOW() WHERE id = 5;
```

::: danger
`UPDATE` tanpa `WHERE` mengubah **seluruh baris**. Biasakan `SELECT` dulu dengan kondisi yang sama, baru ubah jadi `UPDATE`.
:::

## DELETE

```sql
DELETE FROM orders_t WHERE id = 10;
DELETE FROM orders_t WHERE created_at < '2025-01-01';
```

Untuk data yang masih dibutuhkan secara histori, jangan `DELETE` — pakai [soft delete](/database/sql/soft-delete).

## UPSERT (Insert atau Update)

```sql
-- PostgreSQL
INSERT INTO products_m (id, name, stock)
VALUES (1, 'Kopi', 10)
ON CONFLICT (id)
DO UPDATE SET stock = EXCLUDED.stock;

-- MySQL
INSERT INTO products_m (id, name, stock)
VALUES (1, 'Kopi', 10)
ON DUPLICATE KEY UPDATE stock = VALUES(stock);
```

## Transaksi

Beberapa perubahan yang harus sukses bersama-sama dibungkus transaksi:

```sql
BEGIN;
UPDATE accounts_m SET balance = balance - 100 WHERE id = 1;
UPDATE accounts_m SET balance = balance + 100 WHERE id = 2;
COMMIT;          -- atau ROLLBACK; bila ingin dibatalkan
```

::: tip
Pola aman: `BEGIN` → jalankan perubahan → jika semua sukses `COMMIT`, jika gagal `ROLLBACK`. Ini menjamin tidak ada saldo yang "hilang di tengah".
:::
