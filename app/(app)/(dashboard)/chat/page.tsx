import Chat from "@/components/dashboard/Chat";
import SidebarToggle from "@/components/dashboard/sub/sidebar-toggle";

export default function ChatPage() {
  const isDashboard = true;

  return (
    <section className=" flex items-center justify-center h-full w-full flex-col gap-4">
      <Chat isDashboard={isDashboard} />
    </section>
  );
}
