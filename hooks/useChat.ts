import { useChat as useAIChat } from "@ai-sdk/react";
import { useQuery, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useMemo, useEffect, useCallback } from "react";

import { api } from "@/convex/_generated/api";

export function useChat(isDashboard: boolean, initialChatId?: string) {
  const params = useParams();

  // Generate stable chatId
  const chatId = useMemo(() => {
    if (isDashboard) {
      return initialChatId || uuidv4();
    }

    return params?.chatid as string;
  }, [isDashboard, initialChatId, params?.chatid]);

  const user = useQuery(api.functions.user.currentUser);

  // Only fetch messages for existing chats
  const getMessages = useQuery(
    api.functions.message.getMessages,
    !isDashboard && chatId ? { chatId } : "skip",
  );

  const createChat = useMutation(api.functions.chat.createChat);

  const {
    messages,
    input,
    setInput,
    setMessages,
    handleInputChange,
    status,
    handleSubmit,
  } = useAIChat({
    api: "/api/chat",
    body: {
      chatId,
      userId: user?._id,
    },
  });

  // Load existing messages for chat pages
  useEffect(() => {
    if (!isDashboard && getMessages && getMessages.length > 0) {
      setMessages(
        getMessages.map((message) => ({
          id: message._id,
          content: message.content,
          role: message.role as "user" | "assistant",
        })),
      );
    }
  }, [getMessages, isDashboard, setMessages]);

  // Reset messages for new dashboard chats
  useEffect(() => {
    if (isDashboard) {
      setMessages([]);
    }
  }, [isDashboard, setMessages]);

  const onSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault();
      if (!input.trim() || !user) return;

      try {
        // Update URL immediately before submitting (similar to ai-chatbot)
        if (isDashboard) {
          // Update URL first for immediate feedback
          window.history.replaceState({}, "", `/chat/${chatId}`);

          // Then create the chat in the database
          await createChat({
            userId: user._id,
            chatId,
          });
        }
        // Let useChat handle the message flow
        handleSubmit();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error submitting message:", error);
      }
    },
    [input, user, isDashboard, createChat, chatId, handleSubmit],
  );

  return {
    chatId,
    user,
    messages,
    input,
    setInput,
    handleInputChange,
    status,
    onSubmit,
    isLoading: !user,
    messagesLoading: !isDashboard && getMessages === undefined && !!chatId,
  };
}
