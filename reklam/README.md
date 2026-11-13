# Reklam afişleri

"Mezuniyet şartı yok, deneyim şartı yok — Sadece sen." kampanyası. Her format siyah ve beyaz temada üretilir; QR kod başvuru formuna (`uber-kariyer.vercel.app/#basvuru`) gider.

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

Sektör listesi, metinler ve formatlar `olustur.mjs` içinden değiştirilebilir.
