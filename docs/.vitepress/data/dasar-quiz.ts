export const dasarQuestions = [
  {
    question: 'Program Go mulai berjalan pada paket apa?',
    options: ['package util', 'package main', 'package app', 'package run'],
    answer: 1,
    explanation: 'Program yang bisa dijalankan memakai package main dengan fungsi main.'
  },
  {
    question: 'Sebuah nama diekspor (bisa diakses dari paket lain) jika diawali dengan...',
    options: ['huruf kecil', 'garis bawah (_)', 'huruf besar', 'angka'],
    answer: 2,
    explanation: 'Nama yang diawali huruf besar diekspor, misalnya math.Pi.'
  },
  {
    question: 'Manakah signature fungsi yang benar untuk menjumlahkan dua int?',
    options: ['func add(int x, int y)', 'func add(x, y int) int', 'func add(x: int, y: int)', 'func add(x int, y int)'],
    answer: 1,
    explanation: 'Tipe ditulis setelah nama dan boleh digabung: func add(x, y int) int.'
  },
  {
    question: 'Apa nilai kosong (zero value) untuk tipe bool?',
    options: ['0', 'true', 'nil', 'false'],
    answer: 3,
    explanation: 'Zero value bool adalah false.'
  },
  {
    question: 'Perintah mana yang mengonversi nilai v ke float64?',
    options: ['float64(v)', 'v.float64()', 'cast(float64, v)', 'float64 v'],
    answer: 0,
    explanation: 'Ekspresi T(v) mengonversi v ke tipe T.'
  },
  {
    question: 'Tipe hasil dari f := 3.142 adalah...',
    options: ['int', 'float32', 'float64', 'complex128'],
    answer: 2,
    explanation: 'Konstanta desimal disimpulkan sebagai float64.'
  },
  {
    question: 'Bagaimana cara mendeklarasikan konstanta?',
    options: ['const Pi = 3.14', 'Pi := 3.14', 'var Pi = const 3.14', 'constant Pi = 3.14'],
    answer: 0,
    explanation: 'Konstanta memakai const dan tidak bisa memakai :=.'
  },
  {
    question: 'Mengapa needInt(Big) error pada pelajaran Konstanta Numerik?',
    options: ['Big bukan konstanta', 'int tidak bisa menyimpan 2^100 (overflow)', 'needInt butuh float64', 'Big tidak diekspor'],
    answer: 1,
    explanation: 'int hanya 64-bit, sedangkan Big = 1 << 100 terlalu besar.'
  },
  {
    question: 'Kata kunci untuk mendeklarasikan variabel adalah...',
    options: ['let', 'var', 'dim', 'def'],
    answer: 1,
    explanation: 'Go memakai kata kunci var.'
  },
  {
    question: 'Deklarasi singkat := hanya bisa dipakai...',
    options: ['di tingkat paket', 'di dalam fungsi', 'di dalam struct', 'di komentar'],
    answer: 1,
    explanation: 'Di luar fungsi setiap perintah harus diawali kata kunci seperti var atau func.'
  },
  {
    question: 'Apa tipe default literal 42 pada i := 42?',
    options: ['int8', 'int64', 'int', 'uint'],
    answer: 2,
    explanation: 'Konstanta bulat tanpa tipe memakai int dalam konteks ini.'
  },
  {
    question: 'Alias untuk tipe uint8 adalah...',
    options: ['byte', 'rune', 'short', 'char'],
    answer: 0,
    explanation: 'byte adalah alias untuk uint8.'
  },
  {
    question: 'Alias untuk tipe int32 yang merepresentasikan kode Unicode adalah...',
    options: ['byte', 'rune', 'char', 'unicode'],
    answer: 1,
    explanation: 'rune adalah alias int32 dan merepresentasikan kode Unicode.'
  },
  {
    question: 'Fungsi dengan banyak kembalian mengembalikan nilai dalam bentuk...',
    options: ['array', 'slice', 'tuple di tanda kurung', 'map'],
    answer: 2,
    explanation: 'Contoh: func swap(x, y string) (string, string).'
  },
  {
    question: 'Apa itu kembalian "naked"?',
    options: [
      'return tanpa nilai, memakai kembalian bernama',
      'fungsi tanpa parameter',
      'fungsi yang mengembalikan nil',
      'fungsi yang tidak punya nama'
    ],
    answer: 0,
    explanation: 'return tanpa nilai mengembalikan nilai terakhir variabel kembalian bernama.'
  },
  {
    question: 'Konversi antar tipe berbeda pada Go bersifat...',
    options: ['otomatis', 'implisit', 'eksplisit', 'opsional'],
    answer: 2,
    explanation: 'Berbeda dari C, Go butuh konversi eksplisit seperti float64(i).'
  },
  {
    question: 'Berapa nilai kosong sebuah string?',
    options: ['nil', '0', 'string kosong ("")', 'undefined'],
    answer: 2,
    explanation: 'Zero value string adalah string kosong.'
  },
  {
    question: 'Import yang tidak dipakai akan...',
    options: ['diabaikan', 'menjadi warning', 'menyebabkan error kompilasi', 'dihapus otomatis'],
    answer: 2,
    explanation: 'Import yang tidak dipakai adalah error kompilasi di Go.'
  },
  {
    question: 'Bentuk import yang disarankan adalah...',
    options: ['import "fmt"; import "math"', 'import difaktorkan dalam tanda kurung', 'require "fmt"', 'using fmt'],
    answer: 1,
    explanation: 'Import yang difaktorkan: import ( "fmt" "math" ).'
  },
  {
    question: 'Pada contoh konversi, math.Sqrt menerima argumen bertipe...',
    options: ['int', 'float64', 'complex128', 'string'],
    answer: 1,
    explanation: 'math.Sqrt(float64) sehingga int harus dikonversi dulu.'
  },
  {
    question: 'Keyword untuk konstanta bernilai berurutan otomatis adalah...',
    options: ['enum', 'iota', 'seq', 'auto'],
    answer: 1,
    explanation: 'iota memberi penomoran otomatis dalam blok const.'
  },
  {
    question: 'Konstanta tidak bertipe (untyped) memakai tipe...',
    options: ['selalu int', 'selalu float64', 'sesuai konteks pemakaiannya', 'interface{}'],
    answer: 2,
    explanation: 'Konstanta untyped beradaptasi sesuai konteks, mis. int atau float64.'
  },
  {
    question: 'Tipe int pada sistem 64-bit biasanya berukuran...',
    options: ['16 bit', '32 bit', '64 bit', '128 bit'],
    answer: 2,
    explanation: 'int berukuran 32 bit pada sistem 32-bit dan 64 bit pada sistem 64-bit.'
  },
  {
    question: 'Manakah yang TIDAK termasuk tipe dasar Go?',
    options: ['bool', 'string', 'list', 'rune'],
    answer: 2,
    explanation: 'list bukan tipe dasar Go.'
  },
  {
    question: 'Tipe untuk bilangan kompleks adalah...',
    options: ['complex64, complex128', 'float64, float128', 'imag32, imag64', 'bigComplex'],
    answer: 0,
    explanation: 'Go menyediakan complex64 dan complex128.'
  },
  {
    question: 'Output dari fmt.Printf("%T", 42) adalah...',
    options: ['42', 'int', 'number', 'interface'],
    answer: 1,
    explanation: '%T mencetak tipe dari sebuah nilai.'
  },
  {
    question: 'Zero value untuk pointer, slice, dan map adalah...',
    options: ['0', 'false', 'nil', 'string kosong'],
    answer: 2,
    explanation: 'Tipe referensi seperti slice, map, dan pointer bernilai kosong nil.'
  },
  {
    question: 'Fungsi main berada di dalam paket...',
    options: ['pkg main', 'package main', 'module main', 'func main'],
    answer: 1,
    explanation: 'Deklarasi paketnya adalah package main.'
  },
  {
    question: 'fmt.Println termasuk fungsi dari paket...',
    options: ['io', 'os', 'fmt', 'str'],
    answer: 2,
    explanation: 'Println dan Printf ada di paket fmt.'
  },
  {
    question: 'Paket "math/rand" berisi berkas yang diawali perintah...',
    options: ['package math', 'package rand', 'package mathrand', 'package main'],
    answer: 1,
    explanation: 'Nama paket adalah elemen terakhir dari path import.'
  },
  {
    question: 'Bagaimana membuat variabel tingkat paket?',
    options: ['i := 0 di luar fungsi', 'var i = 0 di luar fungsi', 'i = 0 di luar fungsi', 'let i = 0 di luar fungsi'],
    answer: 1,
    explanation: 'Di luar fungsi gunakan var; := tidak diizinkan.'
  },
  {
    question: 'Output dari fmt.Println(1, true) adalah...',
    options: ['1 true', '1true', 'error', '1, true'],
    answer: 0,
    explanation: 'Println memberi spasi antar operand dan newline.'
  },
  {
    question: 'Output dari fmt.Printf("%v %q", 0, "") adalah...',
    options: ['0 ""', '0 ', '"" 0', '0 nil'],
    answer: 0,
    explanation: '%q menampilkan string dengan tanda kutip.'
  },
  {
    question: 'Konstanta Big = 1 << 100 dipakai sebagai float64. Tipe konstanta awalnya bersifat...',
    options: ['bertipe uint64', 'bertipe int', 'tidak bertipe (untyped)', 'bertipe float32'],
    answer: 2,
    explanation: 'Konstanta untyped bisa menjadi float64, tetapi tidak int.'
  },
  {
    question: 'Operator << pada konstanta melakukan...',
    options: ['perbandingan', 'pergeseran bit', 'penjumlahan', 'perkalian'],
    answer: 1,
    explanation: '<< menggeser bit ke kiri, mis. 1 << 4 = 16.'
  },
  {
    question: 'Manakah deklarasi variabel ganda yang benar?',
    options: ['var a, b int = 1, 2', 'var a, b = 1', 'a, b := 1', 'var a int, b int'],
    answer: 0,
    explanation: 'Deklarasi ganda harus menyediakan jumlah nilai yang cocok.'
  },
  {
    question: 'Fungsi yang bertipe sama parameternya dapat ditulis...',
    options: ['func f(x int, y int)', 'func f(x y int)', 'func f(int x, y)', 'func f(x, y int)'],
    answer: 3,
    explanation: 'Parameter bertipe sama digabung: x, y int.'
  },
  {
    question: 'Kata kunci untuk mengimpor paket adalah...',
    options: ['use', 'import', 'include', 'require'],
    answer: 1,
    explanation: 'Go memakai kata kunci import.'
  },
  {
    question: 'Manakah nama yang TIDAK diekspor?',
    options: ['Pizza', 'Pi', 'pizza', 'Println'],
    answer: 2,
    explanation: 'Nama diawali huruf kecil tidak diekspor.'
  },
  {
    question: 'Nilai math.Pi kira-kira...',
    options: ['3.14', '3.141592653589793', 'pi', 'error'],
    answer: 1,
    explanation: 'math.Pi bernilai presisi float64.'
  },
  {
    question: 'Mengapa math.pi menghasilkan error?',
    options: ['pi tidak ada di math', 'pi tidak diekspor (huruf kecil)', 'pi butuh argumen', 'pi bukan angka'],
    answer: 1,
    explanation: 'Hanya nama yang diawali huruf besar yang diekspor.'
  },
  {
    question: 'Keyword const bisa dipakai pada tingkat...',
    options: ['paket dan fungsi', 'hanya paket', 'hanya fungsi', 'hanya struct'],
    answer: 0,
    explanation: 'const bisa di tingkat paket maupun di dalam fungsi.'
  },
  {
    question: 'Literal string mentah (raw) ditulis dengan...',
    options: ['tanda kutip ganda', 'tanda kutip tunggal', 'backtick', 'kurung siku'],
    answer: 2,
    explanation: 'Backtick untuk string mentah multi-baris.'
  },
  {
    question: 'Tipe dari g := 0.867 + 0.5i adalah...',
    options: ['float64', 'complex64', 'complex128', 'int'],
    answer: 2,
    explanation: 'Bilangan kompleks dengan presisi penuh menjadi complex128.'
  },
  {
    question: 'Apa output fmt.Println(7/2) untuk dua int?',
    options: ['3.5', '3', '4', 'error'],
    answer: 1,
    explanation: 'Pembagian int menghasilkan int, sisa dibuang.'
  },
  {
    question: 'Nilai kosong untuk int adalah...',
    options: ['nil', '0', '1', '-1'],
    answer: 1,
    explanation: 'Zero value numerik adalah 0.'
  },
  {
    question: 'Manakah tipe integer unsigned?',
    options: ['int', 'int32', 'uint', 'rune'],
    answer: 2,
    explanation: 'uint dan varian uintN adalah unsigned.'
  },
  {
    question: 'Untuk menampilkan tipe variabel pada fmt.Printf dipakai format...',
    options: ['%v', '%q', '%T', '%d'],
    answer: 2,
    explanation: '%T menampilkan tipe.'
  },
  {
    question: 'Variabel yang dideklarasikan tapi tidak dipakai akan...',
    options: ['diabaikan', 'menjadi error kompilasi', 'bernilai nil', 'dicetak otomatis'],
    answer: 1,
    explanation: 'Variabel tak terpakai adalah error di Go.'
  },
  {
    question: 'Bentuk penulisan beberapa variabel satu baris dengan tipe implisit adalah...',
    options: ['var c, python, java = true, false, "no!"', 'var c: bool', 'c = true, false', 'let c = true'],
    answer: 0,
    explanation: 'Tipe disimpulkan dari masing-masing nilai inisialisasi.'
  }
]
