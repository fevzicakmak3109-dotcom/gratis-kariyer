"use client";
import { useEffect, useRef, useState } from "react";
import { Award, Headset, Star, Users } from "./icons";

const STEPS = [
  { icon: Headset, title: "Müşteri Temsilcisi", text: "Eğitimini tamamla, ilk çağrını al. Turkcell'in sesi ol." },
  { icon: Star, title: "Kıdemli Temsilci", text: "Deneyim kazan, zor vakaları çöz, yeni arkadaşlarına mentorluk yap." },
  { icon: Users, title: "Takım Lideri", text: "Kendi ekibini yönet, performansı ve motivasyonu birlikte büyüt." },
  { icon: Award, title: "Süpervizör & Uzman", text: "Kalite, eğitim ya da operasyon yönetiminde uzmanlaş." },
];

export function CareerPath() {
  const ref = useRef<HTMLOListElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { rootMargin: "0px 0px -20% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="kariyer" className="relative scroll-mt-20 overflow-hidden bg-tc-navy py-20 text-white sm:py-28">
      <svg className="pointer-events-none absolute -right-20 -top-20 w-[420px] text-white/[0.04]" viewBox="0 0 100 100" aria-hidden>
        <path d="M25 3h50l23 47-23 47H25L2 50z" fill="currentColor" />
      </svg>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-tc-yellow">Kariyer yolu</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Sıfırdan başla, adım adım yüksel.</h2>
          <p className="mt-4 text-lg text-white/70">
            Turkcell&apos;de çağrı merkezi bir başlangıç noktası. Performansın ve isteğinle önün hep açık.
          </p>
        </div>

        <ol ref={ref} className="relative mt-14 grid gap-6 md:grid-cols-4 md:gap-5">
          {/* ilerleme çizgisi: mobilde dikey, masaüstünde yatay */}
          <span className="absolute bottom-7 left-[26px] top-7 w-1 rounded-full bg-white/10 md:hidden" aria-hidden />
          <span className="absolute bottom-7 left-[26px] top-7 w-1 origin-top rounded-full bg-tc-yellow transition-transform duration-[1600ms] ease-out md:hidden" style={{ transform: on ? "scaleY(1)" : "scaleY(0)" }} aria-hidden />
          <span className="absolute left-7 right-7 top-[26px] hidden h-1 rounded-full bg-white/10 md:block" aria-hidden />
          <span className="absolute left-7 right-7 top-[26px] hidden h-1 origin-left rounded-full bg-tc-yellow transition-transform duration-[1600ms] ease-out md:block" style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }} aria-hidden />
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="relative flex gap-5 transition-all duration-700 md:block"
              style={{ transitionDelay: `${300 + i * 300}ms`, opacity: on ? 1 : 0, transform: on ? "none" : "translateY(16px)" }}
            >
              <span className={`hex relative z-10 grid size-14 shrink-0 place-items-center ${i === 0 ? "bg-tc-yellow text-tc-navy" : "bg-tc-blue text-white"}`}>
                <s.icon className="size-6" />
              </span>
              <div className="md:mt-6">
                <span className="text-sm font-semibold text-tc-yellow">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
