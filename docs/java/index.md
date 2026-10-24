# Java & Spring Boot

Catatan dan panduan penggunaan **Java modern (Java 25)** bersama **Spring Boot 3.5+** berdasarkan best practice dari proyek nyata di dev-library.

## Daftar Materi

- [Java 25 & Spring Boot 3.5 — Kompatibilitas & Konfigurasi](/java/spring-boot-java-25)

## Poin Utama

1. **Kompatibilitas Bytecode** — Java 25 menghasilkan *class file* versi 69 yang memerlukan Spring Boot 3.5+ (Spring Framework 6.2+).
2. **Lombok di JDK Baru** — Wajib menggunakan versi 1.18.48+ dengan konfigurasi `annotationProcessorPaths` di Maven.
3. **Virtual Threads** — Mengaktifkan `spring.threads.virtual.enabled: true` untuk performa I/O tinggi.
