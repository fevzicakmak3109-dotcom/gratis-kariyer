const STEPS = [
  { n: "01", title: "Başvur", text: "Formu doldur ve CV'ni yükle. 3 dakikadan kısa sürer." },
  { n: "02", title: "Ön değerlendirme", text: "Ekibimiz CV'ni inceler, seni en uygun iş koluna yönlendirir ve 7 iş günü içinde dönüş yapar." },
  { n: "03", title: "Mülakatlar", text: "İK görüşmesi ve ekiple tanışma. Teknik rollerde vaka çalışması." },
  { n: "04", title: "Hoş geldin", text: "Teklif ve onboarding. Uber yolculuğun başlıyor." },
];

export function Process() {
  return (
    <section id="surec" className="scroll-mt-16 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-uber-gray-600">Başvuru süreci</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Dört adımda Uber&apos;desin.</h2>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-uber-gray-200 md:left-3 md:right-3 md:top-[11px] md:bottom-auto md:h-0.5 md:w-auto" aria-hidden />
          {STEPS.map((s, i) => (
            <li key={s.n} className="relative pl-12 md:pl-0 md:pt-12">
              <span className={`absolute left-0 top-0 grid size-6 place-items-center ${i === STEPS.length - 1 ? "rounded-full" : ""} bg-black`}>
                <span className={`size-2 bg-white ${i === STEPS.length - 1 ? "rounded-full" : ""}`} />
              </span>
              <span className="text-sm font-semibold text-uber-gray-400">{s.n}</span>
              <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-uber-gray-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
