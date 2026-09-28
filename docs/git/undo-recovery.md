# Undo & Recovery

Kesalahan di Git hampir selalu bisa dibatalkan. Ini urutan penyelamatannya.

## Batalkan Perubahan File

```bash
git restore <file>             # buang perubahan di working tree
git restore --staged <file>    # unstage, perubahan tetap ada
```

## Batalkan Commit

```bash
git revert <hash>              # cara aman: buat commit pembalik
git reset --soft HEAD~1        # batalkan commit, perubahan masih ter-stage
git reset --mixed HEAD~1       # batalkan commit, perubahan di working tree
```

::: danger reset --hard
`git reset --hard HEAD~1` akan **menghapus perubahan permanen**. Pakai hanya kalau yakin.
:::

## Perbaiki Pesan / Isi Commit Terakhir

```bash
git commit --amend -m "pesan baru"
git add file-lupa.md
git commit --amend --no-edit   # tambahkan file yang lupa tanpa ubah pesan
```

## Tarik Kembali yang Sudah Hilang (Reflog)

`reflog` mencatat semua pergerakan HEAD. Ini penyelamat kalau branch terhapus atau reset salah:

```bash
git reflog
git reset --hard <hash-dari-reflog>
```

## Simpan Pekerjaan Sementara

```bash
git stash                      # simpan dulu perubahan
git stash list
git stash pop                  # ambil kembali + hapus dari list
git stash apply                # ambil kembali, tetap di list
```
