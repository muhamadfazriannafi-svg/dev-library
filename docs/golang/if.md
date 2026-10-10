# Kondisi (if)

Materi dari [Tur Go](https://go.dev/tour/flowcontrol/5). Perintah `if` mirip seperti pada pengulangan `for`: ekspresinya **tidak harus** ditutupi tanda kurung `( )`, namun tanda kurawal `{ }` **diharuskan**.

## Bentuk Dasar

```go
package main

import (
    "fmt"
    "math"
)

func sqrt(x float64) string {
    if x < 0 {
        return sqrt(-x) + "i"
    }
    return fmt.Sprint(math.Sqrt(x))
}

func main() {
    fmt.Println(sqrt(2), sqrt(-4))
}
```

Keluaran:

```text
1.4142135623730951 2i
```

## Aturan Penulisan

```go
if x < 0 {
    // benar: tanpa tanda kurung, kurawal wajib
}

// if (x < 0) { }   // boleh secara sintaks, tapi tidak idiomatis di Go
```

Keterangan:

- Ekspresi kondisi **tidak perlu** tanda kurung `( )`.
- Tanda kurawal `{ }` **selalu wajib** dan harus berada di baris yang sama dengan `if`.

::: tip
`if` bisa diawali pernyataan singkat sebelum kondisi, mis. `if v := math.Sqrt(x); v < 10 { ... }`. Lihat pelajaran berikutnya.
:::

Referensi: <https://go.dev/tour/flowcontrol/5>
