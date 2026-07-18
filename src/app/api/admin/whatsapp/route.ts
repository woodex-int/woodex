import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import { getSettings } from "@/lib/settings";

/** POST { to, text } — send a test message through the configured provider. */
export async function POST(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => null);
    const to = typeof body?.to === "string" ? body.to.trim() : "";
    const text =
      typeof body?.text === "string" && body.text.trim()
        ? body.text.trim()
        : "Woodex WhatsApp connector test — configuration active ✔";

    const settings = await getSettings();
    const number = (to || settings.integrations?.whatsappNumber || "").replace(
      /[^\d]/g,
      ""
    );
    if (!number) {
      return NextResponse.json(
        { ok: false, error: "No WhatsApp number configured." },
        { status: 422 }
      );
    }

    const result = await sendWhatsAppMessage({ number, text });
    return NextResponse.json({
      ok: result.sent || result.provider === "wame",
      ...result,
    });
  } catch (error) {
    console.error("[admin/whatsapp] test failed", error);
    return NextResponse.json({ ok: false, error: "Test failed." }, { status: 500 });
  }
}
