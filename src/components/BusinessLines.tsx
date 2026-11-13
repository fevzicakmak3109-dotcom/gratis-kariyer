"use client";
import { BUSINESS_LINES } from "@/lib/positions";
import { ArrowRight, BUSINESS_ICONS } from "./icons";

export const SELECT_EVENT = "uber:select-line";

export function BusinessLines() {
  const pick = (id: string, role?: string) => {
    window.dispatchEvent(new CustomEvent(SELECT_EVENT, { detail: { id, role } }));
    document.getElementById("basvuru")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="is-kollari" className="scroll-mt-16 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-uber-gray-600">İş kolları</p>
            <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Sana uygun yolu seç.</h2>
            <p className="mt-4 text-lg text-uber-gray-600">
              Uber Türkiye&apos;de altı farklı alanda ekip kuruyoruz. İlgini çeken alanı seç, başvuru formu senin için hazır olsun.
            </p>
          </div>
          <a href="#basvuru" className="btn-secondary self-start md:self-auto">Genel başvuru yap <ArrowRight className="size-4" /></a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_LINES.map((b) => {
            const Icon = BUSINESS_ICONS[b.id];
            return (
              <article key={b.id} className="group flex flex-col rounded-2xl bg-uber-gray-50 p-6 transition hover:bg-uber-gray-100 sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-xl text-white" style={{ background: b.accent, color: b.accent === "#FFC043" ? "#000" : "#fff" }}>
                    <Icon className="size-6" />
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">{b.tag}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{b.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-uber-gray-600">{b.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {b.roles.map((r) => (
                    <li key={r}>
                      <button onClick={() => pick(b.id, r)} className="rounded-full border border-uber-gray-200 bg-white px-3 py-1.5 text-[13px] font-medium transition hover:border-black">
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={() => pick(b.id)} className="mt-6 inline-flex items-center gap-2 self-start text-[15px] font-semibold">
                  Bu alana başvur <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
