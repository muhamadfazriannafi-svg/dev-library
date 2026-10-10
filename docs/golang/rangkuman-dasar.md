# Rangkuman Bab Dasar

Rangkuman seluruh materi bab **Dasar** dalam satu program Go berkomentar. Cocok untuk mengulang cepat sebelum lanjut ke bab berikutnya.

File sumber: [`examples/golang/rangkuman-dasar/main.go`](https://github.com/muhamadfazriannafi-svg/dev-library/blob/main/examples/golang/rangkuman-dasar/main.go)

## Cara Menjalankan

```bash
go run ./examples/golang/rangkuman-dasar/main.go
```

## Isi Rangkuman

Program ini menggabungkan seluruh topik bab Dasar:

- **Paket & import** — `package main`, import difaktorkan
- **Nama yang diekspor** — huruf besar vs huruf kecil
- **Variabel** — `var` tingkat paket/fungsi, inisialisasi, `:=`
- **Konstanta & iota** — `const`, penomoran otomatis, konstanta untyped
- **Fungsi** — parameter digabung, banyak kembalian, kembalian bernama
- **Tipe dasar** — bool, uint64, byte, rune, complex128
- **Nilai kosong** — zero value tiap tipe
- **Konversi & inferensi tipe** — `T(v)` eksplisit, tipe disimpulkan

## Cuplikan

```go
var (
	namaModul = "dev-library" // tipe disimpulkan: string
	versi     = 1.27          // tipe disimpulkan: float64
	aktif     = true          // tipe disimpulkan: bool
)

const (
	Big   = 1 << 100  // 1 diikuti 100 angka nol (biner)
	Small = Big >> 99 // menggeser balik -> 1 << 1 = 2
)

// Parameter bertipe sama digabung: x, y int.
func tambah(x, y int) int {
	return x + y
}

// Kembalian bernama + naked return.
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}
```

## Contoh Keluaran

```text
[fungsi] tambah(a,b) = 7
[fungsi] swap = world hello
[fungsi] split(17) = 7 10
[nilai kosong] int=0 float64=0 bool=false string=""
[inferensi] j=int g=float64 h=complex128
[konversi] float64(42)=42 sqrt(3^2+4^2)=5
[tipe dasar] bool=false maxUint=18446744073709551615 kompleks=(2+3i) byte='A' rune='中'
[konstanta] Pi=3.14 namaModul=dev-library versi=1.27 aktif=true Awal/Tengah/Akhir=0/1/2
[konstanta untyped] Small(sebagai int)=21 Big(sebagai float64)=1.2676506002282295e+29
[paket] math/rand.Intn(10)=5 math.Pi=3.141592653589793
```

## Lanjut

- [Quiz: Dasar](/golang/quiz-dasar) — uji pemahaman bab Dasar
