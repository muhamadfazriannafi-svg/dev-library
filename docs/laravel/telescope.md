# Laravel Telescope

Telescope adalah alat debugging resmi Laravel. Ia merekam apa yang terjadi di aplikasi: request, query, job, exception, log, dan menampilkannya di dashboard web.

## Yang Direkam Telescope

- **Requests** — URL, method, status code, durasi
- **Queries** — setiap query SQL, durasi, dan query duplikat (deteksi N+1)
- **Jobs** — status, payload, durasi, kegagalan
- **Exceptions** — error lengkap beserta stack trace
- **Logs** — catatan log aplikasi
- **Mail, Notifications, Events, Cache, Schedule**

## Instalasi

```bash
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```

Akses dashboard di `/telescope`, mis. `http://localhost:8000/telescope`.

Karena ditujukan untuk development, biasanya dipasang sebagai `--dev`.

## Mengamankan di Produksi (bila perlu)

Batasi akses lewat `TelescopeServiceProvider`:

```php
<?php
use Laravel\Telescope\Telescope;

public function register(): void
{
    Telescope::auth(function ($request) {
        return app()->environment('local')
            || $request->user()?->email === 'admin@contoh.com';
    });
}
```

## Memantau Query & N+1

Tab **Queries** menampilkan semua query per request. Kalau query yang sama muncul puluhan kali dengan `WHERE id = ...` berbeda, itu tanda **N+1**.

```php
<?php
// memicu N+1
$orders = Order::all();
foreach ($orders as $order) {
    echo $order->user->name;
}

// perbaikan: eager loading -> 2 query
$orders = Order::with('user')->get();
```

Penjelasan lengkap: [N+1 Query Problem](/database/performance/n-plus-one).

## Membaca Dashboard untuk Optimasi

| Tanda | Kemungkinan penyebab |
| --- | --- |
| Query sangat banyak | N+1, kurang eager loading |
| Satu query lama | index kurang, `SELECT *`, join berat |
| Banyak query identik | hasil tidak di-cache |
| Job sering gagal | error di `handle()`, timeout |
| Memory tinggi | memuat seluruh tabel sekaligus |

## Konfigurasi Perekaman

Kurangi apa yang direkam di `config/telescope.php` bila dashboard terasa berat:

```php
<?php
'watchers' => [
    Watchers\QueryWatcher::class => [
        'enabled' => true,
        'slow' => 100,   // catat query lambat > 100ms
    ],
],
```

## Membersihkan Data

Data Telescope tersimpan di tabel (default `telescope_entries`) dan bisa menumpuk:

```bash
php artisan telescope:prune --hours=48
php artisan telescope:clear
```

Jadwalkan pembersihan otomatis:

```php
<?php
$schedule->command('telescope:prune --hours=48')->daily();
```

## Alternatif & Pelengkap

| Alat | Fungsi |
| --- | --- |
| **Telescope** | debugging detail lokal (semua event aplikasi) |
| **Laravel Debugbar** | toolbar di browser, ringkas |
| **Laravel Pulse** | ringkasan performa/monitoring produksi |
| **Laravel Nightwatch** | monitoring produksi (layanan resmi) |

Telescope untuk menggali detail saat development; Pulse/Nightwatch untuk memantau produksi.

::: warning
Jangan biarkan Telescope terbuka di produksi tanpa proteksi — ia menampilkan data sensitif (query, payload, auth). Batasi dengan authorization atau nonaktifkan.
:::

::: tip
Jadikan tab **Queries** dan **Exceptions** kebiasaan pertama saat fitur terasa lambat atau error.
:::

Referensi: <https://laravel.com/framework/docs/telescope>
