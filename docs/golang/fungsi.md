# Fungsi

Materi dari [Tur Go](https://go.dev/tour/basics/4). Sebuah fungsi bisa tanpa argumen atau memiliki banyak argumen.

## Fungsi Dasar

Pada contoh ini, `add` memiliki dua parameter bertipe `int`:

```go
package main

import "fmt"

func add(x int, y int) int {
    return x + y
}

func main() {
    fmt.Println(add(42, 13))
}
```

Keluaran:

```text
55
```

Perhatikan bahwa **tipe ditulis setelah nama variabel** (`x int`), bukan sebelum seperti di banyak bahasa lain.

::: tip
Alasan tipe ditulis setelah nama dibahas di artikel Go tentang [deklarasi sintaks](https://go.dev/blog/declaration-syntax).
:::

## Parameter dengan Tipe Sama

Saat dua atau lebih parameter memiliki tipe yang sama, tipe bisa digabung jadi satu.

```go
func add(x int, y int) int { ... }
```

disingkat menjadi:

```go
func add(x, y int) int { ... }
```

## Fungsi dengan Banyak Kembalian

Sebuah fungsi dapat mengembalikan banyak nilai. Fungsi `swap` berikut mengembalikan dua `string`:

```go
package main

import "fmt"

func swap(x, y string) (string, string) {
    return y, x
}

func main() {
    a, b := swap("hello", "world")
    fmt.Println(a, b)
}
```

Keluaran:

```text
world hello
```

## Rangkuman

| Bentuk | Contoh |
| --- | --- |
| Tanpa argumen | `func halo() string` |
| Satu argumen | `func add(x int)` |
| Tipe digabung | `func add(x, y int) int` |
| Banyak kembalian | `func swap(x, y string) (string, string)` |

## Fungsi dengan Kembalian Bernama

Nilai kembalian dari fungsi bisa diberi nama. Jika punya nama, mereka diperlakukan seperti variabel yang didefinisikan di dalam fungsi.

Penamaan tersebut sebaiknya dipakai untuk **mendokumentasikan makna** dari nilai kembalian.

```go
package main

import "fmt"

func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
}

func main() {
    fmt.Println(split(17))
}
```

Keluaran:

```text
7 10
```

Perintah `return` **tanpa nilai kembalian** mengembalikan nilai terakhir yang disimpan di setiap variabel kembalian. Bentuk ini dikenal dengan kembalian **"naked"**.

::: warning
Kembalian "naked" sebaiknya hanya dipakai pada fungsi yang singkat. Pada fungsi panjang, ia bisa mengganggu keterbacaan kode.
:::

Referensi: <https://go.dev/tour/basics/8>
