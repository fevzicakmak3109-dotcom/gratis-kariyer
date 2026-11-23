export const STATUSES = [
  { id: "new", label: "Yeni", color: "#276EF1" },
  { id: "reviewing", label: "İnceleniyor", color: "#FFC043" },
  { id: "interview", label: "Mülakat", color: "#7356BF" },
  { id: "offer", label: "Teklif", color: "#06C167" },
  { id: "rejected", label: "Olumsuz", color: "#E11900" },
] as const;

export type StatusId = (typeof STATUSES)[number]["id"];

export type Application = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** AVAILABILITY_OPTIONS id: ne kadar vakit ayırabildiği. */
  availability: string;
  role: string;
  city: string;
  linkedin?: string;
  message?: string;
  /** Deneyim süresi (EXPERIENCE_OPTIONS id). Eski kayıtlarda olmayabilir. */
  experience?: string;
  /** Deneyimi olmayan adaylar CV yüklemez. */
  cv: { originalName: string; storedName: string; size: number; mimeType: string } | null;
  status: StatusId;
  /** İK adayı aradı mı? Panelde telefon ikonuyla açılıp kapanır. */
  called?: boolean;
  /** İK: ikamet bilgisi kontrol edildi mi? */
  residence?: boolean;
  /** İK: hesap (kullanıcı/hesap açılışı) tamamlandı mı? */
  account?: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export function statusMeta(id: string) {
  return STATUSES.find((s) => s.id === id) ?? STATUSES[0];
}
