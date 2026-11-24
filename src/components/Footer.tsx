import { BrandLogo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-brand-ink-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <BrandLogo className="w-[110px]" />
            <p className="mt-4 max-w-sm text-[15px] text-white/60">
              Çağrı merkezinde kariyerin burada başlıyor. <span className="font-semibold text-brand-accent">#İşinGücünGüzellik</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[15px] sm:grid-cols-2">
            <div className="space-y-3">
              <p className="font-semibold">Kariyer</p>
              <a href="#pozisyon" className="block text-white/60 hover:text-white">Pozisyon</a>
              <a href="#neden-gratis" className="block text-white/60 hover:text-white">Neden Gratis</a>
              <a href="#basvuru" className="block text-white/60 hover:text-white">Başvuru</a>
            </div>
            <div className="space-y-3">
              <p className="font-semibold">Bilgi</p>
              <a href="#surec" className="block text-white/60 hover:text-white">Süreç</a>
              <a href="#sss" className="block text-white/60 hover:text-white">SSS</a>
              <a href="/admin" className="block text-white/60 hover:text-white">İK Girişi</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Gratis Kariyer · Çağrı Merkezi</p>
          <p>Bu sayfa bir aday case çalışması olarak hazırlanmıştır.</p>
        </div>
      </div>
    </footer>
  );
}
