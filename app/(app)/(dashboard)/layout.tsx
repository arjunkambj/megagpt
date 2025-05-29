import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main className="w-full px-4 dark:bg-[#0F0F0F] ">{children}</main>
    </div>
  );
}
