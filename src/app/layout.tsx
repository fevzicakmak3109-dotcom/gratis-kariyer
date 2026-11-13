import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Uber Türkiye Kariyer | Yola birlikte çıkalım",
  description:
    "Uber Türkiye'de iş fırsatları: Uber Tech Hub İstanbul, Trendyol Go by Uber Eats, Uber Mobility, Uber for Business ve daha fazlası. Hemen başvur.",
  openGraph: {
    title: "Uber Türkiye Kariyer",
    description: "Türkiye'de geleceği birlikte hareket ettirelim. Hemen başvur.",
    images: ["/uber-kariyer-afis.svg"],
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
