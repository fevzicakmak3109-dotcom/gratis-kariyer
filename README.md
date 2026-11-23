# Turkcell Kariyer · Çağrı Merkezi Müşteri Temsilcisi

Turkcell Çağrı Merkezi'ne **müşteri temsilcisi** alımı için hazırlanmış, **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Supabase** ile yazılmış tek sayfalık kariyer sitesi ve kullanıcı adı / şifreli işe alım paneli.

> Bu proje bir aday case çalışmasıdır; Turkcell'in resmi sitesi değildir.

Ana mesaj: **Deneyimli ya da deneyimsiz, yeter ki vakit ayırabil. Evden çalış, Turkcell'de sıfırdan kariyerine başla.** `#senyapdiye`

## Özellikler

### Kariyer sitesi (`/`)
- **Turkcell görsel dili**: [kariyerim.turkcell.com.tr](https://kariyerim.turkcell.com.tr) referans alındı. Lacivert `#253342`, Turkcell mavisi `#2855AC`, sarı `#FFC900`; yuvarlatılmış altıgenler, sarı hap butonlar, Kariyerim logosu
- **Hero – canlı çağrı animasyonu**: döngüsel olarak çağrı çalar (genişleyen halkalar, titreyen telefon), cevaplanır (ses dalgası, sayaç, sırayla gelen sohbet balonları) ve "Çözüldü" ile biter. Değişen kelime ("Evinden bağlan / kazan / büyü"), sayan istatistikler
- **Pozisyon**: ne yapacaksın, kimleri arıyoruz, evden çalışmak için gerekenler
- **Neden Turkcell**: Kariyerim'deki "Gelecek Burada" kartlarından esinlenen altıgen kartlar
- **Dönen altıgen slayt**: Kariyerim'deki slaytın çağrı merkezi uyarlaması (otomatik geçiş, kaydırma ile değiştirme, nokta göstergesi)
- **Kariyer yolu**: Müşteri Temsilcisi → Kıdemli Temsilci → Takım Lideri → Süpervizör; kaydırınca dolan ilerleme çizgisi
- **Başvuru süreci**, **SSS**, kaydırınca beliren bölümler
- **Başvuru formu – "Kariyerin burada başlıyor"**: ad, soyad, e-posta, **cep telefonu (TR maskesi)**, şehir, LinkedIn (isteğe bağlı), **ne kadar vakit ayırabilirsin** (tam / yarı zamanlı / hafta sonu / esnek), **deneyim** (deneyimsiz de olur), not, KVKK onayı; doluluk yüzdesi gösteren ilerleme çubuğu
- CV yükleme altyapısı hazır ama kapalı (`src/lib/positions.ts` → `CV_UPLOAD_ENABLED`)
- Mobilde ekranın altında sabit sarı "Hemen başvur" butonu
- `prefers-reduced-motion` açıksa animasyonlar kapanır

### İşe alım paneli (`/admin`)
- HMAC imzalı, `httpOnly` çerezle oturum; middleware ile `/admin` ve `/api/admin/*` korumalı
- **Canlı ziyaretçi sayacı** (sağ üst)
- Özet kartları: toplam, **aranmayı bekleyen**, bugün, son 7 gün
- **Vakit ayırma tercihi** ve **deneyim** dağılımı grafikleri (tıklayınca filtreler)
- Arama; vakit tercihi ve arandı / aranmadı filtreleri
- Her satırın solunda sıra numarası (ilk başvuran 1); sağında **arandı / aranmadı** telefon düğmesi ve onaylı silme
- Başvuru detayı: tek tıkla arama / e-posta / WhatsApp, aday bilgileri, İK notları
- **CSV dışa aktarma** (Excel uyumlu, Türkçe karakterli)
- Masaüstünde tablo, mobilde kart görünümü

## Kurulum

```bash
npm install
cp .env.example .env.local   # Supabase ve admin bilgilerini gir
# supabase/schema.sql dosyasını Supabase SQL Editor'de bir kez çalıştır
npm run seed                 # (isteğe bağlı) panele 6 demo başvuru ekler
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

| Değişken | Açıklama | Varsayılan |
| --- | --- | --- |
| `ADMIN_USERNAME` | Admin kullanıcı adı | `admin` |
| `ADMIN_PASSWORD` | Admin şifresi | `Turkcell2026!` |
| `ADMIN_SESSION_SECRET` | Oturum çerezini imzalayan gizli anahtar | geliştirme değeri |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje adresi | – |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role anahtarı (gizli, yalnızca sunucuda) | – |
| `SUPABASE_CV_BUCKET` | CV yükleme açılırsa kullanılacak private bucket | `turkcell-cvs` |
| `DATA_DIR` | Supabase tanımlı değilse kullanılan yerel klasör | `./data` |

> Canlıya alırken varsayılan şifreyi ve `ADMIN_SESSION_SECRET` değerini mutlaka değiştir.

## Mimari

```
src/
  app/
    page.tsx                         one-page kariyer sitesi
    admin/                           giriş ve panel sayfaları
    api/applications                 public başvuru endpoint'i
    api/presence                     canlı ziyaretçi sinyali
    api/admin/...                    korumalı liste / güncelle / sil / CSV / ziyaretçi / login / logout
  components/                        Hero, CallScene, HexSlider, WhyUs, CareerPath, ApplicationForm, admin/...
  lib/
    auth.ts                          Web Crypto HMAC oturum (edge + node)
    storage.ts                       depolama katmanı (Supabase / yerel dosya)
    presence.ts                      canlı ziyaretçi sayacı
    positions.ts, types.ts           pozisyon, seçenekler, veri tipleri
  middleware.ts                      admin koruması
supabase/schema.sql                  tablo ve indeks kurulumu
reklam/                              kampanya afişleri ve üretici script
```

## Supabase

- Başvurular `fs_docs` tablosunda `turkcell_applications` koleksiyonunda JSONB belge olarak tutulur (`collection`, `id`, `data`); canlı ziyaretçi sinyalleri `turkcell_presence` koleksiyonunda.
- Tabloya tarayıcıdan erişim kapalıdır (RLS); uygulama yalnızca sunucuda service role anahtarıyla erişir, anahtar tarayıcıya gönderilmez.
- Supabase panelinde başvuruları görmek için: **Table Editor → fs_docs**, `collection = turkcell_applications` filtresi.
