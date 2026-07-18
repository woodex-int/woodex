import { NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  sessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/admin-auth";

/**
 * Admin login — validates username + password against the `admin_users`
 * DATABASE table (environment variables fully bypassed), then issues the
 * HMAC session token as a first-party cookie. The dashboard gate and API
 * guards re-derive the same token from the same DB secret at request time.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const username =
      typeof body?.username === "string" ? body.username.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!username || !password) {
      return NextResponse.json(
        { ok: false, error: "Username and password are required." },
        { status: 422 }
      );
    }

    if (!(await verifyAdminCredentials(username, password))) {
      // Small delay to slow brute-force attempts
      await new Promise((r) => setTimeout(r, 700));
      return NextResponse.json(
        { ok: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const token = await sessionToken();
    const res = NextResponse.json({ ok: true, token });
    // SameSite=Lax is the safest default — works in both direct and
    // iframe/preview contexts without being blocked as third-party.
    // NOT HttpOnly so the client can read it as a JS fallback when
    // the browser strips cookies from cross-origin iframe navigations.
    res.cookies.set(SESSION_COOKIE, token, {
      path: "/",
      sameSite: "lax",
      secure: false,
      httpOnly: false,
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch (error) {
    console.error("[admin/login] failed", error);
    return NextResponse.json({ ok: false, error: "Login failed." }, { status: 500 });
  }
}

/** Logout — expire the session cookie. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
