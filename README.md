# Modern To-Do App

Merhaba,

Bu repodaki proje, VisioSoft'un talebi üzerine hazırlanmış olup Full Stack bir To-Do uygulamasıdır. Bu uygulamanın, mevcut To-Do uygulamalarından daha detaylı, estetik ve modern olduğunu düşünüyoruz.

Uygulamanın deploy edilmiş linki için: https://todo-planner-ivory.vercel.app/

Demo kullanıcı girişi için:

E-mail: test@test.com
Parola: test

Dilerseniz kendiniz de yeni bir üyelik oluşturabilirsiniz. Oluşturulan üyeliklerin e-mail üzerinden onaylanması gerekmektedir.

### Gereksinimler

- npm
- Node.js
- MySQL (Docker aracılığıyla kurulabilir)

### Kurulum

**1.** Eğer bilgisayarınızda MySQL yüklü değilse, ilk olarak MySQL'i Docker aracılığıyla bilgisayarınıza yüklemeniz gerekir (bilgisayarınızda Docker yoksa, önce Docker'ı yüklemeniz gerekir).

Docker'ı kurduktan sonra terminalden aşağıdaki komutu çalıştırabilirsiniz (eğer halihazırda MySQL kuruluysa, bu adımı pas geçebilirsiniz):

```bash
docker run -p 3306:3306 --name my_mysql_db -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest

```

**Uyarı**: MySQL zaten 3306 numaralı bağlantı noktasında çalışıyorsa, bu komut hata verecektir. Hata alırsanız, farklı bir bağlantı noktası deneyin.

**2**. Terminalden uygulamanın kaynak kodlarının olduğu dizine gidin ve gerekli node modüllerini yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install
```

Node modülleri yüklendikten sonra, veritabanını localinizde otomatik olarak kurmak için terminalinizde aşağıdaki komutu çalıştırın:

```bash
npm run db:push
```

**UYARI**: Bunun için vermiş olduğumuz _env.example_ dosyasına uygun bir şekilde `.env` dosyası oluşturmanız gerekmektedir. Bu dosyada veritabanı bağlantı bilgileri bulunmaktadır. Eğer bu dosyayı oluşturmazsanız, veritabanı kurulumu başarısız olacaktır.

**3**. Uygulamayı başlatmak için aşağıdaki komutu çalıştırın:

```bash
npm run start
```

veya:

```bash
npm run dev
```

**4**. Uygulama başlatıldıktan sonra `http://localhost:3000` adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

---

# README (TR)

Uygulama, 2 gün içerisinde hazırlanmıştır. Dolayısıyla, görülebilecek birçok eksiğe de sahiptir. Örneğin detaylı bir Dashboard sayfası mevcut değildir. Ayrıca, eklenen To-Do'lara, kategorilere veya etiketlere özelleştirilmiş ikon ekleme kısmı da olabilirdi.

Şimdi, bu uygulamada kullanılan paketlere geçelim ve neden bu paketleri kullandığımızı açıklayalım.

## Kullanılan Paketler

Bu uygulamada esas olarak **T3 Stack (tRPC, TypeScript, Tailwind CSS)** temel alınmıştır. Bu stack'i seçmemin en temel sebebi Back-End ve Front-End arasında **End-to-End Type Safety** sağlamasıdır. Yani, API'dan dönen response'u ayrıca parse ve valide etmek yerine (örneğin: https://zod.dev/?id=safeparseasync) bunu tek bir işlemde gerçekleştirebilmekteyiz. Bu kolaylığı bize sağlayan şey **tRPC** olmuştur. tRPC kendi içerisinde, tıpkı bir Node.js server'ı gibi, Route, Context ve API bulundurur. Tüm bunları da _under the hood_ Node.js çalıştırarak yapar. Bu şekilde tek bir repo içerisinde **End-to-End Type Safety** özelliğine sahip Full Stack bir uygulama geliştirmiş oluruz. **tRPC** ayrıca **TanStack React Query** üzerine inşa edilmiştir. Bu sayede tRPC, React Query'nin tüm özelliklerini kullanmamıza olanak sağlar.

tRPC'nin yanı sıra, uygulamada kullanılan diğer paketler:

- Tailwind CSS: CSS framework'üdür. CSS yazmamızı büyük ölçüde azaltır ve iyi bir DX sağlar.
- TypeScript: JavaScript'in bir üst kümesi olan TypeScript sayesinde statik tipli bir uygulama geliştirmiş oluruz. Bu sayede, uygulamamızda oluşabilecek birçok hatayı compile time'da yakalayabiliriz.
- Next.js: React framework'üdür. SSR, SSG, API Routes gibi birçok özelliği barındırır.
- Prisma: ORM aracıdır. Veritabanı işlemlerini kolaylaştırır ve güvenli hale getirir.
- React Hook Form: Form yönetimi için kullanılmıştır. Form yönetimini kolaylaştırır ve performanslıdır.
- Zod: TypeScript için bir schema validasyon aracıdır. Ayrıca React Hook Form ile de entegre çalışır.
- Radix UI: UI component'leri için kullanılmıştır. Orijinal Radix UI bileşenleri yerine Radix UI üzerine inşa edilmiş Shadcn bileşenleri kullanılmıştır.
- Clerk: Authentication ve Authorization için kullanılmıştır. Clerk, kullanıcı yönetimini kolaylaştırır ve güvenli hale getirir. Ayrıca kendi içerisinde e-mail doğrulama, şifre sıfırlama gibi birçok özellik barındırır.
- Superjson: JSON serialization için kullanılmıştır (örneğin Date objelerini JSON'a çevirirken sorun yaşamamak için).
