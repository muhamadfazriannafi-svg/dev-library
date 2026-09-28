# User Database & Hak Akses

Di tingkat server ada **user database** yang menentukan siapa boleh terhubung dan apa yang boleh dilakukan. User `root` punya akses penuh; user aplikasi sebaiknya diberi hak seminimal mungkin.

Bagian ini masuk kategori **DCL** (*Data Control Language*): `CREATE USER`, `GRANT`, `REVOKE`.

::: warning
Jangan pakai `root` untuk aplikasi. Kalau aplikasi kena *SQL injection* saat terhubung sebagai `root`, seluruh server bisa dibaca bahkan dihapus. Buat user khusus dengan hak terbatas.
:::

## 1. Membuat User

```sql
-- MySQL: user ditulis <nama>@<host>
CREATE USER 'app_dev'@'localhost' IDENTIFIED BY 'password_kuat';
CREATE USER 'app_read'@'%'         IDENTIFIED BY 'password_kuat';  -- dari host mana saja

-- PostgreSQL
CREATE USER app_dev WITH PASSWORD 'password_kuat';
```

Gabungan user + host penting di MySQL: `'app_dev'@'localhost'`, `'app_dev'@'192.168.1.%'`, dan `'app_dev'@'%'` adalah tiga user yang berbeda.

## 2. Memberi Hak Akses (GRANT)

Pola umum: user aplikasi butuh baca-tulis pada **satu database** saja.

```sql
-- MySQL
GRANT SELECT, INSERT, UPDATE, DELETE ON toko_db.* TO 'app_dev'@'localhost';

-- PostgreSQL (connect ke database-nya dulu)
GRANT CONNECT ON DATABASE toko_db TO app_dev;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_dev;
```

Hak per tabel — inilah cara membatasi user hanya boleh menyentuh tabel tertentu:

```sql
-- hanya boleh SELECT tabel master
GRANT SELECT ON toko_db.users_m TO 'app_read'@'%';
GRANT SELECT ON toko_db.products_m TO 'app_read'@'%';

-- tidak diberi hak ke tabel transaksi -> otomatis ditolak
-- SELECT * FROM toko_db.orders_t;  -- ERROR: access denied
```

## 3. Tingkatan Hak Akses

| Hak | Arti |
| --- | --- |
| `SELECT` | membaca data |
| `INSERT` | menambah data |
| `UPDATE` | mengubah data |
| `DELETE` | menghapus data |
| `CREATE`, `ALTER`, `DROP` | mengubah struktur tabel |
| `ALL PRIVILEGES` | semua hak (hindari kecuali terpaksa) |

Kombinasi yang sering dipakai:

```sql
-- hanya baca
GRANT SELECT ON toko_db.* TO 'app_read'@'%';

-- baca + tulis, tanpa boleh ubah struktur
GRANT SELECT, INSERT, UPDATE, DELETE ON toko_db.* TO 'app_dev'@'%';

-- semua hak (mis. untuk migrasi)
GRANT ALL PRIVILEGES ON toko_db.* TO 'app_migrate'@'localhost';
```

## 4. Melihat Hak Akses

```sql
-- MySQL
SHOW GRANTS FOR 'app_dev'@'localhost';

-- PostgreSQL
\du                          -- daftar role/user (psql)
SELECT grantee, privilege_type, table_name
FROM information_schema.role_table_grants
WHERE grantee = 'app_dev';
```

## 5. Mencabut Hak (REVOKE)

```sql
-- MySQL
REVOKE DELETE ON toko_db.* FROM 'app_dev'@'localhost';

-- PostgreSQL
REVOKE DELETE ON ALL TABLES IN SCHEMA public FROM app_dev;
```

## 6. Ubah Password & Hapus User

```sql
-- MySQL
ALTER USER 'app_dev'@'localhost' IDENTIFIED BY 'password_baru';
DROP USER 'app_dev'@'localhost';

-- PostgreSQL
ALTER USER app_dev WITH PASSWORD 'password_baru';
DROP USER app_dev;
```

## 7. Terapkan Perubahan

Di MySQL, setelah `GRANT`/`REVOKE`:

```sql
FLUSH PRIVILEGES;
```

Di PostgreSQL, hak langsung berlaku tanpa flush.

## Contoh Lengkap

```sql
CREATE DATABASE toko_db;

-- user aplikasi: baca-tulis satu database, host tertentu
CREATE USER 'app_dev'@'10.0.0.%' IDENTIFIED BY 'S3cret!kuat';
GRANT SELECT, INSERT, UPDATE, DELETE ON toko_db.* TO 'app_dev'@'10.0.0.%';

-- user reporting: hanya baca
CREATE USER 'app_report'@'%' IDENTIFIED BY 'S3cret!laporan';
GRANT SELECT ON toko_db.* TO 'app_report'@'%';

FLUSH PRIVILEGES;
SHOW GRANTS FOR 'app_dev'@'10.0.0.%';
```

::: tip
Terapkan prinsip **least privilege**: beri hak sekecil mungkin yang membuat aplikasi berjalan. Mulai dari `SELECT`, lalu tambah `INSERT/UPDATE/DELETE` hanya bila perlu.
:::

::: danger
Jangan menulis password asli di file SQL yang ikut ter-commit. Pakai environment variable atau secret manager.
:::

## Ringkasan

| Kebutuhan | Perintah |
| --- | --- |
| Buat user | `CREATE USER ... IDENTIFIED BY ...` |
| Beri hak | `GRANT ... ON db.tabel TO ...` |
| Cabut hak | `REVOKE ... FROM ...` |
| Lihat hak | `SHOW GRANTS FOR ...` |
| Hapus user | `DROP USER ...` |
