# Kumpulan Dokumentasi Go

Go (Golang) adalah bahasa pemrograman yang cepat, sederhana, dan punya dukungan konkurensi bawaan. Cocok untuk backend, CLI, dan layanan jaringan.

```go
package main

import "fmt"

func main() {
    fmt.Println("Halo, DevLibrary!")
}
```

## Mengapa Go

- **Sederhana** — sintaks kecil, mudah dibaca.
- **Cepat** — dikompilasi jadi binary native.
- **Konkurensi bawaan** — goroutine & channel.
- **Binary tunggal** — hasil build tidak butuh runtime tambahan.
- **Standard library lengkap** — HTTP server sudah ada di `net/http`.
- **Dokumentasi**: <https://go.dev/doc/>

## Versi Terbaru

| Versi | Status |
| --- | --- |
| **1.27.1** | stabil terbaru |
| 1.26.8 | maintenance |

Rilis & catatan perubahan: <https://go.dev/doc/devel/release>

## Daftar Materi

- [Instalasi & Setup](/golang/instalasi) — pasang Go di Windows/macOS/Linux
- [Dasar & Sintaks](/golang/dasar) — variabel, tipe, kontrol alur, function

## Ekosistem

| Perkakas | Fungsi | Tautan |
| --- | --- | --- |
| `go` tool | build, run, test, modul | <https://pkg.go.dev/cmd/go> |
| Gin | web framework populer | <https://gin-gonic.com/> |
| Fiber | web framework cepat | <https://gofiber.io/> |
| Echo | web framework minimalis | <https://echo.labstack.com/> |
| GORM | ORM database | <https://gorm.io/> |
| Cobra | framework CLI | <https://cobra.dev/> |
