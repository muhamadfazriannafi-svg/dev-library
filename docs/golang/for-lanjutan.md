# Pengulangan Lanjutan

Materi dari [Tur Go](https://go.dev/tour/flowcontrol/2). Perintah awal dan perintah akhir pada `for` bersifat **opsional**.

## `for` sebagai "while"

Tanpa perintah awal dan akhir, `for` berfungsi seperti `while` di bahasa lain:

```go
package main

import "fmt"

func main() {
    sum := 1
    for sum < 1000 {
        sum += sum
        fmt.Println(sum)
    }
    fmt.Println(sum)
}
```

Keluaran:

```text
2
4
8
16
32
64
128
256
512
1024
```

Keterangan:

- Komponen yang tersisa hanyalah **ekspresi kondisi** (`sum < 1000`).
- Tanda titik-koma boleh dihilangkan bila perintah awal dan akhir tidak dipakai.

## Bentuk-bentuk `for`

```go
// lengkap: awal; kondisi; akhir
for i := 0; i < 5; i++ { }

// seperti while: hanya kondisi
for sum < 1000 { }

// tak terbatas (loop selamanya)
for { }
```

::: tip
Loop tak terbatas `for { }` biasanya dihentikan dengan `break` atau `return`.
:::

Referensi: <https://go.dev/tour/flowcontrol/2>
