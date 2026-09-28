# git commit

Menyimpan snapshot perubahan yang sudah di-*stage* ke riwayat repo. Setiap commit punya hash unik dan pesan.

## Dasar

```bash
git add file.txt              # stage dulu
git commit -m "pesan commit"  # simpan
git commit                    # buka editor untuk pesan panjang
```

::: tip
Commit hanya menyimpan yang sudah di-stage. Perubahan yang belum `git add` tidak ikut.
:::

## Stage & Commit Sekaligus

```bash
git commit -am "pesan"        # stage file tracked + commit (file baru tidak ikut)
```

`-a` hanya berlaku untuk file yang sudah dilacak Git; file untracked tetap perlu `git add`.

## Melihat Commit

```bash
git log --oneline --graph --decorate
git show <hash>               # detail satu commit
git show --stat <hash>        # ringkasan file yang berubah
git show HEAD                 # commit terakhir
```

## Memperbaiki Commit Terakhir

```bash
git commit --amend -m "pesan baru"      # ganti pesan
git add file-lupa.txt
git commit --amend --no-edit            # tambahkan file tanpa ubah pesan
```

::: warning
`--amend` menulis ulang commit terakhir (hash berubah). Jangan lakukan pada commit yang sudah di-push ke branch bersama — kecuali kamu paham risikonya.
:::

## Konvensi Pesan Commit

Format umum *Conventional Commits*:

```
<tipe>(<scope>): <deskripsi singkat>
```

Tipe yang sering dipakai:

| Tipe | Untuk |
| --- | --- |
| `feat` | fitur baru |
| `fix` | perbaikan bug |
| `docs` | perubahan dokumentasi |
| `refactor` | ubah struktur tanpa ubah perilaku |
| `chore` | tugas rutin (config, dependency) |

Contoh:

```
feat(auth): tambah login dengan Google
fix(api): perbaiki validasi payload kosong
docs(git): tambah materi commit
```

## Commit Bertahap (Atomic)

Satu commit idealnya satu perubahan logis. Manfaatnya: mudah di-*review*, di-*revert*, dan ditelusuri.

```bash
git add src/login.js
git commit -m "feat: tambah form login"

git add src/login.test.js
git commit -m "test: tambah test form login"
```

## Melewati Hook / Stage Parsial

```bash
git commit --no-verify        # lewati pre-commit hook
git add -p file.txt           # pilih potongan perubahan (patch) untuk di-stage
```
