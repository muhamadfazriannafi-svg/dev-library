# Scheduler

Scheduler menjalankan perintah secara otomatis pada waktu tertentu — pengganti `cron` yang lebih terkontrol dan ditulis dalam PHP.

## Dasar

Definisikan jadwal di `routes/console.php` (Laravel 11+) atau di `app/Console/Kernel.php` (versi lama).

```php
<?php
use Illuminate\Support\Facades\Schedule;

Schedule::command('emails:kirim')->daily();
Schedule::command('laporan:harian')->dailyAt('23:00');
Schedule::command('backup:db')->weeklyOn(1, '02:00');   // setiap Senin 02:00
```

## Hanya Satu Cron yang Dibutuhkan

Cukup satu entri cron di server — sisanya diatur Laravel:

```
* * * * * cd /path-proyek && php artisan schedule:run >> /dev/null 2>&1
```

Setiap menit, `schedule:run` memeriksa mana tugas yang harus jalan saat itu.

## Menjalankan Closure

```php
<?php
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    \Log::info('Cek tiap menit');
})->everyMinute();
```

## Frekuensi yang Tersedia

```php
<?php
Schedule::command('task')->everyMinute();
Schedule::command('task')->everyFiveMinutes();
Schedule::command('task')->everyFifteenMinutes();
Schedule::command('task')->hourly();
Schedule::command('task')->daily();          // tengah malam
Schedule::command('task')->dailyAt('13:30');
Schedule::command('task')->twiceDaily(1, 13);
Schedule::command('task')->weekly();
Schedule::command('task')->monthly();
Schedule::command('task')->quarterly();
Schedule::command('task')->yearly();

Schedule::command('task')->weekdays();        // Sen–Jum
Schedule::command('task')->weekends();
Schedule::command('task')->mondays()->at('08:00');
```

## Membatasi Kondisi

```php
<?php
Schedule::command('laporan:kirim')
    ->dailyAt('07:00')
    ->timezone('Asia/Jakarta')
    ->when(fn() => now()->isWeekday())
    ->environments(['production'])
    ->withoutOverlapping();      // cegah jalan tumpang-tindih
```

| Method | Fungsi |
| --- | --- |
| `timezone('Asia/Jakarta')` | jadwal memakai zona waktu tertentu |
| `when(callable)` / `skip(callable)` | jalankan hanya bila kondisi terpenuhi |
| `environments([...])` | batasi ke environment tertentu |
| `withoutOverlapping()` | cegah dua eksekusi bersamaan |
| `onOneServer()` | hanya satu server menjalankannya (multi-server) |
| `runInBackground()` | jalankan di latar belakang |

## Scheduler + Queue

Tugas berat sebaiknya tidak dijalankan langsung oleh scheduler, tapi dilempar ke queue:

```php
<?php
use App\Jobs\KirimLaporanHarian;

Schedule::job(new KirimLaporanHarian)->dailyAt('07:00');
```

Atau dispatch manual:

```php
<?php
Schedule::call(function () {
    \App\Jobs\SinkronData::dispatch();
})->hourly();
```

## Melihat & Menguji

```bash
php artisan schedule:list        # lihat semua jadwal
php artisan schedule:run         # jalankan yang jatuh tempo
php artisan schedule:work        # jalankan loop lokal (dev)
php artisan schedule:test        # uji tugas tertentu
```

::: tip
Urutan yang sehat:

```
Scheduler  →  dispatch Job  →  Queue  →  Worker memproses
```

Scheduler hanya *memicu*; pekerjaan berat dikerjakan worker di belakang.
:::

::: warning
`withoutOverlapping()` penting untuk tugas yang bisa lebih lama dari intervalnya. Tanpa itu, tugas yang belum selesai bisa ditumpuk oleh jadwal berikutnya.
:::

Referensi: <https://laravel.com/framework/docs/scheduling>
