export function PosterSection() {
  return (
    <section className="bg-black py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-8">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-uber-gray-400">Kampanya</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Yola birlikte çıkalım.</h2>
          <p className="mt-5 text-lg leading-relaxed text-uber-gray-400">
            Uber Türkiye işe alım kampanyası için hazırlanan afiş. Uber&apos;in harita dilinden ilham alındı: kare başlangıç
            noktası, yuvarlak varış noktası ve aradaki rota, adayın Uber&apos;deki yolculuğunu anlatıyor.
          </p>
          <ul className="mt-6 space-y-3 text-[15px] text-white/90">
            <li className="flex gap-3"><span className="mt-1.5 size-2.5 shrink-0 bg-white" /> Siyah-beyaz temel, iş kollarına özel vurgu renkleri</li>
            <li className="flex gap-3"><span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-uber-blue" /> Boğaz: Tech Hub İstanbul&apos;un mavisi</li>
            <li className="flex gap-3"><span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-uber-green" /> Teslimat: Uber Eats yeşili</li>
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md rotate-[-2deg] transition hover:rotate-0">
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-uber-blue/40 via-transparent to-uber-green/40 blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/uber-kariyer-afis.svg" alt="Uber Türkiye kariyer afişi: Yola birlikte çıkalım." className="relative w-full rounded-2xl border border-uber-gray-800 shadow-2xl" width={1080} height={1350} />
          </div>
        </div>
      </div>
    </section>
  );
}
