"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/Logo";
import { ArrowRight, Eye, Headset, Lock } from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) router.replace("/admin");
    else setError((await res.json().catch(() => ({}))).error ?? "Giriş başarısız.");
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-[linear-gradient(155deg,#A242A4_0%,#851F8F_45%,#4A0E6F_100%)] p-12 text-white lg:flex lg:flex-col">
        <BrandLogo className="w-[130px]" />
        <div className="hex-v absolute left-1/2 top-1/2 size-[340px] -translate-x-1/2 -translate-y-[58%] animate-float-slow bg-white/[0.07]" aria-hidden />
        <div className="absolute left-1/2 top-1/2 grid size-40 -translate-x-1/2 -translate-y-[70%] place-items-center" aria-hidden>
          <span className="absolute inset-0 animate-ring rounded-full bg-brand-accent/60" />
          <span className="absolute inset-0 animate-ring rounded-full bg-brand-accent/60 [animation-delay:1.2s]" />
          <span className="relative grid size-28 place-items-center rounded-full bg-brand-accent text-brand-ink shadow-2xl"><Headset className="size-14" /></span>
        </div>
        <div className="mt-auto">
          <h1 className="text-5xl font-bold tracking-[-0.03em]">İşe Alım Paneli</h1>
          <p className="mt-3 text-lg text-white/75">Çağrı merkezi başvurularını tek yerden takip et.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-white px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 lg:hidden"><BrandLogo className="w-[110px]" /></div>
          <span className="grid size-12 place-items-center rounded-full bg-brand-primary-50 text-brand-primary"><Lock className="size-6" /></span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">Yönetici girişi</h2>
          <p className="mt-2 text-brand-gray-600">Devam etmek için kullanıcı adı ve şifreni gir.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="u" className="label">Kullanıcı adı</label>
              <input id="u" className="input" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
            </div>
            <div>
              <label htmlFor="p" className="label">Şifre</label>
              <div className="relative">
                <input id="p" type={show ? "text" : "password"} className="input pr-12" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-brand-gray-600 hover:bg-brand-gray-200" aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}>
                  <Eye className="size-5" />
                </button>
              </div>
            </div>
            {error && <p role="alert" className="rounded-lg bg-brand-red/10 px-4 py-3 text-sm font-medium text-brand-red">{error}</p>}
            <button className="btn-blue w-full py-4" disabled={loading}>
              {loading ? "Giriş yapılıyor…" : <>Giriş yap <ArrowRight className="size-5" /></>}
            </button>
          </form>
          <a href="/" className="mt-8 inline-block text-sm text-brand-gray-600 underline-offset-4 hover:underline">← Kariyer sayfasına dön</a>
        </div>
      </div>
    </div>
  );
}
