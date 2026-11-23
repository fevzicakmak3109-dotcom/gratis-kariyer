"use client";
import { useEffect, useState } from "react";
import { TurkcellLogo } from "./Logo";
import { Close, Menu } from "./icons";

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
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[box-shadow,border-color] ${
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
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-white px-4 pb-8 sm:top-[72px] lg:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-tc-gray-100 py-5 text-2xl font-semibold">
              {l.label}
            </a>
          ))}
          <a href="#basvuru" onClick={() => setOpen(false)} className="btn-primary mt-auto w-full py-4">
            Hemen Başvur
          </a>
        </div>
      )}
    </header>
  );
}
