# Operator & Aritmatika

## Operator Aritmatika

```php
<?php
$a = 10;
$b = 3;

echo $a + $b;   // 13  penjumlahan
echo $a - $b;   // 7   pengurangan
echo $a * $b;   // 30  perkalian
echo $a / $b;   // 3.333...  pembagian
echo $a % $b;   // 1   modulus (sisa bagi)
echo $a ** $b;  // 1000  pangkat (PHP 5.6+)
```

| Operator | Nama | Contoh | Hasil |
| --- | --- | --- | --- |
| `+` | tambah | `10 + 3` | `13` |
| `-` | kurang | `10 - 3` | `7` |
| `*` | kali | `10 * 3` | `30` |
| `/` | bagi | `10 / 3` | `3.333...` |
| `%` | modulus | `10 % 3` | `1` |
| `**` | pangkat | `10 ** 3` | `1000` |

::: warning
`%` pada bilangan negatif mengikuti tanda angka kiri: `-10 % 3` menghasilkan `-1`. Untuk hasil selalu positif, pakai `(($a % $b) + $b) % $b`.
:::

## Operator Penugasan

```php
<?php
$x = 10;

$x += 5;    // $x = $x + 5  → 15
$x -= 3;    // 12
$x *= 2;    // 24
$x /= 4;    // 6
$x %= 4;    // 2
$x **= 3;   // 8
```

## Operator Perbandingan

```php
<?php
var_dump(10 == "10");    // true  (nilai sama, tipe diabaikan)
var_dump(10 === "10");   // false (nilai sama TAPI tipe beda)
var_dump(10 != "10");    // false
var_dump(10 !== "10");   // true
var_dump(10 > 5);        // true
var_dump(10 <= 10);      // true
var_dump(5 <=> 10);      // -1  (spaceship: -1, 0, 1)
```

| Operator | Arti |
| --- | --- |
| `==` | sama (longgar) |
| `===` | identik (nilai **dan** tipe) |
| `!=` / `<>` | tidak sama |
| `!==` | tidak identik |
| `<`, `>`, `<=`, `>=` | perbandingan |
| `<=>` | spaceship |

::: tip
Biasakan pakai `===` dan `!==`. `0 == "abc"` bisa membingungkan di PHP 7, dan `===` mencegah kejutan semacam itu.
:::

## Operator Logika

```php
<?php
$a = true;
$b = false;

var_dump($a && $b);   // false  AND
var_dump($a || $b);   // true   OR
var_dump(!$a);        // false  NOT
var_dump($a and $b);  // false  (precedence lebih rendah dari =)
var_dump($a xor $b);  // true   XOR
```

Beda `&&` vs `and`: `&&` lebih tinggi prioritasnya, jadi pakai `&&`/`||` dalam ekspresi penugasan.

```php
<?php
$a = true && false;   // $a = false
$b = true and false;  // ($b = true) lalu and false → $b tetap true
```

## Operator Inkrement / Dekrement

```php
<?php
$i = 5;

echo $i++;   // 5 lalu $i jadi 6  (post-increment)
echo ++$i;   // 7  (pre-increment)
echo $i--;   // 7 lalu $i jadi 6
echo --$i;   // 5
```

## Operator String

```php
<?php
$nama = "Fazri" . " " . "Annafi";   // konkatenasi
$nama .= "!";                        // gabung dan simpan
echo $nama;
```

## Ternary & Null Coalescing

```php
<?php
$umur = 20;

$status = $umur >= 18 ? "dewasa" : "anak";
$status = $umur >= 18 ?: "anak";           // shorthand

$kota = $data['kota'] ?? "tidak diketahui"; // null coalescing
```

## Prioritas Operator (ringkas)

Dari tinggi ke rendah (sebagian):

```
**  (pangkat)
++ -- (unary)
!   (logika not)
* / %
+ -
.   (konkatenasi)
< <= > >=
== != === !==
&&
||
?:
= += -= ...
and
xor
or
```

Kalau ragu, pakai tanda kurung `()` — lebih jelas dan tidak salah.

Referensi lengkap: <https://www.php.net/manual/en/language.operators.php>
