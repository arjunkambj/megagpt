import Chat from "@/components/dashboard/Chat";

export default function ChatPage() {
  const isDashboard = false;

  return (
    <section className="flex relative justify-center items-center h-full w-full flex-col gap-4">
      <Chat isDashboard={isDashboard} />
    </section>
  );
}
