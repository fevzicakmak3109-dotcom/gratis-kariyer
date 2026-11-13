"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BUSINESS_LINES, CV_UPLOAD_ENABLED, GENERAL_LINE, businessLineName, experienceLabel } from "@/lib/positions";
import type { Application } from "@/lib/types";
import { UberWordmark } from "@/components/Logo";
import { LiveVisitors } from "./LiveVisitors";
import { BUSINESS_ICONS, Download, FileIcon, Logout, Refresh, Search, Trash } from "@/components/icons";
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

  const filtered = useMemo(() => {
    const term = q.trim().toLocaleLowerCase("tr-TR");
    return items.filter((a) => {
      if (line !== "all" && a.businessLine !== line) return false;
      if (!term) return true;
      return [a.firstName, a.lastName, a.email, a.phone, a.role, a.city].join(" ").toLocaleLowerCase("tr-TR").includes(term);
    });
  }, [items, q, line]);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 864e5;
    return {
      total: items.length,
      unrouted: items.filter((a) => a.businessLine === GENERAL_LINE).length,
      today: items.filter((a) => new Date(a.createdAt).toDateString() === new Date().toDateString()).length,
      week: items.filter((a) => new Date(a.createdAt).getTime() > weekAgo).length,
    };
  }, [items]);

  const byLine = useMemo(
    () =>
      [{ id: GENERAL_LINE, name: "Yönlendirilmedi", accent: "#AFAFAF" }, ...BUSINESS_LINES].map((b) => ({
        ...b,
        count: items.filter((a) => a.businessLine === b.id).length,
      })),
    [items],
  );
  const maxLine = Math.max(1, ...byLine.map((b) => b.count));

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  function onUpdated(a: Application) {
    setItems((xs) => xs.map((x) => (x.id === a.id ? a : x)));
    setSelected(a);
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
      <header className="sticky top-0 z-30 bg-black text-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline gap-3">
            <UberWordmark className="text-2xl" />
            <span className="hidden text-sm font-medium text-uber-gray-400 min-[400px]:inline">İşe Alım Paneli</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <LiveVisitors />
            <a href="/" target="_blank" className="hidden rounded-full px-4 py-2 text-sm font-medium hover:bg-uber-gray-800 sm:inline-flex">Siteyi gör</a>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium hover:bg-uber-gray-800 sm:px-4">
              <Logout className="size-5" /> <span className="hidden sm:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Başvurular</h1>
            <p className="mt-1 text-uber-gray-600">Uber Türkiye genel başvurularını takip et ve yönet.</p>
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
            { label: "Yönlendirilmedi", value: stats.unrouted, dot: "#AFAFAF" },
            { label: "Bugün gelen", value: stats.today, dot: "#276EF1" },
            { label: "Son 7 gün", value: stats.week, dot: "#06C167" },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-4 sm:p-6 ${s.dark ? "bg-black text-white" : "bg-white"}`}>
              <p className={`flex items-center gap-2 text-[13px] font-medium sm:text-sm ${s.dark ? "text-uber-gray-400" : "text-uber-gray-600"}`}>
                {s.dot && <span className="size-2 rounded-full" style={{ background: s.dot }} />}
                {s.label}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</p>
            </div>
          ))}
        </div>

        {/* İş kolu dağılımı */}
        <div className="mt-4 rounded-2xl bg-white p-4 sm:p-6">
          <p className="text-sm font-semibold">Ekiplere yönlendirme</p>
          <p className="mt-0.5 text-[13px] text-uber-gray-600">Genel başvuruları detay ekranından uygun iş koluna yönlendirebilirsin.</p>
          <div className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {byLine.map((b) => (
              <button key={b.id} onClick={() => setLine(line === b.id ? "all" : b.id)} className="group flex items-center gap-3 text-left">
                <span className="w-40 shrink-0 truncate text-[13px] font-medium sm:w-48">{b.name}</span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-uber-gray-100">
                  <span className="block h-full rounded-full transition-all" style={{ width: `${(b.count / maxLine) * 100}%`, background: b.accent, opacity: line === "all" || line === b.id ? 1 : 0.3 }} />
                </span>
                <span className="w-6 text-right text-[13px] font-semibold tabular-nums">{b.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filtreler */}
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-uber-gray-600" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="İsim, e-posta, telefon veya pozisyon ara" className="input bg-white pl-12" />
          </div>
          <select value={line} onChange={(e) => setLine(e.target.value)} className="input select bg-white lg:w-64">
            <option value="all">Tüm ekipler</option>
            <option value={GENERAL_LINE}>Yönlendirilmedi</option>
            {BUSINESS_LINES.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        {/* Liste */}
        <div className="mt-3 overflow-hidden rounded-2xl bg-white">
          {loading && !items.length ? (
            <div className="space-y-px">{[0, 1, 2, 3].map((i) => <div key={i} className="h-[72px] animate-pulse bg-uber-gray-50" />)}</div>
          ) : !filtered.length ? (
            <div className="px-6 py-20 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-uber-gray-100"><FileIcon className="size-6" /></span>
              <p className="mt-4 font-semibold">{items.length ? "Filtrelere uyan başvuru yok" : "Henüz başvuru yok"}</p>
              <p className="mt-1 text-sm text-uber-gray-600">{items.length ? "Arama veya filtreleri değiştirmeyi dene." : "Kariyer sayfasından gelen başvurular burada listelenecek."}</p>
            </div>
          ) : (
            <>
              {/* Masaüstü tablo */}
              <table className="hidden w-full text-left md:table">
                <thead className="border-b border-uber-gray-100 text-[13px] text-uber-gray-600">
                  <tr>
                    <th className="px-6 py-3.5 font-medium">Aday</th>
                    <th className="px-4 py-3.5 font-medium">Yönlendirilen ekip</th>
                    <th className="px-4 py-3.5 font-medium">Deneyim</th>
                    <th className="px-4 py-3.5 font-medium">Telefon</th>
                    <th className="px-4 py-3.5 font-medium">Şehir</th>
                    <th className="px-4 py-3.5 font-medium">Tarih</th>
                    <th className="w-16 px-6 py-3.5"><span className="sr-only">Sil</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-uber-gray-100">
                  {filtered.map((a) => {
                    const b = BUSINESS_LINES.find((x) => x.id === a.businessLine);
                    const Icon = BUSINESS_ICONS[a.businessLine];
                    return (
                      <tr key={a.id} onClick={() => setSelected(a)} className="cursor-pointer transition hover:bg-uber-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-black text-sm font-semibold text-white">{initials(a)}</span>
                            <div className="min-w-0">
                              <p className="truncate font-semibold">{a.firstName} {a.lastName}</p>
                              <p className="truncate text-[13px] text-uber-gray-600">{a.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {b && Icon ? (
                            <div className="flex items-center gap-2.5">
                              <span className="grid size-7 shrink-0 place-items-center rounded-lg" style={{ background: b.accent, color: b.accent === "#FFC043" ? "#000" : "#fff" }}><Icon className="size-4" /></span>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium">{b.name}</p>
                                <p className="truncate text-[12px] text-uber-gray-600">{a.role}</p>
                              </div>
                            </div>
                          ) : (
                            <span className="inline-flex rounded-full bg-uber-gray-100 px-2.5 py-1 text-xs font-semibold text-uber-gray-600">Yönlendirilmedi</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          {a.experience ? experienceLabel(a.experience) : <span className="text-uber-gray-400">—</span>}
                          {CV_UPLOAD_ENABLED && !a.cv && <span className="mt-1 block w-fit rounded-full bg-uber-gray-100 px-2 py-0.5 text-[11px] font-semibold text-uber-gray-600">CV yok</span>}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm tabular-nums">{a.phone}</td>
                        <td className="px-4 py-4 text-sm">{a.city}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-uber-gray-600">{fmtDate(a.createdAt)}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={(e) => { e.stopPropagation(); setToDelete(a); }}
                            className="grid size-9 place-items-center rounded-full text-uber-gray-600 transition hover:bg-uber-red/10 hover:text-uber-red"
                            aria-label={`${a.firstName} ${a.lastName} başvurusunu sil`}
                            title="Başvuruyu sil"
                          >
                            <Trash className="size-[18px]" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Mobil kartlar */}
              <ul className="divide-y divide-uber-gray-100 md:hidden">
                {filtered.map((a) => (
                  <li key={a.id} className="flex items-center">
                    <button onClick={() => setSelected(a)} className="flex min-w-0 flex-1 items-start gap-3 py-4 pl-4 pr-2 text-left active:bg-uber-gray-50">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-black text-sm font-semibold text-white">{initials(a)}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{a.firstName} {a.lastName}</p>
                        <p className="truncate text-sm">{businessLineName(a.businessLine)}</p>
                        <p className="mt-1 text-[13px] text-uber-gray-600">{a.experience ? `${experienceLabel(a.experience)} · ` : ""}{a.city} · {fmtDate(a.createdAt)}</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setToDelete(a)}
                      className="mr-3 grid size-10 shrink-0 place-items-center rounded-full text-uber-gray-600 active:bg-uber-red/10 active:text-uber-red"
                      aria-label={`${a.firstName} ${a.lastName} başvurusunu sil`}
                    >
                      <Trash className="size-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        {!!filtered.length && <p className="mt-3 text-sm text-uber-gray-600">{filtered.length} başvuru gösteriliyor</p>}
      </main>

      {selected && <ApplicationDrawer app={selected} onClose={() => setSelected(null)} onUpdated={onUpdated} />}

      {/* Silme onayı */}
      {toDelete && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center" role="alertdialog" aria-modal="true" aria-labelledby="del-title">
          <div className="absolute inset-0 bg-black/50" onClick={() => !deleting && setToDelete(null)} />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <span className="grid size-12 place-items-center rounded-full bg-uber-red/10 text-uber-red"><Trash className="size-6" /></span>
            <h2 id="del-title" className="mt-4 text-xl font-bold">Başvuru silinsin mi?</h2>
            <p className="mt-2 text-[15px] text-uber-gray-600">
              <strong className="text-black">{toDelete.firstName} {toDelete.lastName}</strong> adlı adayın başvurusu ve CV&apos;si kalıcı olarak silinecek. Bu işlem geri alınamaz.
            </p>
            <div className="mt-6 flex gap-2">
              <button onClick={() => setToDelete(null)} disabled={deleting} className="btn-secondary flex-1 py-3">Vazgeç</button>
              <button onClick={confirmDelete} disabled={deleting} className="inline-flex flex-1 items-center justify-center rounded-lg bg-uber-red py-3 text-[15px] font-medium text-white transition hover:opacity-90 disabled:opacity-60">
                {deleting ? "Siliniyor…" : "Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
