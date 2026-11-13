import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { Application } from "./types";

/**
 * Basit dosya tabanlı depolama. Başvurular data/applications.json içinde,
 * CV dosyaları data/cv/ altında tutulur. Üretimde bu modül bir veritabanı
 * (Postgres, Supabase vb.) ve nesne depolama (S3, Vercel Blob) ile
 * aynı arayüz korunarak değiştirilebilir.
 */
const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "applications.json");
const CV_DIR = path.join(DATA_DIR, "cv");

let queue: Promise<unknown> = Promise.resolve();
function serialize<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function ensureDirs() {
  await fs.mkdir(CV_DIR, { recursive: true });
}

async function readAll(): Promise<Application[]> {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, "utf8")) as Application[];
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

async function writeAll(items: Application[]) {
  await ensureDirs();
  const tmp = DB_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(items, null, 2), "utf8");
  await fs.rename(tmp, DB_FILE);
}

export async function listApplications() {
  const items = await readAll();
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getApplication(id: string) {
  return (await readAll()).find((a) => a.id === id) ?? null;
}

export async function createApplication(app: Application, cv: Buffer) {
  return serialize(async () => {
    await ensureDirs();
    await fs.writeFile(path.join(CV_DIR, app.cv.storedName), cv);
    const items = await readAll();
    items.push(app);
    await writeAll(items);
    return app;
  });
}

export async function updateApplication(id: string, patch: Partial<Pick<Application, "status" | "notes">>) {
  return serialize(async () => {
    const items = await readAll();
    const idx = items.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...patch, updatedAt: new Date().toISOString() };
    await writeAll(items);
    return items[idx];
  });
}

export async function deleteApplication(id: string) {
  return serialize(async () => {
    const items = await readAll();
    const app = items.find((a) => a.id === id);
    if (!app) return false;
    await writeAll(items.filter((a) => a.id !== id));
    await fs.rm(path.join(CV_DIR, app.cv.storedName), { force: true });
    return true;
  });
}

export async function readCv(storedName: string) {
  const safe = path.basename(storedName);
  return fs.readFile(path.join(CV_DIR, safe));
}
