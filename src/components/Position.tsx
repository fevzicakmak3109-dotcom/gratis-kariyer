import { Reveal } from "./Reveal";
import { Chat, Check, Headset, Laptop, Quiet, Smile, Wifi } from "./icons";

const TASKS = [
  { icon: Headset, title: "Müşterilerimizi dinle", text: "Gelen çağrıları karşıla; fatura, paket ve hat işlemlerinde Turkcell müşterilerine yardımcı ol." },
  { icon: Chat, title: "Çözüm üret", text: "Sistemlerimiz ve eğitimlerimizle donanmış olarak talepleri hızlı ve doğru şekilde sonuçlandır." },
  { icon: Smile, title: "Gülümseten deneyim yarat", text: "Her görüşmede güler yüzlü, sabırlı ve çözüm odaklı iletişiminle fark yarat." },
];

const WHO = [
  "Deneyimli ya da hiç deneyimi olmayan",
  "İletişimi güçlü, dinlemeyi seven",
  "Haftada belirli saatleri ayırabilen",
  "Öğrenmeye ve gelişmeye açık",
  "Bilgisayar kullanmayı bilen",
];

const NEEDS = [
  { icon: Laptop, label: "Bilgisayar" },
  { icon: Wifi, label: "Stabil internet" },
  { icon: Headset, label: "Kulaklık" },
  { icon: Quiet, label: "Sessiz bir köşe" },
];

export function Position() {
  return (
    <section id="pozisyon" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Pozisyon</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Çağrı Merkezi Müşteri Temsilcisi</h2>
          <p className="mt-4 text-lg text-tc-gray-600">
            Turkcell&apos;in sesi ol. Milyonlarca müşterimize evinden ulaş, sorunlarını çöz, günlerini güzelleştir.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Uzaktan / Evden", "Tam zamanlı · Yarı zamanlı", "Deneyim şartı yok", "Tüm Türkiye"].map((t) => (
              <span key={t} className="rounded-full bg-tc-blue-50 px-4 py-2 text-sm font-semibold text-tc-blue">{t}</span>
            ))}
          </div>
        </Reveal>

        {/* Ne yapacaksın */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {TASKS.map((t, i) => (
            <Reveal key={t.title} delay={i * 120} as="article" className="group relative overflow-hidden rounded-3xl bg-tc-gray-50 p-7 transition-colors hover:bg-tc-blue">
              <span className="absolute -right-6 -top-6 size-24 rounded-full bg-tc-yellow/0 transition-colors duration-500 group-hover:bg-tc-yellow/90" />
              <span className="relative grid size-14 place-items-center rounded-2xl bg-white text-tc-blue shadow-sm transition group-hover:scale-110">
                <t.icon className="size-7" />
              </span>
              <h3 className="relative mt-6 text-xl font-bold transition-colors group-hover:text-white">{t.title}</h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-tc-gray-600 transition-colors group-hover:text-white/80">{t.text}</p>
            </Reveal>
          ))}
        </div>

        {/* Kimleri arıyoruz + evden çalışma */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="relative overflow-hidden rounded-3xl bg-tc-navy p-7 text-white sm:p-10">
            <div className="hex absolute -bottom-16 -right-16 size-56 bg-tc-blue/40" aria-hidden />
            <p className="relative text-sm font-semibold uppercase tracking-[0.16em] text-tc-yellow">Kimleri arıyoruz?</p>
            <h3 className="relative mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Deneyim değil, istek arıyoruz.</h3>
            <ul className="relative mt-7 space-y-3.5">
              {WHO.map((w, i) => (
                <Reveal key={w} as="li" delay={150 + i * 90} className="flex items-center gap-3 text-[15px] sm:text-base">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-tc-yellow text-tc-navy"><Check className="size-4" strokeWidth={3} /></span>
                  {w}
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="rounded-3xl border border-tc-gray-100 p-7 sm:p-10">
            <p className="eyebrow">Evden çalışma</p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Ofisin, evinin bir köşesi.</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-tc-gray-600">
              Yol yok, trafik yok. İhtiyacın olan sadece birkaç şey; gerisini eğitim ve sistem desteğiyle biz sağlıyoruz.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {NEEDS.map((n, i) => (
                <Reveal key={n.label} delay={200 + i * 90} className="flex items-center gap-3 rounded-2xl bg-tc-gray-50 p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-tc-yellow text-tc-navy"><n.icon className="size-5" /></span>
                  <span className="text-sm font-semibold leading-tight sm:text-[15px]">{n.label}</span>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
