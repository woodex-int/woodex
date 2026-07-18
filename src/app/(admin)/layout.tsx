import type { Metadata } from "next";

/**
 * Admin route group layout — completely bypasses the main site chrome
 * (no header, no footer, no grain overlay, no chat widget, no theme CSS injection).
 * This ensures the admin pages load fast and the login flow is never
 * interfered with by the site's dynamic layout.
 */
export const metadata: Metadata = {
  title: "Woodex Studio — Admin Dashboard",
  robots: "noindex, nofollow",
};

export default function AdminGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Inter', -apple-system, sans-serif; background: #faf7f2; color: #1a1410; -webkit-font-smoothing: antialiased; }
          .font-serif { font-family: Georgia, 'Times New Roman', serif; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
