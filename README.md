# Uber Türkiye Kariyer · İş Fırsatları Sayfası

Uber'in Türkiye'deki iş kolları için hazırlanmış, **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Supabase** ile yazılmış tek sayfalık (one-page) kariyer sitesi ve başvuruları takip etmek için **kullanıcı adı / şifre korumalı admin paneli**.

> Bu proje bir aday case çalışmasıdır; Uber'in resmi sitesi değildir.

## Özellikler

### Kariyer sayfası (`/`)
- **Hero banner**: İstanbul haritası, Boğaz, Uber'in kare başlangıç / yuvarlak varış rota dili ve iş kollarını anlatan hareketli kartlar
- **İş kolları**: Uber Tech Hub İstanbul, Trendyol Go by Uber Eats, Uber Mobility (Uber Taksi), Uber for Business, Operasyon & Destek, Kurumsal Fonksiyonlar tanıtılıyor. Aday iş kolu seçmiyor: **"Sen başvur, seni en uygun ekibe biz yönlendirelim."**
- **Kampanya afişi (1080×1350)**: SVG olarak tasarlandı (`public/uber-kariyer-afis.svg`)
- **Genel başvuru formu**: ad, soyad, e-posta, **cep telefonu** (05XX XXX XX XX maskesi), şehir, LinkedIn, ön yazı, **CV yükleme** (sürükle-bırak, PDF/DOC/DOCX, en fazla 5 MB), KVKK onayı
- İstemci ve sunucu tarafında doğrulama, dosya imzası (magic bytes) kontrolü, bot tuzağı (honeypot)
- Neden Uber, 4 adımlı başvuru süreci, SSS
- Mobil ve masaüstü için responsive, `prefers-reduced-motion` desteği

### Admin paneli (`/admin`)
- HMAC imzalı, `httpOnly` çerezle oturum; middleware ile `/admin` ve `/api/admin/*` korumalı
- **Canlı ziyaretçi sayacı** (sağ üst): ana sayfa açıkken tarayıcı 30 sn'de bir hafif bir sinyal gönderir; panel 15 sn'de bir son 75 sn'deki ziyaretçileri sayar. Kişisel veri tutulmaz, sekme arka plandayken sinyal durur.
- Özet kartları (toplam, yönlendirilmemiş, bugün, son 7 gün) ve ekiplere yönlendirme grafiği
- **Ekip yönlendirme**: genel başvuruyu CV'ye göre uygun iş koluna yönlendirme
- Arama ve ekip filtresi
- Her satırın solunda sıra numarası; sağında **Arandı / aranmadı** telefon düğmesi (yeşil = arandı, tek tıkla açılıp kapanır, veritabanında saklanır)
- Masaüstünde tablo, mobilde kart görünümü
- Başvuru detayı: tek tıkla arama / e-posta / WhatsApp, **CV önizleme ve indirme**, İK notları
- Tablodaki her satırın sağındaki ikonla, onay alarak başvuru ve CV silme
- **CSV dışa aktarma** (Excel uyumlu, Türkçe karakterli)

## Kurulum

```bash
npm install
cp .env.example .env.local   # Supabase ve admin bilgilerini gir
# supabase/schema.sql dosyasını Supabase SQL Editor'de bir kez çalıştır
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
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje adresi | – |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role anahtarı (gizli, yalnızca sunucuda) | – |
| `SUPABASE_CV_BUCKET` | CV'lerin tutulduğu private bucket | `uber-cvs` |
| `DATA_DIR` | Supabase tanımlı değilse kullanılan yerel klasör | `./data` |

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
    storage.ts                       depolama katmanı (Supabase / yerel dosya)
    positions.ts, types.ts           iş kolları, veri tipleri
  middleware.ts                      admin koruması
supabase/schema.sql                  tablo, indeks ve bucket kurulumu
public/uber-kariyer-afis.svg         kampanya afişi
```

**Veritabanı (Supabase):**
- Başvurular `fs_docs` tablosunda `uber_applications` koleksiyonunda JSONB belge olarak tutulur (`collection`, `id`, `data`).
- CV'ler private `uber-cvs` storage bucket'ındadır. Bucket herkese kapalıdır; CV'ler yalnızca giriş yapmış admin üzerinden, sunucu aracılığıyla açılır.
- Tabloda RLS açıktır, `anon` / `authenticated` rollerinin erişimi yoktur. Uygulama tüm işlemleri sunucuda service role anahtarıyla yapar; anahtar tarayıcıya gönderilmez.
- Kurulum SQL'i: [`supabase/schema.sql`](supabase/schema.sql)
- Supabase değişkenleri tanımlı değilse `lib/storage.ts` otomatik olarak yerel `data/` klasörüne geçer (geliştirme için).

Supabase panelinde başvuruları görmek için: **Table Editor → fs_docs**, `collection = uber_applications` filtresi. CV'ler: **Storage → uber-cvs**.

## Tasarım

- Uber'in siyah-beyaz temel paleti; iş kollarına özel vurgu renkleri (Uber Base tasarım sisteminden): mavi `#276EF1`, yeşil `#06C167`, sarı `#FFC043`, mor `#7356BF`, turuncu `#FF6937`, kırmızı `#E11900`
- Tipografi: Inter (Uber Move'a yakın geometrik grotesk)
- Uber uygulamasındaki kare başlangıç / yuvarlak varış rota simgeleri, sayfanın görsel dilini oluşturuyor

## Kaynaklar

- Uber'in İstanbul'a 5 yılda 200 milyon dolarlık teknoloji merkezi yatırımı (Ekim 2025): [invest.gov.tr](https://www.invest.gov.tr/en/news/news-from-turkey/pages/uber-chooses-turkiye-for-global-tech-hub-to-drive-future-of-mobility-and-delivery-solutions.aspx)
- Uber'in Trendyol Go'nun %85'ini 700 milyon dolara alması (Mayıs 2025), 19.000 kurye ve 90.000+ işletme: [Daily Sabah](https://www.dailysabah.com/business/economy/uber-to-buy-majority-stake-in-turkiyes-trendyol-go-for-700-million), [Hürriyet Daily News](https://hurriyetdailynews.com/amp/uber-buys-85-percent-stake-in-trendyol-go-for-700-million-208897)
