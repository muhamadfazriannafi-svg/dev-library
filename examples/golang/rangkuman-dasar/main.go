// RANGKUMAN MATERI BAB "DASAR" — Tur Go (https://go.dev/tour/basics/)
//
// File ini merangkum seluruh topik bab Dasar dalam satu program yang bisa
// dijalankan:  go run main.go
//
// Setiap bagian diberi komentar agar mudah dipelajari ulang.
package main

import (
	"fmt"
	"math"
	"math/cmplx"
	"math/rand"
)

// ---------------------------------------------------------------------------
// 1. PAKET & IMPORT
// ---------------------------------------------------------------------------
// - Setiap program Go tersusun dari paket; program berjalan di `package main`.
// - Import dapat "difaktorkan" di dalam tanda kurung (lihat blok import di atas).
// - Nama paket = elemen terakhir path import (mis. "math/rand" -> rand).

// ---------------------------------------------------------------------------
// 2. NAMA YANG DIEKSPOR
// ---------------------------------------------------------------------------
// - Nama diawali huruf BESAR -> diekspor (bisa diakses dari paket lain), mis. math.Pi.
// - Nama diawali huruf kecil -> tidak diekspor, mis. math.pi (akan error).

// ---------------------------------------------------------------------------
// 3. VARIABEL TINGKAT PAKET
// ---------------------------------------------------------------------------
// - `var` bisa di tingkat paket atau fungsi; tipe ditulis di akhir.
// - `:=` TIDAK bisa dipakai di luar fungsi.
var (
	namaModul = "dev-library" // tipe disimpulkan: string
	versi     = 1.27          // tipe disimpulkan: float64
	aktif     = true          // tipe disimpulkan: bool
	a, b      = 3, 4          // dua variabel sekaligus
)

// ---------------------------------------------------------------------------
// 4. KONSTANTA & iota
// ---------------------------------------------------------------------------
// - Konstanta memakai `const`, tidak bisa diubah, dan tidak bisa memakai `:=`.
// - `iota` memberi penomoran otomatis dalam blok const (mirip enum).
const Pi = 3.14

const (
	Awal   = iota // 0
	Tengah        // 1
	Akhir         // 2
)

// Konstanta numerik bertipe untyped: presisi tinggi, tipe mengikuti konteks.
const (
	Big   = 1 << 100  // 1 diikuti 100 angka nol (biner)
	Small = Big >> 99 // menggeser balik -> 1 << 1 = 2
)

// ---------------------------------------------------------------------------
// 5. FUNGSI
// ---------------------------------------------------------------------------
// - Tipe parameter ditulis setelah nama; parameter bertipe sama boleh digabung.
// - Fungsi dapat mengembalikan banyak nilai.
// - Nilai kembalian boleh diberi nama (naked return) untuk fungsi singkat.

// Parameter bertipe sama digabung: x, y int.
func tambah(x, y int) int {
	return x + y
}

// Banyak kembalian: menukar dua string.
func swap(x, y string) (string, string) {
	return y, x
}

// Kembalian bernama + naked return.
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return // mengembalikan x, y terakhir
}

// ---------------------------------------------------------------------------
// 6. TIPE DASAR, NILAI KOSONG, KONVERSI, INFERENSI
// ---------------------------------------------------------------------------
func tipeDanNilai() {
	// Tipe dasar: bool, string, int/uint & variannya, byte, rune,
	// float32/float64, complex64/complex128.
	var (
		toBool    bool       = false
		maxUint   uint64     = 1<<64 - 1
		angka     int        = 42
		kompleks  complex128 = cmplx.Sqrt(-5 + 12i)
		karakter  byte       = 'A' // alias uint8
		hurufRune rune       = '中' // alias int32, kode Unicode
	)

	// Nilai kosong (zero value) untuk variabel tanpa nilai awal:
	var i int     // 0
	var f float64 // 0
	var bl bool   // false
	var s string  // ""
	fmt.Printf("[nilai kosong] int=%v float64=%v bool=%v string=%q\n", i, f, bl, s)

	// Inferensi tipe: tipe mengikuti nilai di kanan.
	j := i            // int
	g := 3.142        // float64
	h := 0.867 + 0.5i // complex128
	fmt.Printf("[inferensi] j=%T g=%T h=%T\n", j, g, h)

	// Konversi tipe eksplisit T(v). Go tidak mengonversi otomatis antar tipe.
	fDariInt := float64(angka) // int -> float64 harus eksplisit
	akar := math.Sqrt(float64(kuadrat(a) + kuadrat(b)))
	fmt.Printf("[konversi] float64(42)=%v sqrt(3^2+4^2)=%v\n", fDariInt, akar)

	fmt.Printf("[tipe dasar] bool=%v maxUint=%v kompleks=%v byte=%q rune=%q\n",
		toBool, maxUint, kompleks, karakter, hurufRune)

	// Konstanta.
	fmt.Printf("[konstanta] Pi=%v namaModul=%s versi=%v aktif=%v Awal/Tengah/Akhir=%d/%d/%d\n",
		Pi, namaModul, versi, aktif, Awal, Tengah, Akhir)
	fmt.Printf("[konstanta untyped] Small(sebagai int)=%d Big(sebagai float64)=%v\n",
		needInt(Small), needFloat(Big))
}

func kuadrat(n int) int { return n * n }

func needInt(x int) int           { return x*10 + 1 }
func needFloat(x float64) float64 { return x * 0.1 }

// ---------------------------------------------------------------------------
// 7. MENGGUNAKAN PAKET LAIN
// ---------------------------------------------------------------------------
func contohPaket() {
	fmt.Printf("[paket] math/rand.Intn(10)=%d math.Pi=%v\n", rand.Intn(10), math.Pi)
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
func main() {
	// Fungsi
	fmt.Println("[fungsi] tambah(a,b) =", tambah(a, b))
	s1, s2 := swap("hello", "world")
	fmt.Println("[fungsi] swap =", s1, s2)
	x, y := split(17)
	fmt.Println("[fungsi] split(17) =", x, y)

	// Variabel, tipe, konstanta
	tipeDanNilai()

	// Paket
	contohPaket()
}
