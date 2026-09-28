# git stash

Menyimpan perubahan yang belum selesai agar working tree bersih, tanpa commit. Berguna saat harus buru-buru pindah branch.

## Dasar

```bash
git stash                    # simpan perubahan (tracked)
git stash push -m "wip login"  # simpan dengan pesan
git stash -u                 # ikutkan file untracked
git stash -a                 # ikutkan file ignored juga
```

## Melihat & Mengambil Kembali

```bash
git stash list               # daftar stash: stash@{0}, stash@{1}, ...
git stash show -p stash@{0}  # lihat isi
git stash pop                # ambil + hapus dari list
git stash apply              # ambil, tetap di list
git stash apply stash@{2}    # ambil stash tertentu
```

## Menghapus

```bash
git stash drop stash@{0}     # hapus satu
git stash clear              # hapus semua
```

## Contoh Alur

```bash
git stash push -m "wip profil"
git switch main
git pull
git switch fitur
git stash pop
```

::: warning
`git stash pop` bisa konflik. Kalau ragu, pakai `apply` — stash tetap tersimpan sampai kamu `drop` manual.
:::

::: tip
Untuk pekerjaan yang lebih besar dan lama, lebih baik commit di branch sementara daripada menumpuk stash.
:::
