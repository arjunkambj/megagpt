"use client";

import UserMessage from "./sub/user-message";
import AssistanceMessage from "./sub/assistance-message";
import PromptInput from "./PromptInput";
import { Spinner } from "@heroui/spinner";
import { useChat } from "@/hooks/useChat";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { UI_CONFIG } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Chat({
  isDashboard,
  initialChatId,
}: {
  isDashboard: boolean;
  initialChatId?: string;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [hasAppendedQuery, setHasAppendedQuery] = useState(false);

  const {
    chatId,
    messages,
    input,
    setInput,
    handleInputChange,
    status,
    onSubmit,
    isLoading,
  } = useChat(isDashboard, initialChatId);

  // Handle query parameter similar to ai-chatbot
  useEffect(() => {
    if (query && !hasAppendedQuery && isDashboard) {
      setInput(query);
      setHasAppendedQuery(true);
      // Update URL to remove query parameter
      window.history.replaceState({}, "", `/chat/${chatId}`);
    }
  }, [query, hasAppendedQuery, isDashboard, chatId, setInput]);

  const hasMessages = messages.length > 0;

  if (isLoading) {
    return <LoadingSpinner message={UI_CONFIG.LOADING_MESSAGES.CHAT} />;
  }

  // Dashboard view (new chat)
  if (!hasMessages) {
    return (
      <section className="flex h-full w-full items-center justify-center md:max-w-2xl">
        <PromptInput
          handleInputChange={handleInputChange}
          input={input}
          isDashboard={isDashboard}
          setInput={setInput}
          chatId={chatId}
          onSubmit={onSubmit}
        />
      </section>
    );
  }

  // Chat view (existing chat)
  return (
    <section className="flex h-full w-full md:max-w-2xl flex-col gap-4">
      <div className="flex flex-col md:pt-10 gap-5 flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user" ? (
              <div className="flex justify-end">
                <UserMessage message={message.content} />
              </div>
            ) : (
              <AssistanceMessage message={message.content} />
            )}
          </div>
        ))}
        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 p-4">
              <Spinner color="secondary" size="sm" />
              <span className="text-sm text-default-500">
                {UI_CONFIG.LOADING_MESSAGES.AI_THINKING}
              </span>
            </div>
          </div>
        )}
      </div>
      <PromptInput
        handleInputChange={handleInputChange}
        input={input}
        isDashboard={false}
        setInput={setInput}
        chatId={chatId}
        onSubmit={onSubmit}
      />
    </section>
  );
}
