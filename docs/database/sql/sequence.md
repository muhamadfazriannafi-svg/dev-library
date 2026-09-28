# Sequence

Sequence adalah objek penghasil angka berurutan — dulu dipakai untuk membuat nilai primary key otomatis. Sekarang sering tersembunyi di balik `SERIAL`/`AUTO_INCREMENT`, tapi berguna untuk dikontrol langsung.

## Bagaimana Nilai ID Dibuat

| Database | Cara umum |
| --- | --- |
| PostgreSQL | sequence + `SERIAL` / `IDENTITY` |
| MySQL | `AUTO_INCREMENT` (di baliknya mirip counter) |
| Oracle | sequence eksplisit (`seq_users.NEXTVAL`) |

Di PostgreSQL, `SERIAL` sebenarnya hanyalah gula sintaks untuk membuat sequence. `BIGSERIAL` = sequence + kolom `BIGINT` + default dari sequence itu.

## Membuat & Memakai Sequence (PostgreSQL)

```sql
CREATE SEQUENCE users_id_seq START 1 INCREMENT 1;

-- ambil nilai berikutnya
SELECT NEXTVAL('users_id_seq');   -- 1
SELECT NEXTVAL('users_id_seq');   -- 2

-- lihat nilai sekarang tanpa menaikkannya
SELECT CURRVAL('users_id_seq');   -- 2

-- pakai di INSERT
INSERT INTO users_m (id, name) VALUES (NEXTVAL('users_id_seq'), 'Fazri');
```

Perhatikan: `CURRVAL` hanya valid di sesi yang sudah memanggil `NEXTVAL`.

## Opsi Umum

```sql
CREATE SEQUENCE nomor_invoice_seq
  START WITH 1000
  INCREMENT BY 1
  MINVALUE 1000
  MAXVALUE 999999
  CACHE 20
  NO CYCLE;

SELECT NEXTVAL('nomor_invoice_seq');   -- 1000, 1001, 1002, ...
```

| Opsi | Arti |
| --- | --- |
| `START WITH` | nilai awal |
| `INCREMENT BY` | besar kenaikan (boleh negatif) |
| `MINVALUE` / `MAXVALUE` | batas nilai |
| `CYCLE` / `NO CYCLE` | ulang dari awal saat mencapai batas |
| `CACHE` | jumlah nilai yang dipesan sekaligus (lebih cepat) |

## Mengatur Ulang / Menyesuaikan

Sequence tidak "tahu" isi tabel. Setelah impor data, biasanya perlu disetel ulang agar tidak bertabrakan:

```sql
-- set agar nilai berikutnya melanjutkan dari id terbesar
SELECT SETVAL('users_id_seq', (SELECT MAX(id) FROM users_m));
SELECT SETVAL('users_id_seq', (SELECT MAX(id) FROM users_m) + 1, false);

-- lihat posisi terakhir
SELECT LAST_VALUE FROM users_id_seq;
```

::: warning
`CACHE` bisa membuat nomor "bolong" bila server restart — nilai yang sudah dipesan tapi belum dipakai akan hilang. Ini normal; sequence tidak menjamin tanpa celah.
:::

## Sequence & Primary Key

Cara idiomatis PostgreSQL modern (tak perlu sequence manual):

```sql
CREATE TABLE users_m (
  id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100)
);

-- atau gaya lama
CREATE TABLE products_m (
  id   BIGSERIAL PRIMARY KEY,
  name VARCHAR(100)
);
```

Urutan jika memakai gaya lama + sequence terpisah:

```sql
CREATE SEQUENCE products_id_seq;
CREATE TABLE products_m (
  id   BIGINT PRIMARY KEY DEFAULT NEXTVAL('products_id_seq'),
  name VARCHAR(100)
);
```

## MySQL

MySQL tidak punya `CREATE SEQUENCE`. Padanan `AUTO_INCREMENT`:

```sql
CREATE TABLE users_m (
  id   BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

-- menaikkan counter secara manual
ALTER TABLE users_m AUTO_INCREMENT = 1000;
```

::: tip
Untuk kebutuhan "nomor dokumen" yang harus rapi (`INV-0001`), jangan bergantung pada sequence mentah. Pakai tabel counter terpisah atau sequence yang di-*format* saat ditampilkan. Sequence tidak dirancang menghasilkan string.
:::

## Melihat & Menghapus Sequence

```sql
SELECT * FROM information_schema.sequences;

DROP SEQUENCE users_id_seq;
DROP SEQUENCE IF EXISTS users_id_seq CASCADE;
```
