# Konvensi Penamaan Tabel

Aturan paling berguna yang saya pakai: bedakan **tabel master** dan **tabel transaksi** lewat akhiran nama.

## Suffix `_m` dan `_t`

| Suffix | Arti | Sifat data | Contoh |
| --- | --- | --- | --- |
| `_m` | **Master** | Referensi/data induk, jarang berubah | `users_m`, `products_m`, `categories_m` |
| `_t` | **Transaksi** | Hasil kejadian, terus bertambah | `orders_t`, `payments_t`, `logs_t` |

Dengan melihat nama saja, langsung ketahuan sifat tabelnya.

```sql
-- master: data referensi
SELECT * FROM products_m WHERE is_active = TRUE;

-- transaksi: data kejadian, biasanya berelasi ke master
SELECT * FROM orders_t WHERE created_at >= '2026-01-01';
```

## Kenapa Berguna

- **Cepat dibaca** — tahu mana tabel yang tumbuh besar (transaksi) dan mana yang stabil (master).
- **Perbedaan strategi** — master biasanya sering di-*cache*/index, transaksi biasanya butuh partisi atau archive.
- **Backup & maintenance** — transaksi perlu retensi/arsip, master cukup di-*snapshot*.
- **Konsisten** — tim tidak perlu berdebat lagi penamaan tabel.

## Aturan Pelengkap

- **snake_case**, huruf kecil: `order_items_t`, bukan `OrderItems`.
- **Primary key** seragam: `id` (auto increment) atau `uuid`.
- **Foreign key**: `nama_tabel_tanpa_suffix_id` → `user_id`, `product_id`.
- **Timestamp** seragam: `created_at`, `updated_at`, `deleted_at`.
- **Boolean** berawalan `is_`: `is_active`, `is_deleted`.

## Contoh Skema

```sql
CREATE TABLE users_m (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP,
  deleted_at  TIMESTAMP NULL
);

CREATE TABLE orders_t (
  id          BIGSERIAL PRIMARY KEY,
  user_id     BIGINT NOT NULL REFERENCES users_m(id),
  total       NUMERIC(12,2) NOT NULL,
  status      VARCHAR(20) DEFAULT 'pending',
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP,
  deleted_at  TIMESTAMP NULL
);
```

::: tip
Konvensi ini opsional, tapi kalau dipakai konsisten sejak awal ia menghemat banyak waktu saat proyek membesar.
:::
