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

## Best Practices

- [Konvensi Penamaan Tabel](/database/best-practices/naming) — suffix `_m` (master) dan `_t` (transaksi).

## Daftar Materi

Pilih materi SQL atau NoSQL di sidebar.
