# Konstanta

Materi dari [Tur Go](https://go.dev/tour/basics/15). Konstanta dideklarasikan seperti variabel, tapi dengan kata kunci `const`.

```go
package main

import "fmt"

const Pi = 3.14

func main() {
    const World = "世界"
    fmt.Println("Halo", World)

    const Truth = true
    fmt.Println("Semua konstanta ini:", Pi, World, Truth)
}
```

Keluaran:

```text
Halo 世界
Semua konstanta ini: 3.14 世界 true
```

## Aturan

- Konstanta bisa bernilai **karakter, string, boolean, atau numerik**.
- Konstanta **tidak bisa** dideklarasikan dengan sintaks `:=`.

```go
const Pi = 3.14   // benar

// Pi := 3.14     // error: tidak bisa pakai := untuk konstanta

// Pi = 3.15      // error: konstanta tidak bisa diubah setelah dideklarasikan
```

::: tip
Karena nilainya tetap, konstanta aman dipakai sebagai pengganti angka/teks "ajaib" agar kode lebih mudah dibaca.
:::

Referensi: <https://go.dev/tour/basics/15>
