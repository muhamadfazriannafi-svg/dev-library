# git merge

Menggabungkan riwayat satu branch ke branch lain. Branch tujuan **harus sedang aktif**.

## Alur Dasar

```bash
git switch main
git merge fitur-login
```

Git otomatis memilih tipe merge:

- **Fast-forward** — branch tujuan belum berubah sejak branch fitur dibuat; Git sekadar memajukan penunjuk. Tidak ada merge commit.
- **Three-way (recursive)** — kedua branch berubah; Git membuat **merge commit** yang menyatukan keduanya.

## Memaksa Merge Commit

```bash
git merge --no-ff fitur-login
```

Berguna agar tiap fitur punya merge commit sendiri sehingga riwayatnya mudah dilacak dan di-*revert*.

## Menyelesaikan Konflik

Konflik muncul saat baris yang sama diubah di dua branch.

```bash
git merge fitur-login
# CONFLICT (content): Merge conflict in app.js
```

1. Buka file bertanda konflik:

```
<<<<<<< HEAD
kode dari branch aktif (main)
=======
kode dari branch yang di-merge (fitur-login)
>>>>>>> fitur-login
```

2. Edit: pilih salah satu, gabungkan, lalu hapus semua penanda `<<<<<<<`, `=======`, `>>>>>>>`.
3. Tandai selesai dan lanjutkan:

```bash
git add app.js
git commit                  # menyelesaikan merge
```

Membatalkan merge yang sedang konflik:

```bash
git merge --abort
```

## Tips

- Tarik perubahan terbaru (`git pull`) di branch tujuan sebelum merge untuk memperkecil konflik.
- Cek konflik tanpa mengubah apa pun: `git merge --no-commit --no-ff fitur` lalu `git merge --abort`.

::: warning
Jangan merge branch yang belum di-*test*. Merge hanya menyatukan kode, bukan memperbaiki bug.
:::
