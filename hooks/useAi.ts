import { useChat } from "@ai-sdk/react";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { addToast } from "@heroui/toast";
import { useQuery } from "convex-helpers/react/cache/hooks";
import { useDisclosure } from "@heroui/modal";
import { useAtom } from "jotai";

import { aiModelAtom } from "@/atoms/aimodel";
import { searchAtom } from "@/atoms/searchState";
import { api } from "@/convex/_generated/api";

export const useAI = ({
  isnewchat,
  chatId,
}: {
  isnewchat: boolean;
  chatId: string;
}) => {
  const user = useQuery(api.function.users.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useAtom(searchAtom);
  const [currentModelId] = useAtom(aiModelAtom);
  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onOpenChange: onLoginModalOpenChange,
  } = useDisclosure();

  const getMessages = useQuery(api.function.messages.getMessagesByChatId, {
    chatId,
  });

  const createChat = useMutation(api.function.chats.createChatByChatId);

  const {
    messages,
    setMessages,
    input,
    setInput,
    stop,
    reload,
    handleInputChange,
    handleSubmit,
    status,
  } = useChat({
    api: "/api/chat",
    body: {
      chatId,
      userId: user?._id,
      search,
      modelId: currentModelId,
    },
  });

  useEffect(() => {
    // Only show loading for existing chats when we're waiting for messages
    if (!isnewchat && !getMessages) {
      setIsLoading(true);
    } else {
      setIsLoading(false);

      // Set messages for existing chats
      if (getMessages && !isnewchat && messages.length === 0) {
        setMessages(
          getMessages.map((message) => ({
            id: message._id,
            role: message.role,
            content: message.content,
            createdAt: new Date(message._creationTime),
            parts: message.parts,
          })),
        );
      }
    }
  }, [getMessages, isnewchat, setMessages]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim()) return;

      if (!user) {
        onLoginModalOpen();
        setInput("");

        return;
      }

      try {
        if (isnewchat) {
          window.history.replaceState({}, "", `/chat/${chatId}`);
          createChat({
            userId: user._id,
            chatId,
          });
        }

        handleSubmit();
        setSearch(false);
      } catch (error) {
        void error;
        addToast({
          title: "Error",
          description: "Something went wrong",
          color: "danger",
          timeout: 1500,
        });
      }
    },
    [handleSubmit, isnewchat, chatId, user, createChat, onLoginModalOpen],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!user) {
          onLoginModalOpen();
          setInput("");

          return;
        }

        try {
          if (isnewchat && user) {
            window.history.replaceState({}, "", `/chat/${chatId}`);
            createChat({
              userId: user._id,
              chatId,
            });
          }
          handleSubmit();
          setSearch(false);
        } catch (error) {
          void error;
          addToast({
            title: "Error",
            description: "Something went wrong",
            color: "danger",
          });
        }
      }
    },
    [handleSubmit, isnewchat, chatId, user, createChat, onLoginModalOpen],
  );

  return {
    messages,
    input,
    setInput,
    handleInputChange,
    onSubmit,
    handleKeyDown,
    status,
    stop,
    reload,
    loadingUser: !user,
    loadingMessages: !isnewchat && !getMessages,
    isLoading,
    isLoginModalOpen,
    onLoginModalOpen,
    onLoginModalOpenChange,
  };
};
