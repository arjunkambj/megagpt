import Chat from "@/components/dashboard/Chat";

interface ChatPageProps {
  params: Promise<{
    chatid: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatid } = await params;
  const isDashboard = false;

  return (
    <section className="flex relative  justify-center items-center h-full w-full flex-col gap-4">
      <Chat isDashboard={isDashboard} initialChatId={chatid} />
    </section>
  );
}
