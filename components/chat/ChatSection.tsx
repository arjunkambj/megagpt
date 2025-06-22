"use client";

import { Message } from "@ai-sdk/react";
import { cn } from "@heroui/theme";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

import MessageUI from "./MessageUI";
import ChatInput from "./ChatInput";

import { useMessages } from "@/hooks/use-messages";
import ShareModel from "@/components/chat/ShareModel";
import LoginModel from "@/components/auth/LoginModel";
import { useAI } from "@/hooks/useAi";

export default function ChatSection({
  isnewchat,
  chatId,
}: {
  isnewchat: boolean;
  chatId: string;
  initialMessages: Message[];
}) {
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    onSubmit,
    handleKeyDown,
    status,
    reload,
    isLoading,
    isLoginModalOpen,
    onLoginModalOpen,
    onLoginModalOpenChange,
    stop,
  } = useAI({ isnewchat, chatId });

  const { scrollToBottom, isAtBottom } = useMessages({
    chatId,
    status,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-dvh w-full">
        <Spinner color="secondary" />
      </div>
    );
  }

  const hasMessages = messages.length > 0;

  return (
    <>
      <div className="relative flex flex-col items-center h-dvh  w-full">
        {/* Messages Container - Always present but conditionally visible */}
        {hasMessages && <ShareModel chatId={chatId} />}
        {hasMessages && (
          <div className="w-full flex flex-col items-center  h-[calc(100vh-170px)]  overflow-y-auto px-5">
            <div className="max-w-3xl w-full">
              <MessageUI
                chatId={chatId}
                isShared={false}
                messages={messages}
                reload={reload}
                status={status}
              />
            </div>
          </div>
        )}

        <div
          className={cn(
            " z-15 max-w-3xl px-5 lg:px-0 w-full  flex flex-col gap-5",
            !hasMessages
              ? "flex items-center justify-center h-dvh md:mb-4 mb-10 gap-8"
              : "absolute bottom-8"
          )}
        >
          {!isAtBottom && status !== "streaming" && !isnewchat && (
            <div className="flex items-center justify-center h-10 ">
              <Button
                isIconOnly
                className="rounded-2xl bg-neutral-800 opacity-50 "
                size="sm"
                variant="bordered"
                onPress={() => {
                  scrollToBottom("smooth");
                }}
              >
                <Icon icon="solar:arrow-down-bold" width={18} />
              </Button>
            </div>
          )}

          <ChatInput
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            hasMessages={hasMessages}
            input={input}
            isLoading={isLoading}
            isnewchat={isnewchat}
            setInput={setInput}
            status={status}
            stop={stop}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      <LoginModel
        isOpen={isLoginModalOpen}
        onOpen={onLoginModalOpen}
        onOpenChange={onLoginModalOpenChange}
      />
    </>
  );
}
