# Pengulangan (for)

Materi dari [Tur Go](https://go.dev/tour/flowcontrol/1). Go hanya memiliki **satu** perintah pengulangan, yaitu `for`.

## Tiga Komponen `for`

Dasar dari pengulangan `for` memiliki tiga komponen yang dipisahkan **titik-koma**:

1. **perintah awal** — dieksekusi sebelum iterasi pertama
2. **ekspresi kondisi** — dievaluasi sebelum iterasi pertama (dan setiap iterasi)
3. **perintah akhir** — dieksekusi di setiap akhir iterasi

```go
package main

import "fmt"

func main() {
    sum := 0
    for i := 0; i < 10; i++ {
        sum += i
    }
    fmt.Println(sum)
}
```

Keluaran:

```text
45
```

Keterangan:

- Perintah awal biasanya berupa deklarasi variabel singkat (`i := 0`), dan `i` hanya bisa dipakai di dalam skop `for`.
- Pengulangan berhenti saat **ekspresi kondisi** bernilai `false`.

## Catatan Penting

- Tidak seperti bahasa C, Java, atau JavaScript, **tidak ada tanda kurung** yang menutupi ketiga komponen `for`.
- **Tanda kurung kurawal `{ }` selalu dibutuhkan**, bahkan untuk satu baris perintah.

```go
for i := 0; i < 10; i++ { ... }   // benar

// for (i := 0; i < 10; i++) { }  // error di Go (ada tanda kurung)
```

::: tip
Inisialisasi bisa dikosongkan (menjadi bagian `for` di pelajaran berikutnya), mis. `for ; sum < 1000; { ... }`.
:::

Referensi: <https://go.dev/tour/flowcontrol/1>
