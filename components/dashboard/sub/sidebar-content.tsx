"use client";

import { Button } from "@heroui/button";
import { Spacer } from "@heroui/spacer";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScrollShadow } from "@heroui/scroll-shadow";

import { Logo } from "./Logo";
import ChatHistory from "./ChatHistory";
import AvatarDropdown from "./AvatarDropdown";

import { useSidebarToggle } from "@/atoms/sidebarState";

export default function SidebarContent() {
  const { onClose } = useSidebarToggle();
  const router = useRouter();

  const handleNewChat = () => {
    // Navigate to /chat with a timestamp to force component remount and state reset
    router.push("/chat?t=" + Date.now());
  };

  return (
    <div className="relative dark:bg-[#0A0A0A] flex h-full max-w-[270px]  w-[270px] flex-1 flex-col p-6">
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
        className="mb-6 mt-2 rounded-xl justify-start gap-3 bg-default-foreground px-3  py-5 text-default-50"
        startContent={
          <Icon
            className="text-default-50"
            icon="hugeicons:plus-sign"
            width={20}
          />
        }
        onPress={handleNewChat}
      >
        New Chat
      </Button>

      {/* Chat History */}
      <ScrollShadow hideScrollBar size={10} visibility="auto">
        <ChatHistory />
      </ScrollShadow>

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
