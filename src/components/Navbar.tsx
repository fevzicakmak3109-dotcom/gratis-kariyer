"use client";
import { useEffect, useState } from "react";
import { UberWordmark } from "./Logo";
import { Close, Menu } from "./icons";

const LINKS = [
  { href: "#is-kollari", label: "İş Kolları" },
  { href: "#neden-uber", label: "Neden Uber" },
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
    <header className={`sticky top-0 z-50 bg-black text-white transition-shadow ${scrolled ? "shadow-[0_1px_0_#282828]" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-baseline gap-3" aria-label="Uber Kariyer ana sayfa">
          <UberWordmark className="text-[28px] leading-none" />
          <span className="hidden text-[15px] font-medium text-uber-gray-400 sm:inline">Kariyer</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-[15px] font-medium text-white/90 transition hover:bg-uber-gray-800">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#basvuru" className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-uber-gray-100 sm:inline-flex">
            Hemen Başvur
          </a>
          <button
            className="grid size-10 place-items-center rounded-full hover:bg-uber-gray-800 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-black px-4 pb-8 md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-uber-gray-800 py-5 text-2xl font-semibold">
              {l.label}
            </a>
          ))}
          <a href="#basvuru" onClick={() => setOpen(false)} className="btn-light mt-auto w-full">
            Hemen Başvur
          </a>
        </div>
      )}
    </header>
  );
}
