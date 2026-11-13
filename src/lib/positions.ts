export type BusinessLine = {
  id: string;
  name: string;
  tag: string;
  description: string;
  roles: string[];
  accent: string;
};

export const BUSINESS_LINES: BusinessLine[] = [
  {
    id: "tech-hub",
    name: "Uber Tech Hub İstanbul",
    tag: "Teknoloji",
    description:
      "Uber'in ABD dışındaki dördüncü küresel teknoloji merkezi. Makine öğrenmesi, LLM entegrasyonu, gerçek zamanlı veri ve dağıtık sistemler üzerinde küresel ürünler geliştir.",
    roles: ["Yazılım Mühendisi", "Veri Bilimci", "Ürün Yöneticisi", "Ürün Tasarımcısı"],
    accent: "#276EF1",
  },
  {
    id: "uber-eats",
    name: "Trendyol Go by Uber Eats",
    tag: "Teslimat",
    description:
      "Türkiye genelinde 90.000'den fazla restoran ve market ile yemek ve market teslimatını yeniden tanımlıyoruz. Operasyon, iş geliştirme ve kurye partner fırsatları seni bekliyor.",
    roles: ["Şehir Operasyon Uzmanı", "Restoran İş Geliştirme", "Kurye Partner"],
    accent: "#06C167",
  },
  {
    id: "mobility",
    name: "Uber Mobility",
    tag: "Ulaşım",
    description:
      "Uber Taksi ile şehirde yolculuğu daha güvenli ve kolay hale getiriyoruz. Saha operasyonu, sürücü deneyimi ve partner rolleri için ekibimize katıl.",
    roles: ["Sürücü Deneyimi Uzmanı", "Saha Operasyon", "Taksi Sürücü Partner"],
    accent: "#FFC043",
  },
  {
    id: "business",
    name: "Uber for Business",
    tag: "Kurumsal",
    description:
      "Şirketlerin çalışan ulaşımı, yemek ve teslimat ihtiyaçlarını tek platformda çözüyoruz. Kurumsal satış ve müşteri başarısı ekiplerinde yer al.",
    roles: ["Kurumsal Satış Yöneticisi", "Müşteri Başarı Uzmanı"],
    accent: "#7356BF",
  },
  {
    id: "ops-support",
    name: "Operasyon & Destek",
    tag: "Operasyon",
    description:
      "Kullanıcılarımızın, partnerlerimizin ve işletmelerin her an yanında olan ekip. Topluluk operasyonları, güven & güvenlik ve müşteri desteği.",
    roles: ["Topluluk Operasyonları", "Güven & Güvenlik", "Müşteri Destek Uzmanı"],
    accent: "#FF6937",
  },
  {
    id: "corporate",
    name: "Kurumsal Fonksiyonlar",
    tag: "Merkez",
    description:
      "Pazarlama, finans, hukuk, iletişim ve insan kaynakları ile Uber'in Türkiye büyümesine yön ver.",
    roles: ["Pazarlama Uzmanı", "Finans Analisti", "İK İş Ortağı", "Hukuk Müşaviri"],
    accent: "#E11900",
  },
];

export const CITIES = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Konya",
  "Kocaeli",
  "Diğer",
] as const;

/** Genel başvurular henüz bir ekibe yönlendirilmemiştir. */
export const GENERAL_LINE = "general";

export function businessLineName(id: string) {
  if (id === GENERAL_LINE) return "Yönlendirilmedi";
  return BUSINESS_LINES.find((b) => b.id === id)?.name ?? id;
}

export const NO_EXPERIENCE = "none";
export const EXPERIENCE_OPTIONS = [
  { id: NO_EXPERIENCE, label: "Deneyimim yok" },
  { id: "lt1", label: "1 yıldan az" },
  { id: "1-3", label: "1–3 yıl" },
  { id: "3-5", label: "3–5 yıl" },
  { id: "5-10", label: "5–10 yıl" },
  { id: "10+", label: "10 yıldan fazla" },
] as const;

export function experienceLabel(id?: string) {
  return EXPERIENCE_OPTIONS.find((e) => e.id === id)?.label ?? "Belirtilmedi";
}
