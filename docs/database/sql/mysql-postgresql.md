# MySQL vs PostgreSQL

Keduanya RDBMS dan sama-sama memakai SQL — "sekamar", tapi karakter dan prioritas desainnya berbeda.

## Ringkasan Perbedaan

| Aspek | MySQL | PostgreSQL |
| --- | --- | --- |
| Fokus | cepat, sederhana, web | kaya fitur, standar, ketat |
| Lisensi | GPL (Oracle) | PostgreSQL License (bebas) |
| JSON | tipe `JSON` (cukup baik) | `JSONB` — index-able, unggul |
| Index | B-Tree, Fulltext, Spatial | B-Tree, GIN, GiST, BRIN, Partial, Expression |
| Tipe data | lebih terbatas | sangat kaya (array, range, enum, uuid, inet) |
| Ekstensi | terbatas | `PostGIS`, `pg_trgm`, dll. |
| Window function | didukung | didukung, lebih matang |
| Concurrent write | InnoDB MVCC | MVCC (lebih baik untuk write tinggi) |
| Kasus umum | Laravel/WordPress, CMS | analitik, data kompleks, GIS |

## Contoh Query yang Berbeda

Auto increment:

```sql
-- MySQL
id BIGINT AUTO_INCREMENT PRIMARY KEY;

-- PostgreSQL
id BIGSERIAL PRIMARY KEY;
id BIGINT GENERATED ALWAYS AS IDENTITY;   -- cara modern
```

Upsert:

```sql
-- MySQL
INSERT ... ON DUPLICATE KEY UPDATE col = VALUES(col);

-- PostgreSQL
INSERT ... ON CONFLICT (col) DO UPDATE SET col = EXCLUDED.col;
```

Mengambil nilai dari `INSERT`:

```sql
-- MySQL
SELECT LAST_INSERT_ID();

-- PostgreSQL
INSERT ... RETURNING id;
```

## JSON

```sql
-- MySQL: JSON_EXTRACT / ->
SELECT JSON_EXTRACT(data, '$.nama') FROM users_m;

-- PostgreSQL (JSONB): operator -> dan ->>
SELECT data->>'nama' FROM users_m;
SELECT * FROM users_m WHERE data @> '{"kota":"Jakarta"}';   -- cari isi JSON, cepat dengan GIN index
```

## Mana yang Dipilih

- Butuh cepat rilis, ekosistem hosting luas, beban read sederhana → **MySQL** (juga default Laravel).
- Butuh query kompleks, JSON serius, analitik, integritas tinggi → **PostgreSQL**.

::: tip
Materi SQL dasar (SELECT, JOIN, subquery, CTE, indexing) di rubrik ini berlaku untuk keduanya. Bedanya hanya di fitur khas engine — yang biasanya baru terasa di tahap lanjut.
:::
