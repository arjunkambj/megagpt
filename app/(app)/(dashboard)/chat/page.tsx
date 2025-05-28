import { v4 as uuidv4 } from "uuid";

import Chat from "@/components/dashboard/Chat";

interface ChatPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;

  // Generate a new chat ID for new chats (similar to ai-chatbot)
  const chatId = uuidv4();
  const isDashboard = true;

  // Use timestamp or generate new key to force component remount for new chats
  const timestamp = resolvedSearchParams.t as string;
  const componentKey = timestamp || chatId;

  return (
    <section className="flex items-center justify-center h-full w-full flex-col gap-4">
      <Chat
        key={componentKey}
        initialChatId={chatId}
        isDashboard={isDashboard}
      />
    </section>
  );
}
