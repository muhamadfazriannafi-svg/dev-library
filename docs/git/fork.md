# Fork

Fork adalah salinan repo orang lain ke akunmu, di sisi GitHub. Fork memungkinkanmu mengubah proyek orang lain tanpa akses tulis ke repo aslinya.

## Alur Kontribusi (Fork → PR)

1. **Fork** repo di GitHub (tombol *Fork*) → jadi `https://github.com/kamu/nama-repo`.
2. **Clone** fork-mu:

```bash
git clone https://github.com/kamu/nama-repo.git
cd nama-repo
```

3. Tambahkan repo asli sebagai `upstream`:

```bash
git remote add upstream https://github.com/asli/nama-repo.git
git remote -v      # origin = fork-mu, upstream = repo asli
```

4. **Buat branch** untuk pekerjaan:

```bash
git switch -c perbaikan-docs
```

5. Kerjakan, commit, lalu push ke **fork-mu** (bukan upstream):

```bash
git add .
git commit -m "docs: perbaiki typo"
git push -u origin perbaikan-docs
```

6. Buka **Pull Request** dari branch di fork-mu ke repo asli.

## Menjaga Fork Tetap Update

Sebelum mulai kerja baru, sinkronkan fork dengan repo asli:

```bash
git fetch upstream
git switch main
git merge upstream/main      # atau: git rebase upstream/main
git push origin main         # update fork di GitHub
```

## Fork vs Clone vs Branch

| Istilah | Arti |
| --- | --- |
| **Fork** | Salinan repo di akun GitHub-mu (sisi server) |
| **Clone** | Salinan repo ke komputermu (sisi lokal) |
| **Branch** | Garis kerja di dalam satu repo |

Fork dan clone sering dipakai bersama: fork dulu, lalu clone hasil fork.

::: tip
Untuk repo yang kamu punya akses tulisnya (repo sendiri atau tim), tidak perlu fork — cukup buat branch dan PR dari repo yang sama.
:::
