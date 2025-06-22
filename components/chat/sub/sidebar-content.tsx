"use client";

import React, { useMemo } from "react";
import { Button } from "@heroui/button";
import { Spacer } from "@heroui/spacer";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Unauthenticated, Authenticated } from "convex/react";
import Image from "next/image";

import UserProfile from "../UserProfile";

import ChatHistory from "./ChatHistory";
import SidebarButton from "./SidebarButton";

import { useSidebarToggle } from "@/atoms/sidebarState";
import SidebarModel from "@/components/auth/SidebarModel";

interface SidebarContentProps {
  onClose: () => void;
}

const SidebarContent = React.memo(({ onClose }: SidebarContentProps) => {
  const { isOpen } = useSidebarToggle();

  const containerClasses = useMemo(
    () =>
      `relative flex h-dvh max-w-[250px] flex-1 flex-col overflow-hidden  bg-[#111111] border-r border-default-100 XOtransition-all duration-300 ease-in-out ${
        isOpen ? "w-[250px] p-6" : "w-0 p-0"
      }`,
    [isOpen],
  );

  const logoSection = useMemo(
    () => (
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Image
            alt="MegaGPT"
            className="text-neutral-50"
            height={24}
            priority={true}
            src="/white.svg"
            width={24}
          />

          <span className="text-default-900 text-lg font-bold leading-6 ">
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
    ),
    [onClose],
  );

  const footerButtons = useMemo(
    () => (
      <div className="mt-auto flex  gap-2 flex-col">
        <Button
          as={Link}
          className="justify-start text-default-800"
          href="/pricing"
          startContent={
            <Icon
              className="text-default-800"
              icon="solar:settings-minimalistic-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Upgrade to Pro
        </Button>

        {/* Avatar Dropdown */}
        <UserProfile />
      </div>
    ),
    [],
  );

  return (
    <div className={containerClasses}>
      {/* Logo and Close Button */}
      {logoSection}

      <Spacer y={6} />

      {/* New Chat Button */}
      <SidebarButton onClose={onClose} />

      <Spacer y={1} />

      {/* Chat History */}
      <ScrollShadow hideScrollBar size={10} visibility="auto">
        <ChatHistory />
      </ScrollShadow>

      <Spacer y={8} />

      {/* Footer Buttons */}
      <Authenticated>{footerButtons}</Authenticated>
      <Unauthenticated>
        <SidebarModel />
      </Unauthenticated>
    </div>
  );
});

SidebarContent.displayName = "SidebarContent";

export default SidebarContent;
