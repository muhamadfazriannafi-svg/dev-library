# Kontrol Alur

## if / elseif / else

```php
<?php
$nilai = 85;

if ($nilai >= 90) {
    echo "A";
} elseif ($nilai >= 80) {
    echo "B";
} else {
    echo "C";
}
```

Satu baris:

```php
<?php
if ($aktif) echo "aktif";
```

## switch

Cocok saat membandingkan satu nilai dengan banyak kemungkinan pasti.

```php
<?php
$hari = "senin";

switch ($hari) {
    case "senin":
    case "selasa":
        echo "Awal minggu";
        break;
    case "minggu":
        echo "Libur";
        break;
    default:
        echo "Hari biasa";
}
```

**PHP 8** punya `match` yang lebih ringkas dan membandingkan dengan `===`:

```php
<?php
$hasil = match ($nilai) {
    'A', 'B' => "Lulus",
    'C'      => "Perbaikan",
    default  => "Tidak lulus",
};

echo $hasil;
```

Perbedaan `switch` vs `match`:

| | `switch` | `match` (PHP 8) |
| --- | --- | --- |
| Perbandingan | `==` | `===` |
| `break` | wajib | otomatis |
| Nilai balik | tidak | ya |
| Tanpa kecocokan | `default` opsional | wajib ada `default`, atau `UnhandledMatchError` |

## while / do-while

```php
<?php
$i = 1;
while ($i <= 5) {
    echo $i;
    $i++;
}

// do-while dijalankan minimal sekali
$j = 10;
do {
    echo $j;
    $j++;
} while ($j <= 5);   // mencetak 10 sekali
```

## for

```php
<?php
for ($i = 1; $i <= 5; $i++) {
    echo "Baris $i <br>";
}
```

## foreach

Khusus array dan objek — yang paling sering dipakai.

```php
<?php
$buah = ["apel", "jeruk", "mangga"];

foreach ($buah as $item) {
    echo $item . "<br>";
}

// dengan key
$umur = ["Budi" => 25, "Sari" => 30];
foreach ($umur as $nama => $nilai) {
    echo "$nama: $nilai tahun<br>";
}
```

## break & continue

```php
<?php
for ($i = 1; $i <= 10; $i++) {
    if ($i == 3) continue;   // lewati 3
    if ($i > 7)  break;      // hentikan di 8
    echo $i;                 // 1 2 4 5 6 7
}
```

## Alternative Syntax (untuk template)

```php
<?php if ($login): ?>
  <p>Selamat datang</p>
<?php else: ?>
  <p>Silakan login</p>
<?php endif; ?>

<ul>
<?php foreach ($items as $item): ?>
  <li><?= htmlspecialchars($item) ?></li>
<?php endforeach; ?>
</ul>
```

Bentuk `if:` / `endif;` sering dipakai di file campuran HTML+PHP agar rapi.

Referensi: <https://www.php.net/manual/en/language.control-structures.php>
