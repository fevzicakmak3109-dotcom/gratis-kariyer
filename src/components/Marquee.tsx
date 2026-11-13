const ITEMS = ["Uber Tech Hub İstanbul", "Trendyol Go by Uber Eats", "Uber Taksi", "Uber for Business", "Operasyon & Destek", "Pazarlama", "Veri Bilimi", "Ürün & Tasarım"];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-uber-gray-200 bg-uber-gray-50 py-4" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-lg font-semibold tracking-tight">
            {t}
            <span className="inline-block size-2 bg-black" />
          </span>
        ))}
      </div>
    </div>
  );
}
