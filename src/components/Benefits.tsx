import { Globe, Heart, Rocket, Shield, Sparkle, Users } from "./icons";

const ITEMS = [
  { icon: Rocket, title: "Kuruluş enerjisi", text: "Türkiye ekibinin ilk yıllarında yer al; kararlarına ve etkine doğrudan şahit ol." },
  { icon: Globe, title: "Küresel ölçek", text: "70'ten fazla ülkede kullanılan ürünler üzerinde, dünyanın dört bir yanındaki ekiplerle çalış." },
  { icon: Sparkle, title: "Öğrenme bütçesi", text: "Eğitim, konferans ve sertifika programlarıyla kendini sürekli geliştir." },
  { icon: Heart, title: "Sağlık & esenlik", text: "Özel sağlık sigortası, esnek çalışma ve dengeyi önemseyen bir kültür." },
  { icon: Users, title: "Kapsayıcı kültür", text: "Farklı bakış açılarının daha iyi ürünler doğurduğuna inanıyoruz." },
  { icon: Shield, title: "Güvenlik önceliği", text: "Kullanıcılarımızın ve partnerlerimizin güvenliği her kararımızın merkezinde." },
];

export function Benefits() {
  return (
    <section id="neden-uber" className="scroll-mt-16 bg-uber-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-uber-gray-600">Neden Uber</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Gitmek istediğin yere birlikte.</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-uber-gray-200 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white p-7 sm:p-8">
              <Icon className="size-7" />
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-uber-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
