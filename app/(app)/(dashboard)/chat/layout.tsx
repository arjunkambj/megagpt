import DashboardIcon from "@/components/dashboard/DashboardIcon";
import AvatarDropdown from "@/components/dashboard/sub/AvatarDropdown";
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex relative h-full w-full flex-col gap-4">
      <DashboardIcon />
      {children}
    </section>
  );
}
