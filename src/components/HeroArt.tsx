import { Bag, Car, Code } from "./icons";

/** Hero banner illüstrasyonu: İstanbul haritası, Boğaz, rota ve iş kolu kartları. */
export function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <svg viewBox="0 0 560 560" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <pattern id="hgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#1f1f1f" strokeWidth="1.5" />
          </pattern>
          <linearGradient id="hbos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#276EF1" stopOpacity=".6" />
            <stop offset="1" stopColor="#276EF1" stopOpacity=".15" />
          </linearGradient>
          <clipPath id="hclip"><rect width="560" height="560" rx="28" /></clipPath>
        </defs>
        <g clipPath="url(#hclip)">
          <rect width="560" height="560" fill="#0d0d0d" />
          <rect width="560" height="560" fill="url(#hgrid)" />
          {/* ana caddeler */}
          <path d="M0 150 L560 210 M0 400 L560 360 M150 0 L120 560 M420 0 L460 560" stroke="#262626" strokeWidth="10" />
          {/* Boğaz */}
          <path d="M330 -20 C 300 90, 390 150, 350 250 S 270 400, 330 480 S 420 560, 400 600" fill="none" stroke="url(#hbos)" strokeWidth="44" strokeLinecap="round" />
          {/* köprü */}
          <path d="M290 300 L 410 330" stroke="#545454" strokeWidth="6" strokeLinecap="round" />
          {/* rota */}
          <path id="route" d="M90 450 C 170 450, 180 330, 260 310 S 410 330, 440 220 S 470 110, 480 100" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 12" className="animate-dash" />
          <path d="M90 450 C 170 450, 180 330, 260 310" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
          <rect x="76" y="436" width="28" height="28" fill="#fff" />
          <rect x="85" y="445" width="10" height="10" fill="#000" />
          <circle cx="480" cy="100" r="16" fill="#fff" />
          <circle cx="480" cy="100" r="6" fill="#000" />
          <circle cx="480" cy="100" r="30" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="2">
            <animate attributeName="r" values="18;40;18" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values=".5;0;.5" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {/* araç */}
          <g transform="translate(260 310) rotate(-12)">
            <rect x="-18" y="-10" width="36" height="20" rx="6" fill="#fff" />
            <rect x="3" y="-7" width="8" height="14" rx="2" fill="#000" />
          </g>
        </g>
      </svg>

      <FloatCard className="left-[4%] top-[8%]" delay="0s" color="#276EF1" icon={<Code className="size-5" />} title="Tech Hub İstanbul" text="ML · LLM · Gerçek zamanlı veri" />
      <FloatCard className="right-[3%] top-[44%]" delay="1.5s" color="#06C167" icon={<Bag className="size-5" />} title="Trendyol Go by Uber Eats" text="Siparişin yolda · 12 dk" />
      <FloatCard className="bottom-[6%] left-[22%]" delay="3s" color="#FFC043" icon={<Car className="size-5" />} title="Uber Taksi" text="Sürücün 3 dk uzaklıkta" dark />
    </div>
  );
}

function FloatCard({
  className, delay, color, icon, title, text, dark,
}: { className: string; delay: string; color: string; icon: React.ReactNode; title: string; text: string; dark?: boolean }) {
  return (
    <div
      className={`absolute flex animate-float items-center gap-3 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 text-black shadow-[0_8px_30px_rgba(0,0,0,.45)] sm:py-3 sm:pl-3 sm:pr-5 ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className={`grid size-9 shrink-0 place-items-center rounded-xl sm:size-10 ${dark ? "text-black" : "text-white"}`} style={{ background: color }}>
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-[13px] font-semibold sm:text-sm">{title}</span>
        <span className="block text-[11px] text-uber-gray-600 sm:text-xs">{text}</span>
      </span>
    </div>
  );
}
