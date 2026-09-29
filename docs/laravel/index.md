# Kumpulan Dokumentasi Laravel

Laravel adalah framework PHP untuk membangun aplikasi web modern. Ia menyediakan struktur dan alat siap pakai: routing, database (Eloquent ORM), antrian (*queue*), penjadwalan (*scheduler*), otentikasi, hingga pengujian.

```php
<?php
use Illuminate\Support\Facades\Route;

Route::get('/users', function () {
    return User::where('is_active', true)->get();
});
```

## Mengapa Laravel

- **Konvensi di atas konfigurasi** — struktur folder & penamaan konsisten.
- **Eloquent ORM** — berinteraksi dengan database lewat objek, bukan SQL mentah.
- **Ekosistem lengkap** — Composer, Artisan, queue, scheduler, testing bawaan.
- **Dokumentasi lengkap** — <https://laravel.com/framework/docs>.
- **Skalabel** — didukung cache terdistribusi (Redis), Horizon, Octane.

## Versi Terbaru

| Versi | PHP | Rilis | Support |
| --- | --- | --- | --- |
| **13** | 8.3 – 8.5 | 17 Mar 2026 | bug fix Q3 2027, security Mar 2028 |
| 12 | 8.2 – 8.5 | 24 Feb 2025 | security hingga Feb 2027 |
| 11 | 8.2 – 8.4 | 12 Mar 2024 | security hingga Mar 2026 |
| 10 | 8.1 – 8.3 | 14 Feb 2023 | EOL |

Kecepatan rilis: **mayor setiap ~Q1** (sekali setahun), minor/patch setiap minggu. Minor & patch tidak pernah memuat *breaking change*.

Yang baru di **Laravel 13**:

- **Laravel AI SDK** — API terpadu untuk teks, agen, embedding, audio, gambar.
- **JSON:API Resources** — respons sesuai spesifikasi JSON:API.
- **Queue routing** — `Queue::route(Job::class, ...)` terpusat.
- **Atribut PHP** — `#[Middleware]`, `#[Authorize]`, `#[Tries]`, `#[Timeout]`.
- **Semantic / vector search** — `whereVectorSimilarTo()` dengan PostgreSQL + `pgvector`.
- **`Cache::touch()`** — perpanjang TTL tanpa ambil ulang nilainya.
- **PreventRequestForgery** — proteksi CSRF diperkuat.

Referensi:
- Rilis & support: <https://laravel.com/framework/docs/releases>
- Instalasi: <https://laravel.com/framework/docs/installation>
- Catatan perubahan: <https://github.com/laravel/framework/releases>

## Instalasi Cepat

```bash
laravel new nama-app
cd nama-app
composer run dev
```

Server lokal berjalan di `http://localhost:8000`. Konfigurasi database diatur di file `.env`.

## Struktur Folder Penting

| Folder | Isi |
| --- | --- |
| `app/Models` | model Eloquent |
| `app/Http/Controllers` | controller |
| `routes/web.php` | route halaman |
| `routes/api.php` | route API |
| `database/migrations` | skema tabel |
| `resources/views` | template Blade |
| `config` | konfigurasi |
| `app/Jobs` | job queue |

## Daftar Materi

**Dasar**

- [Laravel Basic](/laravel/basic/routing) — routing, controller, view, migration
- [Eloquent ORM](/laravel/eloquent) — query database dengan ORM

**Arsitektur**

- [Modular](/laravel/arsitektur/modular) — memecah aplikasi jadi modul
- [Repository Pattern](/laravel/arsitektur/repository) — memisahkan akses data

**Asynchronous**

- [Queue](/laravel/async/queue) — pekerjaan di latar belakang
- [Job](/laravel/async/job) — unit pekerjaan
- [Scheduler](/laravel/async/scheduler) — tugas terjadwal

**Debugging & Keamanan**

- [Laravel Telescope](/laravel/telescope) — memantau request, query, job
- [SQL Injection](/laravel/security/sql-injection) — bahaya & pencegahannya
