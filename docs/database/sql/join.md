# JOIN

Menggabungkan baris dari dua tabel atau lebih berdasarkan kolom yang berelasi.

## Jenis JOIN

```sql
-- INNER JOIN: hanya baris yang cocok di kedua tabel
SELECT o.id, u.name, o.total
FROM orders_t o
INNER JOIN users_m u ON u.id = o.user_id;

-- LEFT JOIN: semua baris kiri + yang cocok di kanan (kanan bisa NULL)
SELECT u.name, o.id AS order_id
FROM users_m u
LEFT JOIN orders_t o ON o.user_id = u.id;

-- RIGHT JOIN: kebalikan LEFT JOIN
SELECT u.name, o.id
FROM orders_t o
RIGHT JOIN users_m u ON u.id = o.user_id;

-- FULL OUTER JOIN: semua baris kedua tabel
SELECT u.name, o.id
FROM users_m u
FULL OUTER JOIN orders_t o ON o.user_id = u.id;

-- CROSS JOIN: kombinasi semua baris (kartesian)
SELECT u.name, p.name FROM users_m u CROSS JOIN products_m p;
```

## Visualisasi

```
INNER JOIN      LEFT JOIN       RIGHT JOIN      FULL JOIN
   A∩B          A + A∩B         B + A∩B         A + B + A∩B
  (  )          ( A() B )       ( A () B)       ( A () B )
```

## Mencari Data yang Tidak Punya Pasangan

```sql
-- user yang belum pernah order
SELECT u.name
FROM users_m u
LEFT JOIN orders_t o ON o.user_id = u.id
WHERE o.id IS NULL;
```

## JOIN Lebih dari Dua Tabel

```sql
SELECT o.id, u.name, p.name AS produk
FROM orders_t o
JOIN users_m u      ON u.id = o.user_id
JOIN order_items_t i ON i.order_id = o.id
JOIN products_m p   ON p.id = i.product_id;
```

## SELF JOIN

Tabel yang berelasi ke dirinya sendiri, misalnya atasan–bawahan:

```sql
SELECT e.name AS karyawan, m.name AS atasan
FROM employees_m e
LEFT JOIN employees_m m ON m.id = e.manager_id;
```

::: tip
Gunakan **alias** (`o`, `u`, `p`) agar query pendek dan jelas. Sebutkan kolom secara eksplisit daripada `SELECT *` agar hasil join tidak ambigu.
:::
