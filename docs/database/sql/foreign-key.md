# Foreign Key

Foreign key (FK) adalah kolom yang menunjuk ke primary key tabel lain, untuk menjaga **integritas relasi**. FK mencegah data "yatim", misal order yang menunjuk user yang tidak ada.

## Membuat FK

Saat membuat tabel:

```sql
CREATE TABLE orders_t (
  id         BIGSERIAL PRIMARY KEY,
  user_id    BIGINT NOT NULL,
  total      NUMERIC(12,2),
  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users_m(id)
);
```

Menambahkan ke tabel yang sudah ada:

```sql
ALTER TABLE orders_t
ADD CONSTRAINT fk_orders_user
FOREIGN KEY (user_id) REFERENCES users_m(id);

ALTER TABLE orders_t DROP CONSTRAINT fk_orders_user;
```

## Aksi ON DELETE / ON UPDATE

Menentukan apa yang terjadi saat baris induk dihapus/diubah:

```sql
FOREIGN KEY (user_id) REFERENCES users_m(id)
  ON DELETE CASCADE      -- hapus anak bila induk dihapus
  ON UPDATE CASCADE;
```

| Aksi | Efek |
| --- | --- |
| `RESTRICT` / `NO ACTION` | tolak penghapusan (default) |
| `CASCADE` | hapus/ubah anak mengikuti induk |
| `SET NULL` | jadikan kolom anak `NULL` |
| `SET DEFAULT` | jadikan nilai default |

::: warning
`ON DELETE CASCADE` praktis tapi berbahaya: satu `DELETE` bisa menghapus banyak baris berantai. Pastikan kamu memang ingin perilaku itu.
:::

## FK dan Soft Delete

Kalau memakai [soft delete](/database/sql/soft-delete), `ON DELETE CASCADE` tidak pernah jalan karena induk tak benar-benar dihapus. Konsekuensinya: integritas relasi harus dijaga di level aplikasi.

## FK dan Index

MySQL otomatis membuat index pada kolom FK; PostgreSQL **tidak**. Di PostgreSQL, tambahkan manual agar JOIN cepat:

```sql
CREATE INDEX idx_orders_user_id ON orders_t (user_id);
```

::: tip
Penamaan constraint yang jelas (`fk_orders_user`, `uq_users_email`) membuat pesan error lebih mudah dipahami saat terjadi pelanggaran.
:::
