# for adalah "while"-nya Go

Materi dari [Tur Go](https://go.dev/tour/flowcontrol/3). Dengan menghilangkan perintah awal dan perintah akhir, `for` hanya menyisakan **ekspresi kondisi** — sehingga `for` menjadi seperti `while` pada bahasa C.

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

## Padanan C vs Go

| Bahasa C | Go |
| --- | --- |
| `while (sum < 1000) { ... }` | `for sum < 1000 { ... }` |

Keterangan:

- Tanpa perintah awal dan akhir, Go menghapus kedua titik-koma.
- Tanda kurung kurawal `{ }` tetap wajib.

::: tip
Lihat juga [Pengulangan Lanjutan](/golang/for-lanjutan) untuk bentuk `for` lainnya, termasuk loop tak terbatas `for { }`.
:::

Referensi: <https://go.dev/tour/flowcontrol/3>
