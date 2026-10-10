package main

import "fmt"

// Variabel tingkat paket.
var versi = "1.27"

func main() {
	// var tanpa nilai awal -> nilai kosong.
	var i int
	var aktif bool
	fmt.Println("nilai kosong:", i, aktif)

	// var dengan inisialisasi (tipe implisit).
	var nama, kota = "Fazri", "Jakarta"

	// Deklarasi singkat (:=), hanya di dalam fungsi.
	umur := 20

	fmt.Println("versi:", versi)
	fmt.Println("nama:", nama, "kota:", kota, "umur:", umur)
}
