# Quiz: Dasar Go

Uji pemahaman materi bab **Dasar** dari [Tur Go](/golang/).

Soal diambil **acak 10 dari bank berisi 50 soal**, jadi setiap kali halaman dimuat (atau tombol **Soal Baru** ditekan) akan muncul soal yang berbeda. Tekan **Periksa Jawaban** untuk melihat skor.

<script setup>
import { dasarQuestions } from '../.vitepress/data/dasar-quiz.ts'
</script>

<Quiz :questions="dasarQuestions" :count="10" />

## Lanjut Belajar

- [Selamat Datang](/golang/selamat-datang)
- [Go Playground](/golang/go-playground)
- [Paket](/golang/paket)
