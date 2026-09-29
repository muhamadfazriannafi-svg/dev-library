# Kumpulan Dokumentasi Database

Rubrik ini berisi catatan tentang basis data: query SQL, praktik terbaik, dan NoSQL.

## SQL vs NoSQL

| Aspek | SQL (relasional) | NoSQL (non-relasional) |
| --- | --- | --- |
| Struktur | tabel, baris, kolom | dokumen, key-value, graf |
| Skema | kaku, didefinisikan di awal | fleksibel |
| Query | bahasa SQL | API/cara khas tiap produk |
| Relasi | JOIN + foreign key | embed / reference |
| Contoh | MySQL, PostgreSQL | MongoDB, Redis, Cassandra |

Keduanya bukan saingan — pilih sesuai kebutuhan:

- Butuh konsistensi, relasi rumit, transaksi → **SQL**.
- Data fleksibel, volume besar, akses pola key-value → **NoSQL**.

Halaman perbandingan engine SQL: [MySQL vs PostgreSQL](/database/sql/mysql-postgresql).

## Versi Terbaru (tech stack)

| Produk | Versi current | Catatan |
| --- | --- | --- |
| **PostgreSQL** | 18.x | 19 masih beta; 14 berakhir dukungan Nov 2026 |
| **MongoDB** | 8.3 | stabil terbaru, lanjut dari 8.0 dan 7.0 |
| **MySQL** | 8.4 LTS / 9.x | 8.4 LTS untuk produksi jangka panjang |

Cek berkala karena rilisnya cepat:

- PostgreSQL: <https://www.postgresql.org/support/versioning/>
- MongoDB: <https://www.mongodb.com/docs/manual/release-notes/>
- MySQL: <https://dev.mysql.com/doc/relnotes/mysql/en/>

## Best Practices

- [Konvensi Penamaan Tabel](/database/best-practices/naming) — suffix `_m` (master) dan `_t` (transaksi).

## Performance & Debugging

- [N+1 Query Problem](/database/performance/n-plus-one) — kenapa query bisa meledak dan cara mengatasinya.

## Daftar Materi

Pilih materi SQL atau NoSQL di sidebar.
