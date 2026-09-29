# Queue

Queue memindahkan pekerjaan berat ke latar belakang agar respons ke user tidak menunggu. Contoh: kirim email, proses gambar, panggil API pihak ketiga.

## Kenapa Queue

Tanpa queue, request HTTP menunggu semua pekerjaan selesai:

```
User klik "Daftar"  →  simpan DB  →  kirim email (3 detik)  →  baru balas
```

Dengan queue:

```
User klik "Daftar"  →  simpan DB  →  taruh job di queue  →  langsung balas (cepat)
                                          ↓
                                   worker memproses di belakang
```

## Konfigurasi Driver

Di `.env`:

```ini
QUEUE_CONNECTION=database
```

| Driver | Keterangan |
| --- | --- |
| `sync` | langsung diproses (untuk development) |
| `database` | simpan job di tabel database, mudah dipakai |
| `redis` | paling cepat, untuk produksi berskala |
| `sqs` | layanan AWS |

Tabel untuk driver database:

```bash
php artisan make:queue-table
php artisan migrate
```

## Menjalankan Worker

```bash
php artisan queue:work          # proses terus-menerus
php artisan queue:listen        # reload kode tiap job (development)
```

Worker adalah proses terpisah. Di produksi jalankan lewat Supervisor atau `php artisan queue:work` di service manager.

::: warning
Kalau worker tidak jalan, job menumpuk dan tidak pernah diproses. Selalu pastikan worker hidup di produksi.
:::

## Dispatch Job

```php
<?php
use App\Jobs\KirimEmailSelamatDatang;

// taruh di queue
KirimEmailSelamatDatang::dispatch($user);

// tunda 10 menit
KirimEmailSelamatDatang::dispatch($user)->delay(now()->addMinutes(10));

// queue tertentu
KirimEmailSelamatDatang::dispatch($user)->onQueue('email');
```

## Melihat & Mengelola

```bash
php artisan queue:failed          # daftar job gagal
php artisan queue:retry all       # coba lagi semua
php artisan queue:flush           # bersihkan daftar gagal
php artisan queue:work --once     # proses satu job (uji cepat)
```

## Kapan Pakai Queue

| Cocok untuk queue | Jangan pakai queue |
| --- | --- |
| Kirim email/notifikasi | Operasi yang hasilnya langsung dibutuhkan user |
| Proses gambar/video | Validasi form |
| Panggil API eksternal lambat | Query data untuk tampilan |
| Impor/ekspor besar | |
| Laporan terjadwal | |

## Queue + Scheduler + Job

Ketiganya sering bekerja bersama:

```
Scheduler  → memicu tiap jam  →  dispatch Job  →  Queue  →  dijalankan Worker
```

Detail tiap bagian: [Job](/laravel/async/job) dan [Scheduler](/laravel/async/scheduler).

Referensi: <https://laravel.com/framework/docs/queues>
