// Demo verisi: admin panelini örnek çağrı merkezi başvurularıyla doldurur.  Kullanım: npm run seed
// .env.local içinde Supabase bilgileri varsa Supabase'e (fs_docs / turkcell_applications), yoksa data/ klasörüne yazar.
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";

try { process.loadEnvFile(".env.local"); } catch {}

const ascii = (s) => s.toLowerCase().replace(/ı/g, "i").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ğ/g, "g").replace(/i̇/g, "i");

// ad, soyad, şehir, vakit, deneyim, not
const people = [
  ["Zeynep", "Arslan", "İstanbul", "full", "none", "Üniversite mezunuyum, iletişimim güçlü."],
  ["Emre", "Yılmaz", "Ankara", "part", "1-3", "Daha önce bir e-ticaret firmasında müşteri hizmetlerinde çalıştım."],
  ["Elif", "Demir", "İzmir", "weekend", "none", ""],
  ["Burak", "Kaya", "Bursa", "full", "3-5", "Çağrı merkezinde 4 yıl deneyimim var."],
  ["Merve", "Çelik", "Konya", "flex", "lt1", "Öğrenciyim, akşamları ve hafta sonları müsaitim."],
  ["Can", "Öztürk", "Trabzon", "full", "none", ""],
];

const items = people.map(([fn, ln, city, availability, experience, msg], i) => {
  const created = new Date(Date.now() - i * 0.9 * 864e5).toISOString();
  return {
    id: randomUUID(), firstName: fn, lastName: ln,
    email: `${ascii(fn)}.${ascii(ln)}@example.com`,
    phone: `+90 5${30 + i} ${100 + i * 7} ${10 + i} ${20 + i}`,
    availability, role: "Çağrı Merkezi Müşteri Temsilcisi", city, experience,
    ...(msg ? { message: msg } : {}),
    cv: null, status: "new", called: i % 3 === 1, notes: "",
    createdAt: created, updatedAt: created,
  };
});

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (url && key) {
  const sb = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await sb.from("fs_docs").insert(items.map((a) => ({ collection: "turkcell_applications", id: a.id, data: a })));
  if (error) throw error;
  console.log(`${items.length} demo başvuru Supabase'e eklendi (fs_docs / turkcell_applications).`);
} else {
  const DATA = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
  await fs.mkdir(DATA, { recursive: true });
  const file = path.join(DATA, "applications.json");
  const existing = JSON.parse(await fs.readFile(file, "utf8").catch(() => "[]"));
  await fs.writeFile(file, JSON.stringify([...existing, ...items], null, 2));
  console.log(`${items.length} demo başvuru eklendi → ${file}`);
}
