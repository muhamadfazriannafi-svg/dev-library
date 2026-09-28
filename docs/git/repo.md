# Membuat Repository

Ada dua sisi: repo **lokal** (di komputermu) dan repo **remote** (di GitHub). Alurnya: buat salah satu, lalu hubungkan keduanya.

## 1. Buat Repo Lokal

```bash
git init                    # jadikan folder sekarang repo Git
git init nama-proyek        # buat folder baru + repo
git init --initial-branch=main
```

Hasilnya muncul folder tersembunyi `.git/` — di situ seluruh riwayat disimpan. Hapus folder itu = hapus riwayat.

Setelah init, langsung commit pertama:

```bash
git add .
git commit -m "chore: initial commit"
```

## 2. Clone Repo yang Sudah Ada

```bash
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git nama-folder
git clone --depth 1 <url>          # shallow: hanya commit terbaru
```

`clone` sekaligus: mengunduh repo, membuat remote `origin`, dan meng-*checkout* branch default.

## 3. Buat Repo di GitHub

Lewat web: klik **New repository** → isi nama → pilih Public/Private → **Create repository**.

::: warning
Jangan centang "Add a README" kalau repo lokalmu sudah ada isinya dan belum pernah di-push — nanti dua riwayat tidak berhubungan dan push pertama ditolak.
:::

Lewat GitHub CLI:

```bash
gh repo create nama-repo --public
gh repo create nama-repo --private --source=. --remote=origin --push
```

Opsi `--source=.` memakai folder sekarang sebagai sumber, `--remote` memasang remote, `--push` langsung mengirim.

## 4. Hubungkan Lokal ke Remote

Untuk repo lokal yang sudah ada commit, buat repo kosong di GitHub (tanpa README), lalu:

```bash
git remote add origin https://github.com/user/nama-repo.git
git branch -M main
git push -u origin main
```

Perintah `git remote -v` untuk memastikan remote benar.

## 5. Kalau Push Pertama Ditolak

```
! [rejected] main -> main (fetch first)
```

Remote sudah punya commit (misal README dibuat otomatis). Pilihan:

```bash
git pull --rebase origin main    # satukan riwayat, lalu push
git push -u origin main
```

Atau, kalau isi remote memang tidak dibutuhkan, timpa dengan hati-hati:

```bash
git push -u origin main --force-with-lease
```

## Ringkasan

| Situasi | Perintah |
| --- | --- |
| Mulai dari nol di lokal | `git init` |
| Ambil repo yang sudah ada | `git clone <url>` |
| Buat repo baru di GitHub | UI **New repository** atau `gh repo create` |
| Sambungkan lokal ke GitHub | `git remote add origin <url>` + `git push -u origin main` |
