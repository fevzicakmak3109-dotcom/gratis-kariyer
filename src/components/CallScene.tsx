"use client";
import { useEffect, useState } from "react";
import { Check, Headset, Home, Phone, Star } from "./icons";

/**
 * Hero'daki canlı çağrı sahnesi. Döngü: çağrı çalar → görüşme (ses dalgası, sayaç,
 * sohbet balonları) → çözüldü. Tamamen CSS/transform animasyonları; JS yalnızca
 * aşamaları değiştirir.
 */
type Phase = "ringing" | "talking" | "solved";

const LINES = [
  { from: "agent", text: "Gratis'e hoş geldiniz, ben Elif. Size nasıl yardımcı olabilirim?" },
  { from: "customer", text: "Merhaba, siparişim ne zaman gelir acaba? 🛍️" },
  { from: "agent", text: "Hemen bakıyorum; kargonuz yolda, yarın kapınızda!" },
] as const;

export function CallScene() {
  const [phase, setPhase] = useState<Phase>("ringing");
  const [shown, setShown] = useState(0);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      t.forEach(clearTimeout);
      t = [];
      setPhase("ringing");
      setShown(0);
      setSecs(0);
      t.push(setTimeout(() => setPhase("talking"), 2600));
      t.push(setTimeout(() => setShown(1), 3300));
      t.push(setTimeout(() => setShown(2), 5100));
      t.push(setTimeout(() => setShown(3), 6900));
      t.push(setTimeout(() => setPhase("solved"), 9200));
      t.push(setTimeout(run, 12400));
    };
    run();
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "talking") return;
    const i = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [phase]);

  const mmss = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  const typing = phase === "talking" && shown < LINES.length;

  return (
    <div className="relative mx-auto aspect-[1/1.16] w-full max-w-[560px] sm:aspect-[1/1.02]" aria-hidden>
      {/* Arka plan: marka moru büyük altıgen */}
      <div className="hex-v absolute inset-[4%] animate-float-slow bg-[linear-gradient(150deg,#A242A4_0%,#851F8F_45%,#4A0E6F_100%)] shadow-2xl" />
      <div className="hex-v absolute inset-[4%] opacity-30 [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_45%)]" />
      {/* Dekoratif altıgenler */}
      <div className="hex absolute -left-2 top-[10%] size-16 animate-float bg-brand-accent sm:size-20" />
      <div className="hex absolute right-[2%] top-[4%] size-10 animate-float-slow bg-brand-primary-50 [animation-delay:-3s]" />
      <div className="hex absolute bottom-[6%] right-[8%] size-12 animate-spin-slow bg-brand-accent/90" />
      {/* Sinyal halkaları */}
      <svg className="absolute left-1/2 top-[13%] w-[46%] -translate-x-1/2 text-white/25" viewBox="0 0 200 100">
        {[30, 55, 80].map((r, i) => (
          <path key={r} d={`M${100 - r} 100 A ${r} ${r} 0 0 1 ${100 + r} 100`} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: `${i * 300}ms` }} />
        ))}
      </svg>

      {/* Çağrı kartı */}
      <div className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-[54%] rounded-[28px] sm:w-[78%] sm:-translate-y-[46%] bg-white p-4 shadow-[0_30px_60px_-20px_rgba(40,5,60,0.55)] sm:p-5">
        <div className="flex items-center gap-3">
          <div className="relative grid size-12 shrink-0 place-items-center sm:size-14">
            {phase === "ringing" && (
              <>
                <span className="absolute inset-0 animate-ring rounded-full bg-brand-accent" />
                <span className="absolute inset-0 animate-ring rounded-full bg-brand-accent [animation-delay:0.8s]" />
              </>
            )}
            <span className={`relative grid size-full place-items-center rounded-full text-lg font-bold transition-colors duration-500 ${phase === "solved" ? "bg-brand-green text-white" : "bg-brand-accent text-brand-ink"}`}>
              {phase === "solved" ? <Check className="size-7" strokeWidth={3} /> : "AK"}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-gray-400 sm:text-xs">
              {phase === "ringing" ? "Gelen çağrı" : phase === "talking" ? "Görüşmede" : "Çağrı tamamlandı"}
            </p>
            <p className="truncate text-base font-bold sm:text-lg">Ayşe K.</p>
            <p className="truncate text-xs text-brand-gray-600 sm:text-[13px]">Sipariş takibi talebi</p>
          </div>
          <div className="text-right">
            {phase === "ringing" ? (
              <span className="grid size-11 animate-shake place-items-center rounded-full bg-brand-green text-white shadow-lg shadow-brand-green/40">
                <Phone className="size-5" />
              </span>
            ) : (
              <span className={`rounded-full px-3 py-1.5 text-sm font-bold tabular-nums ${phase === "solved" ? "bg-brand-green/10 text-brand-green" : "bg-brand-primary-50 text-brand-primary"}`}>
                {phase === "solved" ? "Çözüldü" : mmss}
              </span>
            )}
          </div>
        </div>

        {/* Ses dalgası */}
        <div className="mt-4 flex h-10 items-center justify-center gap-[3px] rounded-2xl bg-brand-gray-50 px-3">
          {Array.from({ length: 32 }).map((_, i) => (
            <span
              key={i}
              className={`w-[3px] origin-center rounded-full ${phase === "talking" ? "animate-wave bg-brand-primary" : "bg-brand-gray-200"}`}
              style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 8) * 0.09}s`, transform: phase === "talking" ? undefined : "scaleY(0.3)" }}
            />
          ))}
        </div>

        {/* Sohbet */}
        <div className="mt-4 flex min-h-[148px] flex-col gap-2 sm:min-h-[164px]">
          {phase === "ringing" && (
            <div className="m-auto flex items-center gap-2 text-sm font-medium text-brand-gray-600">
              <Headset className="size-5 text-brand-primary" /> Bağlanıyor
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => <span key={d} className="size-1.5 animate-typing rounded-full bg-brand-primary" style={{ animationDelay: `${d * 0.15}s` }} />)}
              </span>
            </div>
          )}
          {phase !== "ringing" &&
            LINES.slice(0, phase === "solved" ? LINES.length : shown).map((l, i) => (
              <p
                key={i}
                className={`max-w-[88%] animate-[fadeUp_.45s_ease-out_both] rounded-2xl px-3.5 py-2 text-[13px] leading-snug sm:text-sm ${
                  l.from === "agent" ? "self-start rounded-bl-md bg-brand-primary text-white" : "self-end rounded-br-md bg-brand-gray-100 text-brand-ink"
                }`}
              >
                {l.text}
              </p>
            ))}
          {typing && shown > 0 && (
            <span className={`flex w-fit gap-1 rounded-2xl px-3 py-2.5 ${shown % 2 ? "self-end bg-brand-gray-100" : "self-start bg-brand-primary/10"}`}>
              {[0, 1, 2].map((d) => <span key={d} className="size-1.5 animate-typing rounded-full bg-brand-gray-400" style={{ animationDelay: `${d * 0.15}s` }} />)}
            </span>
          )}
        </div>
      </div>

      {/* Yüzen bilgi kartları */}
      <div className="absolute left-[-4%] top-[80%] hidden animate-float items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl sm:flex [animation-delay:-2s]">
        <span className="grid size-8 place-items-center rounded-xl bg-brand-accent text-brand-ink"><Home className="size-4" /></span>
        <span className="text-[13px] font-semibold leading-tight">Evden<br />bağlandın</span>
      </div>
      <div
        className={`absolute bottom-0 left-[6%] flex items-center gap-2 rounded-2xl sm:bottom-[3%] bg-white px-3 py-2 shadow-xl transition-all duration-500 ${
          phase === "solved" ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <span className="flex text-brand-accent">{[0, 1, 2, 3, 4].map((s) => <Star key={s} className="size-4 fill-current" strokeWidth={0} />)}</span>
        <span className="text-[13px] font-semibold">Mutlu müşteri!</span>
      </div>
      <div className="absolute right-[2%] top-[1%] flex animate-float-slow sm:right-0 sm:top-[22%] items-center gap-2 rounded-2xl bg-brand-ink px-3 py-2 text-white shadow-xl">
        <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-75" /><span className="relative inline-flex size-2.5 rounded-full bg-brand-green" /></span>
        <span className="text-[13px] font-semibold">Hattasın</span>
      </div>
    </div>
  );
}
