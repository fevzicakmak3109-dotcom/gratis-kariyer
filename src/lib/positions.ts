/** Bu sitede tek bir pozisyon için başvuru alınıyor. */
export const ROLE = "Çağrı Merkezi Müşteri Temsilcisi";

export const CITIES = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Konya",
  "Kocaeli",
  "Gaziantep",
  "Kayseri",
  "Mersin",
  "Samsun",
  "Eskişehir",
  "Diyarbakır",
  "Trabzon",
  "Diğer",
] as const;

/** "Ne kadar vakit ayırabilirsin?" sorusunun seçenekleri. */
export const AVAILABILITY_OPTIONS = [
  { id: "full", label: "Tam zamanlı", hint: "Haftada 45 saat", color: "#2855AC" },
  { id: "part", label: "Yarı zamanlı", hint: "Günde 4–6 saat", color: "#FFC900" },
  { id: "weekend", label: "Hafta sonu", hint: "Cumartesi – Pazar", color: "#12B76A" },
  { id: "flex", label: "Esnek", hint: "Vardiyama göre", color: "#8E9FAD" },
] as const;

export function availabilityLabel(id?: string) {
  return AVAILABILITY_OPTIONS.find((a) => a.id === id)?.label ?? "Belirtilmedi";
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

/** CV yükleme alanı. Şimdilik kapalı; tekrar açmak için true yapman yeterli
 *  (form, sunucu doğrulaması, metinler ve admin paneli buna göre değişir). */
export const CV_UPLOAD_ENABLED = false;
