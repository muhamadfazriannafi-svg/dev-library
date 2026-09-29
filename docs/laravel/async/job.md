# Job

Job adalah satu unit pekerjaan yang bisa dijalankan langsung atau ditaruh di queue untuk diproses nanti. Setiap job adalah class dengan method `handle()`.

## Membuat Job

```bash
php artisan make:job KirimEmailSelamatDatang
```

```php
<?php
namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class KirimEmailSelamatDatang implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public User $user,
    ) {}

    public function handle(): void
    {
        Mail::to($this->user->email)->send(new \App\Mail\SelamatDatang($this->user));
    }
}
```

Kunci: `implements ShouldQueue` — inilah yang membuat job jalan di queue. Tanpa itu, job berjalan sinkron.

## Dispatch Job

```php
<?php
use App\Jobs\KirimEmailSelamatDatang;

// ke queue
KirimEmailSelamatDatang::dispatch($user);

// sinkron (langsung) — untuk uji coba
KirimEmailSelamatDatang::dispatchSync($user);

// tunda
KirimEmailSelamatDatang::dispatch($user)->delay(now()->addMinutes(5));

// queue tertentu
KirimEmailSelamatDatang::dispatch($user)->onQueue('email');
```

Constructor job menerima data; `SerializesModels` otomatis memuat ulang model dari ID saat job dijalankan.

## Percobaan Ulang & Timeout

```php
<?php
class KirimEmailSelamatDatang implements ShouldQueue
{
    public int $tries = 3;          // maksimal 3 percobaan
    public int $timeout = 60;       // detik sebelum dianggap gagal
    public int $backoff = 10;       // jeda antar percobaan (detik)

    public function backoff(): array
    {
        return [1, 5, 10];
    }
}
```

Di **Laravel 13**, bisa juga lewat atribut:

```php
<?php
use Illuminate\Queue\Attributes\Tries;
use Illuminate\Queue\Attributes\Timeout;

#[Tries(3)]
#[Timeout(60)]
class KirimEmailSelamatDatang implements ShouldQueue
{
    // ...
}
```

## Menangani Kegagalan

```php
<?php
public function failed(\Throwable $exception): void
{
    \Log::error("Gagal kirim email: {$exception->getMessage()}");
}
```

Setelah `$tries` habis, job masuk ke tabel `failed_jobs`:

```bash
php artisan queue:failed
php artisan queue:retry all
```

## Batch Job

```php
<?php
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;

$batch = Bus::batch([
    new ProsesGambar($gambar1),
    new ProsesGambar($gambar2),
])->then(function (Batch $batch) {
    // semua selesai
})->catch(function (Batch $batch, \Throwable $e) {
    // ada yang gagal
})->dispatch();
```

## Job vs Event vs Command

| Konsep | Peran |
| --- | --- |
| **Job** | pekerjaan yang dijalankan (sinkron/queue) |
| **Event** | sesuatu terjadi; memicu listener |
| **Command** | dipanggil dari Artisan CLI |

Sering dipakai berantai: event dipicu, lalu listener men-dispatch job.

## Praktik Terbaik

- Job harus **idempoten** — aman dijalankan ulang bila retry (jangan sampai kirim email dua kali).
- Simpan hanya ID/data kecil di constructor, bukan objek berat; pakai `SerializesModels`.
- Pisahkan queue per jenis (mis. `email`, `report`) agar job berat tidak memblokir yang ringan.
- Tambahkan percobaan ulang yang wajar (`tries`, `backoff`), bukan tak terbatas.

::: warning
Job di queue berjalan di proses terpisah. Perubahan kode job baru berlaku setelah worker di-restart (`php artisan queue:restart`).
:::

Referensi: <https://laravel.com/framework/docs/queues>
