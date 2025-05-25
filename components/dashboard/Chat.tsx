"use client";
import UserMessage from "./sub/user-message";
import AssistanceMessage from "./sub/assistance-message";
import PromptInput from "./PromptInput";
import { useChat } from "@ai-sdk/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Chat({ isDashboard }: { isDashboard: boolean }) {
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      api: "/api/chat",
    });
  if (isDashboard) {
    return (
      <section className="flex h-full w-full items-center justify-center md:max-w-2xl">
        <PromptInput
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          input={input}
          isDashboard={isDashboard}
          setInput={setInput}
        />
      </section>
    );
  }

  return (
    <section className="flex h-full w-full md:max-w-2xl flex-col gap-4">
      <div className="flex flex-col md:pt-10 gap-5">
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
      </div>
      <PromptInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isDashboard={isDashboard}
        setInput={setInput}
      />
    </section>
  );
}
