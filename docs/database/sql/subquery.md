# Subquery

Query di dalam query. Berguna saat hasil satu query menjadi syarat atau bahan query lain.

## Di WHERE

```sql
-- user yang punya minimal satu order
SELECT * FROM users_m
WHERE id IN (SELECT user_id FROM orders_t);

-- order di atas rata-rata
SELECT * FROM orders_t
WHERE total > (SELECT AVG(total) FROM orders_t);
```

## Operator Perbandingan dengan Subquery

```sql
SELECT * FROM orders_t
WHERE total > ALL (SELECT total FROM orders_t WHERE status = 'cancelled');

SELECT * FROM orders_t
WHERE total > ANY (SELECT total FROM orders_t WHERE status = 'paid');
```

- `ALL` — harus melebihi **semua** nilai.
- `ANY` / `SOME` — cukup melebihi **salah satu**.

## Di SELECT (Scalar Subquery)

```sql
SELECT
  u.name,
  (SELECT COUNT(*) FROM orders_t o WHERE o.user_id = u.id) AS jumlah_order
FROM users_m u;
```

## Di FROM (Derived Table)

```sql
SELECT status, ROUND(AVG(jumlah), 2) AS rata_rata
FROM (
  SELECT status, COUNT(*) AS jumlah
  FROM orders_t
  GROUP BY status
) AS ringkasan
GROUP BY status;
```

## EXISTS

```sql
-- user yang tidak pernah order
SELECT * FROM users_m u
WHERE NOT EXISTS (
  SELECT 1 FROM orders_t o WHERE o.user_id = u.id
);
```

::: tip
`EXISTS` sering lebih efisien daripada `IN` untuk data besar karena ia berhenti begitu menemukan satu kecocokan.
:::

## NOT IN vs NOT EXISTS

`NOT IN` bisa memberi hasil mengejutkan bila ada `NULL` di dalam subquery-nya. Untuk keamanan, pakai `NOT EXISTS`.

::: warning
Bila subquery mengandung `NULL`, `WHERE x NOT IN (...)` bisa mengembalikan **nol baris** karena perbandingan dengan `NULL` hasilnya *unknown*, bukan benar.
:::
