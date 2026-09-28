# git checkout

Perintah serbaguna untuk pindah branch **dan** mengembalikan file. Karena terlalu banyak tugas, Git modern memecahnya jadi `git switch` (branch) dan `git restore` (file).

## Pindah Branch

```bash
git checkout main
git checkout -b fitur-baru     # buat + pindah
```

Padanan modern:

```bash
git switch main
git switch -c fitur-baru
```

## Mengembalikan File

```bash
git checkout -- file.txt          # buang perubahan di file
git checkout HEAD~1 -- file.txt   # ambil versi file dari commit lain
git checkout main -- file.txt     # ambil versi file dari branch lain
```

Padanan modern (lebih jelas):

```bash
git restore file.txt
git restore --source HEAD~1 file.txt
git restore --staged file.txt     # unstage
```

## Pindah ke Commit Tertentu (Detached HEAD)

```bash
git checkout <hash>
git switch --detach <hash>
```

::: danger Detached HEAD
Di kondisi ini kamu tidak sedang di branch mana pun. Commit baru di sini bisa "hilang" begitu pindah. Kalau mau menyimpan pekerjaan: buat branch dulu — `git switch -c eksperimen`.
:::

## Kapan Pakai yang Mana

| Tugas | Lama | Modern |
| --- | --- | --- |
| Pindah branch | `git checkout main` | `git switch main` |
| Buat branch | `git checkout -b x` | `git switch -c x` |
| Batalkan file | `git checkout -- f` | `git restore f` |
| Unstage | `git checkout -- f` | `git restore --staged f` |

Untuk proyek baru, disarankan membiasakan `switch` dan `restore`.
