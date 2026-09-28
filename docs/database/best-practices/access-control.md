# User, Role & Hak Akses (RBAC)

Pola paling umum untuk mengatur hak akses adalah **RBAC** (*Role-Based Access Control*): user punya role, role punya permission. Hak akses tidak ditempel langsung ke user, tapi lewat role.

```
users_m ──< role_user >── roles_m ──< permission_role >── permissions_m
```

Keuntungan: menambah hak untuk 100 user cukup mengubah permission role-nya, bukan 100 baris user.

## Tabel Inti

```sql
-- master user
CREATE TABLE users_m (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP,
  deleted_at  TIMESTAMP NULL
);

-- master role
CREATE TABLE roles_m (
  id           BIGSERIAL PRIMARY KEY,
  name         VARCHAR(50) UNIQUE NOT NULL,   -- admin, editor, viewer
  description  VARCHAR(255),
  created_at   TIMESTAMP DEFAULT NOW()
);

-- master permission
CREATE TABLE permissions_m (
  id         BIGSERIAL PRIMARY KEY,
  name       VARCHAR(100) UNIQUE NOT NULL,    -- user.create, user.delete
  description VARCHAR(255)
);

-- pivot: user <-> role
CREATE TABLE role_user_t (
  user_id  BIGINT NOT NULL REFERENCES users_m(id) ON DELETE CASCADE,
  role_id  BIGINT NOT NULL REFERENCES roles_m(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- pivot: role <-> permission
CREATE TABLE permission_role_t (
  role_id        BIGINT NOT NULL REFERENCES roles_m(id) ON DELETE CASCADE,
  permission_id  BIGINT NOT NULL REFERENCES permissions_m(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);
```

## Mengisi Data Awal

```sql
INSERT INTO roles_m (name, description) VALUES
  ('admin',  'Akses penuh'),
  ('editor', 'Bisa membuat & mengubah konten'),
  ('viewer', 'Hanya membaca');

INSERT INTO permissions_m (name) VALUES
  ('user.create'), ('user.update'), ('user.delete'), ('post.publish');

-- admin boleh semuanya
INSERT INTO permission_role_t (role_id, permission_id)
SELECT r.id, p.id FROM roles_m r CROSS JOIN permissions_m p
WHERE r.name = 'admin';
```

## Query: Cek Hak Akses User

Semua permission milik seorang user:

```sql
SELECT DISTINCT p.name
FROM users_m u
JOIN role_user_t ru     ON ru.user_id = u.id
JOIN permission_role_t pr ON pr.role_id = ru.role_id
JOIN permissions_m p    ON p.id = pr.permission_id
WHERE u.id = 1;
```

Apakah user tertentu punya permission tertentu?

```sql
SELECT EXISTS (
  SELECT 1
  FROM role_user_t ru
  JOIN permission_role_t pr ON pr.role_id = ru.role_id
  JOIN permissions_m p      ON p.id = pr.permission_id
  WHERE ru.user_id = 1 AND p.name = 'user.delete'
) AS boleh_hapus;
```

## Varian yang Lebih Sederhana

Kalau kebutuhan masih sederhana, satu kolom role di tabel user sudah cukup:

```sql
ALTER TABLE users_m ADD COLUMN role VARCHAR(20) DEFAULT 'viewer';
-- nilai: 'admin', 'editor', 'viewer'
```

| Pendekatan | Cocok untuk |
| --- | --- |
| Kolom `role` di `users_m` | role tunggal, jumlah tetap, kecil |
| Tabel `roles_m` + pivot | role bisa banyak per user, hak diatur dinamis |
| Permission granular | butuh kontrol per-aksi (RBAC penuh) |

::: tip
Mulai dari yang sederhana (kolom `role`), lalu naik ke RBAC penuh hanya saat benar-benar butuh. Menambah permission granular lebih mudah daripada membongkar desain berlebih.
:::

::: warning
Jangan simpan "daftar permission" sebagai teks dipisah koma di satu kolom. Sulit di-*query*, tidak bisa di-index, dan cepat rusak saat berubah.
:::

## Praktik Terbaik

- Permission diberi nama **`resource.action`** (`user.create`, `post.delete`) agar konsisten dan mudah dicek.
- Kolom `password` **selalu** di-hash (bcrypt/argon2), jangan pernah teks biasa.
- Pisahkan **autentikasi** (siapa kamu) dari **otorisasi** (boleh apa kamu) — tabel role murni urusan otorisasi.
- Bezakan role **sistem** (`admin`) yang dilindungi dari role buatan user.
- Selalu cek hak akses di **server**, jangan percaya tombol yang disembunyikan di frontend.
- Pakai `ON DELETE CASCADE` pada pivot; bila memakai [soft delete](/database/sql/soft-delete), cek kembali relasi yang menggantung.
