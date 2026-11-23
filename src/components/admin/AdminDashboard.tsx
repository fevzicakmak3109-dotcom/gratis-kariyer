"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AVAILABILITY_OPTIONS, EXPERIENCE_OPTIONS, NO_EXPERIENCE, availabilityLabel } from "@/lib/positions";
import type { Application } from "@/lib/types";
import { TurkcellLogo } from "@/components/Logo";
import { LiveVisitors } from "./LiveVisitors";
import { Download, FileIcon, Home, Logout, Phone, Refresh, Search, Trash, Wallet } from "@/components/icons";
import { ApplicationDrawer } from "./ApplicationDrawer";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" });
const initials = (a: Application) => (a.firstName[0] + a.lastName[0]).toLocaleUpperCase("tr-TR");

export function AdminDashboard() {
  const router = useRouter();
  const [items, setItems] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [line, setLine] = useState("all");
  const [callF, setCallF] = useState<"all" | "pending" | "called">("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const [toDelete, setToDelete] = useState<Application | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/applications", { cache: "no-store" });
    if (res.status === 401) return router.replace("/admin/login");
    const data = await res.json();
    setItems(data.items);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  // Sıra numarası: ilk başvuran 1, en son başvuran en büyük numara. Arama/filtre numarayı değiştirmez.
  const numbers = useMemo(() => {
    const m = new Map<string, number>();
    [...items].sort((a, b) => a.createdAt.localeCompare(b.createdAt)).forEach((a, i) => m.set(a.id, i + 1));
    return m;
  }, [items]);

  const filtered = useMemo(() => {
    const term = q.trim().toLocaleLowerCase("tr-TR");
    return items.filter((a) => {
      if (line !== "all" && a.availability !== line) return false;
      if (callF === "called" && !a.called) return false;
      if (callF === "pending" && a.called) return false;
      if (!term) return true;
      return [a.firstName, a.lastName, a.email, a.phone, a.role, a.city].join(" ").toLocaleLowerCase("tr-TR").includes(term);
    });
  }, [items, q, line, callF]);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 864e5;
    return {
      total: items.length,
      pending: items.filter((a) => !a.called).length,
      today: items.filter((a) => new Date(a.createdAt).toDateString() === new Date().toDateString()).length,
      week: items.filter((a) => new Date(a.createdAt).getTime() > weekAgo).length,
    };
  }, [items]);

  const byAvail = useMemo(
    () => AVAILABILITY_OPTIONS.map((o) => ({ ...o, count: items.filter((a) => a.availability === o.id).length })),
    [items],
  );
  const maxAvail = Math.max(1, ...byAvail.map((b) => b.count));
  const byExp = useMemo(
    () => EXPERIENCE_OPTIONS.map((o) => ({ ...o, count: items.filter((a) => a.experience === o.id).length })),
    [items],
  );
  const maxExp = Math.max(1, ...byExp.map((b) => b.count));

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  function onUpdated(a: Application) {
    setItems((xs) => xs.map((x) => (x.id === a.id ? a : x)));
    setSelected(a);
  }
  /** Arandı / İkamet / Hesap işaretleri: anında güncellenir, sunucu hata verirse geri alınır. */
  async function toggleFlag(a: Application, key: FlagKey) {
    const next = !a[key];
    const set = (v: boolean) => setItems((xs) => xs.map((x) => (x.id === a.id ? { ...x, [key]: v } : x)));
    set(next);
    try {
      const res = await fetch(`/api/admin/applications/${a.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: next }),
      });
      if (!res.ok) set(!next);
    } catch {
      set(!next);
    }
  }
  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/applications/${toDelete.id}`, { method: "DELETE" });
    setDeleting(false);
    if (res.ok) {
      setItems((xs) => xs.filter((x) => x.id !== toDelete.id));
      if (selected?.id === toDelete.id) setSelected(null);
      setToDelete(null);
    }
  }

  return (
    <>
      {/* Üst bar */}
      <header className="sticky top-0 z-30 bg-tc-blue text-white shadow-[0_8px_24px_-16px_rgba(27,55,120,0.8)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <TurkcellLogo white className="w-[150px] sm:w-[178px]" />
            <span className="hidden border-l border-white/25 pl-3 text-sm font-medium text-white/70 lg:inline">İşe Alım Paneli</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <LiveVisitors />
            <a href="/" target="_blank" className="hidden rounded-full px-4 py-2 text-sm font-medium hover:bg-white/15 sm:inline-flex">Siteyi gör</a>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium hover:bg-white/15 sm:px-4">
              <Logout className="size-5" /> <span className="hidden sm:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Başvurular</h1>
            <p className="mt-1 text-tc-gray-600">Çağrı Merkezi Müşteri Temsilcisi başvurularını takip et, adayları ara.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="btn-secondary px-4 py-2.5 text-sm" aria-label="Yenile"><Refresh className={`size-4 ${loading ? "animate-spin" : ""}`} /> Yenile</button>
            <a href="/api/admin/export" className="btn-primary px-4 py-2.5 text-sm"><Download className="size-4" /> CSV indir</a>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { label: "Toplam başvuru", value: stats.total, dark: true },
            { label: "Aranmayı bekliyor", value: stats.pending, dot: "#FFC900" },
            { label: "Bugün gelen", value: stats.today, dot: "#2855AC" },
            { label: "Son 7 gün", value: stats.week, dot: "#12B76A" },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-4 sm:p-6 ${s.dark ? "bg-[linear-gradient(150deg,#3561c4,#1b3778)] text-white" : "bg-white"}`}>
              <p className={`flex items-center gap-2 text-[13px] font-medium sm:text-sm ${s.dark ? "text-white/70" : "text-tc-gray-600"}`}>
                {s.dot && <span className="size-2 rounded-full" style={{ background: s.dot }} />}
                {s.label}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Dağılımlar */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 sm:p-6">
            <p className="text-sm font-semibold">Vakit ayırma tercihi</p>
            <p className="mt-0.5 text-[13px] text-tc-gray-600">Bir satıra tıklayarak listeyi filtreleyebilirsin.</p>
            <div className="mt-4 space-y-3">
              {byAvail.map((b) => (
                <button key={b.id} onClick={() => setLine(line === b.id ? "all" : b.id)} className="group flex w-full items-center gap-3 text-left">
                  <span className="w-28 shrink-0 truncate text-[13px] font-medium sm:w-32">{b.label}</span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-tc-gray-100">
                    <span className="block h-full rounded-full transition-all" style={{ width: `${(b.count / maxAvail) * 100}%`, background: b.color, opacity: line === "all" || line === b.id ? 1 : 0.3 }} />
                  </span>
                  <span className="w-8 text-right text-[13px] font-semibold tabular-nums">{b.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 sm:p-6">
            <p className="text-sm font-semibold">Deneyim dağılımı</p>
            <p className="mt-0.5 text-[13px] text-tc-gray-600">Deneyimsiz adaylar da bu pozisyon için uygundur.</p>
            <div className="mt-4 space-y-3">
              {byExp.map((b) => (
                <div key={b.id} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 truncate text-[13px] font-medium sm:w-32">{b.label}</span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-tc-gray-100">
                    <span className="block h-full rounded-full transition-all" style={{ width: `${(b.count / maxExp) * 100}%`, background: b.id === NO_EXPERIENCE ? "#FFC900" : "#2855AC" }} />
                  </span>
                  <span className="w-8 text-right text-[13px] font-semibold tabular-nums">{b.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filtreler */}
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-tc-gray-600" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="İsim, e-posta, telefon veya şehir ara" className="input bg-white pl-12" />
          </div>
          <div className="flex gap-3">
            <select value={line} onChange={(e) => setLine(e.target.value)} className="input select bg-white lg:w-52">
              <option value="all">Tüm vakitler</option>
              {AVAILABILITY_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
            <select value={callF} onChange={(e) => setCallF(e.target.value as typeof callF)} className="input select bg-white lg:w-48">
              <option value="all">Tümü</option>
              <option value="pending">Aranmadı</option>
              <option value="called">Arandı</option>
            </select>
          </div>
        </div>
        {/* Liste */}
        <div className="mt-3 overflow-x-auto rounded-2xl bg-white">
          {loading && !items.length ? (
            <div className="space-y-px">{[0, 1, 2, 3].map((i) => <div key={i} className="h-[72px] animate-pulse bg-tc-gray-50" />)}</div>
          ) : !filtered.length ? (
            <div className="px-6 py-20 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-tc-gray-100"><FileIcon className="size-6" /></span>
              <p className="mt-4 font-semibold">{items.length ? "Filtrelere uyan başvuru yok" : "Henüz başvuru yok"}</p>
              <p className="mt-1 text-sm text-tc-gray-600">{items.length ? "Arama veya filtreleri değiştirmeyi dene." : "Kariyer sayfasından gelen başvurular burada listelenecek."}</p>
            </div>
          ) : (
            <>
              {/* Masaüstü tablo */}
              <table className="hidden w-full text-left md:table">
                <thead className="border-b border-tc-gray-100 text-[13px] text-tc-gray-600">
                  <tr>
                    <th className="w-14 py-3.5 pl-6 pr-0 font-medium">#</th>
                    <th className="px-4 py-3.5 font-medium">Aday</th>
                    <th className="px-4 py-3.5 font-medium">Vakit</th>
                    <th className="px-4 py-3.5 font-medium">Telefon</th>
                    <th className="hidden px-4 py-3.5 font-medium xl:table-cell">Şehir</th>
                    <th className="hidden px-4 py-3.5 font-medium xl:table-cell">Tarih</th>
                    <th className="px-4 py-3.5 text-right font-medium">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tc-gray-100">
                  {filtered.map((a) => {
                    const av = AVAILABILITY_OPTIONS.find((x) => x.id === a.availability);
                    return (
                      <tr key={a.id} onClick={() => setSelected(a)} className="cursor-pointer transition hover:bg-tc-gray-50">
                        <td className="py-4 pl-6 pr-0 text-sm font-medium tabular-nums text-tc-gray-600">{numbers.get(a.id)}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tc-yellow text-sm font-bold text-tc-navy">{initials(a)}</span>
                            <div className="min-w-0 max-w-[12.5rem] xl:max-w-[20rem]">
                              <p className="truncate font-semibold">{a.firstName} {a.lastName}</p>
                              <p className="truncate text-[13px] text-tc-gray-600">{a.email}</p>
                              <p className="truncate text-[12px] text-tc-gray-400 xl:hidden">{a.city} · {fmtDate(a.createdAt)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {av ? (
                            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-tc-gray-50 px-2.5 py-1 text-xs font-semibold">
                              <span className="size-2 rounded-full" style={{ background: av.color }} />
                              {av.label}
                            </span>
                          ) : (
                            <span className="text-sm text-tc-gray-400">—</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm tabular-nums">{a.phone}</td>
                        <td className="hidden px-4 py-4 text-sm xl:table-cell">{a.city}</td>
                        <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-tc-gray-600 xl:table-cell">{fmtDate(a.createdAt)}</td>
                        <td className="px-4 py-4">
                         <div className="flex items-center justify-end gap-1.5">
                          <FlagChips a={a} onToggle={toggleFlag} />
                          <button
                            onClick={(e) => { e.stopPropagation(); setToDelete(a); }}
                            className="grid size-9 place-items-center rounded-full text-tc-gray-600 transition hover:bg-tc-red/10 hover:text-tc-red"
                            aria-label={`${a.firstName} ${a.lastName} başvurusunu sil`}
                            title="Başvuruyu sil"
                          >
                            <Trash className="size-[18px]" />
                          </button>
                         </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Mobil kartlar */}
              <ul className="divide-y divide-tc-gray-100 md:hidden">
                {filtered.map((a) => (
                  <li key={a.id} className="pb-4">
                    <div className="flex items-center">
                      <span className="w-8 shrink-0 pl-4 text-[13px] font-medium tabular-nums text-tc-gray-600">{numbers.get(a.id)}</span>
                      <button onClick={() => setSelected(a)} className="flex min-w-0 flex-1 items-start gap-3 pb-3 pl-3 pr-2 pt-4 text-left active:bg-tc-gray-50">
                        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-tc-yellow text-sm font-bold text-tc-navy">{initials(a)}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{a.firstName} {a.lastName}</p>
                          <p className="truncate text-sm">{availabilityLabel(a.availability)} · {a.phone}</p>
                          <p className="mt-1 text-[13px] text-tc-gray-600">{a.city} · {fmtDate(a.createdAt)}</p>
                        </div>
                      </button>
                      <button
                        onClick={() => setToDelete(a)}
                        className="mr-3 grid size-10 shrink-0 place-items-center rounded-full text-tc-gray-600 active:bg-tc-red/10 active:text-tc-red"
                        aria-label={`${a.firstName} ${a.lastName} başvurusunu sil`}
                      >
                        <Trash className="size-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-[68px] pr-4">
                      <FlagChips a={a} onToggle={toggleFlag} />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        {!!filtered.length && <p className="mt-3 text-sm text-tc-gray-600">{filtered.length} başvuru gösteriliyor</p>}
      </main>

      {selected && <ApplicationDrawer app={selected} onClose={() => setSelected(null)} onUpdated={onUpdated} />}

      {/* Silme onayı */}
      {toDelete && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center" role="alertdialog" aria-modal="true" aria-labelledby="del-title">
          <div className="absolute inset-0 bg-tc-navy/50" onClick={() => !deleting && setToDelete(null)} />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <span className="grid size-12 place-items-center rounded-full bg-tc-red/10 text-tc-red"><Trash className="size-6" /></span>
            <h2 id="del-title" className="mt-4 text-xl font-bold">Başvuru silinsin mi?</h2>
            <p className="mt-2 text-[15px] text-tc-gray-600">
              <strong className="text-tc-navy">{toDelete.firstName} {toDelete.lastName}</strong> adlı adayın başvurusu kalıcı olarak silinecek. Bu işlem geri alınamaz.
            </p>
            <div className="mt-6 flex gap-2">
              <button onClick={() => setToDelete(null)} disabled={deleting} className="btn-secondary flex-1 py-3">Vazgeç</button>
              <button onClick={confirmDelete} disabled={deleting} className="inline-flex flex-1 items-center justify-center rounded-lg bg-tc-red py-3 text-[15px] font-medium text-white transition hover:opacity-90 disabled:opacity-60">
                {deleting ? "Siliniyor…" : "Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type FlagKey = "called" | "residence" | "account";
const FLAGS: { key: FlagKey; label: string; icon: (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element }[] = [
  { key: "called", label: "Arandı", icon: Phone },
  { key: "residence", label: "İkamet", icon: Home },
  { key: "account", label: "Hesap", icon: Wallet },
];

function FlagChips({ a, onToggle }: { a: Application; onToggle: (a: Application, key: FlagKey) => void }) {
  return (
    <>
      {FLAGS.map((f) => (
        <FlagChip key={f.key} on={!!a[f.key]} label={f.label} icon={f.icon} onClick={() => onToggle(a, f.key)} who={`${a.firstName} ${a.lastName}`} />
      ))}
    </>
  );
}

/** Küçük işaret kutucuğu: solda ikon, sağda yazı. Açılınca ikon dönerek tik'e dönüşür, kutu yeşile boyanır. */
function FlagChip({
  on,
  label,
  icon: Icon,
  onClick,
  who,
}: {
  on: boolean;
  label: string;
  icon: (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  onClick: () => void;
  who: string;
}) {
  const [burst, setBurst] = useState(0);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (!on) setBurst((b) => b + 1);
        onClick();
      }}
      aria-pressed={on}
      aria-label={`${who}: ${label} ${on ? "tamamlandı, geri almak için tıkla" : "işaretle"}`}
      title={on ? `${label} ✓ (geri almak için tıkla)` : `${label} olarak işaretle`}
      className={`relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${
        on
          ? "border-tc-green bg-tc-green text-white shadow-[0_6px_14px_-6px_rgba(18,183,106,0.8)]"
          : "border-tc-gray-200 bg-white text-tc-gray-600 hover:border-tc-blue/40 hover:text-tc-navy"
      } ${burst && on ? "animate-[chipPop_.45s_ease-out]" : ""}`}
      key={burst}
    >
      {burst > 0 && on && <span className="pointer-events-none absolute inset-0 animate-[chipFlash_.6s_ease-out_both] bg-white/40" aria-hidden />}
      <span className="relative grid size-4 place-items-center">
        {on ? (
          <svg viewBox="0 0 24 24" className={`size-4 ${burst ? "animate-[spinIn_.5s_cubic-bezier(.2,.8,.2,1)_both]" : ""}`} aria-hidden>
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="24"
              className={burst ? "animate-[drawCheck_.4s_.2s_ease-out_both]" : ""}
            />
          </svg>
        ) : (
          <Icon className="size-4" />
        )}
      </span>
      {label}
    </button>
  );
}
