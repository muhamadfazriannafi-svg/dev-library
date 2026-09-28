# GROUP BY & Agregasi

`GROUP BY` mengelompokkan baris berdasarkan nilai kolom, lalu fungsi agregat merangkum tiap kelompok. Ini dasar untuk laporan: hitung jumlah, total, rata-rata.

## Dasar

```sql
SELECT status, COUNT(*) AS jumlah, SUM(total) AS omzet
FROM orders_t
GROUP BY status;
```

Hasilnya satu baris per `status`, bukan per order.

## Fungsi Agregat

| Fungsi | Kegunaan |
| --- | --- |
| `COUNT(*)` | jumlah baris |
| `COUNT(kolom)` | jumlah baris yang kolomnya tidak `NULL` |
| `COUNT(DISTINCT kolom)` | jumlah nilai unik |
| `SUM(kolom)` | total |
| `AVG(kolom)` | rata-rata |
| `MIN` / `MAX` | nilai terkecil / terbesar |

```sql
SELECT
  COUNT(*)                  AS semua_baris,
  COUNT(catatan)            AS ada_catatan,        -- yang NULL tidak dihitung
  COUNT(DISTINCT user_id)   AS pembeli_unik,
  SUM(total)                AS omzet,
  AVG(total)                AS rata_rata
FROM orders_t;
```

::: warning
`COUNT(1)`, `COUNT(*)`, dan `COUNT(kolom_not_null)` memberi hasil sama untuk menghitung baris. Yang berbeda adalah `COUNT(kolom)` yang mengabaikan `NULL`.
:::

## Kelompokkan Lebih dari Satu Kolom

```sql
SELECT status, YEAR(created_at) AS tahun, COUNT(*) AS jumlah
FROM orders_t
GROUP BY status, YEAR(created_at)
ORDER BY tahun, status;
```

Setiap kombinasi `(status, tahun)` jadi satu kelompok.

## WHERE vs HAVING

Ini pembeda yang paling sering bikin bingung:

- `WHERE` menyaring baris **sebelum** pengelompokan.
- `HAVING` menyaring kelompok **sesudah** agregasi.

```sql
SELECT user_id, COUNT(*) AS jumlah_order
FROM orders_t
WHERE status = 'paid'          -- 1) filter baris dulu
GROUP BY user_id
HAVING COUNT(*) >= 3           -- 2) baru filter hasil kelompok
ORDER BY jumlah_order DESC;
```

Singkatnya: filter nilainya pakai `WHERE`, filter hasil `COUNT`/`SUM` pakai `HAVING`.

## ORDER BY pada Hasil Agregat

```sql
SELECT user_id, SUM(total) AS total_belanja
FROM orders_t
GROUP BY user_id
ORDER BY total_belanja DESC
LIMIT 10;
```

## Aturan Penting

::: tip
Kolom di `SELECT` yang **bukan** fungsi agregat wajib ada di `GROUP BY`. Kalau tidak, MySQL dengan `ONLY_FULL_GROUP_BY` akan menolak, dan PostgreSQL pasti menolak.
:::

```sql
-- salah: name tidak ada di GROUP BY dan bukan agregat
SELECT name, COUNT(*) FROM users_m GROUP BY user_id;

-- benar
SELECT user_id, COUNT(*) FROM users_m GROUP BY user_id;
```

## Contoh Laporan dengan CTE

```sql
WITH omzet_bulanan AS (
  SELECT
    DATE_TRUNC('month', created_at) AS bulan,
    SUM(total) AS omzet
  FROM orders_t
  WHERE status = 'paid'
  GROUP BY DATE_TRUNC('month', created_at)
)
SELECT bulan, omzet,
       omzet - LAG(omzet) OVER (ORDER BY bulan) AS selisih_bulan_lalu
FROM omzet_bulanan
ORDER BY bulan;
```

`LAG()` di atas adalah *window function* — mirip agregat tapi tidak menggabungkan baris. Lihat juga [CTE](/database/sql/cte).

## ROLLUP & GROUPING SETS (lanjutan)

Membuat subtotal dan grand total dalam satu query:

```sql
SELECT status, COUNT(*) AS jumlah
FROM orders_t
GROUP BY ROLLUP (status);     -- baris terakhir = total semua status
```

```sql
SELECT status, kategori, SUM(total)
FROM orders_t
GROUP BY GROUPING SETS ((status), (kategori), ());
```

Fitur ini didukung PostgreSQL dan MySQL 8+.

::: tip
Kalau laporan makin rumit, pecah jadi beberapa [CTE](/database/sql/cte) bernama daripada menumpuk `GROUP BY` besar.
:::
