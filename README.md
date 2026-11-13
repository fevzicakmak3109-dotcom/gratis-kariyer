# Uber Türkiye Kariyer · İş Fırsatları Sayfası

Uber'in Türkiye'deki iş kolları için hazırlanmış, **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4** ile yazılmış tek sayfalık (one-page) kariyer sitesi ve başvuruları takip etmek için **kullanıcı adı / şifre korumalı admin paneli**.

> Bu proje bir aday case çalışmasıdır; Uber'in resmi sitesi değildir.

## Özellikler

### Kariyer sayfası (`/`)
- **Hero banner**: İstanbul haritası, Boğaz, Uber'in kare başlangıç / yuvarlak varış rota dili ve iş kollarını anlatan hareketli kartlar
- **İş kolları**: Uber Tech Hub İstanbul, Trendyol Go by Uber Eats, Uber Mobility (Uber Taksi), Uber for Business, Operasyon & Destek, Kurumsal Fonksiyonlar. Bir pozisyona tıklayınca form o alana göre otomatik doluyor
- **Kampanya afişi (1080×1350) ve LinkedIn banner'ı (1584×396)**: SVG olarak tasarlandı, sayfadan indirilebilir (`public/`)
- **Genel başvuru formu**: ad, soyad, e-posta, **cep telefonu** (05XX XXX XX XX maskesi), iş kolu, pozisyon, şehir, LinkedIn, ön yazı, **CV yükleme** (sürükle-bırak, PDF/DOC/DOCX, en fazla 5 MB), KVKK onayı
- İstemci ve sunucu tarafında doğrulama, dosya imzası (magic bytes) kontrolü, bot tuzağı (honeypot)
- Neden Uber, 4 adımlı başvuru süreci, SSS
- Mobil ve masaüstü için responsive, `prefers-reduced-motion` desteği

### Admin paneli (`/admin`)
- HMAC imzalı, `httpOnly` çerezle oturum; middleware ile `/admin` ve `/api/admin/*` korumalı
- Özet kartları (toplam, yeni, mülakat, son 7 gün) ve iş koluna göre dağılım grafiği
- Arama, iş kolu ve durum filtreleri
- Masaüstünde tablo, mobilde kart görünümü
- Başvuru detayı: tek tıkla arama / e-posta / WhatsApp, **CV önizleme ve indirme**, durum yönetimi (Yeni → İnceleniyor → Mülakat → Teklif / Olumsuz), İK notları, silme
- **CSV dışa aktarma** (Excel uyumlu, Türkçe karakterli)

## Kurulum

```bash
npm install
cp .env.example .env.local   # admin bilgilerini değiştir
npm run seed                 # (isteğe bağlı) panele 8 demo başvuru ekler
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

| Değişken | Açıklama | Varsayılan |
| --- | --- | --- |
| `ADMIN_USERNAME` | Admin kullanıcı adı | `admin` |
| `ADMIN_PASSWORD` | Admin şifresi | `Uber2026!` |
| `ADMIN_SESSION_SECRET` | Oturum çerezini imzalayan gizli anahtar | geliştirme değeri |
| `DATA_DIR` | Başvuruların ve CV'lerin tutulduğu klasör | `./data` |

> Canlıya alırken varsayılan şifreyi ve `ADMIN_SESSION_SECRET` değerini mutlaka değiştir.

## Mimari

```
src/
  app/
    page.tsx                         one-page kariyer sitesi
    admin/                           giriş ve panel sayfaları
    api/applications                 public başvuru endpoint'i (multipart)
    api/admin/...                    korumalı liste / güncelle / sil / CV / CSV / login / logout
  components/                        Hero, HeroArt, BusinessLines, ApplicationForm, admin/...
  lib/
    auth.ts                          Web Crypto HMAC oturum (edge + node)
    storage.ts                       depolama katmanı
    positions.ts, types.ts           iş kolları, durumlar
  middleware.ts                      admin koruması
public/uber-kariyer-afis.svg         kampanya afişi
public/uber-kariyer-banner.svg       LinkedIn banner
```

**Depolama:** Case kapsamında bağımlılıksız olması için başvurular `data/applications.json`, CV'ler `data/cv/` altında tutuluyor (repoya girmez). `lib/storage.ts` tek bir arayüz sunduğundan, Vercel gibi sunucusuz ortamlarda aynı fonksiyonlar Postgres/Supabase + S3/Vercel Blob ile değiştirilebilir.

## Tasarım

- Uber'in siyah-beyaz temel paleti; iş kollarına özel vurgu renkleri (Uber Base tasarım sisteminden): mavi `#276EF1`, yeşil `#06C167`, sarı `#FFC043`, mor `#7356BF`, turuncu `#FF6937`, kırmızı `#E11900`
- Tipografi: Inter (Uber Move'a yakın geometrik grotesk)
- Uber uygulamasındaki kare başlangıç / yuvarlak varış rota simgeleri, sayfanın görsel dilini oluşturuyor

## Kaynaklar

- Uber'in İstanbul'a 5 yılda 200 milyon dolarlık teknoloji merkezi yatırımı (Ekim 2025): [invest.gov.tr](https://www.invest.gov.tr/en/news/news-from-turkey/pages/uber-chooses-turkiye-for-global-tech-hub-to-drive-future-of-mobility-and-delivery-solutions.aspx)
- Uber'in Trendyol Go'nun %85'ini 700 milyon dolara alması (Mayıs 2025), 19.000 kurye ve 90.000+ işletme: [Daily Sabah](https://www.dailysabah.com/business/economy/uber-to-buy-majority-stake-in-turkiyes-trendyol-go-for-700-million), [Hürriyet Daily News](https://hurriyetdailynews.com/amp/uber-buys-85-percent-stake-in-trendyol-go-for-700-million-208897)
