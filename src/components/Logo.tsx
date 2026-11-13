export function UberWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold tracking-[-0.04em] ${className}`} aria-label="Uber">
      Uber
    </span>
  );
}
