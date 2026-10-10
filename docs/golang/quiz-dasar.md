# Quiz: Dasar Go

Uji pemahaman materi bab **Dasar** dari [Tur Go](/golang/). Pilih satu jawaban untuk setiap pertanyaan, lalu tekan **Periksa Jawaban**.

<script setup>
const questions = [
  {
    question: 'Program Go mulai berjalan pada paket apa?',
    options: ['package util', 'package main', 'package app', 'package run'],
    answer: 1,
    explanation: 'Setiap program Go yang bisa dijalankan memakai package main dengan fungsi main.'
  },
  {
    question: 'Sebuah nama diekspor (bisa diakses dari paket lain) jika diawali dengan...',
    options: ['huruf kecil', 'garis bawah (_)', 'huruf besar', 'angka'],
    answer: 2,
    explanation: 'Nama yang diawali huruf besar diekspor, misalnya math.Pi. math.pi akan error.'
  },
  {
    question: 'Manakah bentuk signature fungsi yang benar untuk menjumlahkan dua int?',
    options: ['func add(int x, int y)', 'func add(x, y int) int', 'func add(x: int, y: int)', 'func add(x int, y int)'],
    answer: 1,
    explanation: 'Tipe ditulis setelah nama variabel dan boleh digabung: func add(x, y int) int.'
  },
  {
    question: 'Apa nilai kosong (zero value) untuk tipe bool?',
    options: ['0', 'true', 'nil', 'false'],
    answer: 3,
    explanation: 'Nilai kosong: 0 untuk numerik, false untuk bool, dan string kosong untuk string.'
  },
  {
    question: 'Perintah mana yang mengonversi nilai v ke float64?',
    options: ['float64(v)', 'v.float64()', 'cast(float64, v)', 'float64 v'],
    answer: 0,
    explanation: 'Ekspresi T(v) mengonversi v ke tipe T. Konversi antar tipe berbeda wajib eksplisit.'
  },
  {
    question: 'Tipe hasil dari f := 3.142 adalah...',
    options: ['int', 'float32', 'float64', 'complex128'],
    answer: 2,
    explanation: 'Konstanta numerik dengan desimal disimpulkan sebagai float64.'
  },
  {
    question: 'Bagaimana cara mendeklarasikan konstanta?',
    options: ['const Pi = 3.14', 'Pi := 3.14', 'var Pi = const 3.14', 'constant Pi = 3.14'],
    answer: 0,
    explanation: 'Konstanta memakai kata kunci const dan tidak bisa memakai sintaks :=.'
  },
  {
    question: 'Mengapa needInt(Big) error pada pelajaran Konstanta Numerik?',
    options: ['Big bukan konstanta', 'int tidak bisa menyimpan 2^100 (overflow)', 'needInt butuh float64', 'Big tidak diekspor'],
    answer: 1,
    explanation: 'int hanya menampung 64-bit, sedangkan Big = 1 << 100 terlalu besar sehingga overflow.'
  }
]
</script>

<Quiz :questions="questions" />

## Lanjut Belajar

- [Selamat Datang](/golang/selamat-datang)
- [Go Playground](/golang/go-playground)
- [Paket](/golang/paket)
