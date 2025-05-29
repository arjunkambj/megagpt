"use client";

import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useAtom } from "jotai";

import { aiModelAtom } from "@/atoms/aimodel";
import { models, type Model } from "@/config/ai-model";
// Custom Badge component since Chip may not be available
function Badge({
  children,
  color = "default",
  size = "md",
}: {
  children: React.ReactNode;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
}) {
  const colorClasses = {
    default: "bg-default-100 text-default-800",
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    success: "bg-success-100 text-success-800",
    warning: "bg-warning-100 text-warning-800",
    danger: "bg-danger-100 text-danger-800",
  };

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5 rounded",
    md: "text-sm px-2 py-1 rounded-md",
    lg: "text-base px-2.5 py-1.5 rounded-lg",
  };

  return (
    <span
      className={`inline-flex items-center font-medium ${colorClasses[color]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
}

export default function ModelSelector() {
  const [currentModelId, setCurrentModelId] = useAtom(aiModelAtom);
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);

  // Update selected model when currentModelId changes
  useEffect(() => {
    const model = models.find((m) => m.id === currentModelId);

    if (model) {
      setSelectedModel(model);
    }
  }, [currentModelId]);

  return (
    <div className="w-full  dark:bg-[#141414] rounded-lg   max-w-sm">
      <Dropdown className="bg-[#141414]">
        <DropdownTrigger>
          <Button
            className="w-full dark:bg-[#141414] justify-between"
            endContent={<Icon icon="solar:alt-arrow-down-linear" width={16} />}
            variant="flat"
          >
            <div className="flex items-center gap-2">
              <Icon icon="solar:cpu-bold" width={20} />
              <span>{selectedModel.name}</span>
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Select AI Model"
          className="min-w-[320px] dark:bg-[#141414]"
          variant="flat"
          onAction={(key) => {
            const modelId = Number(key);
            const model = models.find((m) => m.id === modelId);

            if (model) {
              setSelectedModel(model);
              setCurrentModelId(model.id);
            }
          }}
        >
          <DropdownSection
            showDivider
            className="dark:bg-[#141414]"
            title="Available AI Models"
          >
            {models.map((model) => (
              <DropdownItem
                key={model.id}
                className="py-3 dark:hover:bg-[#1f1f1f]"
                description={
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities.map((capability, index) => (
                        <Badge key={index} color="default" size="sm">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                }
                endContent={
                  <div className="flex items-center gap-1">
                    {model.isNew && (
                      <Badge color="success" size="sm">
                        New
                      </Badge>
                    )}
                    {model.isPro && (
                      <Badge color="danger" size="sm">
                        Pro
                      </Badge>
                    )}
                  </div>
                }
                startContent={
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Icon
                      className="text-primary"
                      icon="solar:cpu-bold"
                      width={18}
                    />
                  </div>
                }
              >
                <span className="font-medium">{model.name}</span>
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
