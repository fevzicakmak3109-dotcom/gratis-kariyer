import { UberWordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <UberWordmark className="text-3xl" />
            <p className="mt-3 max-w-sm text-[15px] text-uber-gray-400">Türkiye&apos;de geleceği birlikte hareket ettirelim.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[15px] sm:grid-cols-3">
            <div className="space-y-3">
              <p className="font-semibold">Kariyer</p>
              <a href="#is-kollari" className="block text-uber-gray-400 hover:text-white">İş kolları</a>
              <a href="#neden-uber" className="block text-uber-gray-400 hover:text-white">Neden Uber</a>
              <a href="#basvuru" className="block text-uber-gray-400 hover:text-white">Başvuru</a>
            </div>
            <div className="space-y-3">
              <p className="font-semibold">Bilgi</p>
              <a href="#surec" className="block text-uber-gray-400 hover:text-white">Süreç</a>
              <a href="#sss" className="block text-uber-gray-400 hover:text-white">SSS</a>
              <a href="/admin" className="block text-uber-gray-400 hover:text-white">İK Girişi</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-uber-gray-800 pt-6 text-sm text-uber-gray-400 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Uber Türkiye Kariyer</p>
          <p>Bu sayfa bir aday case çalışması olarak hazırlanmıştır.</p>
        </div>
      </div>
    </footer>
  );
}
