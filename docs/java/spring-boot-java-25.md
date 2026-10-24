# Java 25 & Spring Boot 3.5

Catatan teknis mengenai transisi ke **Java 25** dan **Spring Boot 3.5** untuk pengembangan backend yang modern dan performa tinggi.

## 1. Kompatibilitas Bytecode (Java 25 vs Spring Boot)

- **Masalah:** Java 25 menghasilkan format *class file* versi **69**. Versi Spring Boot 3.4 ke bawah (menggunakan Spring Framework 6.1.x) akan gagal memprosesnya dengan error `Incompatible class format`.
- **Solusi:** Gunakan **Spring Boot 3.5.x** (yang dibundel bersama Spring Framework 6.2.x atau lebih baru) karena sudah mendukung penuh format bytecode Java 25.

## 2. Konfigurasi Lombok di JDK Baru

Lombok versi lama sering gagal berfungsi sebagai *annotation processor* di JDK terbaru, sehingga getter/setter entitas tidak terbentuk.

- **Solusi:** Gunakan Lombok **1.18.48+** dan daftarkan secara eksplisit di `pom.xml` (`maven-compiler-plugin`):

```xml
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
```

## 3. Konfigurasi Penting (`application.yml`)

Optimalkan aplikasi Spring Boot modern dengan konfigurasi berikut:

```yaml
spring:
  threads:
    virtual:
      enabled: true   # Menggunakan Project Loom Virtual Threads untuk setiap request
  jpa:
    open-in-view: false # Membatasi transaksi database agar tidak bocor ke luar service layer
    hibernate:
      ddl-auto: update  # Ubah ke validate atau gunakan migrasi (Flyway/Liquibase) di production
```

- **Virtual Threads (`spring.threads.virtual.enabled: true`)**: Menangani setiap request HTTP menggunakan *virtual thread* yang sangat ringan, drastis meningkatkan kapasitas menangani blocking I/O (seperti query database).
- **Open-in-View (`false`)**: Mencegah sesi database terbuka lebih lama dari seharusnya, menjaga efisiensi koneksi pool.
