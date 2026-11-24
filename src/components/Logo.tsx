/** Gratis logosu (gratis.com/icon/logo.webp). Sarı konuşma balonu hem açık hem koyu zeminde okunur. */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/gratis-logo.webp"
      alt="Gratis Kariyer"
      width={3200}
      height={1773}
      className={`h-auto select-none ${className}`}
      draggable={false}
    />
  );
}
