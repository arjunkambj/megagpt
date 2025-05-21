"use client";

import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useSidebarToggle } from "@/atoms/sidebarState";

export default function SidebarToggle() {
  const { onOpen } = useSidebarToggle();

  return (
    <Button
      isIconOnly
      aria-label="Open sidebar menu"
      className="flex"
      variant="light"
      onPress={onOpen}
    >
      <Icon
        className="text-default-500"
        height={24}
        icon="mynaui:sidebar"
        width={24}
      />
    </Button>
  );
}
