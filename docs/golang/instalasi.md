# Instalasi & Setup Go

## Unduh & Pasang

Sumber resmi: <https://go.dev/dl/>

### Windows

1. Unduh installer `go1.27.1.windows-amd64.msi`.
2. Jalankan installer (default ke `C:\Program Files\Go`).
3. Tutup lalu buka ulang terminal.

Atau lewat package manager:

```powershell
winget install GoLang.Go
# atau
choco install golang
# atau
scoop install go
```

### macOS

Unduh `go1.27.1.darwin-arm64.pkg` (Apple Silicon) atau `darwin-amd64.pkg` (Intel), jalankan, lalu:

```bash
# atau lewat Homebrew
brew install go
```

### Linux

```bash
# unduh, ekstrak ke /usr/local
wget https://go.dev/dl/go1.27.1.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.27.1.linux-amd64.tar.gz

# tambahkan ke PATH (di ~/.profile atau ~/.bashrc)
export PATH=$PATH:/usr/local/go/bin
```

## Cek Instalasi

```bash
go version
# go version go1.27.1 windows/amd64
```

## Konfigurasi Penting

```bash
go env                 # lihat semua konfigurasi
go env GOPATH          # lokasi workspace & cache
go env GOROOT          # lokasi instalasi Go
```

| Variabel | Fungsi |
| --- | --- |
| `GOPATH` | folder kerja (default `~/go`) — berisi `bin`, `pkg`, `src` |
| `GOROOT` | lokasi instalasi Go |
| `GOBIN` | lokasi binary hasil `go install` |
| `GOPROXY` | proxy modul (default `https://proxy.golang.org`) |

Tambahkan folder binary ke PATH agar hasil `go install` bisa dipanggil:

```bash
export PATH=$PATH:$(go env GOPATH)/bin
```

## Membuat Proyek Pertama

```bash
mkdir hello && cd hello
go mod init contoh.com/hello
```

Buat `main.go`:

```go
package main

import "fmt"

func main() {
    fmt.Println("Halo, Go!")
}
```

Jalankan:

```bash
go run main.go     # kompilasi + jalankan
go build           # hasilkan binary
go build -o hello.exe main.go   # nama binary kustom
```

## Perintah `go` yang Sering Dipakai

```bash
go run .           # jalankan paket di folder ini
go build           # buat binary
go test ./...      # jalankan semua test
go fmt ./...       # rapikan format kode
go vet ./...       # cari masalah umum
go mod tidy        # rapikan dependensi
go get paket/url   # tambah dependensi
go install url@latest
```

## Bagian dari Go Modules

Setiap proyek punya `go.mod` yang mencatat nama modul dan dependensi.

```bash
go mod init github.com/user/proyek
go get github.com/gofiber/fiber/v2
go mod tidy
```

Isi `go.mod`:

```text
module github.com/user/proyek

go 1.27

require github.com/gofiber/fiber/v2 v2.52.0
```

## Editor

- **VS Code** + ekstensi Go resmi (jalankan `Go: Install/Update Tools`).
- **GoLand** (JetBrains).
- Tools pendukung dipasang otomatis: `gopls` (language server), `dlv` (debugger), `staticcheck`.

::: tip
Jika `go run` untuk pertama kali terasa lambat, itu karena mengunduh modul. Setelah tercache, build berikutnya jauh lebih cepat.
:::

::: warning
Jangan set `GOPATH` ke dalam folder proyek. Biarkan default; proyek modern berdiri sendiri lewat `go.mod`.
:::

Referensi: <https://go.dev/doc/install>
