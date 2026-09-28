# Kumpulan Dokumentasi Git

Selamat datang di rubrik Git. Bagian ini berisi catatan, perintah harian, dan *tips* Git yang saya pakai selama ngoding.

## Daftar Materi

- [Alur Kerja Harian](/git/daily-workflow) — perintah yang paling sering dipakai.
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
