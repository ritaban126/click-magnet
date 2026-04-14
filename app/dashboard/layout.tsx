// Layout is a simple passthrough — the Dashboard page handles its own layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}