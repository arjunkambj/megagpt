"use client";

import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { v4 as uuidv4 } from "uuid";

import { PromptInputFullLineComponent } from "./sub/prompt-input-full-line";

const suggestions = [
  {
    id: "check-sol-price",
    label: "Check SOL price",
    icon: "solar:dollar-linear",
  },
  {
    id: "create-solana-wallet",
    label: "Swap from Jupiter",
    icon: "solar:wallet-money-linear",
  },
  {
    id: "track-nfts",
    label: "Track NFT collections",
    icon: "solar:gallery-linear",
  },
  {
    id: "research-spl-tokens",
    label: "Research SPL tokens",
    icon: "solar:token-linear",
  },
  {
    id: "analyze-defi",
    label: "Analyze Solana DeFi",
    icon: "solar:chart-line-linear",
  },
];

type PromptSuggestion = (typeof suggestions)[number];

interface PromptSuggestionsProps {
  onSelect?: (suggestion: PromptSuggestion) => void;
  className?: string;
}

const PromptSuggestions = ({ onSelect, className }: PromptSuggestionsProps) => {
  return (
    <div
      className={`flex flex-row flex-wrap items-center justify-center gap-2 ${className}`}
    >
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.id}
          className="h-8 gap-2 rounded-full border-1 border-default-200 px-3 text-default-foreground transition-colors !duration-150 hover:border-default-400 hover:text-foreground data-[hover=true]:border-default-400 data-[hover=true]:text-foreground"
          startContent={
            <Icon
              className="text-default-500"
              icon={suggestion.icon}
              width={18}
            />
          }
          variant="light"
          onPress={() => onSelect?.(suggestion)}
        >
          {suggestion.label}
        </Button>
      ))}
    </div>
  );
};

export default function InputPrompt({
  chatId,
  isDashboard,
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  user,
}: {
  chatId?: string;
  isDashboard?: boolean;
  input: string;
  setInput: (input: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  user: any;
}) {
  const router = useRouter();

  const handleSuggestionSelect = (suggestion: PromptSuggestion) => {
    setInput(`${suggestion.label}`);
  };

  const onSubmit = async () => {
    if (!input.trim()) return;

    if (isDashboard) {
      const chatId = uuidv4();

      try {
        router.push(`/chat/${chatId}`);

        if (user) {
          await useMutation(api.functions.chat.createChat)({
            userId: user._id,
            chatId,
          });
        }

        handleSubmit();
        setInput("");
      } catch (error) {
        return { success: false, error: error };
      }
    } else {
      try {
        handleSubmit();
        setInput("");
      } catch (error) {
        return { success: false, error: error };
      }
    }
  };

  return (
    <div
      className={`flex w-full px-3 flex-col ${
        isDashboard ? "" : "absolute bottom-0 max-w-2xl"
      } gap-4`}
    >
      <PromptInputFullLineComponent
        chatId={chatId || ""}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
        prompt={input}
        setInput={setInput}
      />
      <PromptSuggestions
        className={isDashboard ? "" : "hidden"}
        onSelect={handleSuggestionSelect}
      />
    </div>
  );
}
