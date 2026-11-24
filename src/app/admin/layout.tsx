import type { Metadata } from "next";

export const metadata: Metadata = { title: "İşe Alım Paneli | Gratis Kariyer", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-brand-gray-50">{children}</div>;
}
