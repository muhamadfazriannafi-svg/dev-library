# Soft Delete

Soft delete = menandai baris sebagai "terhapus" tanpa benar-benar menghapusnya dari tabel. Data tetap ada, tapi dianggap tidak ada oleh aplikasi.

## Cara Kerja

Tambahkan kolom `deleted_at`. `NULL` berarti masih aktif, berisi timestamp berarti terhapus.

```sql
ALTER TABLE users_m ADD COLUMN deleted_at TIMESTAMP NULL;

-- soft delete
UPDATE users_m SET deleted_at = NOW() WHERE id = 5;

-- restore
UPDATE users_m SET deleted_at = NULL WHERE id = 5;

-- hapus permanen (hard delete), bila memang perlu
DELETE FROM users_m WHERE id = 5;
```

## Wajib Difilter di Query

Semua query harus mengecualikan baris terhapus:

```sql
SELECT * FROM users_m WHERE deleted_at IS NULL;
```

Bisa dibantu *view* atau *default scope* di ORM:

```sql
CREATE VIEW users_aktif AS
SELECT * FROM users_m WHERE deleted_at IS NULL;
```

Laravel Eloquent: pakai trait `SoftDeletes` otomatis menyaring. Untuk melihat yang terhapus:

```php
User::withTrashed()->get();
User::onlyTrashed()->get();
$user->restore();
$user->forceDelete();
```

## Kenapa Memakai Soft Delete

- **Riwayat & audit** — tahu siapa menghapus apa dan kapan.
- **Recovery** — salah hapus? tinggal `restore`.
- **Integritas relasi** — baris anak yang menunjuk induk tidak menjadi yatim.
- **Regulasi** — beberapa industri wajib menyimpan data.

## Konsekuensi (Trade-off)

- Semua query harus ingat filter `deleted_at IS NULL` — satu kelalaian = data hantu muncul.
- Index dan ukuran tabel terus tumbuh karena baris tidak benar-benar hilang.
- `UNIQUE` jadi rumit: email milik baris terhapus tetap memblokir email yang sama untuk user baru.

Solusi unique + soft delete (PostgreSQL, partial index):

```sql
CREATE UNIQUE INDEX uq_users_email_aktif
ON users_m (email)
WHERE deleted_at IS NULL;
```

::: tip
Kombinasikan dengan retention policy: soft delete dulu, lalu hard delete otomatis untuk data lama (mis. `deleted_at < NOW() - INTERVAL '90 days'`).
:::
