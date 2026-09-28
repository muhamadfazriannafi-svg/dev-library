# Kumpulan Dokumentasi Git

Selamat datang di rubrik Git. Bagian ini berisi catatan, perintah harian, dan *tips* Git yang saya pakai selama ngoding.

## Daftar Materi

Alur kerja:

- [Alur Kerja Harian](/git/daily-workflow) — perintah yang paling sering dipakai.

Dokumentasi perintah:

- [git commit](/git/commit) — menyimpan snapshot perubahan.
- [git branch](/git/branch) — membuat, pindah, dan menghapus branch.
- [git checkout](/git/checkout) — pindah branch & mengembalikan file.
- [git merge](/git/merge) — menggabungkan branch dan menyelesaikan konflik.
- [git push](/git/push) — mengirim commit ke remote.
- [git pull](/git/pull) — mengambil perubahan dari remote.
- [git stash](/git/stash) — menyimpan perubahan sementara.
- [Fork](/git/fork) — berkontribusi ke repo orang lain.

Lainnya:

- [Undo & Recovery](/git/undo-recovery) — cara membatalkan kesalahan tanpa panik.

## Konfigurasi Awal

Setelah install Git, lakukan setup identitas dan default branch:

```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email@contoh.com"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

Cek hasil konfigurasi:

```bash
git config --list
```
