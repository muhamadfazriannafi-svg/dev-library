# String

String PHP adalah urutan karakter. Bisa dibuat dengan kutip tunggal atau ganda.

## Membuat String

```php
<?php
$a = 'kutip tunggal';   // literal, tanpa interpolasi
$b = "kutip ganda";     // mendukung variabel & escape

echo "Baris 1\nBaris 2";     // \n baris baru
echo "Tab\tpendiam";
echo 'Harga $100';           // $ tidak diganggu
```

Heredoc & Nowdoc untuk teks panjang:

```php
<?php
$nama = "Fazri";

$teks = <<<TEXT
Halo $nama,
ini mendukung interpolasi.
TEXT;

$mentah = <<<'TEXT'
Halo $nama (tidak diinterpolasi)
TEXT;
```

## Menggabungkan & Memotong

```php
<?php
$a = "Halo" . " " . "Dunia";   // konkatenasi

echo strlen("DevLibrary");         // 10 panjang
echo strtoupper("halo");           // HALO
echo strtolower("HALO");           // halo
echo ucfirst("halo dunia");        // Halo dunia
echo ucwords("halo dunia");        // Halo Dunia
echo trim("  spasi  ");            // "spasi"
echo substr("DevLibrary", 0, 3);   // Dev
echo str_replace("a", "o", "apa");  // opo
echo str_repeat("ab", 3);          // ababab
echo strrev("abc");                // cba
```

## Mencari

```php
<?php
$teks = "Saya belajar PHP";

var_dump(str_contains($teks, "PHP"));     // true (PHP 8)
var_dump(str_starts_with($teks, "Saya")); // true (PHP 8)
var_dump(str_ends_with($teks, "PHP"));    // true (PHP 8)

echo strpos($teks, "belajar");            // 5 (posisi, false bila tak ada)
```

::: warning
`strpos()` mengembalikan `0` bila kata ada di awal — dan `0` dianggap `false` dalam perbandingan longgar. Selalu cek dengan `!== false`:
```php
if (strpos($teks, "Saya") !== false) { /* ada */ }
```
:::

## Memecah & Menggabung

```php
<?php
$data = explode(",", "apel,jeruk,mangga");  // array
$teks = implode(" - ", $data);              // "apel - jeruk - mangga"

// potong jadi potongan berukuran tetap
$potong = str_split("abcdef", 2);           // ["ab","cd","ef"]
```

## Escape & HTML

```php
<?php
echo htmlspecialchars("<script>alert(1)</script>");
// &lt;script&gt;alert(1)&lt;/script&gt;
```

Selalu `htmlspecialchars()` saat menampilkan input user ke HTML untuk mencegah XSS.

## Format Angka & Tanggal

```php
<?php
echo number_format(1234567.891, 2, ",", ".");   // 1.234.567,89
echo sprintf("Total: %.2f", 99.5);              // Total: 99.50

echo date("d-m-Y H:i");                          // 28-09-2026 14:30
echo date("Y-m-d", strtotime("+1 week"));
```

## Membandingkan String

```php
<?php
var_dump("abc" == "abc");     // true
var_dump(strcmp("a", "b"));   // -1 (a < b)
var_dump("10" === "10");      // true (tipe sama)
var_dump(strcasecmp("ABC", "abc")); // 0 (abaikan besar-kecil)
```

## Multibyte (UTF-8)

Untuk teks non-ASCII (huruf beraksen, emoji) gunakan fungsi `mb_*`:

```php
<?php
$teks = "café";
echo strlen($teks);        // 5 (byte, menyesatkan)
echo mb_strlen($teks);     // 4 (jumlah karakter)
echo mb_substr($teks, 0, 3); // caf
```

Referensi: <https://www.php.net/manual/en/ref.strings.php>
