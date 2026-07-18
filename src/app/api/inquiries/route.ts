import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

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
    const phone = clean(body.phone, 40);

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone number are required." },
        { status: 422 }
      );
    }

    await db.insert(inquiries).values({
      name,
      phone,
      email: clean(body.email, 160) || null,
      projectType: clean(body.projectType, 120) || null,
      location: clean(body.location, 200) || null,
      area: clean(body.area, 120) || null,
      services: clean(body.services, 300) || null,
      startDate: clean(body.startDate, 80) || null,
      budget: clean(body.budget, 120) || null,
      message: clean(body.message, 3000) || null,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[inquiries] failed to store enquiry", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not submit your enquiry right now. Please reach us on WhatsApp instead.",
      },
      { status: 500 }
    );
  }
}
