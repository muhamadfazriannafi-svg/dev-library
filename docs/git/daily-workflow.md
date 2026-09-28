# Alur Kerja Harian

Perintah yang hampir selalu dipakai setiap hari.

## 1. Memulai

```bash
git init                       # buat repo baru
git clone <url>                # copy repo dari remote
git status                     # cek kondisi working tree
```

## 2. Menyimpan Perubahan

```bash
git add <file>                 # stage satu file
git add .                      # stage semua perubahan
git commit -m "pesan commit"   # simpan snapshot
```

::: tip Pesan commit yang baik
Pakai *conventional commit*: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
Contoh: `fix: perbaiki validasi form login`.
:::

## 3. Melihat Riwayat

```bash
git log --oneline --graph --decorate
git diff                       # perubahan yang belum di-stage
git diff --staged              # perubahan yang sudah di-stage
```

## 4. Sinkronisasi Remote

```bash
git remote add origin <url>    # hubungkan ke remote
git push -u origin main        # push pertama kali
git pull                       # ambil + merge perubahan terbaru
git fetch                      # ambil info tanpa merge
```

## 5. Branch Cepat

```bash
git switch -c fitur-login      # buat + pindah branch
git switch main                # pindah branch
git branch -a                  # lihat semua branch
git merge fitur-login          # gabung ke branch aktif
```

::: warning
Selalu `git pull` dulu sebelum mulai kerja di branch bersama agar tidak konflik besar.
:::
