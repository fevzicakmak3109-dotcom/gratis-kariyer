"use client";
import { useRef, useState } from "react";
import { AVAILABILITY_OPTIONS, CITIES, CV_UPLOAD_ENABLED, EXPERIENCE_OPTIONS, NO_EXPERIENCE, ROLE } from "@/lib/positions";
import { ArrowRight, Check, Close, FileIcon, Headset, Lock, Phone, Upload } from "./icons";

const REQUIRED = ["firstName", "lastName", "email", "phone", "city", "availability", "experience", "consent"];

type Errors = Partial<Record<string, string>>;

const MAX_CV = 5 * 1024 * 1024;
const EXT = ["pdf", "doc", "docx"];

function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("90")) d = d.slice(2);
  if (d && !d.startsWith("0")) d = "0" + d;
  d = d.slice(0, 11);
  const parts = [d.slice(0, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)].filter(Boolean);
  return parts.join(" ");
}

function validate(f: FormData, cv: File | null, needsCv: boolean): Errors {
  const e: Errors = {};
  const s = (k: string) => String(f.get(k) ?? "").trim();
  if (s("firstName").length < 2) e.firstName = "Adını gir.";
  if (s("lastName").length < 2) e.lastName = "Soyadını gir.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s("email"))) e.email = "Geçerli bir e-posta adresi gir.";
  if (!/^05\d{9}$/.test(s("phone").replace(/\D/g, ""))) e.phone = "05XX XXX XX XX formatında bir cep telefonu gir.";
  if (!s("city")) e.city = "Bir şehir seç.";
  const li = s("linkedin");
  if (li && !/^https?:\/\/(www\.)?linkedin\.com\//i.test(li)) e.linkedin = "Bağlantı linkedin.com ile başlamalı.";
  if (!s("availability")) e.availability = "Ne kadar vakit ayırabileceğini seç.";
  if (!s("experience")) e.experience = "Deneyim süreni seç.";
  if (needsCv && !cv) e.cv = "CV dosyanı yükle.";
  if (!f.get("consent")) e.consent = "Devam etmek için KVKK metnini onaylamalısın.";
  return e;
}

export function ApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [serverError, setServerError] = useState("");
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [progress, setProgress] = useState(0);
  const needsCv = CV_UPLOAD_ENABLED && experience !== NO_EXPERIENCE;

  function pickFile(f: File | undefined) {
    if (!f) return;
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!EXT.includes(ext)) return setErrors((e) => ({ ...e, cv: "Yalnızca PDF, DOC veya DOCX yükleyebilirsin." }));
    if (f.size > MAX_CV) return setErrors((e) => ({ ...e, cv: "CV en fazla 5 MB olabilir." }));
    setCv(f);
    setErrors((e) => ({ ...e, cv: undefined }));
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setServerError("");
    const fd = new FormData(ev.currentTarget);
    const errs = validate(fd, cv, needsCv);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"], #field-${first}`)?.focus();
      return;
    }
    if (needsCv && cv) fd.set("cv", cv);
    else fd.delete("cv");
    setStatus("sending");
    try {
      const res = await fetch("/api/applications", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(data.errors ?? {});
        setServerError(data.error ?? "Bir hata oluştu, lütfen tekrar dene.");
        setStatus("idle");
        return;
      }
      setName(String(fd.get("firstName")));
      setStatus("done");
    } catch {
      setServerError("Bağlantı hatası. İnternet bağlantını kontrol edip tekrar dene.");
      setStatus("idle");
    }
  }

  function reset() {
    formRef.current?.reset();
    setCv(null);
    setPhone("");
    setExperience("");
    setAvailability("");
    setProgress(0);
    setErrors({});
    setStatus("idle");
  }

  const err = (k: string) =>
    errors[k] ? <p id={`${k}-err`} className="mt-1.5 text-[13px] font-medium text-tc-red">{errors[k]}</p> : null;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <section id="basvuru" className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef3fc_100%)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="eyebrow">Başvuru formu</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
            Kariyerin <span className="relative whitespace-nowrap text-tc-blue">burada<svg className="absolute -bottom-1.5 left-0 w-full text-tc-yellow" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden><path d="M2 9 C 60 2, 140 2, 198 7" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg></span> başlıyor.
          </h2>
          <p className="mt-4 text-lg text-tc-gray-600">2 dakikada başvur, gerisini bize bırak. Deneyimin olsun ya da olmasın, seni bekliyoruz.</p>
        </div>
        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-40px_rgba(40,85,172,0.45)] ring-1 ring-tc-gray-100 lg:grid lg:grid-cols-[0.85fr_1.4fr]">
          {/* Sol panel */}
          <aside className="relative overflow-hidden bg-[linear-gradient(160deg,#3561c4_0%,#2855ac_45%,#1b3778_100%)] p-8 text-white sm:p-10">
            <div className="hex absolute -bottom-20 -right-16 size-64 bg-white/[0.06]" aria-hidden />
            <div className="hex absolute -right-6 bottom-24 size-16 animate-float bg-tc-yellow/90" aria-hidden />
            <div className="relative flex items-center gap-3">
              <span className="relative grid size-12 place-items-center rounded-2xl bg-tc-yellow text-tc-navy">
                <Headset className="size-6" />
                <span className="absolute -right-1 -top-1 flex size-3.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-tc-green opacity-75" /><span className="relative inline-flex size-3.5 rounded-full border-2 border-white bg-tc-green" /></span>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Pozisyon</p>
                <p className="font-bold leading-tight">{ROLE}</p>
              </div>
            </div>
            <h3 className="relative mt-8 text-3xl font-bold tracking-[-0.02em] sm:text-4xl sm:leading-[1.1]">Turkcell&apos;in sesi olmaya hazır mısın?</h3>
            <p className="relative mt-4 text-[15px] leading-relaxed text-white/75">
              Formu doldur; İK ekibimiz başvurunu inceleyip en kısa sürede seni telefonla arasın.
            </p>
            <ul className="relative mt-8 space-y-4 text-[15px]">
              {["Ad, soyad ve iletişim bilgileri", "Cep telefonu numarası", "Ne kadar vakit ayırabileceğin", "Deneyim süren (yoksa da olur!)"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/15"><Check className="size-3.5" strokeWidth={3} /></span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="relative mt-10 flex items-center gap-2 text-[13px] text-white/60"><Lock className="size-4" /> Verilerin KVKK kapsamında korunur.</p>
          </aside>

          {/* Form */}
          <div className="p-6 sm:p-10">
            {status === "done" ? (
              <div className="flex h-full min-h-[480px] flex-col items-center justify-center text-center">
                <span className="relative grid size-24 place-items-center">
                  <span className="absolute inset-0 animate-ring rounded-full bg-tc-yellow" />
                  <span className="relative grid size-20 place-items-center rounded-full bg-tc-yellow text-tc-navy"><Phone className="size-9 animate-shake" /></span>
                </span>
                <h3 className="mt-6 text-3xl font-bold tracking-tight">Teşekkürler, {name}!</h3>
                <p className="mt-3 max-w-md text-tc-gray-600">
                  Başvurun bize ulaştı. İK ekibimiz birkaç iş günü içinde seni telefonla arayacak; telefonun açık olsun! 📞
                </p>
                <p className="mt-2 font-bold text-tc-yellow-600">#senyapdiye</p>
                <button onClick={reset} className="btn-secondary mt-8">Yeni başvuru yap</button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={onSubmit}
                onChange={(e) => {
                  const n = (e.target as unknown as { name?: string }).name;
                  if (n && errors[n]) setErrors((x) => ({ ...x, [n]: undefined }));
                  const fd = new FormData(e.currentTarget);
                  setProgress(REQUIRED.filter((k) => String(fd.get(k) ?? "").trim()).length / REQUIRED.length);
                }}
                noValidate
                className="grid gap-5 sm:grid-cols-2">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                {/* ilerleme */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between text-[13px] font-semibold">
                    <span className="text-tc-gray-600">{progress === 1 ? "Hazırsın, gönderebilirsin! 🎉" : "Formu doldur"}</span>
                    <span className="tabular-nums text-tc-blue">%{Math.round(progress * 100)}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-tc-gray-100">
                    <div className={`h-full rounded-full transition-all duration-500 ${progress === 1 ? "bg-tc-green" : "bg-tc-yellow"}`} style={{ width: `${Math.max(4, progress * 100)}%` }} />
                  </div>
                </div>

                <div>
                  <label htmlFor="firstName" className="label">Ad *</label>
                  <input id="firstName" name="firstName" className="input" autoComplete="given-name" placeholder="Adın" {...aria("firstName")} />
                  {err("firstName")}
                </div>
                <div>
                  <label htmlFor="lastName" className="label">Soyad *</label>
                  <input id="lastName" name="lastName" className="input" autoComplete="family-name" placeholder="Soyadın" {...aria("lastName")} />
                  {err("lastName")}
                </div>
                <div>
                  <label htmlFor="email" className="label">E-posta *</label>
                  <input id="email" name="email" type="email" inputMode="email" className="input" autoComplete="email" placeholder="ornek@mail.com" {...aria("email")} />
                  {err("email")}
                </div>
                <div>
                  <label htmlFor="phone" className="label">Cep telefonu *</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px]">🇹🇷</span>
                    <input
                      id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" className="input pl-11"
                      placeholder="05XX XXX XX XX" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} {...aria("phone")}
                    />
                  </div>
                  {err("phone")}
                </div>
                <div>
                  <label htmlFor="city" className="label">Şehir *</label>
                  <select id="city" name="city" defaultValue="" className="input select" {...aria("city")}>
                    <option value="" disabled>Seç</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {err("city")}
                </div>
                <div>
                  <label htmlFor="linkedin" className="label">LinkedIn <span className="font-normal text-tc-gray-600">(isteğe bağlı)</span></label>
                  <input id="linkedin" name="linkedin" type="url" inputMode="url" className="input" placeholder="https://linkedin.com/in/..." {...aria("linkedin")} />
                  {err("linkedin")}
                </div>

                {/* Vakit */}
                <fieldset className="sm:col-span-2" id="field-availability">
                  <legend className="label">Ne kadar vakit ayırabilirsin? *</legend>
                  <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                    {AVAILABILITY_OPTIONS.map((o) => {
                      const active = availability === o.id;
                      return (
                        <label
                          key={o.id}
                          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 px-3 py-3.5 text-center transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-tc-blue ${
                            active
                              ? "border-tc-blue bg-tc-blue text-white shadow-[0_10px_24px_-12px_rgba(40,85,172,0.8)]"
                              : errors.availability
                                ? "border-tc-red bg-white hover:bg-tc-gray-50"
                                : "border-tc-gray-100 bg-white hover:border-tc-blue/40"
                          }`}
                        >
                          <input type="radio" name="availability" value={o.id} checked={active} onChange={() => setAvailability(o.id)} className="sr-only" {...aria("availability")} />
                          <span className="text-[15px] font-semibold">{o.label}</span>
                          <span className={`mt-0.5 text-[12px] ${active ? "text-white/75" : "text-tc-gray-400"}`}>{o.hint}</span>
                        </label>
                      );
                    })}
                  </div>
                  {err("availability")}
                </fieldset>

                {/* Deneyim */}
                <fieldset className="sm:col-span-2" id="field-experience">
                  <legend className="label">Kaç yıl iş deneyimin var? * <span className="font-normal text-tc-gray-600">Deneyimin yoksa da başvurabilirsin.</span></legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {EXPERIENCE_OPTIONS.map((o) => {
                      const active = experience === o.id;
                      return (
                        <label
                          key={o.id}
                          className={`flex cursor-pointer items-center justify-center rounded-2xl border-2 px-3 py-3 text-center text-[14px] font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-tc-blue ${
                            active
                              ? "border-tc-blue bg-tc-blue text-white"
                              : errors.experience
                                ? "border-tc-red bg-white hover:bg-tc-gray-50"
                                : "border-tc-gray-100 bg-white hover:border-tc-blue/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="experience"
                            value={o.id}
                            checked={active}
                            onChange={() => {
                              setExperience(o.id);
                              if (o.id === NO_EXPERIENCE) setErrors((x) => ({ ...x, cv: undefined }));
                            }}
                            className="sr-only"
                            {...aria("experience")}
                          />
                          {o.label}
                        </label>
                      );
                    })}
                  </div>
                  {err("experience")}
                  {CV_UPLOAD_ENABLED && experience === NO_EXPERIENCE && (
                    <p className="mt-3 rounded-xl bg-tc-gray-50 px-4 py-3 text-[14px] leading-relaxed text-tc-gray-600">
                      Sorun değil, herkes bir yerden başlar. Deneyimin olmadığı için CV yüklemene gerek yok; aşağıda kendinden kısaca bahsetmen yeterli.
                    </p>
                  )}
                </fieldset>

                {/* CV yükleme: şimdilik kapalı (CV_UPLOAD_ENABLED); açıkken deneyimi olmayan adaylara gösterilmez */}
                {needsCv && (
                <div className="sm:col-span-2">
                  <span className="label">CV *</span>
                  {cv ? (
                    <div className="flex items-center gap-4 rounded-xl border-2 border-tc-blue bg-white p-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-tc-navy text-white"><FileIcon className="size-6" /></span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{cv.name}</p>
                        <p className="text-[13px] text-tc-gray-600">{(cv.size / 1024 / 1024).toFixed(2)} MB · Yüklemeye hazır</p>
                      </div>
                      <button type="button" onClick={() => { setCv(null); if (fileRef.current) fileRef.current.value = ""; }} className="grid size-9 place-items-center rounded-full hover:bg-tc-gray-100" aria-label="CV'yi kaldır">
                        <Close className="size-5" />
                      </button>
                    </div>
                  ) : (
                    <label
                      id="field-cv"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileRef.current?.click(); } }}
                      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                      onDragLeave={() => setDrag(false)}
                      onDrop={(e) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files[0]); }}
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-9 text-center outline-none transition focus-visible:border-tc-blue ${
                        drag ? "border-tc-blue bg-tc-gray-100" : errors.cv ? "border-tc-red bg-white" : "border-tc-gray-200 bg-tc-gray-50 hover:border-tc-gray-400"
                      }`}
                    >
                      <span className="grid size-12 place-items-center rounded-full bg-tc-navy text-white"><Upload className="size-6" /></span>
                      <span className="mt-4 font-semibold">CV&apos;ni sürükle bırak veya <span className="underline underline-offset-4">dosya seç</span></span>
                      <span className="mt-1 text-[13px] text-tc-gray-600">PDF, DOC, DOCX · En fazla 5 MB</span>
                      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="sr-only" tabIndex={-1} onChange={(e) => pickFile(e.target.files?.[0])} />
                    </label>
                  )}
                  {err("cv")}
                </div>
                )}

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="label">Kısaca kendinden bahset <span className="font-normal text-tc-gray-600">(isteğe bağlı)</span></label>
                  <textarea id="message" name="message" rows={3} maxLength={1000} className="input resize-none" placeholder="Neden müşteri temsilcisi olmak istiyorsun? Varsa deneyimlerinden bahset." />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-tc-gray-600">
                    <input name="consent" type="checkbox" className="mt-0.5 size-5 shrink-0 accent-tc-blue" {...aria("consent")} />
                    <span>Kişisel verilerimin işe alım süreci kapsamında 6698 sayılı KVKK&apos;ya uygun olarak işlenmesini kabul ediyorum. *</span>
                  </label>
                  {err("consent")}
                </div>

                {serverError && <p role="alert" className="rounded-lg bg-tc-red/10 px-4 py-3 text-sm font-medium text-tc-red sm:col-span-2">{serverError}</p>}

                <div className="sm:col-span-2">
                  <button type="submit" disabled={status === "sending"} className="btn-primary w-full py-4 text-base sm:w-auto sm:px-10">
                    {status === "sending" ? (
                      <><span className="size-5 animate-spin rounded-full border-2 border-tc-navy/30 border-t-tc-navy" /> Gönderiliyor…</>
                    ) : (
                      <>Başvuruyu gönder <ArrowRight className="size-5" /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
