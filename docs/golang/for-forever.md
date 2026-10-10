# Pengulangan Selamanya

Materi dari [Tur Go](https://go.dev/tour/flowcontrol/4). Jika kondisi dikosongkan, pengulangan akan berjalan **selamanya**. Dengan ini, pengulangan tanpa henti bisa ditulis dengan singkat.

```go
package main

func main() {
    for {
    }
}
```

Keterangan:

- `for { }` sama artinya dengan `for ;; { }` — tidak ada perintah awal, kondisi, maupun perintah akhir.
- Untuk keluar dari pengulangan, gunakan **`break`** atau **`return`**, bergantung kebutuhan program.

## Contoh dengan break

```go
package main

import "fmt"

func main() {
    i := 0
    for {
        i++
        if i > 3 {
            break
        }
        fmt.Println(i)
    }
}
```

Keluaran:

```text
1
2
3
```

## Contoh dengan return

```go
package main

import "fmt"

func cari(target int) {
    for i := 0; ; i++ {
        if i == target {
            fmt.Println("ketemu:", i)
            return
        }
    }
}

func main() {
    cari(2)
}
```

Keluaran:

```text
ketemu: 2
```

::: warning
Loop tanpa kondisi akan berjalan terus-menerus. Pastikan selalu ada jalan keluar (`break`/`return`) agar program tidak menggantung.
:::

Referensi: <https://go.dev/tour/flowcontrol/4>
