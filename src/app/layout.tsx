import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const brand = Figtree({ subsets: ["latin", "latin-ext"], variable: "--font-brand", display: "swap" });

export const metadata: Metadata = {
  title: "Gratis Kariyer | Çağrı Merkezi Müşteri Temsilcisi",
  description:
    "Gratis Çağrı Merkezi müşteri temsilcisi arıyor. Deneyimli ya da deneyimsiz, yeter ki vakit ayırabil: evden çalış, düzenli kazan, Gratis'te sıfırdan kariyerine başla.",
  openGraph: {
    title: "Gratis Çağrı Merkezi'nde kariyerin burada başlıyor",
    description: "Deneyim şartı yok, evden çalışma fırsatı. Hemen başvur. İşin gücün güzellik olsun!",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#851F8F", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={brand.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
