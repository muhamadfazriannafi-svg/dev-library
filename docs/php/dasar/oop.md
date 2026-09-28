# OOP: Class & Object

Pemrograman berorientasi objek membungkus data dan perilaku dalam satu unit bernama **class**. Objek adalah instance dari class.

## Class & Object Dasar

```php
<?php
class User {
    public string $nama;      // property

    public function __construct(string $nama) {
        $this->nama = $nama;  // $this menunjuk objek saat ini
    }

    public function sapa(): string {
        return "Halo, saya {$this->nama}";
    }
}

$user = new User("Fazri");
echo $user->sapa();   // Halo, saya Fazri
```

## Visibility

| Modifier | Bisa diakses dari |
| --- | --- |
| `public` | mana saja |
| `protected` | class sendiri + turunannya |
| `private` | class sendiri saja |

```php
<?php
class Bank {
    private int $saldo = 0;

    public function setor(int $jumlah): void {
        if ($jumlah > 0) $this->saldo += $jumlah;
    }

    public function getSaldo(): int {
        return $this->saldo;
    }
}
```

`$saldo` tidak bisa diubah langsung dari luar — harus lewat method. Inilah **enkapsulasi**.

## Inheritance (Pewarisan)

```php
<?php
class Produk {
    public function __construct(protected string $nama) {}

    public function info(): string {
        return "Produk: {$this->nama}";
    }
}

class Makanan extends Produk {
    public function info(): string {
        return "Makanan: {$this->nama}";   // override
    }
}

$m = new Makanan("Kopi");
echo $m->info();   // Makanan: Kopi
```

`parent::info()` untuk memanggil method induk.

## Abstract & Interface

```php
<?php
abstract class Hewan {
    abstract public function suara(): string;   // wajib diimplementasi

    public function perkenalan(): string {
        return "Saya bersuara " . $this->suara();
    }
}

interface Terbang {
    public function terbang(): string;
}

class Burung extends Hewan implements Terbang {
    public function suara(): string { return "kicau"; }
    public function terbang(): string { return "mengepak sayap"; }
}
```

| | Abstract class | Interface |
| --- | --- | --- |
| Instance langsung | tidak | tidak |
| Isi method | boleh ada | hanya tanda tangan (tanpa isi) |
| Multiple | tidak (satu induk) | ya (bisa banyak) |
| Kapan pakai | relasi "adalah" | kontrak kemampuan |

## Static & Const

```php
<?php
class Matematika {
    const PI = 3.14;

    public static function lingkaran(float $r): float {
        return self::PI * $r * $r;
    }
}

echo Matematika::PI;
echo Matematika::lingkaran(7);
```

Static tidak butuh instance, dipanggil dengan `::`. `self::` menunjuk class sendiri.

## Trait (Reuse Kode)

```php
<?php
trait Loggable {
    public function log(string $pesan): void {
        echo "[LOG] $pesan";
    }
}

class Pesanan {
    use Loggable;
}

(new Pesanan())->log("dibuat");
```

Trait menyisipkan sekumpulan method tanpa inheritance — berguna bila beberapa class berbagi perilaku sama.

## Constructor Promotion (PHP 8)

```php
<?php
class Titik {
    public function __construct(
        public float $x = 0,
        public float $y = 0,
    ) {}
}

$t = new Titik(3, 4);
echo $t->x;   // 3
```

Property otomatis dibuat dari parameter tanpa menulis ulang.

## Readonly & Enum (PHP 8.1+)

```php
<?php
class Konfigurasi {
    public function __construct(
        public readonly string $db,
    ) {}
}

enum Status: string {
    case Aktif   = 'aktif';
    case Nonaktif = 'nonaktif';

    public function label(): string {
        return match ($this) {
            Status::Aktif    => 'Aktif',
            Status::Nonaktif => 'Nonaktif',
        };
    }
}

echo Status::Aktif->label();
```

`readonly` mencegah property diubah setelah di-set. `enum` adalah kumpulan nilai tetap — lebih aman daripada konstanta string yang rawan salah ketik.

Referensi: <https://www.php.net/manual/en/language.oop5.php>
