import { BUSINESS_LINES } from "@/lib/positions";
import { ArrowRight, BUSINESS_ICONS } from "./icons";

export function BusinessLines() {
  return (
    <section id="is-kollari" className="scroll-mt-16 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-uber-gray-600">İş kolları</p>
            <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Sana uygun yolu seç.</h2>
            <p className="mt-4 text-lg text-uber-gray-600">
              Uber Türkiye&apos;de altı farklı alanda ekip kuruyoruz. Sen tek bir genel başvuru yap; yetkinliklerine
              en uygun ekibi biz bulalım.
            </p>
          </div>
          <a href="#basvuru" className="btn-secondary self-start md:self-auto">Genel başvuru yap <ArrowRight className="size-4" /></a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_LINES.map((b) => {
            const Icon = BUSINESS_ICONS[b.id];
            return (
              <article key={b.id} className="flex flex-col rounded-2xl bg-uber-gray-50 p-6 sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-xl" style={{ background: b.accent, color: b.accent === "#FFC043" ? "#000" : "#fff" }}>
                    <Icon className="size-6" />
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">{b.tag}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{b.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-uber-gray-600">{b.description}</p>
                <p className="mt-5 text-[13px] font-medium text-uber-gray-600">Bu alandaki ekiplerimiz</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {b.roles.map((r) => (
                    <li key={r} className="rounded-full border border-uber-gray-200 bg-white px-3 py-1.5 text-[13px] font-medium">
                      {r}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Motto: sen başvur, biz yönlendirelim */}
        <div className="relative mt-6 overflow-hidden rounded-2xl bg-black p-7 text-white sm:p-10">
          <svg className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 opacity-70 md:block" viewBox="0 0 400 200" preserveAspectRatio="xMaxYMid meet" aria-hidden>
            {[40, 80, 120, 160].map((y, i) => (
              <g key={y}>
                <path d={`M40 100 C 160 100, 200 ${y}, 330 ${y}`} fill="none" stroke="#fff" strokeOpacity={i === 2 ? 1 : 0.25} strokeWidth="3" strokeDasharray="1 9" strokeLinecap="round" />
                <circle cx="340" cy={y} r="7" fill={i === 2 ? "#06C167" : "#545454"} />
              </g>
            ))}
            <rect x="26" y="86" width="28" height="28" fill="#fff" />
            <rect x="36" y="96" width="8" height="8" fill="#000" />
          </svg>
          <div className="relative max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-uber-gray-400">Genel başvuru</p>
            <h3 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Sen başvur, seni en uygun ekibe biz yönlendirelim<span className="text-uber-green">.</span>
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-uber-gray-400 sm:text-base">
              Hangi alana uygun olduğunu düşünmene gerek yok. İşe alım ekibimiz CV&apos;ni inceler, deneyimine ve
              ilgi alanlarına göre seni doğru iş koluyla buluşturur.
            </p>
            <a href="#basvuru" className="btn-light mt-7">Hemen başvur <ArrowRight className="size-5" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
