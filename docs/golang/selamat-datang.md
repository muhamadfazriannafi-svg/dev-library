# Selamat Datang

Bagian pembuka dari [Tur Go](https://go.dev/tour/welcome/1). Tur ini memperkenalkan dasar-dasar bahasa Go lewat contoh kode yang bisa langsung dijalankan.

## Apa Itu Tur Go

Tur Go adalah pengantar interaktif ke bahasa Go. Materi dibagi menjadi beberapa bagian:

- **Selamat Datang** — mencoba Go dan menjalankan tur lokal
- **Dasar** — paket, variabel, function, kontrol alur
- **Method & Interface**
- **Generics**
- **Konkurensi**

## Menjalankan Tur Secara Lokal

Tur juga tersedia sebagai program yang berjalan sendiri, sehingga bisa dipakai **tanpa akses internet**. Program ini membuat dan menjalankan contoh kode di dalam mesin Anda sendiri.

Unduh dan pasang Go lebih dulu (lihat <https://go.dev/doc/install>), lalu jalankan:

```bash
go get github.com/golang-id/tour
```

Perintah tersebut memasang program tour ke dalam direktori `bin` di ruang kerja (`GOPATH`) Anda. Saat program tour dijalankan, ia akan membuka peramban web yang menampilkan versi lokal dari tur.

::: tip
Anda juga bisa melanjutkan tur langsung di situs <https://go.dev/tour/> bila sudah punya koneksi internet.
:::

## Program Go Pertama

Go mengompilasi kode jadi binary native. Contoh klasik:

```go
package main

import "fmt"

func main() {
    fmt.Println("Halo, Dunia")
}
```

Jalankan dengan:

```bash
go run hello.go     # kompilasi + langsung jalankan
go build hello.go   # hasilkan binary (hello atau hello.exe)
```

Referensi: <https://go.dev/tour/welcome/1>
