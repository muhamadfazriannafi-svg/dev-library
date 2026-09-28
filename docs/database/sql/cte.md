# CTE (Common Table Expression)

CTE adalah tabel sementara bernama yang ditulis dengan `WITH`. Fungsinya mirip subquery, tapi jauh lebih mudah dibaca.

## Dasar

```sql
WITH order_aktif AS (
  SELECT * FROM orders_t WHERE status = 'paid'
)
SELECT user_id, COUNT(*) AS jumlah
FROM order_aktif
GROUP BY user_id;
```

Bandingkan dengan subquery di `FROM` — CTE memisahkan logika sehingga alurnya terbaca dari atas ke bawah.

## Beberapa CTE Berurutan

```sql
WITH
pelanggan_setia AS (
  SELECT user_id, COUNT(*) AS jumlah_order
  FROM orders_t
  WHERE status = 'paid'
  GROUP BY user_id
  HAVING COUNT(*) >= 3
),
omzet AS (
  SELECT user_id, SUM(total) AS total_belanja
  FROM orders_t
  WHERE status = 'paid'
  GROUP BY user_id
)
SELECT u.name, p.jumlah_order, o.total_belanja
FROM users_m u
JOIN pelanggan_setia p ON p.user_id = u.id
JOIN omzet o           ON o.user_id = u.id
ORDER BY o.total_belanja DESC;
```

## RECURSIVE — Data Berjenjang

Untuk struktur hierarki seperti kategori atau organisasi:

```sql
WITH RECURSIVE hierarki AS (
  SELECT id, name, parent_id, 1 AS level
  FROM categories_m
  WHERE parent_id IS NULL          -- titik awal (root)

  UNION ALL

  SELECT c.id, c.name, c.parent_id, h.level + 1
  FROM categories_m c
  JOIN hierarki h ON h.id = c.parent_id
)
SELECT * FROM hierarki ORDER BY level, name;
```

Hasilnya: setiap kategori beserta kedalamannya dari root.

## CTE vs Subquery

| Aspek | Subquery | CTE |
| --- | --- | --- |
| Keterbacaan | cepat berantakan bila bersarang | enak dibaca, logis |
| Dipakai ulang | harus ditulis ulang | panggil nama CTE-nya |
| Rekursif | tidak | ya (`WITH RECURSIVE`) |
| Performa | bisa setara | di PostgreSQL ≥12 biasanya setara |

::: tip
Untuk query analitik yang panjang, biasakan pecah jadi beberapa CTE bernama (`filter_awal`, `agregat`, `hasil_akhir`) — orang lain (termasuk kamu 6 bulan lagi) akan berterima kasih.
:::
