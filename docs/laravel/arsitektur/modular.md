# Laravel Modular

Seiring aplikasi membesar, struktur default Laravel (`app/Models`, `app/Http/Controllers`) mulai terasa penuh. Pendekatan **modular** memecah aplikasi menjadi bagian-bagian mandiri berdasarkan domain bisnis: `User`, `Order`, `Payment`, `Report`.

## Masalah yang Diselesaikan

- Semua model & controller bercampur di satu folder besar.
- Sulit tahu batas antar fitur; perubahan satu fitur berisiko menyentuh fitur lain.
- Sulit memisahkan tanggung jawab tim.

## Ide Utama

Setiap modul menyimpan **semua** yang berkaitan dengan domain itu: model, controller, service, migration, route, test.

```
app/
└── Modules/
    ├── User/
    │   ├── Models/User.php
    │   ├── Http/Controllers/UserController.php
    │   ├── Services/UserService.php
    │   ├── Repositories/UserRepository.php
    │   ├── Requests/StoreUserRequest.php
    │   ├── Routes/web.php
    │   └── Providers/UserServiceProvider.php
    ├── Order/
    │   └── ...
    └── Payment/
        └── ...
```

## Mendaftarkan Modul

Pola paling rapi memakai Service Provider per modul agar route, binding, dan migration ikut terdaftar.

```php
<?php
namespace App\Modules\User\Providers;

use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadRoutesFrom(__DIR__ . '/../Routes/web.php');
        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');
        $this->loadViewsFrom(__DIR__ . '/../Resources/views', 'user');
    }
}
```

Daftarkan di `bootstrap/providers.php` (Laravel 11+):

```php
<?php
return [
    App\Modules\User\Providers\UserServiceProvider::class,
    App\Modules\Order\Providers\OrderServiceProvider::class,
];
```

## Namespace & Autoload

Komposer otomatis memetakan `App\` ke `app/`. Karena modul berada di `app/Modules`, namespace-nya cukup:

```php
<?php
namespace App\Modules\Order\Models;
```

Autoload `psr-4` di `composer.json`:

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "app/"
    }
  }
}
```

## Pendekatan Alternatif: Package

Untuk pemisahan yang lebih keras (mis. modul dipakai lintas proyek), jadikan paket Composer lokal di folder `packages/`.

```json
{
  "repositories": [
    { "type": "path", "url": "packages/order" }
  ]
}
```

Kelebihan: batas modul tegas. Kekurangan: lebih banyak setup. Untuk kebanyakan proyek, `app/Modules` sudah cukup.

## Paket Siap Pakai

Ada paket komunitas yang menyediakan generator modul, mis. `nwidart/laravel-modules`:

```bash
composer require nwidart/laravel-modules
php artisan module:make Order
php artisan module:make-controller OrderController Order
```

## Praktik Terbaik

- **Satu modul, satu domain** — jangan campur `User` dan `Invoice`.
- **Komunikasi antar modul lewat service/interface**, bukan memanggil model modul lain langsung.
- **Event & listener** untuk reaksi lintas modul agar tetap lepas (loosely coupled).

```php
<?php
// di modul Order
OrderPlaced::dispatch($order);

// di modul Payment (listener terpisah)
class ProcessPayment
{
    public function handle(OrderPlaced $event): void
    {
        // proses pembayaran
    }
}
```

## Kapan Modular Layak Dipakai

| Skala proyek | Saran |
| --- | --- |
| Skrip kecil, 1–2 developer | struktur standar cukup |
| Aplikasi menengah, banyak fitur | mulai pisahkan per modul |
| Aplikasi besar / banyak tim | modular wajib, pertimbangkan package |

::: tip
Jangan modular dari hari pertama proyek kecil. Overhead struktur hanya terbayar saat kompleksitasnya nyata. Mulai sederhana, pecah saat mulai sesak.
:::

::: warning
Modular tanpa aturan batas antar modul hanya memindahkan kekacauan ke folder berbeda. Tetapkan aturan: modul tidak boleh mengimpor model internal modul lain secara langsung.
:::
