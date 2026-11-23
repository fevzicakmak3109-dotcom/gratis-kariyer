import { Reveal } from "./Reveal";
import { Cap, Headset, Phone, Rocket } from "./icons";

const STEPS = [
  { icon: Rocket, title: "Başvur", text: "Formu doldur. 2 dakikadan kısa sürer, belge gerekmez." },
  { icon: Phone, title: "Seni arayalım", text: "İK ekibimiz kısa bir telefon görüşmesiyle seni tanısın." },
  { icon: Cap, title: "Online eğitim", text: "Sistemleri, ürünleri ve iletişim tekniklerini evinden öğren." },
  { icon: Headset, title: "İlk çağrın", text: "Kulaklığını tak, Turkcell'in sesi olarak ilk çağrına bağlan!" },
];

export function Process() {
  return (
    <section id="surec" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">Başvuru süreci</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Dört adımda Turkcell&apos;lisin.</h2>
        </Reveal>
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 120} className="group relative rounded-3xl border border-tc-gray-100 bg-white p-7 transition hover:-translate-y-1 hover:border-tc-blue/30 hover:shadow-[0_20px_40px_-20px_rgba(40,85,172,0.35)]">
              <span className="absolute right-6 top-5 text-5xl font-bold text-tc-gray-100 transition group-hover:text-tc-yellow/40">{i + 1}</span>
              <span className="relative grid size-14 place-items-center rounded-2xl bg-tc-blue text-white transition group-hover:rotate-[-6deg] group-hover:bg-tc-yellow group-hover:text-tc-navy">
                <s.icon className="size-7" />
              </span>
              <h3 className="relative mt-6 text-xl font-bold">{s.title}</h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-tc-gray-600">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
