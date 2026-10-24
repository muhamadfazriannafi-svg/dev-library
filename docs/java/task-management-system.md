# Panduan Ngoding Task Management System (Java & Spring Boot)

Panduan langkah demi langkah cara membangun REST API Task Management bertingkat (RBAC, JWT, Validasi, dan OpenAPI) dari nol menggunakan **Java 25** dan **Spring Boot 3.5**.

---

## 1. Setup Awal & Inisiasi Proyek (Fase 1)

### A. Konfigurasi `pom.xml`
Pastikan menggunakan versi Spring Boot 3.5.16 dan Lombok 1.18.48 dengan annotation processor:

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.5.16</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <!-- JWT 0.12.6 -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.6</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.12.6</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.12.6</version>
        <scope>runtime</scope>
    </dependency>
    <!-- OpenAPI Swagger -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.7.0</version>
    </dependency>
    <!-- Database -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.48</version>
        <scope>provided</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                        <version>1.18.48</version>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### B. Konfigurasi `src/main/resources/application.yml`
```yaml
spring:
  threads:
    virtual:
      enabled: true
  datasource:
    url: jdbc:postgresql://localhost:5432/taskdb
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: update
    open-in-view: false
    show-sql: true
```

### C. Entitas JPA (`User`, `Role`, `Task`)
- **`Role.java`**: Tabel `role_m`, kolom `name` (mis. `ROLE_ADMIN`, `ROLE_STAFF`).
- **`User.java`**: Tabel `user_m`, relasi `@ManyToMany` ke `Role` dengan `FetchType.EAGER`.
- **`Task.java`**: Tabel `task_t`, kolom `title`, `description`, `status` (`TODO`, `IN_PROGRESS`, `DONE`), serta relasi ke `createdBy` dan `assignedTo`.

---

## 2. Keamanan & Autentikasi JWT (Fase 2)

### A. Membuat `JwtService`
Gunakan JJWT 0.12.6 untuk membuat dan memverifikasi token:
```java
@Service
public class JwtService {
    private final SecretKey key = Jwts.SIG.HS256.key().build();
    private final long expirationMs = 86400000; // 24 jam

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload().getExpiration();
        return expiration.before(new Date());
    }
}
```

### B. Security Filter & Konfigurasi
Buat `JwtAuthFilter` yang mengimplementasikan `OncePerRequestFilter`, membaca header `Authorization: Bearer <token>`, dan mendaftarkannya ke `SecurityFilterChain`.

---

## 3. Core API, Repository & Service (Fase 3)

- **DTO (Java Record)**:
  ```java
  public record CreateTaskRequest(
      @NotBlank @Size(max = 200) String title,
      @Size(max = 5000) String description,
      @NotNull Long assignedToId
  ) {}
  ```
- **Service Layer**: Mengatur logika CRUD sekaligus validasi otorisasi data-level (apakah staf yang sedang login berhak mengakses task tersebut).

---

## 4. Validasi & Global Error Handling (Fase 4)

Buat `@RestControllerAdvice` untuk menangkap `MethodArgumentNotValidException` dan exception kustom lainnya, lalu kembalikan format JSON yang seragam (`ApiError`):

```java
@Getter
@AllArgsConstructor
public class ApiError {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private List<ValidationError> details;
}
```

---

## 5. Dokumentasi OpenAPI / Swagger (Fase 5)

Konfigurasikan `OpenApiConfig` agar Swagger UI mendukung tombol **Authorize** (Bearer JWT):

```java
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Task Management System API").version("v1"))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components().addSecuritySchemes("bearerAuth",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
    }
}
```
Akses Swagger UI di browser: `http://localhost:8080/swagger-ui/index.html`
