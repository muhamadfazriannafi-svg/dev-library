package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println("Nilai Pi yang diekspor:", math.Pi)

	// Baris berikut akan error karena math.pi (huruf kecil) tidak diekspor.
	// Buka komentarnya untuk melihat pesan kesalahannya.
	// fmt.Println(math.pi)
}
