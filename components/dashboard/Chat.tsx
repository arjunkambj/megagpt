"use client";
import UserMessage from "./sub/user-message";
import AssistanceMessage from "./sub/assistance-message";
import PromptInput from "./PromptInput";
export default function Chat({ isDashboard }: { isDashboard: boolean }) {
  const messages = [
    {
      id: 1,
      message: "Hello, how are you?",
      role: "user",
    },
    {
      id: 2,
      message: "I'm fine, thank you!",
      role: "assistant",
    },
  ];

  if (isDashboard) {
    return (
      <section className="flex h-full w-full items-center justify-center bg-red-500">
        <PromptInput isDashboard={isDashboard} />
      </section>
    );
  }

  return (
    <section className="flex h-full w-full bg-green-500 md:max-w-2xl flex-col gap-4">
      <div className="flex flex-col md:pt-3 gap-5">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user" ? (
              <div>
                <UserMessage message={message.message} />
              </div>
            ) : (
              <AssistanceMessage message={message.message} />
            )}
          </div>
        ))}
      </div>
      <PromptInput isDashboard={isDashboard} />
    </section>
  );
}
