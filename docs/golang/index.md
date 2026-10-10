# Kumpulan Dokumentasi Go

Go (Golang) adalah bahasa pemrograman yang cepat, sederhana, dan punya dukungan konkurensi bawaan. Cocok untuk backend, CLI, dan layanan jaringan.

```go
package main

import "fmt"

func main() {
    fmt.Println("Halo, DevLibrary!")
}
```

## Mengapa Go

- **Sederhana** — sintaks kecil, mudah dibaca.
- **Cepat** — dikompilasi jadi binary native.
- **Konkurensi bawaan** — goroutine & channel.
- **Binary tunggal** — hasil build tidak butuh runtime tambahan.
- **Standard library lengkap** — HTTP server sudah ada di `net/http`.

## Versi Terbaru

| Versi | Status |
| --- | --- |
| **1.27.1** | stabil terbaru |
| 1.26.8 | maintenance |

Rilis & catatan perubahan: <https://go.dev/doc/devel/release>

## Daftar Materi

Catatan ini disusun mengikuti [Tur Go](https://go.dev/tour/).

- [Selamat Datang](/golang/selamat-datang) — mengenal Tur Go, menjalankan tur secara lokal, dan program pertama
- [Go Playground](/golang/go-playground) — sandbox online beserta batasannya

### Dasar

- [Paket (Package)](/golang/paket) — struktur paket, `package main`, dan `import`
- [Import](/golang/import) — import yang difaktorkan
- [Nama yang Diekspor](/golang/nama-ekspor) — huruf besar vs huruf kecil
- [Fungsi](/golang/fungsi) — parameter, tipe digabung, banyak kembalian, kembalian bernama
- [Variabel](/golang/variabel) — deklarasi `var` dan inisialisasi
- [Tipe Dasar](/golang/tipe-dasar) — bool, string, numerik, byte, rune, dsb.
- [Nilai Kosong](/golang/nilai-kosong) — `zero value` untuk setiap tipe
- [Konversi Tipe](/golang/konversi-tipe) — `T(v)` dan konversi eksplisit
- [Inferensi Tipe](/golang/inferensi-tipe) — tipe disimpulkan dari nilai
- [Konstanta](/golang/konstanta) — deklarasi `const`
- [Konstanta Numerik](/golang/konstanta-numerik) — presisi tinggi & konstanta tak bertipe
- [Rangkuman Bab Dasar](/golang/rangkuman-dasar) — semua materi dalam satu program berkomentar
- [Quiz: Dasar](/golang/quiz-dasar) — uji pemahaman bab Dasar

## Referensi

- Tur bahasa: <https://go.dev/tour/>
- Effective Go: <https://go.dev/doc/effective_go>
- Dokumentasi: <https://go.dev/doc/>
