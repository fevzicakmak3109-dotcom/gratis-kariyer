import { NextResponse } from "next/server";
import { deleteApplication, updateApplication } from "@/lib/storage";
import { STATUSES, type StatusId } from "@/lib/types";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { status?: string; notes?: string };
  const patch: { status?: StatusId; notes?: string } = {};
  if (body.status !== undefined) {
    if (!STATUSES.some((s) => s.id === body.status))
      return NextResponse.json({ error: "Geçersiz durum" }, { status: 400 });
    patch.status = body.status as StatusId;
  }
  if (body.notes !== undefined) patch.notes = String(body.notes).slice(0, 2000);
  const updated = await updateApplication(id, patch);
  if (!updated) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json({ item: updated });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const ok = await deleteApplication(id);
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
}
