# Function

Function adalah blok kode yang bisa dipanggil berulang. Menghindari penyalinan kode dan membuat program lebih rapi.

## Deklarasi Dasar

```php
<?php
function sapa($nama) {
    return "Halo, $nama!";
}

echo sapa("Fazri");   // Halo, Fazri!
```

Function tanpa `return` mengembalikan `null`.

## Parameter Default

```php
<?php
function sapa($nama = "Dunia") {
    return "Halo, $nama!";
}

echo sapa();        // Halo, Dunia!
echo sapa("Budi");  // Halo, Budi!
```

Parameter berdefault harus diletakkan **setelah** parameter wajib.

## Deklarasi Tipe

```php
<?php
declare(strict_types=1);

function tambah(int $a, int $b): int {
    return $a + $b;
}

function namaLengkap(string $depan, string $belakang): string {
    return "$depan $belakang";
}
```

Dengan `strict_types=1`, tipe yang tidak sesuai langsung error alih-alih dikonversi.

## Nullable & Union Type

```php
<?php
function cari(?string $key): ?array {   // boleh string atau null
    return null;
}

function id(int|string $nilai): int {   // PHP 8: union type
    return (int) $nilai;
}
```

## Variadik (Jumlah Argumen Bebas)

```php
<?php
function jumlah(...$angka): int {
    return array_sum($angka);
}

echo jumlah(1, 2, 3, 4);   // 10
```

## Pass by Value vs Reference

Secara default argumen disalin. Pakai `&` agar perubahan ikut keluar:

```php
<?php
function tambahSatu($n) { $n++; }         // tidak berpengaruh
function tambahSatuRef(&$n) { $n++; }     // berpengaruh

$x = 5;
tambahSatu($x);      // $x tetap 5
tambahSatuRef($x);   // $x jadi 6
```

## Return Awal (Early Return)

```php
<?php
function bagi($a, $b) {
    if ($b == 0) {
        return "Tidak bisa bagi nol";
    }
    return $a / $b;
}
```

Mengembalikan lebih awal mengurangi sarang `if` dan membuat alur lebih jelas.

## Function sebagai Nilai

```php
<?php
$kali = fn($a, $b) => $a * $b;       // arrow function
echo $kali(3, 4);                     // 12

$tambah = function ($a, $b) {         // closure
    return $a + $b;
};
echo $tambah(2, 3);                   // 5
```

Arrow function otomatis menangkap variabel luar; closure perlu `use`:

```php
<?php
$faktor = 10;

$kaliFaktor = fn($n) => $n * $faktor;         // otomatis
$kaliManual = function ($n) use ($faktor) {   // explicit
    return $n * $faktor;
};
```

## Scope Variabel

```php
<?php
$global = "luar";

function test() {
    global $global;     // cara lama mengambil variabel global
    return $global;
}

function test2() {
    $lokal = "dalam";
    return $lokal;
}
```

::: warning
Hindari `global`. Lebih baik lewatkan nilai sebagai parameter atau gunakan `use` di closure. Variabel global membuat alur sulit dilacak.
:::

## Function Bawaan Populer

```php
<?php
echo strlen("abc");             // 3
echo abs(-5);                   // 5
echo round(3.567, 2);           // 3.57
echo max(1, 9, 4);              // 9
echo str_replace("a", "b", "ab"); // bb

var_dump(empty($data));
var_dump(isset($data));
```

Referensi: <https://www.php.net/manual/en/language.functions.php> dan <https://www.php.net/manual/en/funcref.php>
