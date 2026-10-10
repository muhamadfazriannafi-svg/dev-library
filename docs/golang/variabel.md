# Variabel

Materi dari [Tur Go](https://go.dev/tour/basics/9). Perintah `var` mendeklarasikan daftar variabel; seperti pada daftar argumen fungsi, **tipe berada di akhir**.

```go
package main

import "fmt"

var c, python, java bool

func main() {
    var i int
    fmt.Println(i, c, python, java)
}
```

Keluaran:

```text
0 false false false
```

Keterangan:

- `var` bisa ditulis pada **tingkat paket** maupun **tingkat fungsi**.
- Variabel yang tidak diberi nilai otomatis memakai **nilai nol** (*zero value*): `0` untuk angka, `false` untuk bool, `""` untuk string.

## Variabel dengan Inisialisasi

Deklarasi variabel bisa disertai inisialisasi, satu inisialisasi per variabel.

```go
package main

import "fmt"

var i, j int = 1, 2

func main() {
    var c, python, java = true, false, "no!"
    fmt.Println(i, j, c, python, java)
}
```

Keluaran:

```text
1 2 true false no!
```

Jika variabel diinisialisasi, **tipe bisa dihilangkan** — variabel akan memakai tipe sesuai nilai inisialisasinya:

- `var i = 1` → bertipe `int`
- `var aktif = true` → bertipe `bool`
- `var nama = "Go"` → bertipe `string`

## Tingkat Paket vs Fungsi

```go
package main

var versi = "1.27"      // tingkat paket (di luar fungsi)

func main() {
    var lokal = "fungsi" // tingkat fungsi
    println(versi, lokal)
}
```

::: tip
Untuk deklarasi singkat di dalam fungsi, gunakan `:=` (mis. `nama := "Go"`). Bentuk ini tidak berlaku di tingkat paket.
:::

## Deklarasi Variabel Singkat

Di dalam sebuah fungsi, perintah singkat `:=` bisa dipakai sebagai pengganti `var` dengan tipe implisit.

```go
package main

import "fmt"

func main() {
    var i, j int = 1, 2
    k := 3
    c, python, java := true, false, "no!"

    fmt.Println(i, j, k, c, python, java)
}
```

Keluaran:

```text
1 2 3 true false no!
```

Di luar sebuah fungsi, setiap perintah harus dimulai dengan kata kunci (`var`, `func`, dst), sehingga `:=` **tidak bisa** digunakan di tingkat paket:

```go
package main

// k := 3   // error: non-declaration statement outside function body

var k = 3   // benar
```

Referensi: <https://go.dev/tour/basics/10>
