# Java & Spring Boot

Catatan dan panduan penggunaan **Java modern (Java 25)** bersama **Spring Boot 3.5+** serta arsitektur backend REST API bertingkat (RBAC, JWT, Validasi, dan OpenAPI).

## Daftar Materi

- [Java 25 & Spring Boot 3.5 — Kompatibilitas & Konfigurasi](/java/spring-boot-java-25)
- [Arsitektur Task Management System (Fase 1 s.d. 5)](/java/task-management-system)

## Poin Utama

1. **Kompatibilitas Bytecode** — Java 25 menghasilkan *class file* versi 69 yang memerlukan Spring Boot 3.5+ (Spring Framework 6.2+).
2. **Lombok di JDK Baru** — Wajib menggunakan versi 1.18.48+ dengan konfigurasi `annotationProcessorPaths` di Maven.
3. **Virtual Threads** — Mengaktifkan `spring.threads.virtual.enabled: true` untuk performa I/O tinggi.
4. **Keamanan & RBAC** — JWT 0.12.6, `SecurityFilterChain`, dan pemisahan otorisasi HTTP vs Data-level.
5. **Validasi & Error Handling** — Uniform `ApiError` JSON response untuk semua status kode error.
6. **OpenAPI 3 / Swagger** — Dokumentasi interaktif dengan skema otentikasi Bearer JWT global.
