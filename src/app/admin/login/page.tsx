"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UberWordmark } from "@/components/Logo";
import { ArrowRight, Eye, Lock } from "@/components/icons";

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
      <div className="relative hidden overflow-hidden bg-black p-12 text-white lg:flex lg:flex-col">
        <UberWordmark className="text-4xl" />
        <svg className="absolute inset-0 m-auto h-[70%] w-[70%] opacity-80" viewBox="0 0 400 400" aria-hidden>
          <path d="M40 340 C 140 340, 150 220, 230 200 S 340 120, 360 60" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="1 12" strokeLinecap="round" className="animate-dash" />
          <rect x="28" y="328" width="24" height="24" fill="#fff" />
          <circle cx="360" cy="60" r="14" fill="#06C167" />
        </svg>
        <div className="mt-auto">
          <h1 className="text-5xl font-bold tracking-[-0.03em]">İşe Alım Paneli</h1>
          <p className="mt-3 text-lg text-uber-gray-400">Uber Türkiye başvurularını tek yerden takip et.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-white px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 lg:hidden"><span className="inline-flex rounded-xl bg-black px-4 py-2 text-white"><UberWordmark className="text-2xl" /></span></div>
          <span className="grid size-12 place-items-center rounded-full bg-uber-gray-100"><Lock className="size-6" /></span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">Yönetici girişi</h2>
          <p className="mt-2 text-uber-gray-600">Devam etmek için kullanıcı adı ve şifreni gir.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="u" className="label">Kullanıcı adı</label>
              <input id="u" className="input" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
            </div>
            <div>
              <label htmlFor="p" className="label">Şifre</label>
              <div className="relative">
                <input id="p" type={show ? "text" : "password"} className="input pr-12" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-uber-gray-600 hover:bg-uber-gray-200" aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}>
                  <Eye className="size-5" />
                </button>
              </div>
            </div>
            {error && <p role="alert" className="rounded-lg bg-uber-red/10 px-4 py-3 text-sm font-medium text-uber-red">{error}</p>}
            <button className="btn-primary w-full py-4" disabled={loading}>
              {loading ? "Giriş yapılıyor…" : <>Giriş yap <ArrowRight className="size-5" /></>}
            </button>
          </form>
          <a href="/" className="mt-8 inline-block text-sm text-uber-gray-600 underline-offset-4 hover:underline">← Kariyer sayfasına dön</a>
        </div>
      </div>
    </div>
  );
}
