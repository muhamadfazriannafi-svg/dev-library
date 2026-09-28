# Array

Array PHP sebenarnya adalah *ordered map* — pasangan key–value. Key bisa integer atau string.

## Jenis Array

**Indexed** (key angka otomatis):

```php
<?php
$buah = ["apel", "jeruk", "mangga"];
echo $buah[0];   // apel
```

**Associative** (key string):

```php
<?php
$user = [
    "nama" => "Fazri",
    "umur" => 20,
    "aktif" => true,
];
echo $user["nama"];
```

**Multidimensional**:

```php
<?php
$kelas = [
    ["nama" => "Budi",  "umur" => 20],
    ["nama" => "Sari",  "umur" => 22],
];
echo $kelas[1]["nama"];   // Sari
```

## Membuat & Mengakses

```php
<?php
$kosong = [];
$angka = [1, 2, 3];
$campur = [0 => "nol", "satu" => 1];

$angka[] = 4;           // tambah di akhir
echo count($angka);     // 4
echo $angka[count($angka) - 1];
```

## Fungsi Array Penting

```php
<?php
$angka = [3, 1, 4, 1, 5];

echo count($angka);            // 5
sort($angka);                  // urut naik (mengubah array)
rsort($angka);                 // urut turun
echo array_sum($angka);        // total
echo min($angka); echo max($angka);

echo implode(", ", $angka);    // "3, 1, 4, 1, 5"
$arr = explode(",", "a,b,c");  // ["a","b","c"]

$potong = array_slice($angka, 1, 2);
$cari   = array_search(4, $angka);
var_dump(in_array(5, $angka));  // bool(true)
```

## Menambah & Menghapus

```php
<?php
$buah = ["apel", "jeruk"];

array_push($buah, "mangga", "pisang");  // tambah di akhir
array_unshift($buah, "anggur");          // tambah di depan
array_pop($buah);                        // hapus & ambil terakhir
array_shift($buah);                      // hapus & ambil pertama
unset($buah[0]);                         // hapus index tertentu
```

## Iterasi

```php
<?php
$umur = ["Budi" => 25, "Sari" => 30];

foreach ($umur as $nama => $nilai) {
    echo "$nama: $nilai<br>";
}
```

## Transformasi: map, filter, reduce

```php
<?php
$angka = [1, 2, 3, 4, 5];

$kali2 = array_map(fn($n) => $n * 2, $angka);       // [2,4,6,8,10]
$genap = array_filter($angka, fn($n) => $n % 2 == 0); // [2,4]
$total = array_reduce($angka, fn($c, $n) => $c + $n, 0); // 15
```

Ketiganya mengembalikan array baru (tidak mengubah asal), lebih disarankan daripada loop manual.

## Sorting Associative

```php
<?php
$user = [
    ["nama" => "Sari", "umur" => 22],
    ["nama" => "Budi", "umur" => 20],
];

usort($user, fn($a, $b) => $a["umur"] <=> $b["umur"]);  // urut umur
```

| Fungsi | Mengurutkan berdasarkan |
| --- | --- |
| `sort` / `rsort` | nilai (key di-reset) |
| `asort` / `arsort` | nilai (key dipertahankan) |
| `ksort` / `krsort` | key |
| `usort` | bebas (callback) |

## Spread & Fungsi Variadik

```php
<?php
$a = [1, 2];
$b = [...$a, 3, 4];          // [1,2,3,4]

function jumlah(...$angka) {
    return array_sum($angka);
}
echo jumlah(1, 2, 3, 4);     // 10
```

## Cek Key

```php
<?php
$user = ["nama" => "Fazri"];

var_dump(isset($user["nama"]));          // true
var_dump(array_key_exists("umur", $user)); // false
var_dump($user["umur"] ?? null);          // null
```

::: tip
`isset()` mengembalikan `false` bila nilainya `null`. Bila perlu tahu key ada tak peduli nilainya, pakai `array_key_exists()`.
:::

Referensi: <https://www.php.net/manual/en/language.types.array.php> dan <https://www.php.net/manual/en/ref.array.php>
