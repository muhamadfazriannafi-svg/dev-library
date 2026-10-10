# Inferensi Tipe

Materi dari [Tur Go](https://go.dev/tour/basics/14). Saat mendeklarasikan variabel tanpa menentukan tipe eksplisitnya (baik dengan `:=` maupun `var`), tipe variabel **disamakan dengan nilai di sebelah kanannya**.

## Dari Variabel Lain

Bila sisi kanan deklarasi sudah bertipe, variabel baru memiliki tipe yang sama:

```go
var i int
j := i // j adalah sebuah int
```

## Dari Konstanta Numerik

Bila sisi kanan berupa konstanta numerik, variabel baru bisa jadi `int`, `float64`, atau `complex128` bergantung pada presisi konstanta:

```go
i := 42           // int
f := 3.142        // float64
g := 0.867 + 0.5i // complex128
```

## Contoh

```go
package main

import "fmt"

func main() {
    v := 42 // ubah nilai ini dan lihat tipenya berubah
    fmt.Printf("v bertipe %T\n", v)
}
```

Keluaran:

```text
v bertipe int
```

Coba ubah nilai awal `v`:

| Nilai `v` | Tipe |
| --- | --- |
| `42` | `int` |
| `3.142` | `float64` |
| `0.867 + 0.5i` | `complex128` |
| `true` | `bool` |
| `"halo"` | `string` |

Referensi: <https://go.dev/tour/basics/14>
