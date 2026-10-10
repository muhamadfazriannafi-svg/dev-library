package main

import "fmt"

// Parameter bertipe sama boleh digabung: x, y int.
func add(x, y int) int {
	return x + y
}

// Fungsi dengan banyak kembalian.
func swap(x, y string) (string, string) {
	return y, x
}

// Fungsi dengan kembalian bernama (naked return).
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func main() {
	fmt.Println("add(42, 13) =", add(42, 13))

	a, b := swap("hello", "world")
	fmt.Println("swap:", a, b)

	x, y := split(17)
	fmt.Println("split(17) =", x, y)
}
