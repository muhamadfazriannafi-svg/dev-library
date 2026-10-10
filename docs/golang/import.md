# Import

Materi dari [Tur Go](https://go.dev/tour/basics/2). Go bisa mengelompokkan beberapa `import` di dalam tanda kurung — bentuk ini disebut perintah import yang **"difaktorkan"** (*factored*).

## Dua Cara Menulis Import

Boleh menulis satu per satu:

```go
import "fmt"
import "math"
```

Namun lebih disarankan memakai bentuk yang difaktorkan:

```go
import (
    "fmt"
    "math"
)
```

## Contoh

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    fmt.Printf("Akar kuadrat dari 2 adalah %g\n", math.Sqrt(2))
}
```

Keluaran:

```text
Akar kuadrat dari 2 adalah 1.4142135623730951
```

## Aturan Penting

- **Import yang tidak dipakai** menyebabkan error kompilasi.
- `goimports` / `gofmt` bisa merapikan daftar import secara otomatis.

Referensi: <https://go.dev/tour/basics/2>
