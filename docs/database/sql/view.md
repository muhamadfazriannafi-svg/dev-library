# View

View adalah **query tersimpan** yang bisa dipakai layaknya tabel. Ia tidak menyimpan data sendiri — setiap kali di-`SELECT`, query di dalamnya dijalankan ulang.

## Dasar

```sql
CREATE VIEW pelanggan_aktif AS
SELECT id, name, email
FROM users_m
WHERE deleted_at IS NULL AND is_active = TRUE;
```

Setelah dibuat, view dipakai seperti tabel biasa:

```sql
SELECT * FROM pelanggan_aktif;
SELECT * FROM pelanggan_aktif WHERE name LIKE 'A%';
```

## Kenapa Memakai View

- **Menyederhanakan query rumit** — JOIN panjang dibungkus jadi satu nama.
- **Keamanan** — beri akses tabel view saja, kolom sensitif disembunyikan.
- **Konsistensi** — logika filter (mis. `deleted_at IS NULL`) ditulis sekali, dipakai di banyak tempat.
- **Kompatibilitas** — ganti struktur tabel di belakang tanpa mengubah query aplikasi.

## Contoh Berguna

View untuk menyembunyikan kolom sensitif:

```sql
CREATE VIEW users_publik AS
SELECT id, name, email, created_at
FROM users_m
WHERE deleted_at IS NULL;          -- password tidak ikut
```

View untuk merangkum laporan:

```sql
CREATE VIEW ringkasan_order AS
SELECT
  u.id          AS user_id,
  u.name        AS nama,
  COUNT(o.id)   AS jumlah_order,
  COALESCE(SUM(o.total), 0) AS total_belanja
FROM users_m u
LEFT JOIN orders_t o ON o.user_id = u.id AND o.status = 'paid'
GROUP BY u.id, u.name;
```

## Mengubah & Menghapus

```sql
CREATE OR REPLACE VIEW pelanggan_aktif AS
SELECT id, name, email, created_at
FROM users_m
WHERE deleted_at IS NULL;

ALTER VIEW pelanggan_aktif RENAME TO pelanggan_aktif_lama;   -- MySQL
DROP VIEW pelanggan_aktif;
DROP VIEW IF EXISTS pelanggan_aktif CASCADE;
```

## Melihat Daftar View

```sql
-- MySQL
SHOW FULL TABLES WHERE Table_type = 'VIEW';
SHOW CREATE VIEW pelanggan_aktif;

-- PostgreSQL
\dv
SELECT * FROM information_schema.views;
```

## View yang Bisa Ditulis (Updatable)

View sederhana dari satu tabel **bisa** di-`INSERT`/`UPDATE`/`DELETE`. Syaratnya antara lain: hanya satu tabel, tanpa agregat, tanpa `DISTINCT`, tanpa `GROUP BY`.

```sql
UPDATE pelanggan_aktif SET name = 'Fazri A' WHERE id = 5;
```

View dengan JOIN, agregat, atau `DISTINCT` umumnya **read-only**. Untuk view kompleks yang harus bisa ditulis, pakai `WITH CHECK OPTION` dan definisikan di level database (mis. PostgreSQL *rules* atau `INSTEAD OF` trigger).

## Materialized View

View biasa selalu menghitung ulang saat di-*query* — cepat dibuat, tapi lambat untuk query berat. **Materialized view** menyimpan hasilnya secara fisik dan perlu di-*refresh*.

```sql
CREATE MATERIALIZED VIEW ringkasan_bulanan AS
SELECT DATE_TRUNC('month', created_at) AS bulan, SUM(total) AS omzet
FROM orders_t
GROUP BY DATE_TRUNC('month', created_at);

REFRESH MATERIALIZED VIEW ringkasan_bulanan;
REFRESH MATERIALIZED VIEW CONCURRENTLY ringkasan_bulanan;   -- tidak mengunci baca
```

Didukung PostgreSQL dan Oracle. **MySQL tidak punya** materialized view — biasanya diganti tabel biasa + event/scheduled job.

| | View biasa | Materialized View |
| --- | --- | --- |
| Simpan data | tidak | ya |
| Kecepatan baca | lambat untuk query berat | cepat |
| Kesegaran data | selalu terbaru | perlu `REFRESH` |
| Dukungan | semua RDBMS | PostgreSQL, Oracle |

## Hak Akses View

View juga objek yang bisa diberi hak akses tersendiri — inilah cara membatasi user hanya melihat sebagian data:

```sql
GRANT SELECT ON toko_db.users_publik TO 'app_read'@'%';
-- user tidak diberi akses ke users_m, jadi kolom password aman
```

Lihat [User & Hak Akses](/database/sql/users-privileges).

::: tip
Kalau query yang sama dipakai berulang di banyak tempat, jadikan view. Kalau query-nya berat dan datanya boleh agak basi, pertimbangkan materialized view.
:::

::: warning
View bukan penyimpanan data. Jangan berharap `INSERT` ke view otomatis masuk ke tabel dasar bila view-nya kompleks — bisa error atau diabaikan. Cek dokumentasi RDBMS-mu.
:::
