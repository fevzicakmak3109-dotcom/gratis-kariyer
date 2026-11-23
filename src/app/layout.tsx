import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const brand = Outfit({ subsets: ["latin", "latin-ext"], variable: "--font-brand", display: "swap" });

export const metadata: Metadata = {
  title: "Turkcell Kariyer | Çağrı Merkezi Müşteri Temsilcisi",
  description:
    "Turkcell Çağrı Merkezi müşteri temsilcisi arıyor. Deneyimli ya da deneyimsiz, yeter ki vakit ayırabil: evden çalış, düzenli kazan, Turkcell'de sıfırdan kariyerine başla.",
  openGraph: {
    title: "Turkcell Çağrı Merkezi'nde kariyerin burada başlıyor",
    description: "Deneyim şartı yok, evden çalışma fırsatı. Hemen başvur. #senyapdiye",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#2855AC", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={brand.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
