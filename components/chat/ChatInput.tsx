"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

import { PromptInputFullLineComponent } from "./sub/prompt-input-full-line";

const suggestions = [
  {
    id: "draft-email",
    label: "Draft an email",
    icon: "solar:document-add-outline",
  },
  {
    id: "create-image",
    label: "Create an image",
    icon: "solar:gallery-linear",
  },
  {
    id: "brainstorm",
    label: "Brainstorm",
    icon: "solar:lightbulb-linear",
  },
  {
    id: "make-plan",
    label: "Make a plan",
    icon: "solar:checklist-linear",
  },
  {
    id: "code",
    label: "Code",
    icon: "solar:code-linear",
  },
  {
    id: "help-write",
    label: "Help me write",
    icon: "solar:pen-2-outline",
  },
  {
    id: "get-advice",
    label: "Get advice",
    icon: "solar:square-academic-cap-2-outline",
  },
];

type PromptSuggestion = (typeof suggestions)[number];

interface PromptSuggestionsProps {
  onSelect?: (suggestion: PromptSuggestion) => void;
}

const PromptSuggestions = ({ onSelect }: PromptSuggestionsProps) => {
  return (
    <div className="flex flex-row  flex-wrap items-center justify-center gap-2">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.id}
          className="h-8 gap-2 rounded-full border-1 bg-default-50 border-default-100 px-3 text-default-foreground transition-colors !duration-150  hover:text-foreground data-[hover=true]:border-default-300 data-[hover=true]:text-foreground"
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

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isnewchat: boolean;
  hasMessages: boolean;
  isLoading: boolean;
  stop: () => void;
  status: string;
}

export default function ChatInput({
  input,
  handleInputChange,
  setInput,
  onSubmit,
  handleKeyDown,
  hasMessages,
  stop,
  status,
}: ChatInputProps) {
  const handleSuggestionSelect = (suggestion: PromptSuggestion) => {
    setInput(suggestion.label);
  };

  return (
    <div className="flex w-full flex-col rounded-xl gap-4">
      <PromptInputFullLineComponent
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        input={input}
        status={status}
        stop={stop}
        onSubmit={onSubmit}
      />
      {!hasMessages && <PromptSuggestions onSelect={handleSuggestionSelect} />}
    </div>
  );
}
