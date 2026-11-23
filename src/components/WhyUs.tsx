import { Reveal } from "./Reveal";
import { Award, Cap, Clock, Home, Users, Wallet } from "./icons";

const ITEMS = [
  { icon: Home, title: "Evden Çalış", text: "Trafiğe veda et; evinin konforunda Turkcell ekibinin bir parçası ol." },
  { icon: Cap, title: "Eğitim Bizden", text: "Deneyimin yoksa sorun değil. Ücretli başlangıç eğitimiyle hazır hale geliyorsun." },
  { icon: Clock, title: "Esnek Vardiyalar", text: "Tam zamanlı, yarı zamanlı ya da hafta sonu; sana uyan düzeni seç." },
  { icon: Wallet, title: "Düzenli Kazanç", text: "Her ay düzenli maaş ve performansına göre prim fırsatları." },
  { icon: Users, title: "Güçlü Ekip", text: "Uzakta olsan da yalnız değilsin: takım liderin ve ekibin hep yanında." },
  { icon: Award, title: "Sıfırdan Kariyer", text: "Müşteri temsilciliğinden takım liderliğine uzanan net bir kariyer yolu." },
];

export function WhyUs() {
  return (
    <section id="neden-turkcell" className="scroll-mt-20 bg-tc-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">Neden Turkcell?</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Gelecek burada, kariyerin de.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6 md:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 110} className="group">
              <div className="relative mx-auto aspect-[1.15/1] w-full max-w-[330px] transition-transform duration-300 group-hover:-translate-y-2">
                {/* yumuşak gölgeli beyaz altıgen */}
                <div className="hex absolute inset-0 bg-[#dbe5f6] blur-[10px] transition group-hover:bg-[#c8d7f3]" />
                <div className="hex absolute inset-[3px] bg-white" />
                <div className="relative flex h-full flex-col items-center justify-center px-[16%] text-center">
                  <span className="grid size-12 place-items-center rounded-full bg-tc-blue text-white shadow-lg shadow-tc-blue/30 transition duration-300 group-hover:scale-110 group-hover:bg-tc-yellow group-hover:text-tc-navy sm:size-16">
                    <it.icon className="size-6 sm:size-8" />
                  </span>
                  <h3 className="mt-3 text-[15px] font-bold leading-tight sm:mt-4 sm:text-lg">{it.title}</h3>
                  <p className="mt-1.5 hidden text-[13px] leading-snug text-tc-gray-600 sm:block">{it.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
