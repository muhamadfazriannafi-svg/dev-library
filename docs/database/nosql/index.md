# Konsep NoSQL

NoSQL = "not only SQL". Basis data yang tidak memakai model tabel/relasi ketat. Dirancang untuk skema fleksibel dan skala besar.

## Kategori Utama

| Kategori | Model | Contoh |
| --- | --- | --- |
| **Document** | dokumen JSON/BSON | MongoDB |
| **Key-Value** | pasangan kunci–nilai | Redis, DynamoDB |
| **Column-family** | kolom lebar terdistribusi | Cassandra, HBase |
| **Graph** | node & relasi | Neo4j |

## Versi Terbaru

MongoDB stabil terbaru: **8.3**. Lihat [MongoDB](/database/nosql/mongodb) untuk tautan rilis.

## Karakteristik

- **Skema fleksibel** — tiap dokumen bisa punya bentuk berbeda.
- **Denormalisasi** — data sering di-embed agar sekali baca cukup, bukan JOIN.
- **Skala horizontal** — dirancang untuk *sharding* antar banyak server.
- **BASE** alih-alih ACID ketat — *eventually consistent* pada banyak kasus.

## Kapan Memakai NoSQL

- Struktur data cepat berubah / tidak seragam (log, event, katalog).
- Butuh skala tulis/baca sangat besar.
- Pola akses sederhana dan berulang (key-value, cache).
- Data hierarkis yang enak di-embed dalam satu dokumen.

## Kapan Tetap Pakai SQL

- Butuh transaksi multi-tabel yang ketat (uang, stok).
- Relasi rumit dan query ad-hoc tak terduga.
- Data terstruktur dan stabil.

::: warning
NoSQL bukan "SQL yang lebih baik". Pilih sesuai pola data. Banyak sistem produksi justru memakai keduanya: PostgreSQL untuk data inti, Redis untuk cache.
:::

## Daftar Materi

- [MongoDB](/database/nosql/mongodb)
