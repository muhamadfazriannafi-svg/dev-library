# Konversi Tipe

Materi dari [Tur Go](https://go.dev/tour/basics/13). Ekspresi `T(v)` mengonversi nilai `v` ke tipe `T`.

## Contoh

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    var x, y int = 3, 4
    var f float64 = math.Sqrt(float64(x*x + y*y))
    var z uint = uint(f)
    fmt.Println(x, y, z)
}
```

Keluaran:

```text
3 4 5
```

Bentuk singkat:

```go
i := 42
f := float64(i)
u := uint(f)
```

## Konversi Eksplisit Wajib

Tidak seperti C, pengisian nilai pada Go antara item dengan tipe berbeda **membutuhkan konversi eksplisit**.

```go
var i int = 42
var f float64 = i            // error: cannot use i (type int) as type float64

var f float64 = float64(i)   // benar
```

::: warning
Coba hilangkan konversi `float64` atau `int` pada contoh di atas — kode akan gagal dikompilasi. Go tidak melakukan konversi tipe numerik secara implisit.
:::

Referensi: <https://go.dev/tour/basics/13>
