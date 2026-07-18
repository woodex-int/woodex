import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSettings, saveSettings, type ThemeSettings } from "@/lib/settings";

export async function GET(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const data = await getSettings();
  return NextResponse.json({ ok: true, data });
}

export async function PUT(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as Partial<ThemeSettings>;
    const current = await getSettings();
    const next: ThemeSettings = {
      ...current,
      ...body,
      colors: { ...current.colors, ...(body.colors ?? {}) },
      fonts: { ...current.fonts, ...(body.fonts ?? {}) },
      buttons: { ...current.buttons, ...(body.buttons ?? {}) },
      header: { ...current.header, ...(body.header ?? {}) },
      footer: { ...current.footer, ...(body.footer ?? {}) },
      hero: { ...current.hero, ...(body.hero ?? {}) },
      homeSections: Array.isArray(body.homeSections)
        ? body.homeSections
        : current.homeSections,
    };
    await saveSettings(next);
    return NextResponse.json({ ok: true, data: next });
  } catch (error) {
    console.error("[admin/settings] save failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save settings." },
      { status: 500 }
    );
  }
}
