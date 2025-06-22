import { v4 as uuidv4 } from "uuid";

import ChatSection from "@/components/chat/ChatSection";
import TopMenuBar from "@/components/chat/TopMenuBar";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chat?: string[] }>;
}) {
  const { chat } = await params;
  const isNewChat = !chat || chat.length < 1;
  const chatId = isNewChat ? uuidv4() : chat[0];

  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full">
      <TopMenuBar />
      <ChatSection
        key={chatId}
        chatId={chatId}
        initialMessages={[]}
        isnewchat={isNewChat}
      />
    </section>
  );
}
