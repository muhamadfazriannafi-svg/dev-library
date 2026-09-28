# Variabel & Tipe Data

## Variabel

Variabel diawali `$`, tidak perlu dideklarasikan tipe, dan bersifat *case sensitive*.

```php
<?php
$nama = "Fazri";
$umur = 20;
$aktif = true;

echo "Nama: $nama, Umur: $umur";
```

Nama variabel: huruf atau underscore di awal, lalu boleh angka. `$nama_lengkap`, `$_total`, `$user2` valid; `$2user` tidak.

## Tipe Data

| Tipe | Contoh |
| --- | --- |
| `int` | `42`, `-7`, `0xFF` |
| `float` | `3.14`, `1.5e3` |
| `string` | `"halo"`, `'halo'` |
| `bool` | `true`, `false` |
| `array` | `[1, 2, 3]` |
| `object` | instance dari class |
| `null` | belum ada nilai |
| `callable` | fungsi sebagai nilai |
| `resource` | handle (file, koneksi DB) |

```php
<?php
$angka    = 10;
$desimal  = 3.14;
$teks     = "PHP 8.5";
$benar    = true;
$kosong   = null;
$daftar   = ["apel", "jeruk"];

var_dump($angka, $desimal, $teks, $benar, $kosong);
```

## Cek Tipe

```php
<?php
$nilai = 42;

var_dump(is_int($nilai));      // bool(true)
var_dump(is_string($nilai));   // bool(false)
echo gettype($nilai);          // integer
```

Fungsi cek: `is_int`, `is_float`, `is_string`, `is_bool`, `is_array`, `is_null`, `is_numeric`.

## Konversi Tipe (Casting)

```php
<?php
$angka = 10;

$teks    = (string) $angka;   // "10"
$desimal = (float) $angka;    // 10.0
$bulat   = (int) "123abc";    // 123
$bool    = (bool) 0;          // false
```

Konversi otomatis (*type juggling*) terjadi saat operasi campuran:

```php
<?php
echo "5" + 3;      // 8
echo "5" . 3;      // "53"
```

::: warning
PHP 8 lebih ketat daripada PHP 7. Operasi seperti `"abc" + 1` sekarang melempar `TypeError`, bukan diam-diam jadi `1`. Ini bagus: bug lebih cepat ketahuan.
:::

## Interpolasi String

```php
<?php
$nama = "Fazri";

echo "Halo $nama";        // Halo Fazri
echo "Halo {$nama}!";     // kurung kurawal untuk batas yang jelas
echo 'Halo $nama';        // kutip tunggal: tidak diinterpolasi
```

Kutip tunggal mencetak apa adanya; kutip ganda mengevaluasi variabel dan escape sequence (`\n`, `\t`).

## Null Coalescing & Nullsafe

```php
<?php
$data = [];

$nama = $data['nama'] ?? 'Tanpa Nama';

// PHP 8: nullsafe operator
$panjang = $user?->getNama()?->length();
```

## Konstanta

```php
<?php
const PI = 3.14;                   // bisa dipakai di scope apa pun
define("APP_NAME", "DevLibrary");  // cara lama

echo PI;
echo APP_NAME;
```

Konstanta tidak bisa diubah setelah didefinisikan dan tidak memakai `$`.

## Statis vs Dinamis

PHP adalah bahasa *dynamically typed* — tipe ditentukan saat runtime, variabel bisa berganti tipe:

```php
<?php
$x = 10;        // int
$x = "sepuluh"; // sekarang string, tetap valid
```

Sejak PHP 7 kamu bisa (dan sebaiknya) menambahkan deklarasi tipe:

```php
<?php
declare(strict_types=1);

function tambah(int $a, int $b): int {
    return $a + $b;
}
```

Referensi: <https://www.php.net/manual/en/language.variables.php> dan <https://www.php.net/manual/en/language.types.php>
