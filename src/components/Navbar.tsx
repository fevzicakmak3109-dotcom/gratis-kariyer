"use client";
import { useEffect, useState } from "react";
import { TurkcellLogo } from "./Logo";
import { ArrowRight, Close, Headset, Menu } from "./icons";

const LINKS = [
  { href: "#pozisyon", label: "Pozisyon" },
  { href: "#neden-turkcell", label: "Neden Turkcell" },
  { href: "#kariyer", label: "Kariyer Yolu" },
  { href: "#surec", label: "Süreç" },
  { href: "#sss", label: "SSS" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-[box-shadow,border-color] ${open ? "bg-white" : "bg-white/90"} ${
        scrolled ? "border-tc-gray-100 shadow-[0_6px_24px_-12px_rgba(37,51,66,0.25)]" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <a href="#" aria-label="Turkcell Kariyer ana sayfa" className="shrink-0">
          <TurkcellLogo className="w-[178px] sm:w-[206px]" />
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-[15px] font-medium text-tc-navy/80 transition hover:bg-tc-gray-100 hover:text-tc-navy">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#basvuru" className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex">
            Hemen Başvur
          </a>
          <button
            className="grid size-10 place-items-center rounded-full text-tc-navy hover:bg-tc-gray-100 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>
    </header>

      {/* Mobil menü: header'ın dışında, çünkü header'daki backdrop-blur fixed öğeleri header'a hapsediyor */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-[45] overflow-y-auto bg-white sm:top-[72px] lg:hidden">
          <div className="hex pointer-events-none absolute -bottom-24 -right-24 size-72 bg-tc-blue-50" aria-hidden />
          <div className="hex pointer-events-none absolute bottom-40 right-8 size-14 animate-float bg-tc-yellow" aria-hidden />
          <nav className="relative flex min-h-full flex-col px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-2">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex animate-[fadeUp_.35s_ease-out_both] items-center justify-between border-b border-tc-gray-100 py-5 text-2xl font-semibold text-tc-navy active:text-tc-blue"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {l.label}
                <ArrowRight className="size-5 text-tc-gray-400" />
              </a>
            ))}
            <div className="mt-8 flex animate-[fadeUp_.35s_.25s_ease-out_both] items-center gap-3 rounded-2xl bg-tc-blue-50 p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-tc-yellow text-tc-navy"><Headset className="size-5" /></span>
              <p className="text-sm leading-snug text-tc-gray-600">
                <strong className="block text-[15px] text-tc-navy">Çağrı Merkezi Müşteri Temsilcisi</strong>
                Deneyim şartı yok · Evden çalışma
              </p>
            </div>
            <a href="#basvuru" onClick={() => setOpen(false)} className="btn-primary mt-auto w-full animate-[fadeUp_.35s_.3s_ease-out_both] py-4 text-base">
              Hemen Başvur <ArrowRight className="size-5" />
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
