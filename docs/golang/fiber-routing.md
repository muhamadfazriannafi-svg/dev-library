# Go Fiber: Basic Routing &amp; Middleware

Panduan cepat setup awal framework Fiber di Go beserta contoh middleware logging sederhana.

## 1. Setup Dasar

Gunakan kode berikut untuk inisialisasi server Fiber pertama kamu:

\\`\`\\\`go

package main

import (

    "[github.com/gofiber/fiber/v2](http://github.com/gofiber/fiber/v2)"

)

func main() {

    app := [fiber.New](http://fiber.New)()

    app.Get("/", func(c \*fiber.Ctx) error {

        return c.SendString("Hello, DevLibrary!")

    })

    app.Listen(":3000")

}

\\`\`\\\`

## 2. Tips Keamanan

Pastikan selalu menggunakan validator untuk setiap *request payload* yang masuk ke dalam endpoint API.