import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSettings, saveSettings } from "@/lib/settings";
import { BUSINESS, SERVICES, PROJECTS, ARTICLES } from "@/lib/data";

/** GET → full site export (settings + content). POST → import settings bundle. */
export async function GET(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const bundle = {
    exportedAt: new Date().toISOString(),
    site: BUSINESS.name,
    settings: await getSettings(),
    content: { business: BUSINESS, services: SERVICES, projects: PROJECTS, articles: ARTICLES },
  };
  return new NextResponse(JSON.stringify(bundle, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="woodex-export-${Date.now()}.json"`,
    },
  });
}

export async function POST(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const incoming = body?.settings ?? body;
    if (!incoming || typeof incoming !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid import payload — expected a settings object." },
        { status: 422 }
      );
    }
    const current = await getSettings();
    await saveSettings({ ...current, ...incoming });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/transfer] import failed", error);
    return NextResponse.json({ ok: false, error: "Import failed." }, { status: 500 });
  }
}
