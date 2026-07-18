import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { isAdmin } from "@/lib/admin-auth";

export async function GET(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const rows = await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt))
      .limit(200);
    return NextResponse.json({ ok: true, data: rows });
  } catch (error) {
    console.error("[admin/inquiries] read failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not load inquiries." },
      { status: 500 }
    );
  }
}
