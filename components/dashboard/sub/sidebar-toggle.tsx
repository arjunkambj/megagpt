"use client";

import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useSidebarToggle } from "@/atoms/sidebarState";

export default function SidebarToggle() {
  const { toggleSidebar } = useSidebarToggle();

  return (
    <Button
      isIconOnly
      aria-label="Open sidebar menu"
      className="dark:bg-[#141414] rounded-lg "
      variant="flat"
      onPress={toggleSidebar}
    >
      <Icon
        className="text-default-700"
        height={24}
        icon="mynaui:sidebar"
        width={24}
      />
    </Button>
  );
}
