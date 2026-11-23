"use client";
import { useEffect, useRef, useState } from "react";
import { Cap, Headset, Home, Smile, Trend } from "./icons";

const SLIDES = [
  { icon: Headset, title: "Kariyerin bir çağrı uzağında!" },
  { icon: Home, title: "Evinin konforunda, Turkcell güvencesiyle!" },
  { icon: Cap, title: "Deneyim şart değil, eğitim bizden!" },
  { icon: Smile, title: "Her çağrıda bir gülümseme!" },
  { icon: Trend, title: "Sıfırdan başla, liderliğe yüksel!" },
];

/** Turkcell Kariyerim'deki dönen altıgen slaytın çağrı merkezi uyarlaması. */
export function HexSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 3800);
    return () => clearInterval(t);
  }, [paused]);

  const go = (d: number) => setI((x) => (x + d + SLIDES.length) % SLIDES.length);

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28" aria-roledescription="carousel" aria-label="Turkcell Çağrı Merkezi">
      <div
        className="relative mx-auto max-w-3xl px-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <div className="relative mx-auto h-[320px] w-full max-w-[640px] sm:h-[420px]">
          {/* arkadaki ikinci altıgen (ters döner) */}
          <svg
            className="absolute left-1/2 top-1/2 size-[300px] opacity-25 blur-[2px] transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.8,.2,1)] sm:size-[400px]"
            style={{ transform: `translate(-46%,-46%) rotate(${-i * 60 + 18}deg)` }}
            viewBox="0 0 100 100"
            aria-hidden
          >
            <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="#8fb0ec" stroke="#8fb0ec" strokeWidth="10" strokeLinejoin="round" />
          </svg>

          {/* Düzgün, yuvarlak köşeli altıgen: her slaytta 60° döner */}
          <svg
            className="absolute left-1/2 top-1/2 size-[300px] drop-shadow-[0_30px_40px_rgba(40,85,172,0.35)] transition-transform duration-[1000ms] ease-[cubic-bezier(.2,.8,.2,1)] sm:size-[400px]"
            style={{ transform: `translate(-50%,-50%) rotate(${i * 60 - 8}deg)` }}
            viewBox="0 0 100 100"
            aria-hidden
          >
            <defs>
              <linearGradient id="hexg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#3a63c8" />
                <stop offset="0.55" stopColor="#2855ac" />
                <stop offset="1" stopColor="#22408f" />
              </linearGradient>
            </defs>
            <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="url(#hexg)" stroke="url(#hexg)" strokeWidth="10" strokeLinejoin="round" />
            <polygon points="50,14 81,32 81,68 50,86 19,68 19,32" fill="none" stroke="#fff" strokeOpacity="0.07" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          {SLIDES.map((s, k) => (
            <div
              key={s.title}
              className={`absolute left-1/2 top-1/2 flex w-[300px] -translate-x-1/2 -translate-y-1/2 items-center transition-all duration-700 sm:w-[400px] ${
                k === i ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={k !== i}
            >
              <span
                className={`-ml-7 grid size-20 shrink-0 place-items-center rounded-full bg-tc-yellow text-tc-navy shadow-[0_0_0_8px_rgba(255,201,0,0.28),0_14px_30px_rgba(0,0,0,0.3)] transition-transform duration-700 sm:-ml-12 sm:size-28 ${
                  k === i ? "scale-100" : "scale-50"
                }`}
              >
                <s.icon className="size-9 sm:size-12" />
              </span>
              <p
                className={`ml-4 pr-8 text-[21px] font-bold leading-tight text-white transition-all delay-150 duration-700 sm:ml-6 sm:pr-10 sm:text-[30px] ${
                  k === i ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                }`}
              >
                {s.title}
                <span className="mt-1 block text-tc-yellow">#senyapdiye</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2" role="tablist">
          {SLIDES.map((s, k) => (
            <button
              key={s.title}
              role="tab"
              aria-selected={k === i}
              aria-label={`${k + 1}. slayt`}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-tc-yellow" : "w-6 bg-tc-gray-100 hover:bg-tc-gray-200"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
