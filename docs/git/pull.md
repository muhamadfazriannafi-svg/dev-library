# git pull

`pull` = `fetch` + `merge` (atau `rebase`). Mengambil perubahan dari remote lalu menggabungkannya ke branch lokal.

## Dasar

```bash
git pull                       # branch aktif dari upstream-nya
git pull origin main           # ambil branch main dari origin
git pull --rebase              # gabung dengan rebase, bukan merge
```

## fetch vs pull

```bash
git fetch origin     # ambil data remote, TIDAK mengubah working tree
git pull             # fetch + langsung gabung
```

`fetch` aman untuk melihat dulu apa yang berubah:

```bash
git fetch origin
git log HEAD..origin/main --oneline   # commit yang belum ada di lokal
git diff HEAD origin/main
git merge origin/main                 # gabung bila sudah siap
```

## Pull dengan Rebase

```bash
git pull --rebase
```

Menaruh commit lokalmu di atas perubahan remote → riwayat lebih lurus, tanpa merge commit. Berguna di branch fitur.

Bila konflik saat rebase:

```bash
# selesaikan konflik, git add <file>
git rebase --continue
git rebase --abort      # batalkan
```

## Setelan Default

```bash
git config --global pull.rebase false    # pull = fetch + merge
git config --global pull.rebase true     # pull = fetch + rebase
git config --global pull.ff only         # hanya fast-forward
```

::: warning
Selalu commit atau stash perubahan lokal sebelum `pull` di working tree yang kotor, agar konflik tidak bercampur dengan pekerjaan yang belum selesai.
:::
