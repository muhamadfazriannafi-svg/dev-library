# Go Playground

Materi dari [Tur Go](https://go.dev/tour/welcome/2). Tur ini dibuat dengan **Go Playground**, sebuah layanan web yang berjalan di atas server `golang.org`.

## Cara Kerja

Layanan tersebut menerima program Go, mengompilasi, dan menjalankan program di dalam *sandbox*, lalu mengembalikan keluarannya. Karena itu kode bisa langsung dicoba di peramban tanpa memasang Go.

## Batasan Playground

| Batasan | Keterangan |
| --- | --- |
| **Waktu** | Selalu dimulai dari `2009-11-10 23:00:00 UTC` |
| **Eksekusi** | Ada batas waktu eksekusi |
| **CPU & memori** | Dibatasi |
| **Jaringan** | Tidak bisa mengakses jaringan eksternal |
| **Versi Go** | Memakai rilis stabil |

::: tip
Waktu yang tetap membuat keluaran program **deterministik**, sehingga hasilnya mudah di-*cache*. Mengetahui alasan tanggal `2009-11-10 23:00:00 UTC` dipilih adalah latihan bagi pembaca.
:::

## Contoh: Waktu di Playground

Karena waktu dimulai dari tanggal tetap, kode berikut selalu menghasilkan keluaran yang sama setiap dijalankan.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println("Selamat datang di playground!")

    fmt.Println("Waktu sekarang adalah", time.Now())
}
```

Keluaran:

```text
Selamat datang di playground!
Waktu sekarang adalah 2009-11-10 23:00:00 +0000 UTC
```

## Belajar Lebih Lanjut

- Blog resmi: [Inside the Go Playground](https://go.dev/blog/playground)
- Menjalankan Go sendiri secara lokal lihat [Selamat Datang](/golang/selamat-datang)

Referensi: <https://go.dev/tour/welcome/2>
