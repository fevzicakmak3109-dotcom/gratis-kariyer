// Demo verisi: admin panelini örnek başvurularla doldurur.  Kullanım: npm run seed
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DATA = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const CV = path.join(DATA, "cv");
await fs.mkdir(CV, { recursive: true });

function pdf(text) {
  const stream = `BT /F1 20 Tf 72 720 Td (${text}) Tj ET`;
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let out = "%PDF-1.4\n";
  const offs = [];
  objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const x = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offs.map((o) => String(o).padStart(10, "0") + " 00000 n \n").join("");
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${x}\n%%EOF`;
  return Buffer.from(out, "latin1");
}

const people = [
  ["Elif", "Yıldız", "tech-hub", "Yazılım Mühendisi", "İstanbul", "interview", "Go ve dağıtık sistemlerde 5 yıl deneyim."],
  ["Mert", "Kaya", "uber-eats", "Şehir Operasyon Uzmanı", "Ankara", "new", ""],
  ["Zeynep", "Demir", "tech-hub", "Veri Bilimci", "İstanbul", "reviewing", "Talep tahmini ve fiyatlandırma modelleri üzerinde çalıştım."],
  ["Can", "Şahin", "mobility", "Taksi Sürücü Partner", "İzmir", "new", ""],
  ["Ayşe", "Çelik", "business", "Kurumsal Satış Yöneticisi", "İstanbul", "offer", "B2B SaaS satışında 7 yıl."],
  ["Burak", "Öztürk", "ops-support", "Güven & Güvenlik", "Bursa", "rejected", ""],
  ["Selin", "Arslan", "corporate", "Pazarlama Uzmanı", "İstanbul", "new", "Yemek teslimat sektöründe marka iletişimi."],
  ["Emre", "Koç", "uber-eats", "Kurye Partner", "Antalya", "reviewing", ""],
];

const items = people.map(([fn, ln, line, role, city, status, msg], i) => {
  const id = randomUUID();
  const created = new Date(Date.now() - i * 1.3 * 864e5).toISOString();
  return {
    id, firstName: fn, lastName: ln,
    email: `${fn}.${ln}`.toLowerCase().replace(/ı/g, "i").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ğ/g, "g") + "@example.com",
    phone: `+90 5${30 + i} ${100 + i * 7} ${10 + i} ${20 + i}`,
    businessLine: line, role, city,
    linkedin: i % 2 ? undefined : `https://linkedin.com/in/demo-${i}`,
    message: msg || undefined,
    cv: { originalName: `${fn}_${ln}_CV.pdf`, storedName: `${id}.pdf`, size: 0, mimeType: "application/pdf" },
    status, notes: status === "interview" ? "Teknik mülakat 18 Kasım 14:00." : "",
    createdAt: created, updatedAt: created,
  };
});

for (const a of items) {
  const buf = pdf(`${a.firstName} ${a.lastName} - Demo CV`.normalize("NFD").replace(/[^\x20-\x7e]/g, ""));
  a.cv.size = buf.length;
  await fs.writeFile(path.join(CV, a.cv.storedName), buf);
}
const file = path.join(DATA, "applications.json");
const existing = JSON.parse(await fs.readFile(file, "utf8").catch(() => "[]"));
await fs.writeFile(file, JSON.stringify([...existing, ...items], null, 2));
console.log(`${items.length} demo başvuru eklendi → ${file}`);
