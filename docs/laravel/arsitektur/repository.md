# Repository Pattern

Repository memisahkan logika akses data dari logika aplikasi. Controller/service tidak tahu *bagaimana* data diambil — mereka hanya memanggil method repository.

## Masalah yang Diselesaikan

- Query database tersebar di controller, service, dan view.
- Sulit menguji logika tanpa database sungguhan.
- Mengganti sumber data berarti mengubah banyak tempat.

## Tanpa vs Dengan Repository

```php
<?php
// TANPA: controller tahu detail query
class UserController extends Controller
{
    public function aktif()
    {
        $users = User::where('is_active', true)
            ->whereNull('deleted_at')
            ->orderBy('name')
            ->get();

        return view('users.index', compact('users'));
    }
}
```

```php
<?php
// DENGAN: controller memanggil repository
class UserController extends Controller
{
    public function __construct(private UserRepository $users) {}

    public function aktif()
    {
        return view('users.index', [
            'users' => $this->users->semuaAktif(),
        ]);
    }
}
```

## Membuat Repository

Interface (kontrak):

```php
<?php
namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;

interface UserRepositoryInterface
{
    public function semuaAktif(): Collection;
    public function findByEmail(string $email): ?User;
    public function create(array $data): User;
    public function update(int $id, array $data): User;
    public function delete(int $id): bool;
}
```

Implementasi berbasis Eloquent:

```php
<?php
namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;

class EloquentUserRepository implements UserRepositoryInterface
{
    public function semuaAktif(): Collection
    {
        return User::where('is_active', true)
            ->whereNull('deleted_at')
            ->orderBy('name')
            ->get();
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(int $id, array $data): User
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user->refresh();
    }

    public function delete(int $id): bool
    {
        return (bool) User::findOrFail($id)->delete();
    }
}
```

## Binding di Service Provider

Agar controller menerima interface (bukan implementasi), daftarkan di container:

```php
<?php
namespace App\Providers;

use App\Repositories\EloquentUserRepository;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            UserRepositoryInterface::class,
            EloquentUserRepository::class,
        );
    }
}
```

Laravel otomatis menyuntikkan implementasi ke controller yang meminta interface — inilah *dependency injection*.

## Mengapa Interface Penting

- **Mudah diuji** — di test, ganti dengan repository palsu (fake) tanpa database.
- **Fleksibel** — bisa ada `ApiUserRepository` dan `EloquentUserRepository`.
- **Kontrak jelas** — tahu persis operasi data apa yang tersedia.

Contoh fake untuk test:

```php
<?php
class FakeUserRepository implements UserRepositoryInterface
{
    public function semuaAktif(): Collection
    {
        return collect([new User(['name' => 'Uji Coba'])]);
    }
    // ... method lain
}

$this->app->bind(UserRepositoryInterface::class, FakeUserRepository::class);
```

## Kapan Perlu, Kapan Berlebihan

| Kondisi | Saran |
| --- | --- |
| CRUD sederhana, model langsung cukup | **tidak perlu** |
| Query rumit berulang di banyak tempat | perlu |
| Perlu unit test tanpa database | perlu |
| Berpotensi ganti sumber data | perlu |

::: warning
Repository bukan kewajiban. Menambahkannya untuk semua model kecil hanya menambah lapisan kosong yang meneruskan panggilan tanpa manfaat. Pakai saat ada alasan nyata.
:::

## Repository vs Service

Keduanya sering dipakai bersama, tapi beda peran:

- **Repository** — urusan **akses data** (query, simpan, hapus).
- **Service** — urusan **logika bisnis** (aturan, validasi lintas entitas, orkestrasi).

```php
<?php
class DaftarUserService
{
    public function __construct(private UserRepositoryInterface $users) {}

    public function daftar(array $data): User
    {
        if ($this->users->findByEmail($data['email'])) {
            throw new \Exception('Email sudah terdaftar');
        }

        return $this->users->create($data);   // repository menyimpan
    }
}
```

Controller memanggil service; service memanggil repository. Setiap lapisan punya satu tanggung jawab.
