/** Admin dashboard layout — no server auth gate, pure pass-through. */
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
