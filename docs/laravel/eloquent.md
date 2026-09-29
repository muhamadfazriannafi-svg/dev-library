# Eloquent ORM

Eloquent adalah ORM Laravel: setiap tabel diwakili satu model, dan tiap baris diwakili objek. Kamu menulis query lewat method PHP, bukan SQL mentah.

## Model & Konvensi

```bash
php artisan make:model User
```

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users_m';        // default: users
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'email', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
}
```

Konvensi yang diikuti Eloquent:

| Aturan | Contoh |
| --- | --- |
| Nama tabel jamak dari nama model | `User` → `users` |
| Primary key `id` | otomatis |
| `created_at`, `updated_at` | otomatis (bisa dimatikan) |
| Foreign key `model_id` | `user_id` |

## Query Dasar

```php
<?php
use App\Models\User;

User::all();                                 // semua
User::find(1);                                // by primary key
User::findOrFail(1);                          // error 404 bila tak ada
User::where('is_active', true)->get();
User::where('name', 'like', '%fazri%')->first();
User::orderBy('name')->limit(10)->get();
User::count();
User::exists();
```

## Insert, Update, Delete

```php
<?php
// create (butuh $fillable)
$user = User::create([
    'name'  => 'Fazri',
    'email' => 'fazri@mail.com',
]);

// update
$user->name = 'Fazri A';
$user->save();

User::where('is_active', false)->update(['is_active' => true]);

// delete
$user->delete();
User::destroy([1, 2, 3]);
```

## Query Builder vs Eloquent

```php
<?php
use Illuminate\Support\Facades\DB;

// query builder — lebih dekat ke SQL
$users = DB::table('users_m')->where('is_active', true)->get();

// Eloquent — hasilnya objek model, bisa akses relasi & method
$users = User::where('is_active', true)->get();
```

Eloquent lebih nyaman untuk model + relasi; Query Builder lebih cepat untuk laporan berat tanpa relasi.

## Relasi

```php
<?php
namespace App\Models;

class User extends Model
{
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }
}

class Order extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items_t');
    }
}
```

Jenis relasi:

| Method | Relasi |
| --- | --- |
| `hasOne` | satu ke satu (anak punya FK) |
| `hasMany` | satu ke banyak |
| `belongsTo` | kebalikan hasOne/hasMany |
| `belongsToMany` | banyak ke banyak lewat pivot |
| `hasManyThrough` | lewat tabel perantara |

Mengakses relasi:

```php
<?php
$user = User::find(1);

foreach ($user->orders as $order) {   // lazy load
    echo $order->total;
}
```

## Eager Loading (cegah N+1)

```php
<?php
// buruk: 1 + N query
$users = User::all();
foreach ($users as $user) {
    echo $user->profile->bio;
}

// baik: 2 query
$users = User::with('profile')->get();
foreach ($users as $user) {
    echo $user->profile->bio;
}

// bersarang
$users = User::with('orders.products')->get();
```

Lihat [N+1 Query Problem](/database/performance/n-plus-one) untuk penjelasan lengkap.

## Membatasi Kolom Relasi

```php
<?php
$users = User::with(['orders' => function ($q) {
    $q->where('status', 'paid')->select('id', 'user_id', 'total');
}])->get();
```

## Scope (Query Reusable)

```php
<?php
class User extends Model
{
    public function scopeAktif($query)
    {
        return $query->where('is_active', true)->whereNull('deleted_at');
    }
}

User::aktif()->get();
```

Scope berguna agar filter yang sama tidak ditulis ulang di banyak tempat.

## Soft Delete

```php
<?php
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
    use SoftDeletes;
}

$user->delete();              // hanya mengisi deleted_at
User::withTrashed()->get();   // termasuk yang terhapus
User::onlyTrashed()->get();   // hanya yang terhapus
$user->restore();             // batalkan
$user->forceDelete();         // hapus permanen
```

## Accessor & Mutator

```php
<?php
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Model
{
    // akses: $user->nama_kapital
    protected function namaKapital(): Attribute
    {
        return Attribute::make(
            get: fn() => strtoupper($this->name),
        );
    }
}
```

## Query yang Sering Dipakai

```php
<?php
User::whereIn('id', [1, 2, 3])->get();
User::whereBetween('created_at', [$awal, $akhir])->get();
User::whereNull('deleted_at')->get();
User::select('name')->distinct()->get();
User::orderBy('created_at', 'desc')->paginate(15);

// agregat
User::where('is_active', true)->count();
Order::sum('total');
Order::groupBy('status')->selectRaw('status, count(*) as jumlah')->get();
```

## Raw Query (dengan aman)

```php
<?php
use Illuminate\Support\Facades\DB;

// binding parameter -> aman dari SQL injection
DB::select('SELECT * FROM users_m WHERE id = ?', [$id]);
DB::select('SELECT * FROM users_m WHERE email = :email', ['email' => $email]);
```

::: warning
Jangan pernah menyisipkan variabel langsung ke string SQL (tanpa binding) — itu pintu masuk [SQL Injection](/laravel/security/sql-injection).
:::

Referensi: <https://laravel.com/framework/docs/eloquent>
