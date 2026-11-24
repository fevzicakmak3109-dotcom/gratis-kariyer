import { Reveal } from "./Reveal";

const QA = [
  { q: "Hiç deneyimim yok, başvurabilir miyim?", a: "Kesinlikle! Deneyim şartı aramıyoruz. Başlangıç eğitiminde sistemleri, ürünleri ve iletişim tekniklerini adım adım öğreniyorsun. Önemli olan isteğin ve ayırabileceğin vakit." },
  { q: "Gerçekten evden mi çalışacağım?", a: "Evet. Bilgisayarın, stabil internet bağlantın, bir kulaklığın ve sessiz bir köşen varsa Türkiye'nin her yerinden çalışabilirsin." },
  { q: "Çalışma saatleri nasıl?", a: "Tam zamanlı, yarı zamanlı, hafta sonu ya da esnek vardiya seçeneklerinden sana uyanı başvuru formunda belirtebilirsin. Vardiya planı ekibinle birlikte yapılır." },
  { q: "Hangi belgeleri hazırlamalıyım?", a: "Hiçbir belge gerekmiyor. Formu doldurman yeterli; istersen LinkedIn profilini ve kendini anlatan kısa bir not ekleyebilirsin." },
  { q: "Başvurumun sonucunu ne zaman öğrenirim?", a: "İK ekibimiz başvurunu inceledikten sonra genellikle birkaç iş günü içinde seni telefonla arar." },
  { q: "Kişisel verilerim nasıl korunuyor?", a: "Verilerin 6698 sayılı KVKK kapsamında yalnızca işe alım süreci için işlenir ve yetkisiz kişilerle paylaşılmaz." },
];

export function Faq() {
  return (
    <section id="sss" className="scroll-mt-20 bg-brand-gray-50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        <Reveal>
          <p className="eyebrow">SSS</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Aklına takılanlar.</h2>
          <p className="mt-4 text-brand-gray-600">Başka bir sorun mu var? Başvurunu yap, ekibimiz seni arayınca hepsini konuşalım.</p>
        </Reveal>
        <div className="space-y-3">
          {QA.map((x, i) => (
            <Reveal key={x.q} delay={i * 60}>
              <details className="group rounded-2xl bg-white px-5 py-1 shadow-[0_1px_0_rgba(74,14,111,0.04)] open:shadow-[0_12px_30px_-18px_rgba(133,31,143,0.4)] sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-gray-100 text-xl text-brand-primary transition group-open:rotate-45 group-open:bg-brand-accent group-open:text-brand-ink">+</span>
                </summary>
                <p className="pb-5 pr-10 text-[15px] leading-relaxed text-brand-gray-600">{x.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
