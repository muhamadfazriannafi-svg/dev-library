# Laravel Basic: Routing, Controller, View, Migration

Inti dari alur kerja Laravel sehari-hari. Empat konsep ini muncul di hampir setiap fitur.

## 1. Routing

Route menghubungkan URL ke aksi. File: `routes/web.php`.

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', fn() => view('welcome'));

// route ke controller
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);

// route dengan parameter
Route::get('/users/{id}', [UserController::class, 'show']);

// group + prefix + middleware
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
});

// resource: 7 route CRUD sekaligus
Route::resource('posts', PostController::class);
```

Verbs: `get`, `post`, `put`, `patch`, `delete`, `resource`, `apiResource`.

Lihat semua route:

```bash
php artisan route:list
```

## 2. Controller

Controller menampung logika. Buat dengan Artisan:

```bash
php artisan make:controller UserController --resource
```

```php
<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return view('users.index', [
            'users' => User::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'  => 'required|max:100',
            'email' => 'required|email|unique:users_m,email',
        ]);

        User::create($validated);

        return redirect()->route('users.index')
            ->with('sukses', 'User ditambahkan');
    }

    public function show(string $id)
    {
        return view('users.show', [
            'user' => User::findOrFail($id),
        ]);
    }
}
```

Validasi langsung di controller dengan `$request->validate()` — cara paling ringkas. Untuk yang kompleks, pisahkan ke Form Request (`php artisan make:request`).

## 3. View (Blade)

File: `resources/views/*.blade.php`.

```blade
{{-- resources/views/users/index.blade.php --}}
@extends('layouts.app')

@section('content')
  <h1>Daftar User</h1>

  @if (session('sukses'))
    <p class="sukses">{{ session('sukses') }}</p>
  @endif

  <ul>
    @forelse ($users as $user)
      <li>{{ $user->name }} — {{ $user->email }}</li>
    @empty
      <li>Belum ada user.</li>
    @endforelse
  </ul>
@endsection
```

| Direktif | Fungsi |
| --- | --- |
| `{{ $var }}` | cetak + escape otomatis (anti-XSS) |
| `{!! $html !!}` | cetak tanpa escape (**hati-hati**) |
| `@if / @else / @endif` | kondisi |
| `@foreach / @forelse / @empty` | perulangan |
| `@extends('layouts.app')` | pakai layout |
| `@section / @yield` | isi bagian layout |
| `@include('partials.header')` | sisipkan view lain |

`{{ }}` otomatis memanggil `htmlspecialchars()`, jadi aman dari XSS. Jangan pakai `{!! !!}` untuk data dari user.

## 4. Migration

Migration = versi skema database dalam kode.

```bash
php artisan make:migration create_products_m_table
php artisan migrate              # jalankan
php artisan migrate:rollback     # batalkan batch terakhir
php artisan migrate:fresh --seed # reset + isi data awal
```

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products_m', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->decimal('price', 12, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();          // created_at & updated_at
            $table->softDeletes();          // deleted_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products_m');
    }
};
```

## Model

```bash
php artisan make:model Product
```

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $table = 'products_m';        // bila beda dari konvensi (products)
    protected $fillable = ['name', 'price', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
}
```

## Artisan: Perintah yang Sering Dipakai

```bash
php artisan make:model Post -mc    # model + migration + controller
php artisan make:job ProcessOrder
php artisan make:request StoreUserRequest
php artisan tinker                 # REPL untuk coba kode
php artisan route:list
php artisan config:clear
php artisan optimize:clear
```

## Konfigurasi & `.env`

Nilai yang berbeda antar lingkungan disimpan di `.env` dan diakses lewat `config()` atau `env()`:

```ini
APP_NAME=DevLibrary
APP_ENV=local
DB_CONNECTION=mysql
DB_DATABASE=toko_db
DB_USERNAME=app_dev
DB_PASSWORD=
```

```php
<?php
$nama = config('app.name');
```

::: warning
Jangan commit `.env` — berisi kredensial. Nilai `env()` di luar file `config/*.php` bisa bermasalah saat `config:cache`; biasakan bungkus lewat file config.
:::

## Alur Singkat

```
URL  →  routes/web.php  →  Controller  →  Model (Eloquent)  →  Database
                              ↓
                          View (Blade)  →  HTML ke browser
```

Referensi: <https://laravel.com/framework/docs/routing>
