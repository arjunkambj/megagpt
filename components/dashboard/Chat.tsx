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

export default function Chat({ isDashboard }: { isDashboard: boolean }) {
  const params = useParams();
  const router = useRouter();
  const chatId = isDashboard ? uuidv4() : (params?.chatid as string);

  const user = useQuery(api.functions.user.currentUser);

  const { messages, input, setInput, handleInputChange, status, handleSubmit } =
    useChat({
      api: "/api/chat",
      body: {
        chatId: chatId as string,
        userId: user?._id,
      },
    });

  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    if (isDashboard) {
      router.push(`/chat/${chatId}`);
    }

    handleSubmit();
  };

  if (isDashboard) {
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
        isDashboard={isDashboard}
        setInput={setInput}
        chatId={chatId}
        onSubmit={onSubmit}
      />
    </section>
  );
}
