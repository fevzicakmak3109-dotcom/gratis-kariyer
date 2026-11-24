# Reklam afişleri

"Deneyim şartı yok, ofise gitme şartı yok — Sadece sen." Gratis Çağrı Merkezi kampanyası. Her format **mor** (Gratis moru) ve **beyaz** temada üretilir; QR kod başvuru formuna gider.

| Dosya | Ölçü | Kullanım |
| --- | --- | --- |
| `instagram-kare-*.png` | 1080×1080 | Instagram / Facebook akış |
| `instagram-dikey-*.png` | 1080×1350 | Instagram 4:5 akış (en çok alan kaplayan) |
| `story-*.png` | 1080×1920 | Story, Reels, TikTok (üst/alt güvenli alan boş) |
| `linkedin-yatay-*.png` | 1200×628 | LinkedIn, X, Google görüntülü reklam |
| `baski-a4-*.pdf` | A4 | Baskı (vektörel PDF) |

Yeniden üretmek için (Google Chrome gerekir):

```bash
node reklam/olustur.mjs
```

Metinler, avantaj listesi ve formatlar `olustur.mjs` içinden değiştirilebilir. Sitenin alan adı değişirse `qr.svg` yeni adrese göre yeniden üretilmelidir.
