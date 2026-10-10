# Nilai Kosong (Zero Value)

Materi dari [Tur Go](https://go.dev/tour/basics/12). Variabel yang dideklarasikan tanpa nilai awal otomatis diberi **nilai kosong**.

Nilai kosong adalah:

- `0` untuk tipe numerik,
- `false` untuk tipe boolean, dan
- `""` (string kosong) untuk string.

## Contoh

```go
package main

import "fmt"

func main() {
    var i int
    var f float64
    var b bool
    var s string
    fmt.Printf("%v %v %v %q\n", i, f, b, s)
}
```

Keluaran:

```text
0 0 false ""
```

## Tabel Nilai Kosong

| Tipe | Nilai kosong |
| --- | --- |
| `bool` | `false` |
| `string` | `""` |
| `int`, `uint`, `float64` | `0` |
| `complex128` | `(0+0i)` |
| slice, map, channel, pointer, interface, function | `nil` |

::: tip
Format `%q` pada `fmt.Printf` menampilkan string dengan tanda kutip, sehingga string kosong terlihat jelas sebagai `""`.
:::

Referensi: <https://go.dev/tour/basics/12>
