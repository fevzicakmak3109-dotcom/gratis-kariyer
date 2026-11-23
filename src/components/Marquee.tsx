import { Headset } from "./icons";

const ITEMS = ["Evden çalışma", "Deneyim şartı yok", "Eğitim bizden", "Esnek vardiyalar", "Düzenli kazanç", "Sıfırdan kariyer", "Turkcell güvencesi", "#senyapdiye"];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative -mt-px overflow-hidden bg-tc-yellow py-4 sm:py-5" aria-hidden>
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-lg font-bold tracking-tight text-tc-navy sm:text-xl">
            {t}
            <Headset className="size-5 text-tc-blue" />
          </span>
        ))}
      </div>
    </div>
  );
}
