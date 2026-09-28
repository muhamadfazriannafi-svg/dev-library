# Sintaks Dasar

## Tag Pembuka PHP

Kode PHP ditulis di antara `<?php` dan penutup opsional `?>`.

```php
<?php
echo "Halo, DevLibrary!";
```

File PHP murni sebaiknya **tanpa** `?>` di akhir untuk menghindari spasi putih tak sengaja terkirim ke output.

```php
<?php

echo "Tanpa tag penutup lebih aman";
// akhir file
```

Blok PHP bisa diselipkan di tengah HTML:

```php
<!DOCTYPE html>
<html>
<body>
  <h1><?= "Judul dari PHP" ?></h1>
  <p><?php echo "Paragraf dari PHP"; ?></p>
</body>
</html>
```

`<?= ... ?>` adalah singkatan dari `<?php echo ...; ?>`.

## Statement & Titik Koma

Setiap pernyataan diakhiri titik koma `;`.

```php
<?php
$a = 10;
$b = 20;
echo $a + $b;
```

## Komentar

```php
<?php
// komentar satu baris

# juga komentar satu baris

/*
   komentar
   banyak baris
*/

/** komentar dokumentasi (docblock) */
```

## Output

```php
<?php
echo "echo bisa banyak argumen", " ", "dipisah koma";
print "print hanya satu argumen";

var_dump([1, 2, 3]);     // detail tipe & nilai, enak untuk debug
print_r("teks");         // ringkas untuk array/objek
```

Perbedaan singkat:

| Perintah | Nilai balik | Argumen | Kegunaan |
| --- | --- | --- | --- |
| `echo` | tidak ada | banyak | cetak biasa |
| `print` | `1` | satu | cetak, bisa dipakai dalam ekspresi |
| `var_dump` | tidak ada | banyak | debug detail |
| `print_r` | `1` | satu | debug ringkas |

## Case Sensitivity

- **Keyword, function, class** — tidak peduli huruf besar/kecil (`echo`, `ECHO` sama).
- **Variabel** — **case sensitive**. `$nama` dan `$Nama` berbeda.

```php
<?php
$nama = "Fazri";
echo $Nama;   // undefined variable
```

## Statement Pertama

Dokumentasi resmi: <https://www.php.net/manual/en/language.basic-syntax.php>
