"use client";

import { Button } from "@heroui/button";
import { Spacer } from "@heroui/spacer";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { Logo } from "./Logo";
import ChatHistory from "./ChatHistory";
import AvatarDropdown from "./AvatarDropdown";

import { useSidebarToggle } from "@/atoms/sidebarState";

export default function SidebarContent() {
  const { isOpen, onOpenChange, onClose } = useSidebarToggle();

  return (
    <div className="relative bg-[#111] flex h-full w-72 flex-1 flex-col p-6">
      {/* Logo and Close Button */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
            <Logo className="text-background" />
          </div>
          <span className="text-base font-bold leading-6 text-foreground">
            MegaGPT
          </span>
        </div>

        {/* Close button - only visible on mobile */}
        <Button
          isIconOnly
          aria-label="Close sidebar"
          className="sm:hidden absolute right-0 top-0"
          variant="light"
          onPress={onClose}
        >
          <Icon icon="solar:close-circle-line-duotone" width={24} />
        </Button>
      </div>

      <Spacer y={8} />

      {/* New Chat Button */}
      <Button
        fullWidth
        as={Link}
        className="mb-6 mt-2 h-[44px] justify-start gap-3 bg-default-foreground px-3 py-[10px] text-default-50"
        href="/chat"
        startContent={
          <Icon
            className="text-default-50"
            icon="solar:chat-round-dots-linear"
            width={24}
          />
        }
      >
        New Chat
      </Button>

      {/* Chat History */}
      <ChatHistory />

      <Spacer y={8} />

      {/* Footer Buttons */}
      <div className="mt-auto flex flex-col">
        <Button
          as={Link}
          className="justify-start text-default-600"
          href="/settings"
          startContent={
            <Icon
              className="text-default-600"
              icon="solar:settings-minimalistic-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Renew Plus
        </Button>

        <AvatarDropdown />
      </div>
    </div>
  );
}
