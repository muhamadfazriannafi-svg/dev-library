# Paket (Package)

Materi dari [Tur Go](https://go.dev/tour/basics/1). Setiap program Go terbuat dari **paket-paket** (*package*).

## Aturan Dasar

- Setiap program Go tersusun dari paket.
- Program mulai berjalan di paket **`main`**.
- Sebuah program memakai paket lain dengan meng-`import` paket tersebut.
- Nama paket umumnya sama dengan elemen terakhir dari *path* import-nya.

Contohnya, paket `"math/rand"` terdiri dari berkas-berkas yang diawali perintah `package rand`.

## Contoh

Program berikut meng-`import` paket `"fmt"` dan `"math/rand"`:

```go
package main

import (
    "fmt"
    "math/rand"
)

func main() {
    fmt.Println("Nomor favorit saya adalah", rand.Intn(10))
}
```

Keterangan:

- `rand.Intn(10)` menghasilkan bilangan bulat acak antara `0` sampai `9`.
- Nama paket yang diimpor (`fmt`, `rand`) adalah elemen terakhir dari path import (`"fmt"`, `"math/rand"`).

::: tip
Kalau di [Go Playground](/golang/go-playground), `rand.Intn` menghasilkan deret yang sama setiap kali karena waktu dimulai dari tanggal tetap.
:::

Referensi: <https://go.dev/tour/basics/1>
