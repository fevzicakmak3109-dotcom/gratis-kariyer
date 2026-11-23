"use client";
import { useEffect, useRef, useState } from "react";
import { CallScene } from "./CallScene";
import { ArrowRight, Phone } from "./icons";

const WORDS = ["bağlan", "kazan", "büyü"];

/** Ekrana girince 0'dan hedefe sayan sayı. */
function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || to === 0) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1200);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className="tabular-nums">{prefix}{v}{suffix}</span>;
}

export function Hero() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setW((x) => (x + 1) % WORDS.length), 2200);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(90%_70%_at_85%_10%,#eef3fc_0%,#ffffff_60%)]">
      {/* arka plan altıgen deseni */}
      <svg className="pointer-events-none absolute -left-24 top-24 hidden w-[420px] text-tc-gray-100 lg:block" viewBox="0 0 200 200" aria-hidden>
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
          <path key={`${r}${c}`} transform={`translate(${c * 60 + (r % 2) * 30} ${r * 52})`} d="M15 0h30l15 26-15 26H15L0 26z" fill="none" stroke="currentColor" strokeWidth="2" />
        )))}
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-8 lg:pb-24 lg:pt-16">
        <div>
          <span className="inline-flex animate-[fadeUp_.6s_ease-out_both] items-center gap-2.5 rounded-full border border-tc-gray-100 bg-white py-1.5 pl-1.5 pr-4 text-[13px] font-semibold shadow-sm sm:text-sm">
            <span className="grid size-7 animate-shake place-items-center rounded-full bg-tc-yellow text-tc-navy"><Phone className="size-4" /></span>
            Turkcell Çağrı Merkezi · Başvurular açık
          </span>

          <h1 className="mt-6 text-[44px] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[68px]">
            <span className="block animate-[fadeUp_.7s_.05s_ease-out_both]">
              Evinden{" "}
              <span className="relative inline-block text-tc-blue">
                <span key={w} className="inline-block animate-[wordIn_.5s_cubic-bezier(.2,.8,.2,1)_both]">{WORDS[w]}</span>
                <svg className="absolute -bottom-2 left-0 w-full text-tc-yellow" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 9 C 60 2, 140 2, 198 7" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </span>
            <span className="block animate-[fadeUp_.7s_.15s_ease-out_both]">Turkcell&apos;de kariyerine</span>
            <span className="block animate-[fadeUp_.7s_.25s_ease-out_both]">sıfırdan başla<span className="text-tc-yellow">.</span></span>
          </h1>

          <p className="mt-6 max-w-xl animate-[fadeUp_.7s_.35s_ease-out_both] text-lg leading-relaxed text-tc-gray-600">
            Turkcell Çağrı Merkezi <strong className="font-semibold text-tc-navy">müşteri temsilcisi</strong> arıyor.
            Deneyimli ya da deneyimsiz fark etmez, <strong className="font-semibold text-tc-navy">yeter ki vakit ayırabil</strong>.
            Eğitimini biz veriyoruz; sen evinin konforunda bağlan, kazan ve büyü.
          </p>

          <div className="mt-8 flex animate-[fadeUp_.7s_.45s_ease-out_both] flex-col gap-3 sm:flex-row">
            <a id="hero-cta" href="#basvuru" className="btn-primary px-8 py-4 text-base">Hemen başvur <ArrowRight className="size-5" /></a>
            <a href="#pozisyon" className="btn-secondary px-8 py-4 text-base">Nasıl çalışır?</a>
          </div>

          <dl className="mt-10 grid max-w-lg animate-[fadeUp_.7s_.55s_ease-out_both] grid-cols-3 gap-3">
            {[
              { v: <Counter to={100} prefix="%" />, k: "Evden çalışma" },
              { v: <Counter to={0} />, k: "Yıl deneyim şartı" },
              { v: <Counter to={4} />, k: "Çalışma seçeneği" },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-tc-gray-100 bg-white/80 p-3 sm:p-4">
                <dt className="sr-only">{x.k}</dt>
                <dd className="text-2xl font-bold text-tc-blue sm:text-3xl">{x.v}</dd>
                <dd className="mt-0.5 text-xs font-medium leading-tight text-tc-gray-600 sm:text-[13px]">{x.k}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-lg font-bold text-tc-yellow-600">#senyapdiye</p>
        </div>

        <div className="animate-[fadeUp_.9s_.2s_ease-out_both]">
          <CallScene />
        </div>
      </div>
    </section>
  );
}
