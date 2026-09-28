# Konsep SQL

SQL (*Structured Query Language*) adalah bahasa standar untuk basis data relasional. Dipakai di MySQL, PostgreSQL, SQL Server, Oracle, dan lainnya.

## Kategori Perintah

| Kategori | Perintah | Fungsi |
| --- | --- | --- |
| **DQL** | `SELECT` | mengambil data |
| **DML** | `INSERT`, `UPDATE`, `DELETE` | mengubah data |
| **DDL** | `CREATE`, `ALTER`, `DROP` | mengubah struktur |
| **DCL** | `GRANT`, `REVOKE` | mengatur hak akses |
| **TCL** | `COMMIT`, `ROLLBACK` | mengatur transaksi |

## Bentuk Dasar

```sql
SELECT kolom1, kolom2
FROM nama_tabel
WHERE kondisi
ORDER BY kolom1 DESC
LIMIT 10;
```

Urutan eksekusi SQL (beda dengan urutan penulisannya):

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

Poin penting: `WHERE` menyaring **sebelum** agregasi, `HAVING` menyaring **sesudah**.

## Daftar Materi

- [SELECT](/database/sql/select)
- [GROUP BY & Agregasi](/database/sql/group-by)
- [INSERT, UPDATE, DELETE](/database/sql/dml)
- [JOIN](/database/sql/join)
- [Subquery](/database/sql/subquery)
- [CTE](/database/sql/cte)
- [Indexing](/database/sql/indexing)
- [Foreign Key](/database/sql/foreign-key)
- [Sequence](/database/sql/sequence)
- [Soft Delete](/database/sql/soft-delete)
- [User & Hak Akses](/database/sql/users-privileges)
- [MySQL vs PostgreSQL](/database/sql/mysql-postgresql)
