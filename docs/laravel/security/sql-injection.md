# SQL Injection

SQL Injection adalah celah keamanan ketika input user ikut disusun ke dalam perintah SQL, sehingga penyerang bisa menyisipkan perintah SQL-nya sendiri.

## Contoh Serangan

Kode rawan:

```php
<?php
// JANGAN LAKUKAN INI
$email = $_GET['email'];

$user = DB::select("SELECT * FROM users_m WHERE email = '$email'");
// bila $email = "' OR '1'='1"
// query jadi: SELECT * FROM users_m WHERE email = '' OR '1'='1'
// -> semua baris bocor
```

Lebih parah lagi:

```text
' OR '1'='1' --
```

Karakter `--` mengomentari sisa query, sehingga pengecekan password bisa dihilangkan.

## Akibatnya

- Seluruh data tabel terbaca (pencurian data).
- Data bisa diubah atau dihapus (`DROP TABLE`).
- Dalam kasus ekstrem, penyerang bisa menjalankan perintah di server.

## Cara Mencegah

### 1. Selalu Gunakan Binding Parameter

Laravel Query Builder & Eloquent **secara otomatis** memakai *prepared statement* — nilai user tidak pernah disatukan ke string SQL.

```php
<?php
// AMAN — nilai di-bind, bukan disisipkan
$user = DB::table('users_m')->where('email', $email)->first();
$user = User::where('email', $email)->first();
```

Untuk raw query, gunakan placeholder `?` atau named binding:

```php
<?php
// AMAN
DB::select('SELECT * FROM users_m WHERE email = ?', [$email]);
DB::select('SELECT * FROM users_m WHERE email = :email', ['email' => $email]);
```

```php
<?php
// BAHAYA — variabel disatukan ke string
DB::select("SELECT * FROM users_m WHERE email = '$email'");
```

### 2. Jangan Biarkan Nama Tabel/Kolom dari Input

Binding **hanya melindungi nilai**, bukan nama tabel/kolom. Untuk itu, gunakan daftar putih (*whitelist*).

```php
<?php
$kolom = in_array($request->sort, ['name', 'email', 'created_at'])
    ? $request->sort
    : 'name';

User::orderBy($kolom)->get();
```

### 3. Gunakan Eloquent / Query Builder

Semakin sedikit SQL mentah, semakin kecil risiko. Manfaatkan `whereIn`, `orderBy`, dan relasi alih-alih menyusun string.

```php
<?php
User::whereIn('id', $ids)                       // aman
    ->whereBetween('created_at', [$a, $b])
    ->get();
```

### 4. Validasi Input

Batasi bentuk input sebelum dipakai:

```php
<?php
$data = $request->validate([
    'email' => 'required|email',
    'sort'  => 'in:name,email,created_at',
]);
```

Validasi bukan pengganti binding, tapi menambah lapisan pertahanan.

## Raw Query: Aman vs Berbahaya

```php
<?php
// AMAN: parameter terpisah
DB::select('SELECT * FROM orders_t WHERE user_id = ? AND status = ?', [$uid, $status]);

// BAHAYA: interpolasi langsung
DB::select("SELECT * FROM orders_t WHERE user_id = $uid AND status = '$status'");
```

::: danger
`DB::raw()` menyisipkan string mentah tanpa binding. Jangan pernah masukkan input user ke dalamnya.
:::

## Ringkasan

| Praktik | Status |
| --- | --- |
| `User::where('email', $email)` | aman |
| `DB::select('... = ?', [$email])` | aman |
| `DB::select("... = '$email'")` | **bahaya** |
| Nama kolom dari input tanpa whitelist | **bahaya** |
| `DB::raw($input)` | **bahaya** |

Lihat juga peringatan serupa di [Eloquent ORM](/laravel/eloquent) bagian raw query, dan pembahasan umum di [User & Hak Akses Database](/database/sql/users-privileges).

Referensi: <https://laravel.com/framework/docs/database#database-transactions>
