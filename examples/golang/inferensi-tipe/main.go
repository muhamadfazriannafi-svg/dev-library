package main

import "fmt"

func main() {
	v := 42.0 // ubah nilainya dan lihat tipenya berubah
	fmt.Printf("v bertipe %T\n", v)

	i := 42
	f := 3.142
	g := 0.867 + 0.5i
	fmt.Printf("i=%T f=%T g=%T\n", i, f, g)
}
