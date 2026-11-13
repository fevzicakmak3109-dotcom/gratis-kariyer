import { HeroArt } from "./HeroArt";
import { ArrowDown, ArrowRight } from "./icons";

const STATS = [
  { value: "$200M", label: "İstanbul teknoloji merkezi yatırımı" },
  { value: "4.", label: "ABD dışındaki küresel Tech Hub" },
  { value: "90.000+", label: "Restoran ve market iş ortağı" },
  { value: "19.000+", label: "Kurye partner" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pb-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-uber-gray-800 px-3.5 py-1.5 text-[13px] font-medium">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-uber-green opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-uber-green" />
            </span>
            Uber Türkiye&apos;de büyüyor · Başvurular açık
          </span>
          <h1 className="mt-6 text-[44px] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[76px]">
            Türkiye&apos;de geleceği birlikte hareket ettirelim<span className="text-uber-green">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-uber-gray-400 sm:text-xl">
            Teknolojiden teslimata, ulaşımdan kurumsal çözümlere. Uber&apos;in Türkiye yolculuğunda yerini al;
            milyonlarca insanın şehirde hareket etme biçimini birlikte değiştirelim.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#basvuru" className="btn-light px-7 py-4 text-base">
              Hemen başvur <ArrowRight className="size-5" />
            </a>
            <a href="#is-kollari" className="inline-flex items-center justify-center gap-2 rounded-lg border border-uber-gray-600 px-7 py-4 text-base font-medium transition hover:bg-uber-gray-800">
              İş kollarını keşfet <ArrowDown className="size-5" />
            </a>
          </div>
        </div>
        <HeroArt />
      </div>

      <div className="border-t border-uber-gray-800">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s, i) => (
            <div key={s.label} className={`py-6 sm:py-8 ${i % 2 ? "pl-4 sm:pl-8" : "pr-4"} ${i > 1 ? "border-t border-uber-gray-800 lg:border-t-0" : ""} lg:px-8 lg:first:pl-0 ${i ? "lg:border-l lg:border-uber-gray-800" : ""}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</dd>
              <dd className="mt-1 text-sm text-uber-gray-400">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
