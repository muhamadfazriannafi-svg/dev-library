# git branch

Branch adalah garis kerja terpisah. Branch default biasanya `main`. Membuat branch itu murah, jadi biasakan buat branch per fitur/perbaikan.

## Melihat Branch

```bash
git branch              # branch lokal
git branch -a           # lokal + remote (remote-tracking)
git branch -v           # plus commit terakhir
git branch --merged     # branch yang sudah digabung ke branch aktif
```

## Membuat & Pindah

```bash
git branch fitur-login        # buat, tetap di branch sekarang
git switch fitur-login        # pindah
git switch -c fitur-login     # buat + pindah sekaligus
```

::: tip
`git switch` adalah cara baru untuk pindah branch. `git checkout` masih jalan tapi serbaguna; lihat [halaman checkout](/git/checkout).
:::

## Mengganti Nama

```bash
git branch -m nama-baru       # rename branch aktif
git branch -m lama baru       # rename branch tertentu
```

## Menghapus

```bash
git branch -d fitur-login     # hapus (aman: hanya jika sudah di-merge)
git branch -D fitur-login     # hapus paksa walau belum di-merge
```

## Branch Melacak Remote

```bash
git branch -u origin/main     # set upstream branch aktif
git branch -vv                # lihat upstream tiap branch
```

Saat `git push -u origin fitur` pertama kali, upstream langsung terset sehingga berikutnya cukup `git push`.

::: warning
Branch hanya penunjuk ke commit. Menghapus branch tidak menghapus commitnya; commit masih bisa ditemukan lewat `git reflog` sampai di-*garbage collect*.
:::
