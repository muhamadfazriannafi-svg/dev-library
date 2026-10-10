# Kondisi if dan else

Materi dari [Tur Go](https://go.dev/tour/flowcontrol/6). Variabel yang dideklarasikan dalam perintah singkat `if` juga dapat digunakan dalam blok `else`.

```go
package main

import (
    "fmt"
    "math"
)

func pow(x, n, lim float64) float64 {
    if v := math.Pow(x, n); v < lim {
        return v
    } else {
        fmt.Printf("%g >= %g\n", v, lim)
    }
    return lim
}

func main() {
    fmt.Println(
        pow(3, 2, 10),
        pow(3, 3, 20),
    )
}
```

Keluaran:

```text
27 >= 20
9 20
```

## Penjelasan

- `if v := math.Pow(x, n); v < lim { ... }` mendeklarasikan `v` sekaligus mengevaluasi kondisi.
- Variabel `v` **tersedia di blok `if` maupun `else`**, tapi **tidak** di luar keduanya.
- Pada contoh ini, kedua pemanggilan fungsi `pow` dieksekusi sebelum `main` memanggil `fmt.Println`.

## Skop Variabel if

```go
if v := hitung(); v < lim {
    // v tersedia di sini
} else {
    // v juga tersedia di sini
}
// v sudah tidak tersedia di sini
```

::: tip
Pola `if v := ...; kondisi` berguna untuk membatasi skop variabel agar tidak "bocor" ke seluruh fungsi.
:::

Referensi: <https://go.dev/tour/flowcontrol/6>
