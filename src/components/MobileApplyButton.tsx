"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "./icons";

/** Mobilde ekranın altında sabit duran "Hemen başvur" butonu.
 *  Başvuru formu veya footer görünürken gizlenir (form zaten ekranda). */
export function MobileApplyButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
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
        setHidden(visible.size > 0);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-4 z-40 transition-all duration-300 md:hidden ${
        hidden ? "pointer-events-none translate-y-6 opacity-0" : "translate-y-0 opacity-100"
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
