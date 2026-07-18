/**
 * Central admin auth — DATABASE-BACKED (no environment variables).
 *
 * Why: env vars caused repeated login loops — inlined into edge bundles at
 * build time, stripped from the runtime process, and delivered with raw
 * quotes. Now credentials live in the `admin_users` table (scrypt-hashed)
 * and the session secret lives in the DB `settings` row — the login issuer
 * and every validator read the same source at request time, so they can
 * never diverge.
 */
import { eq } from "drizzle-orm";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { db } from "@/db";
import { adminUsers, settings } from "@/db/schema";

export const SESSION_COOKIE = "woodex_admin";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

export const DEFAULT_ADMIN_USERNAME = "admin";
export const DEFAULT_ADMIN_PASSWORD = "woodex-admin-2026";

const clean = (v: string | undefined | null) =>
  (v ?? "").trim().replace(/^["']+|["']+$/g, "").trim();

/* ── Password hashing (scrypt) ─────────────────────────── */

function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString("hex");
}

/** Insert the default admin once (idempotent). */
export async function ensureSeedAdmin(): Promise<void> {
  try {
    const rows = await db.select().from(adminUsers).limit(1);
    if (rows.length > 0) return;
    const salt = randomBytes(16).toString("hex");
    await db.insert(adminUsers).values({
      username: DEFAULT_ADMIN_USERNAME,
      passwordHash: `${salt}:${hashPassword(DEFAULT_ADMIN_PASSWORD, salt)}`,
      role: "admin",
    });
  } catch (e) {
    console.error("[admin-auth] seed failed", e);
  }
}

/** Validate username + password against the database. */
export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  try {
    await ensureSeedAdmin();
    const rows = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username.trim()))
      .limit(1);
    const user = rows[0];
    if (!user) return false;
    const [salt, stored] = user.passwordHash.split(":");
    if (!salt || !stored) return false;
    const candidate = hashPassword(password, salt);
    const a = Buffer.from(stored, "utf8");
    const b = Buffer.from(candidate, "utf8");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch (e) {
    console.error("[admin-auth] verify failed", e);
    return false;
  }
}

/* ── Session token (DB-stored secret → HMAC) ───────────── */

async function getSecuritySecret(): Promise<string> {
  try {
    const rows = await db
      .select()
      .from(settings)
      .where(eq(settings.id, "security"))
      .limit(1);
    const existing = rows[0]?.data as { sessionSecret?: string } | undefined;
    if (existing?.sessionSecret) return existing.sessionSecret;

    const secret = randomBytes(32).toString("hex");
    await db
      .insert(settings)
      .values({ id: "security", data: { sessionSecret: secret }, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: settings.id,
        set: { data: { sessionSecret: secret }, updatedAt: new Date() },
      });
    return secret;
  } catch (e) {
    console.error("[admin-auth] security secret unavailable", e);
    // Deterministic fallback so the app never bricks if the DB read hiccups
    return "woodex-local-fallback-secret";
  }
}

export async function sessionToken(): Promise<string> {
  const secret = await getSecuritySecret();
  return createHmac("sha256", secret).update("w1.woodex.studio").digest("base64url");
}

export async function isValidSessionValue(
  value: string | undefined | null
): Promise<boolean> {
  const v = clean(value);
  if (!v) return false;
  return v === (await sessionToken());
}

function cookieValueFromHeader(header: string): string | null {
  const m = header.match(/(?:^|;\s*)woodex_admin=("[^"]*"|[^;]+)/);
  if (!m) return null;
  try {
    return clean(decodeURIComponent(m[1] ?? ""));
  } catch {
    return clean(m[1]);
  }
}

export async function isAdmin(req: Request): Promise<boolean> {
  const headerKey =
    clean(req.headers.get("x-admin-key")) ||
    clean(new URL(req.url).searchParams.get("key"));
  if (await isValidSessionValue(headerKey)) return true;

  const cookieHeader = req.headers.get("cookie") || "";
  return isValidSessionValue(cookieValueFromHeader(cookieHeader));
}
