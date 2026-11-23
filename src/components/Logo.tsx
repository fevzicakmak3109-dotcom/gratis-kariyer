/** Turkcell Kariyerim logosu (kariyerim.turkcell.com.tr). `white`: koyu zemin için tamamen beyaz. */
export function TurkcellLogo({ className = "", white = false }: { className?: string; white?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/turkcell-logo.png"
      alt="Turkcell Kariyerim"
      width={275}
      height={34}
      className={`h-auto select-none ${white ? "brightness-0 invert" : ""} ${className}`}
      draggable={false}
    />
  );
}
