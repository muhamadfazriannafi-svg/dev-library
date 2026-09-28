# git push

Mengirim commit dari repo lokal ke remote (mis. GitHub). Ini langkah yang membagikan pekerjaanmu.

## Dasar

```bash
git push                          # push branch aktif ke upstream
git push -u origin main           # push pertama kali + set upstream
git push origin fitur-login       # push branch tertentu
```

Setelah `-u` (upstream) terset, berikutnya cukup `git push` atau `git push origin HEAD`.

## Perintah Berguna

```bash
git push origin --delete fitur-lama   # hapus branch di remote
git push --tags                       # kirim semua tag
git push origin v1.0.0                # kirim tag tertentu
git push --dry-run                    # simulasi, tidak benar-benar mengirim
```

## Push Ditolak (non-fast-forward)

```
! [rejected] main -> main (fetch first)
```

Artinya remote punya commit yang belum ada di lokal. Solusi normal: tarik dulu, lalu push.

```bash
git pull --rebase
git push
```

## Force Push

```bash
git push --force-with-lease
```

::: danger
`--force` menimpa riwayat di remote dan bisa menghapus pekerjaan orang lain. **Jangan** pakai di branch bersama (`main`).
:::

::: tip
Kalau terpaksa harus menimpa (mis. setelah `rebase` branch fitur milikmu sendiri), pakai `--force-with-lease` — ia menolak jika remote sudah berubah sejak kamu terakhir fetch.
:::
