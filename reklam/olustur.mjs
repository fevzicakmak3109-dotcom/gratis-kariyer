// Reklam afişlerini üretir: her format × her tema için HTML yazar ve
// headless Chrome ile PNG (ve A4 için PDF) çıktısı alır.
// Kullanım: node reklam/olustur.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(DIR, "cikti");
const HTML = path.join(DIR, ".html");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(HTML, { recursive: true });

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
// QR kod (qr.svg) başvuru formuna gider. Alan adı değişirse qr.svg yeniden üretilmeli.
const CTA_SUB = process.env.REKLAM_ALT ?? "2 dakikada başvur, seni arayalım";
const LOGO = `data:image/webp;base64,${fs.readFileSync(path.join(DIR, "..", "public", "gratis-logo.webp")).toString("base64")}`;
const QR = fs.readFileSync(path.join(DIR, "qr.svg"), "utf8");

// Afişte sıralanan avantajlar
const SECTORS = [
  ["Evden çalışma", "#851F8F"],
  ["Eğitim bizden", "#F7E200"],
  ["Esnek vardiya", "#E0129A"],
  ["Düzenli maaş", "#851F8F"],
  ["Prim fırsatı", "#F7E200"],
  ["Tam / yarı zamanlı", "#E0129A"],
  ["Kariyer basamakları", "#851F8F"],
  ["Hafta sonu seçeneği", "#F7E200"],
  ["Tüm Türkiye'den", "#E0129A"],
  ["Güçlü ekip", "#851F8F"],
  ["Gratis güvencesi", "#F7E200"],
  ["Sıfırdan başlangıç", "#E0129A"],
  ["Ücretli eğitim", "#851F8F"],
  ["Ekip liderliği yolu", "#F7E200"],
  ["Uzaktan destek", "#E0129A"],
  ["Gülümseten iş", "#851F8F"],
  ["Prim + maaş", "#F7E200"],
];

/** w,h: piksel. s: ölçek çarpanı (font/boşluklar). layout: dikey ya da yatay. */
const FORMATS = [
  { id: "instagram-kare", w: 1080, h: 1080, s: 0.74, layout: "v", sectors: 10 },
  { id: "instagram-dikey", w: 1080, h: 1350, s: 0.9, layout: "v", sectors: 12 },
  { id: "story", w: 1080, h: 1920, s: 1, layout: "v", sectors: 17, safe: true },
  { id: "linkedin-yatay", w: 1200, h: 628, s: 0.62, layout: "h", sectors: 12 },
];

const THEMES = {
  mor: { bg: "linear-gradient(155deg,#A242A4 0%,#851F8F 45%,#4A0E6F 100%)", fg: "#fff", muted: "rgba(255,255,255,0.75)", strike: "rgba(255,255,255,0.42)", chip: "rgba(255,255,255,0.12)", chipBorder: "rgba(255,255,255,0.2)", ctaBg: "#F7E200", ctaFg: "#4A0E6F", logo: "brightness(0) invert(1)", hex: "rgba(255,255,255,0.07)" },
  beyaz: { bg: "#fff", fg: "#4A0E6F", muted: "#6B5C73", strike: "#D2C3D6", chip: "#FBF8FB", chipBorder: "#EDE3EE", ctaBg: "#851F8F", ctaFg: "#fff", logo: "none", hex: "#F7EDF6" },
};

