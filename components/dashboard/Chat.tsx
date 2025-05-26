"use client";

import UserMessage from "./sub/user-message";
import AssistanceMessage from "./sub/assistance-message";
import PromptInput from "./PromptInput";
import { useChat } from "@ai-sdk/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { v4 as uuidv4 } from "uuid";
import { useState, useMemo, useEffect } from "react";

export default function Chat({ isDashboard }: { isDashboard: boolean }) {
  const params = useParams();
  const router = useRouter();

  // Track if we've started a conversation
  const [hasStartedChat, setHasStartedChat] = useState(false);

  // Fix: Use useMemo to prevent chatId from changing on every render
  const chatId = useMemo(() => {
    return isDashboard ? uuidv4() : (params?.chatid as string);
  }, [isDashboard, params?.chatid]);

  // Reset hasStartedChat when we're back on dashboard
  useEffect(() => {
    if (isDashboard) {
      setHasStartedChat(false);
    }
  }, [isDashboard]);

  const user = useQuery(api.functions.user.currentUser);

  // Always call the query, but conditionally pass parameters
  const getMessages = useQuery(
    api.functions.message.getMessages,
    chatId && !isDashboard ? { chatId: chatId as string } : "skip"
  );

  const createMessage = useMutation(api.functions.message.createMessage);
  const createChat = useMutation(api.functions.chat.createChat);

  const {
    messages,
    input,
    setInput,
    setMessages,
    handleInputChange,
    status,
    handleSubmit,
  } = useChat({
    api: "/api/chat",
    body: {
      chatId: chatId as string,
      userId: user?._id,
    },
  });

  // Load existing messages for non-dashboard mode
  useEffect(() => {
    if (!isDashboard && getMessages && getMessages.length > 0) {
      setMessages(
        getMessages.map((message) => ({
          id: message._id,
          content: message.content,
          role: message.role as "user" | "assistant",
        }))
      );
    }
  }, [getMessages, isDashboard, setMessages]);

  // Early return after all hooks are called
  if (!user) {
    return null;
  }

  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    try {
      if (isDashboard && !hasStartedChat) {
        // First message: create chat in background but don't navigate
        await createChat({
          userId: user._id,
          chatId: chatId as string,
        });

        // Update URL without navigation (optional - for bookmarking)
        window.history.pushState(null, "", `/chat/${chatId}`);

        // Mark that we've started the chat
        setHasStartedChat(true);
      }

      // Always create the message in database
      await createMessage({
        chatId: chatId as string,
        content: input,
        role: "user",
      });

      // Let useChat handle the AI response
      handleSubmit();
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  // Show dashboard view only if we haven't started chatting
  if (isDashboard && !hasStartedChat) {
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
                AI is thinking...
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
