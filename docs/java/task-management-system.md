# Arsitektur & Implementasi Task Management System

Ringkasan arsitektur lengkap dari **5 Fase** pembangunan Backend REST API Task Management (Java 25 + Spring Boot 3.5 + PostgreSQL + Spring Security + OpenAPI).

## Ringkasan Fase

| Fase | Fokus Utama | Komponen Utama |
| --- | --- | --- |
| **Fase 1** | Inisiasi & Entitas JPA | Maven, `pom.xml`, Java 25, Lombok 1.18.48, Entity (`User`, `Role`, `Task`), H2/PostgreSQL |
| **Fase 2** | Keamanan & RBAC | `JwtService` (jjwt 0.12.6), `OncePerRequestFilter`, `SecurityFilterChain`, `UserDetailsService` |
| **Fase 3** | Core API (CRUD & Bisnis) | DTO (Java Record), Repository dengan query filtering, Service Layer dengan otorisasi data-level |
| **Fase 4** | Validasi & Error Handling | `jakarta.validation`, `@ControllerAdvice`, dan seragamisasi format JSON `ApiError` |
| **Fase 5** | Dokumentasi OpenAPI | Springdoc OpenAPI 3, Swagger UI (`/swagger-ui/index.html`), Bearer JWT Security Scheme |

---

## Detail per Fase

### Fase 1: Inisiasi & Pemetaan Entitas
- **Java 25 & Spring Boot 3.5.16**: Diperlukan untuk mendukung bytecode *class file* versi 69.
- **Lombok 1.18.48**: Didaftarkan eksplisit di `maven-compiler-plugin` `<annotationProcessorPaths>` agar annotation processor berjalan di JDK 25.
- **Virtual Threads**: `spring.threads.virtual.enabled: true` untuk menangani setiap request dengan virtual thread yang ringan.
- **Entitas JPA**:
  - `user_m` (User), `role_m` (Role), `user_role_m` (Pivot Many-to-Many), `task_t` (Task dengan status `TODO`, `IN_PROGRESS`, `DONE`).
  - `User.roles` memakai `FetchType.EAGER` untuk menghindari `LazyInitializationException` pada `UserDetails`.

### Fase 2: Keamanan (JWT + Security Filter Chain)
- **Alur JWT**: Login via `/api/v1/auth/login` → verifikasi hash BCrypt → terbit JWT HS256 (`jjwt` 0.12.6) → request berikutnya membawa header `Authorization: Bearer <jwt>`.
- **Filter**: `JwtAuthFilter` mengintersepsi request, memvalidasi tanda tangan & masa berlaku token, lalu mengisi `SecurityContext`.

### Fase 3: Core API (DTO, Repository, Service)
- **Pemisahan Otorisasi**:
  1. *HTTP-level*: Melalui `@PreAuthorize` atau `SecurityConfig` (Role ADMIN vs STAFF).
  2. *Data-level*: Di dalam `TaskService` (misalnya memastikan user hanya bisa mengubah task miliknya atau di-assign kepadanya).
- **DTO**: Memakai Java Record (`CreateTaskRequest`, `TaskResponse`) untuk menjaga immutability dan mencegah masalah lazy-load JPA.

### Fase 4: Validasi Input & Global Error Handling
- **Validasi**: Menggunakan `@Valid` bersama anotasi Jakarta Validation (`@NotBlank`, `@NotNull`, `@Size`).
- **Global Error Handler**: Menangkap exception validasi, autentikasi, dan business logic, lalu membungkusnya dalam format JSON seragam (`ApiError` dengan `timestamp`, `status`, `error`, `message`, `path`, dan `details`).

### Fase 5: Dokumentasi API (OpenAPI 3 / Swagger)
- **Springdoc OpenAPI 2.7.0**: Menyediakan endpoint `/swagger-ui/index.html` dan `/v3/api-docs`.
- **Konfigurasi Keamanan**: Didaftarkan skema `bearerAuth` global sehingga tombol **Authorize** di Swagger UI langsung aktif untuk pengujian endpoint terproteksi.
