# Tipe Dasar

Materi dari [Tur Go](https://go.dev/tour/basics/11). Tipe dasar pada Go yaitu:

```text
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias untuk uint8

rune // alias untuk int32
     // merepresentasikan sebuah kode Unicode

float32 float64

complex64 complex128
```

## Contoh

```go
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
```

Keluaran:

```text
Tipe: bool
false
Tipe: uint64
18446744073709551615
Tipe: complex128
(2+3i)
```

Pada contoh ini, deklarasi variabel juga bisa **"difaktorkan"** ke dalam blok, seperti pada perintah `import`.

## Catatan Ukuran

Tipe `int`, `uint`, dan `uintptr` biasanya berukuran **32 bit** pada sistem 32-bit dan **64 bit** pada sistem 64-bit. Saat membutuhkan nilai integer, gunakan `int` kecuali punya alasan tertentu memakai tipe berukuran khusus atau unsigned integer.

## Nilai Nol (Zero Value)

Variabel tanpa nilai awal diberi nilai nol sesuai tipenya:

| Tipe | Zero value |
| --- | --- |
| `bool` | `false` |
| `string` | `""` |
| `int`, `uint`, `float64` | `0` |
| `complex128` | `(0+0i)` |

Referensi: <https://go.dev/tour/basics/11>
