import { listApplications } from "@/lib/storage";
import { businessLineName } from "@/lib/positions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cell = (v: unknown) => {
  let s = String(v ?? "");
  if (/^[=+\-@]/.test(s)) s = "'" + s; // CSV formül enjeksiyonuna karşı
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  const items = await listApplications();
  const header = ["Tarih", "Ad", "Soyad", "E-posta", "Telefon", "Yönlendirilen Ekip", "Başvuru", "Şehir", "LinkedIn", "Not"];
  const rows = items.map((a) =>
    [
      new Date(a.createdAt).toLocaleString("tr-TR"),
      a.firstName,
      a.lastName,
      a.email,
      a.phone,
      businessLineName(a.businessLine),
      a.role,
      a.city,
      a.linkedin ?? "",
      a.notes,
    ].map(cell).join(";"),
  );
  const csv = "﻿" + [header.map(cell).join(";"), ...rows].join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="uber-basvurular-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
