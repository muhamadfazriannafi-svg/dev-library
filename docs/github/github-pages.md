# GitHub Pages

Hosting statis gratis langsung dari repository GitHub. Cocok untuk dokumentasi (VitePress, Docusaurus), portofolio, atau landing page.

## 1. Konsep Dasar

GitHub Pages menyajikan file statis (HTML/CSS/JS) dari salah satu sumber:

- **Branch** — misal branch `gh-pages` atau folder `/docs`.
- **GitHub Actions** — workflow yang meng-upload hasil build. Ini cara modern dan paling fleksibel.

::: tip
Untuk situs yang di-*generate* (VitePress, Next static export), pakai sumber **GitHub Actions** — jangan commit folder `dist/`.
:::

## 2. Aktifkan Pages

1. Buka repo di GitHub → **Settings** → **Pages**.
2. Di **Build and deployment** → **Source**, pilih **GitHub Actions**.
3. Push ke `main`; situs terbit di `https://<username>.github.io/<nama-repo>/`.

## 3. Konfigurasi `base` (Sering Bikin Error)

Situs project (bukan `username.github.io`) disajikan dari sub-path, jadi asset harus memakai prefix nama repo:

```ts
// docs/.vitepress/config.mts
export default defineConfig({
  base: '/dev-library/', // cocokkan dengan nama repo
})
```

Kalau `base` salah, halaman tampil tanpa CSS/JS.

::: warning Bedakan dua tipe repo
- `dev-library` → URL `https://user.github.io/dev-library/` → **butuh** `base: '/dev-library/'`.
- `user.github.io` (repo user/org) → URL root → `base: '/'`.
:::

## 4. Alamat Situs

- Project site: `https://<username>.github.io/<repo>/`
- User site: `https://<username>.github.io/`

Aktifkan **Enforce HTTPS** di Settings → Pages setelah domain aktif.

## 5. Custom Domain

1. Settings → Pages → **Custom domain**, isi misal `docs.example.com`.
2. Tambah DNS record di penyedia domain:
   - `CNAME` untuk subdomain → `<username>.github.io`
   - `A` / `ALIAS` untuk apex domain.
3. Centang **Enforce HTTPS**.

GitHub membuat file `CNAME` di branch deploy. Kalau deploy lewat Actions, sertakan agar tidak hilang.

## 6. Masalah Umum

| Gejala | Penyebab |
| --- | --- |
| Halaman blank / tanpa CSS | `base` belum diset sesuai nama repo |
| 404 saat refresh halaman dalam | perlu `cleanUrls` + `404.html`, atau SPA fallback |
| Build gagal di Actions | versi Node/npm tidak diset lewat `actions/setup-node` |
| Perubahan tidak muncul | Pages deploy masih proses, atau workflow gagal — cek tab **Actions** |

Untuk VitePress, error 404 halaman dalam biasanya sudah tertangani otomatis karena setiap halaman di-*prerender* jadi file `.html` sendiri.
