import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1">{children}</main>
    </>
  );
}
