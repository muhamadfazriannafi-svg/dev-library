# Konstanta Numerik

Materi dari [Tur Go](https://go.dev/tour/basics/16). Konstanta numerik adalah nilai dengan **presisi tinggi**.

```go
package main

import "fmt"

const (
    // Buat bilangan besar dengan menggeser 1 bit ke kiri 100 kali.
    // Yaitu, bilangan biner dengan 1 diikuti 100 angka nol.
    Big = 1 << 100
    // Geser lagi ke kanan 99 kali, jadi kita dapatkan 1 << 1, atau 2.
    Small = Big >> 99
)

func needInt(x int) int { return x*10 + 1 }

func needFloat(x float64) float64 {
    return x * 0.1
}

func main() {
    fmt.Println(needInt(Small))
    fmt.Println(needFloat(Small))
    fmt.Println(needFloat(Big))
}
```

Keluaran:

```text
21
0.2
1.2676506002282294e+30
```

## Konstanta Tak Bertipe

Konstanta yang **tidak bertipe** (*untyped*) memakai tipe yang dibutuhkan sesuai konteksnya:

```go
needInt(Small)    // Small dipakai sebagai int
needFloat(Small)  // Small dipakai sebagai float64
needFloat(Big)    // Big dipakai sebagai float64
```

## Kenapa `needInt(Big)` Error?

```go
fmt.Println(needInt(Big)) // error: constant overflows int
```

Sebuah `int` hanya dapat menyimpan bilangan bulat **64-bit** (kadang lebih sedikit, bergantung mesin). Nilai `Big` (`2^100`) jauh melebihi itu, sehingga meluap (*overflow*) saat dipaksa menjadi `int`.

::: tip
Karena konstanta tak bertipe punya presisi tinggi, `Big` tetap bisa dipakai sebagai `float64` — hanya `int` yang tidak cukup besar menampungnya.
:::

Referensi: <https://go.dev/tour/basics/16>
