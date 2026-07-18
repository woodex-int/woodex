"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Store token — this is the ONLY auth mechanism
      localStorage.setItem("woodex_admin_key", data.token);

      // Navigate to dashboard
      window.location.href = "/admin";
    } catch {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1410", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%", background: "#c9a84c",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 700, color: "#1a1410", fontFamily: "Georgia, serif",
          }}>W</div>
          <h1 style={{ marginTop: 16, fontSize: 22, fontWeight: 600, color: "#fff", letterSpacing: 4, fontFamily: "Georgia, serif" }}>
            WOODEX INTERIOR
          </h1>
          <p style={{ marginTop: 6, fontSize: 11, color: "#c9a84c", letterSpacing: 3, textTransform: "uppercase" }}>
            Admin Dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} style={{
          background: "#221c15", border: "1px solid #3a3025", borderRadius: 12,
          padding: 32,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: "#fff", marginBottom: 4, fontFamily: "Georgia, serif" }}>
            Sign In
          </h2>
          <p style={{ fontSize: 13, color: "#8a7e6e", marginBottom: 24 }}>
            Enter your credentials to access the dashboard
          </p>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8a7e6e", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              autoComplete="username"
              style={{
                width: "100%", padding: "12px 14px", background: "#1a1410",
                border: "1px solid #3a3025", borderRadius: 8, color: "#fff",
                fontSize: 14, outline: "none", boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
              onBlur={(e) => (e.target.style.borderColor = "#3a3025")}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8a7e6e", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              required
              autoComplete="current-password"
              style={{
                width: "100%", padding: "12px 14px", background: "#1a1410",
                border: "1px solid #3a3025", borderRadius: 8, color: "#fff",
                fontSize: 14, outline: "none", boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
              onBlur={(e) => (e.target.style.borderColor = "#3a3025")}
            />
          </div>

          {error && (
            <div style={{
              background: "#3a1515", border: "1px solid #5a2020", borderRadius: 8,
              padding: "10px 14px", marginBottom: 16, color: "#ff8a8a", fontSize: 13,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "13px 0", background: loading ? "#8a7e3e" : "#c9a84c",
              color: "#1a1410", border: "none", borderRadius: 8, fontSize: 13,
              fontWeight: 600, letterSpacing: 2, textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: "#5c5347" }}>
            admin / woodex-admin-2026
          </p>
        </form>
      </div>
    </div>
  );
}
