package main

import "fmt"

const Pi = 3.14

func main() {
	const World = "世界"
	fmt.Println("Halo", World)

	const Truth = true
	fmt.Println("Semua konstanta ini:", Pi, World, Truth)
}
