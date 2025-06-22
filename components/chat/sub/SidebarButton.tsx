"use client";

import React, { memo } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Spacer } from "@heroui/spacer";

interface SidebarButtonProps {
  onClose: () => void;
}

const SidebarButton = memo(({ onClose }: SidebarButtonProps) => {
  const router = useRouter();

  const handleNewChat = () => {
    router.push(`/chat`);

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-[1px] mb-4">
      <Button
        fullWidth
        className="rounded-full bg-default-100 pr-6 text-default-900"
        startContent={<Icon icon="mdi:plus" width={20} />}
        onPress={handleNewChat}
      >
        New Chat
      </Button>
      <Spacer y={3} />
    </div>
  );
});

SidebarButton.displayName = "SidebarButton";

export default SidebarButton;
