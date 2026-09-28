# GitHub Actions

Platform CI/CD milik GitHub. Menjalankan perintah otomatis sebagai respons terhadap *event* di repo.

## 1. Anatomi Workflow

File workflow diletakkan di `.github/workflows/*.yml`:

```yaml
name: Contoh Workflow        # nama tampil di tab Actions

on:                          # pemicu
  push:
    branches: [main]
  pull_request:

jobs:                        # sekumpulan pekerjaan
  build:
    runs-on: ubuntu-latest   # mesin (runner)
    steps:
      - uses: actions/checkout@v4   # ambil kode repo
      - run: echo "Hello Actions"
```

Istilah penting:

- **event** (`on`) — pemicu: `push`, `pull_request`, `schedule`, `workflow_dispatch` (manual).
- **job** — berjalan di runner terpisah, bisa paralel.
- **step** — langkah `run` (shell) atau `uses` (action siap pakai).
- **secrets** — nilai rahasia, diakses lewat ekspresi secrets (contoh di bagian 4).

## 2. Contoh: Build & Deploy VitePress ke Pages

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run docs:build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Alur `job` di atas: `deploy` butuh (`needs`) `build` selesai dulu.

::: tip Kunci yang sering terlupa
- `permissions` wajib: `pages: write` + `id-token: write`, kalau tidak deploy ditolak.
- `concurrency` mencegah dua deploy berjalan bersamaan.
- `npm ci` (bukan `npm install`) agar sesuai `package-lock.json`.
:::

## 3. Cache agar Build Cepat

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm
```

`cache: npm` otomatis meng-cache dependensi berdasarkan hash `package-lock.json`.

## 4. Secrets

Simpan kredensial di Settings → Secrets and variables → Actions, lalu pakai:

```yaml
- run: npm run deploy
  env:
    API_TOKEN: ${{ secrets.API_TOKEN }}
```

::: danger
Jangan pernah menulis token/API key langsung di file workflow — repo publik bisa dibaca siapa saja.
:::

## 5. Menjalankan Manual & Debug

```yaml
on:
  workflow_dispatch:   # muncul tombol "Run workflow"
```

Lihat hasil di tab **Actions** → pilih run → klik job untuk melihat log tiap step.
