const QA = [
  { q: "Hangi belgeleri hazırlamalıyım?", a: "Güncel bir CV (PDF, DOC veya DOCX, en fazla 5 MB) yeterli. İstersen LinkedIn profilini ve kısa bir ön yazı da ekleyebilirsin." },
  { q: "Hangi iş koluna başvuracağımı nasıl seçeceğim?", a: "Seçmene gerek yok. Tek bir genel başvuru yapıyorsun; işe alım ekibimiz CV'ni ve deneyimini inceleyip seni en uygun iş koluna ve pozisyona yönlendiriyor." },
  { q: "Başvurumun sonucunu ne zaman öğrenirim?", a: "Ön değerlendirme genellikle 7 iş günü içinde tamamlanır. Sana e-posta ve telefonla ulaşırız." },
  { q: "Kurye veya sürücü partner olmak için de bu formu mu kullanmalıyım?", a: "Evet. Partner fırsatları için de aynı genel başvuru formunu kullanabilirsin; ön yazında belirtmen yeterli. Ekibimiz seni doğru onboarding sürecine yönlendirir." },
  { q: "Kişisel verilerim nasıl korunuyor?", a: "Verilerin 6698 sayılı KVKK kapsamında yalnızca işe alım süreci için işlenir ve yetkisiz kişilerle paylaşılmaz." },
];

export function Faq() {
  return (
    <section id="sss" className="scroll-mt-16 bg-uber-gray-50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-uber-gray-600">SSS</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Aklına takılanlar.</h2>
        </div>
        <div className="divide-y divide-uber-gray-200 border-y border-uber-gray-200">
          {QA.map((x) => (
            <details key={x.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {x.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-xl transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pr-10 text-[15px] leading-relaxed text-uber-gray-600">{x.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
