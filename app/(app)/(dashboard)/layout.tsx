import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main className="w-full dark:bg-[#0F0F10] ">{children}</main>
    </div>
  );
}
