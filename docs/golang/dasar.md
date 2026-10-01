# Dasar & Sintaks Go

## Struktur Program

Setiap file Go diawali `package`, dan program yang bisa dijalankan memakai `package main` dengan fungsi `main`.

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    fmt.Println(strings.ToUpper("halo"))
}
```

Aturan penting:

- **`package main` + `func main()`** = program yang bisa dijalankan.
- **Import** yang tidak dipakai = error kompilasi.
- **Variabel** yang dideklarasikan tapi tidak dipakai = error.

## Variabel

```go
package main

import "fmt"

func main() {
    var nama string = "Fazri"   // eksplisit
    var umur = 20               // tipe disimpulkan
    kota := "Jakarta"           // deklarasi singkat (hanya di dalam fungsi)

    fmt.Println(nama, umur, kota)
}
```

Beberapa variabel sekaligus:

```go
var (
    a = 1
    b = "dua"
    c = true
)
```

## Tipe Data Dasar

| Tipe | Contoh |
| --- | --- |
| `int` / `int64` | `42` |
| `float64` | `3.14` |
| `string` | `"halo"` atau `` `multi baris` `` |
| `bool` | `true`, `false` |
| `byte` (= `uint8`) | `'A'` |
| `rune` (= `int32`) | `'日'` |

```go
var (
    angka    int     = 10
    desimal  float64 = 3.14
    teks     string  = "Go 1.27"
    benar    bool    = true
)
```

Nilai nol (zero value) saat variabel tidak diisi: `0` untuk angka, `""` untuk string, `false` untuk bool.

## Konstanta & iota

```go
const Pi = 3.14

const (
    A = iota   // 0
    B          // 1
    C          // 2
)
```

`iota` membuat penomoran otomatis — sering dipakai untuk `enum`.

## Kontrol Alur

### if

```go
if umur >= 18 {
    fmt.Println("dewasa")
} else if umur >= 13 {
    fmt.Println("remaja")
} else {
    fmt.Println("anak")
}

// dengan inisialisasi
if n := hitung(); n > 10 {
    fmt.Println(n)
}
```

### switch

```go
switch hari {
case "senin", "selasa":
    fmt.Println("awal minggu")
case "minggu":
    fmt.Println("libur")
default:
    fmt.Println("hari biasa")
}
```

Go tidak butuh `break` — setiap case berhenti otomatis. Gunakan `fallthrough` bila ingin lanjut.

### for

Go hanya punya `for` (tidak ada `while`).

```go
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// seperti while
n := 0
for n < 5 {
    n++
}

// tak terbatas
for {
    break
}

// range untuk array/slice/map/string
for i, v := range []string{"a", "b"} {
    fmt.Println(i, v)
}
```

## Function

```go
func tambah(a int, b int) int {
    return a + b
}

// parameter sama tipe digabung
func kurang(a, b int) int { return a - b }

// banyak nilai kembali
func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("tidak bisa bagi nol")
    }
    return a / b, nil
}
```

Pemakaian:

```go
hasil, err := bagi(10, 2)
if err != nil {
    fmt.Println("error:", err)
    return
}
fmt.Println(hasil)
```

::: tip
Pola `(nilai, error)` adalah cara Go menangani kesalahan — bukan exception. Selalu periksa `err` tepat setelah pemanggilan.
:::

## Struct

```go
type User struct {
    Nama  string
    Umur  int
    Aktif bool
}

u := User{Nama: "Fazri", Umur: 20, Aktif: true}
fmt.Println(u.Nama)

// pointer
p := &u
p.Umur = 21   // mengubah u juga
```

## Slice & Map

```go
// slice (array dinamis)
angka := []int{1, 2, 3}
angka = append(angka, 4)
fmt.Println(len(angka), angka[0])

// map
umur := map[string]int{
    "Budi": 25,
    "Sari": 30,
}
umur["Fazri"] = 20

nilai, ada := umur["Budi"]   // cek keberadaan
if ada {
    fmt.Println(nilai)
}

delete(umur, "Budi")
```

## Pointer

```go
x := 10
p := &x       // p menyimpan alamat x
*p = 20       // ubah nilai lewat pointer
fmt.Println(x) // 20
```

## Error Handling

```go
import (
    "errors"
    "fmt"
)

var ErrKosong = errors.New("data kosong")

func ambil(nama string) (string, error) {
    if nama == "" {
        return "", ErrKosong
    }
    return "Halo " + nama, nil
}

func main() {
    hasil, err := ambil("")
    if errors.Is(err, ErrKosong) {
        fmt.Println("data tidak boleh kosong")
        return
    }
    fmt.Println(hasil)
}
```

## Goroutine & Channel (Konkurensi)

```go
func kirim(ch chan string) {
    ch <- "pesan dari goroutine"
}

func main() {
    ch := make(chan string)
    go kirim(ch)          // jalankan di goroutine
    fmt.Println(<-ch)     // terima nilai
}
```

| Konsep | Fungsi |
| --- | --- |
| `go fungsi()` | jalankan goroutine |
| `chan T` | saluran komunikasi bertipe `T` |
| `ch <- v` | kirim |
| `<-ch` | terima |
| `sync.WaitGroup` | tunggu sekumpulan goroutine selesai |

## Package & Import

```go
import (
    "fmt"                          // standard library
    "github.com/gofiber/fiber/v2"  // eksternal
)
```

- Fungsi yang diekspor diawali huruf **kapital**: `BuatUser` bisa diakses lintas package, `buatUser` tidak.

## Menjalankan

```bash
go run main.go
go fmt ./...
go test ./...
```

Referensi:

- Tur bahasa: <https://go.dev/tour/>
- Effective Go: <https://go.dev/doc/effective_go>
