# Nama yang Diekspor

Materi dari [Tur Go](https://go.dev/tour/basics/3). Pada bahasa Go, sebuah nama **diekspor** (*exported*) jika diawali dengan **huruf besar**.

## Aturan

- Nama diawali huruf besar → **diekspor** (bisa diakses dari luar paket).
- Nama diawali huruf kecil → **tidak diekspor** (hanya bisa dipakai di dalam paketnya).

Contoh: `Pizza` diekspor, `Pi` diekspor dari paket `math`. Sedangkan `pizza` dan `pi` tidak diekspor.

Saat mengimpor sebuah paket, Anda **hanya bisa mengacu pada nama yang diekspor**.

## Contoh: Error karena Huruf Kecil

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    fmt.Println(math.pi) // error: tidak diekspor
}
```

Kesalahan:

```text
# command-line-arguments
./main.go:9:15: undefined: math.pi
```

## Perbaikan

Ganti `math.pi` dengan `math.Pi` (huruf besar):

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    fmt.Println(math.Pi)
}
```

Keluaran:

```text
3.141592653589793
```

::: tip
Kesalahan `undefined` sering muncul bukan karena paketnya salah, tapi karena nama yang diakses tidak diekspor.
:::

Referensi: <https://go.dev/tour/basics/3>
