import { Headset } from "./icons";

const ITEMS = ["Evden çalışma", "Deneyim şartı yok", "Eğitim bizden", "Esnek vardiyalar", "Düzenli kazanç", "Sıfırdan kariyer", "Gratis güvencesi", "#İşinGücünGüzellik"];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative -mt-px overflow-hidden bg-brand-accent py-4 sm:py-5" aria-hidden>
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-lg font-bold tracking-tight text-brand-ink sm:text-xl">
            {t}
            <Headset className="size-5 text-brand-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
