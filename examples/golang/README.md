# Contoh Kode Go — Bab Dasar (Tur Go)

Setiap folder berisi satu program `package main` yang bisa dijalankan sendiri.

## Cara Menjalankan

```bash
cd examples/golang/<folder>
go run main.go
```

Atau langsung dari root proyek:

```bash
go run ./examples/golang/fungsi/main.go
```

## Daftar Contoh

| Folder | Topik | Catatan |
| --- | --- | --- |
| `paket` | Paket | `package main`, `import`, `math/rand` |
| `import` | Import | import difaktorkan |
| `nama-ekspor` | Nama yang Diekspor | `math.Pi` vs `math.pi` |
| `fungsi` | Fungsi | parameter digabung, banyak kembalian, kembalian bernama |
| `variabel` | Variabel | `var`, inisialisasi, `:=` |
| `tipe-dasar` | Tipe Dasar | bool, uint64, complex128 |
| `nilai-kosong` | Nilai Kosong | zero value |
| `konversi-tipe` | Konversi Tipe | `T(v)` eksplisit |
| `inferensi-tipe` | Inferensi Tipe | tipe disimpulkan |
| `konstanta` | Konstanta | `const` |
| `konstanta-numerik` | Konstanta Numerik | presisi tinggi, overflow `int` |
| `rangkuman-dasar` | Rangkuman | seluruh materi bab Dasar dalam satu file berkomentar |

## Catatan

Beberapa contoh menyertakan baris yang sengaja dikomentari (mis. `math.pi`, `needInt(Big)`) karena akan menghasilkan error. Buka komentarnya untuk melihat pesan kesalahannya.

## Rangkuman Bab

`rangkuman-dasar/main.go` menggabungkan seluruh topik bab Dasar (paket, import, nama ekspor, fungsi, variabel, konstanta, tipe, nilai kosong, konversi, inferensi) dalam satu program berkomentar:

```bash
go run ./examples/golang/rangkuman-dasar/main.go
```
