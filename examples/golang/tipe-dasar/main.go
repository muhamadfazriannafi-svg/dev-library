package main

import (
	"fmt"
	"math/cmplx"
)

var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func main() {
	fmt.Printf("Tipe: %T\n", ToBe)
	fmt.Println(ToBe)

	fmt.Printf("Tipe: %T\n", MaxInt)
	fmt.Println(MaxInt)

	fmt.Printf("Tipe: %T\n", z)
	fmt.Println(z)
}