function page({ w, h, s, layout, sectors, safe }, t, print = false) {
  const px = (n) => `${Math.round(n * s)}px`;
  const list = SECTORS.slice(0, sectors);
  const chips =
    list.map(([n, c]) => `<li><i style="background:${t.fg === "#fff" && c === "#851F8F" ? "#E7C3E8" : c}"></i>${n}</li>`).join("") +
    `<li class="you">#İşinGücünGüzellik</li>`;

  const headline = `
    <h1>
      <span class="x">Deneyim şartı</span>
      <span class="x">Ofise gitme şartı</span>
      <span>Sadece sen<b>.</b></span>
    </h1>`;

  const sub = `<p class="sub"><strong>Gratis Çağrı Merkezi</strong> müşteri temsilcisi arıyor. Deneyimli ya da deneyimsiz,
    yeter ki vakit ayırabil: evinden çalış, Gratis'te <strong>sıfırdan kariyerine</strong> başla.</p>`;

  const sectorsBlock = `
    <div class="sectors">
      <p class="label">Seni neler bekliyor?</p>
      <ul>${chips}</ul>
    </div>`;

  const cta = `
    <div class="cta">
      <div>
        <p class="cta-t">Hemen başvur <span>→</span></p>
        <p class="cta-u">${CTA_SUB}</p>
      </div>
      <div class="qr">${QR}</div>
    </div>`;

  const top = `
    <header>
      <img class="logo" src="${LOGO}" alt="Gratis Kariyer">
      <span class="pill"><i></i>Çağrı Merkezi · Başvurular açık</span>
    </header>`;

  const body =
    layout === "h"
      ? `${top}<main class="h"><section class="left">${headline}${sub}</section><section class="right">${sectorsBlock}${cta}</section></main>`
      : `${top}<main class="v">${headline}${sub}${sectorsBlock}</main>${cta}`;

  const size = print ? `@page{size:210mm 297mm;margin:0} html,body{width:210mm;height:297mm}` : `html,body{width:${w}px;height:${h}px}`;

  return `<!doctype html><html lang="tr"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=block" rel="stylesheet">
<style>
${size}
*{box-sizing:border-box;margin:0;padding:0}
body{background:${t.bg};color:${t.fg};font-family:Figtree,system-ui,sans-serif;overflow:hidden;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.wrap{position:relative;width:100%;height:100%;display:flex;flex-direction:column;
  padding:${safe ? `${px(230)} ${px(80)} ${px(250)}` : `${px(72)} ${px(80)}`}}
header{display:flex;align-items:center;justify-content:space-between;position:relative}
.logo{width:${px(150)};height:auto}
.pill{display:inline-flex;align-items:center;gap:${px(12)};font-size:${px(24)};font-weight:500;padding:${px(12)} ${px(22)};border-radius:999px;background:${t.chip};border:1px solid ${t.chipBorder}}
.pill i{width:${px(12)};height:${px(12)};border-radius:50%;background:#F7E200}
main{position:relative;flex:1;display:flex;flex-direction:column;margin:${px(56)} 0}
main.v{justify-content:center;gap:${px(44)}}
main.h{flex-direction:row;align-items:center;gap:${px(70)}}
main.h .left{flex:1.05}
main.h .right{flex:1;display:flex;flex-direction:column;gap:${px(34)}}
h1{font-weight:800;font-size:${px(118)};line-height:0.98;letter-spacing:-0.05em;display:flex;flex-direction:column}
h1 span{display:block;width:fit-content}
h1 .x{position:relative;color:${t.strike}}
h1 .x::after{content:"";position:absolute;left:-2%;right:-2%;top:52%;height:${px(12)};background:#F7E200;border-radius:${px(6)};transform:rotate(-2deg)}
h1 b{color:#F7E200}
.sub{font-size:${px(32)};line-height:1.4;color:${t.muted};max-width:${px(860)};${layout === "h" ? `margin-top:${px(34)}` : ""}}
.sub strong{color:${t.fg};font-weight:600}
.label{font-size:${px(22)};font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${t.muted};margin-bottom:${px(20)}}
.sectors ul{list-style:none;display:flex;flex-wrap:wrap;gap:${px(12)}}
.sectors li{display:inline-flex;align-items:center;gap:${px(12)};font-size:${px(27)};font-weight:500;padding:${px(13)} ${px(22)};border-radius:999px;background:${t.chip};border:1px solid ${t.chipBorder};white-space:nowrap}
.sectors li i{width:${px(12)};height:${px(12)};border-radius:50%;flex:none}
.sectors li.you{background:#F7E200;border-color:#F7E200;color:#4A0E6F;font-weight:700}
.cta{position:relative;display:flex;align-items:center;justify-content:space-between;gap:${px(30)};background:${t.ctaBg};color:${t.ctaFg};border-radius:${px(28)};padding:${px(26)} ${px(26)} ${px(26)} ${px(44)}}
.cta-t{font-size:${px(46)};font-weight:700;letter-spacing:-0.03em}
.cta-t span{color:${t.ctaFg === "#fff" ? "#F7E200" : "#851F8F"}}
.cta-u{margin-top:${px(6)};font-size:${px(26)};font-weight:500;opacity:0.65}
.qr{width:${px(150)};height:${px(150)};flex:none;background:#fff;border-radius:${px(16)};padding:${px(12)}}
.qr svg{width:100%;height:100%;display:block}
.bghex{position:absolute;right:${px(-120)};top:${px(layout === "h" ? -60 : 140)};width:${px(560)};height:${px(560)};background:${t.hex};clip-path:polygon(25% 3%,75% 3%,98% 50%,75% 97%,25% 97%,2% 50%)}
</style></head><body><div class="wrap">
<div class="bghex"></div>
${body}
</div></body></html>`;
}

function shoot(file, out, w, h) {
  execFileSync(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
    "--force-device-scale-factor=1", `--window-size=${w},${h}`,
    "--virtual-time-budget=8000", `--screenshot=${out}`, `file://${file}`,
  ], { stdio: "ignore" });
}

const only = process.argv[2];
for (const [tname, t] of Object.entries(THEMES)) {
  for (const f of FORMATS) {
    const name = `${f.id}-${tname}`;
    if (only && !name.includes(only)) continue;
    const file = path.join(HTML, `${name}.html`);
    fs.writeFileSync(file, page(f, t));
    shoot(file, path.join(OUT, `${name}.png`), f.w, f.h);
    console.log("✓", `${name}.png`, `${f.w}×${f.h}`);
  }
  // Baskı: A4 PDF (dikey düzen, 1080×1528 tasarım ölçüsü ≈ A4 oranı)
  const a4 = { w: 1080, h: 1528, s: 0.96, layout: "v", sectors: 17 };
  const name = `baski-a4-${tname}`;
  if (only && !name.includes(only)) continue;
  const file = path.join(HTML, `${name}.html`);
  fs.writeFileSync(file, page(a4, t).replace("<style>", "<style>@page{size:210mm 297mm;margin:0}@media print{html{zoom:0.7346}}"));
  execFileSync(CHROME, [
    "--headless=new", "--disable-gpu", "--no-first-run", "--virtual-time-budget=8000",
    "--no-pdf-header-footer", `--print-to-pdf=${path.join(OUT, `${name}.pdf`)}`, `file://${file}`,
  ], { stdio: "ignore" });
  shoot(file, path.join(OUT, `${name}.png`), a4.w, a4.h);
  console.log("✓", `${name}.pdf + .png`);
}
