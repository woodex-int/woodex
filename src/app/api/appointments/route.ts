import { NextResponse } from "next/server";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import {
  sendWhatsAppMessage,
  buildWhatsAppLink,
  studioWhatsAppText,
  clientConfirmationText,
} from "@/lib/whatsapp";
import { getSettings } from "@/lib/settings";
import { isAdmin } from "@/lib/admin-auth";
import { desc } from "drizzle-orm";

const clean = (v: unknown, max = 400) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

function humanizeDate(raw: string): string {
  const t = raw.toLowerCase();
  const now = new Date();
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  if (/(day after tomorrow)/.test(t)) {
    const d = new Date(now);
    d.setDate(d.getDate() + 2);
    return fmt(d);
  }
  if (/tomorrow/.test(t)) {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    return fmt(d);
  }
  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed) && !/^\d{1,2}(am|pm)/.test(t))
    return fmt(new Date(parsed));
  return raw;
}

function humanizeTime(raw: string): string {
  return raw.trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const name = clean(body.name, 120);
    const whatsapp = clean(body.whatsapp, 40).replace(/[^\d+]/g, "");
    if (!name || !whatsapp) {
      return NextResponse.json(
        { ok: false, error: "Name and WhatsApp number are required." },
        { status: 422 }
      );
    }

    const payload = {
      name,
      whatsapp,
      companyName: clean(body.companyName, 160) || null,
      location: clean(body.location, 200) || null,
      service: clean(body.service, 160) || null,
      preferredDate: body.preferredDate ? humanizeDate(clean(body.preferredDate, 60)) : null,
      preferredTime: body.preferredTime ? humanizeTime(clean(body.preferredTime, 30)) : null,
      notes: clean(body.notes, 800) || null,
      source: clean(body.source, 40) || "ai-assistant",
    };

    await db.insert(appointments).values(payload);

    /* ── WhatsApp delivery ── */
    const settings = await getSettings();
    const studioNumber =
      (settings.integrations?.whatsappNumber || "92322400768").replace(/[^\d]/g, "");
    const notify = settings.integrations?.notifyOnAppointment !== false;

    let studioDispatch: Awaited<ReturnType<typeof sendWhatsAppMessage>> = {
      sent: false,
      provider: "wame",
      link: "",
    };
    if (notify) {
      studioDispatch = await sendWhatsAppMessage({
        number: studioNumber,
        text: studioWhatsAppText(payload),
      });
    }

    // Client confirmation via Cloud API (or deep-link fallback)
    const clientText = clientConfirmationText(payload);
    const clientDispatch = await sendWhatsAppMessage({
      number: whatsapp,
      text: clientText,
    });

    const followUpLink = buildWhatsAppLink({
      number: studioNumber,
      text: `Hello Woodex! I just booked a consultation — ${payload.name}${payload.service ? ` (${payload.service})` : ""}. Looking forward to confirming the schedule.`,
    });

    return NextResponse.json({
      ok: true,
      message:
        "Your appointment is booked. Our design team will confirm the schedule on WhatsApp shortly.",
      whatsapp: {
        studioNotified: studioDispatch.sent,
        studioProvider: studioDispatch.provider,
        clientConfirmed: clientDispatch.sent,
        clientProvider: clientDispatch.provider,
        followUpLink,
      },
    });
  } catch (error) {
    console.error("[appointments] failed", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not book your appointment right now — please reach us on WhatsApp directly.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  // Cookie session OR header token both grant access
  if (!(await isAdmin(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const rows = await db
      .select()
      .from(appointments)
      .orderBy(desc(appointments.createdAt))
      .limit(200);
    return NextResponse.json({ ok: true, data: rows });
  } catch (error) {
    console.error("[appointments] read failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not load appointments." },
      { status: 500 }
    );
  }
}
