"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "./icons";

/** Mobilde ekranın altında sabit duran "Hemen başvur" butonu.
 *  Hero'daki "Hemen başvur" butonu ekrandayken gizlidir (iki buton üst üste görünmesin);
 *  kaydırıp o buton kaybolunca aşağıdan kayarak gelir, yukarı dönünce yine kayarak gider.
 *  Başvuru formu veya footer görünürken de gizlenir. */
export function MobileApplyButton() {
  const [heroCta, setHeroCta] = useState(true);
  const [nearForm, setNearForm] = useState(false);
  const hidden = heroCta || nearForm;

  useEffect(() => {
    const ios: IntersectionObserver[] = [];

    // Hero butonu: üstteki 64px'lik menü çubuğunun altında kalan kısım görünür sayılmaz.
    const cta = document.getElementById("hero-cta");
    if (cta) {
      const io = new IntersectionObserver(([e]) => setHeroCta(e.isIntersecting || e.boundingClientRect.top > window.innerHeight), {
        rootMargin: "-64px 0px 0px 0px",
      });
      io.observe(cta);
      ios.push(io);
    } else setHeroCta(false);

    const targets = [document.getElementById("basvuru"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => !!el,
    );
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setNearForm(visible.size > 0);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    ios.push(io);
    return () => ios.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      className={`fixed inset-x-4 z-40 transition-[transform,opacity] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] md:hidden ${
        hidden ? "pointer-events-none translate-y-[calc(100%+2rem)] opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      aria-hidden={hidden}
    >
      <a
        href="#basvuru"
        tabIndex={hidden ? -1 : 0}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-tc-yellow py-4 text-base font-bold text-tc-navy shadow-[0_12px_30px_-6px_rgba(37,51,66,0.45)] ring-1 ring-tc-yellow-600/40 transition active:scale-[0.98]"
      >
        Hemen başvur <ArrowRight className="size-5" />
      </a>
    </div>
  );
}
