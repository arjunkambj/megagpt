"use client";

import { Spinner } from "@heroui/spinner";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollShadow } from "@heroui/scroll-shadow";

import UserMessage from "./sub/user-message";
import AssistanceMessage from "./sub/assistance-message";
import PromptInput from "./PromptInput";

import { useChat } from "@/hooks/useChat";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { UI_CONFIG } from "@/lib/constants";

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
    messagesLoading,
    chatNotFound,
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

  // Show loading when messages are being fetched for existing chats
  if (messagesLoading) {
    return <LoadingSpinner message={UI_CONFIG.LOADING_MESSAGES.MESSAGES} />;
  }

  // Handle chat not found (will redirect automatically)
  if (chatNotFound) {
    return <LoadingSpinner message="Chat not found, redirecting..." />;
  }

  // Dashboard view (new chat)
  if (!hasMessages) {
    return (
      <section className="flex h-full w-full items-center justify-center px-4 md:px-0">
        <div className="w-full md:max-w-2xl">
          <PromptInput
            chatId={chatId}
            handleInputChange={handleInputChange}
            input={input}
            isDashboard={isDashboard}
            setInput={setInput}
            onSubmit={onSubmit}
          />
        </div>
      </section>
    );
  }

  // Chat view (existing chat)
  return (
    <section className="flex h-full w-full items-center flex-col gap-4">
      <ScrollShadow
        className="h-full w-full flex justify-center h-[calc(100vh-150px)] overflow-y-auto px-4 md:px-4 pt-20"
        size={10}
        visibility="auto"
      >
        <div className="flex w-full md:max-w-3xl pb-10 flex-col gap-4 md:gap-10">
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
              <div className="flex items-center gap-2 p-3 md:p-4">
                <Spinner
                  className="flex-shrink-0"
                  color="secondary"
                  size="md"
                  variant="dots"
                />
                <span className="text-md text-default-500">
                  {UI_CONFIG.LOADING_MESSAGES.AI_THINKING}
                </span>
              </div>
            </div>
          )}
        </div>
      </ScrollShadow>

      <div className="absolute bottom-6 w-full px-3 flex justify-center">
        <div className="w-full md:max-w-3xl">
          <PromptInput
            chatId={chatId}
            handleInputChange={handleInputChange}
            input={input}
            isDashboard={false}
            setInput={setInput}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </section>
  );
}
