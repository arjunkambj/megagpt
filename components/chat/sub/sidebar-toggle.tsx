"use client";

import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { Tooltip } from "@heroui/tooltip";
import { useAtomValue } from "jotai";

import { sidebarOpenAtom, useSidebarToggle } from "@/atoms/sidebarState";

export default function SidebarToggle() {
  const { toggleSidebar } = useSidebarToggle();
  const isOpen = useAtomValue(sidebarOpenAtom);

  return (
    <Tooltip
      closeDelay={0}
      content={isOpen ? "Close sidebar" : "Open sidebar"}
      placement="bottom"
    >
      <Button
        isIconOnly
        aria-label="Toggle sidebar"
        className="bg-default-100 rounded-xl px-0.5 md:bg-transparent"
        onPress={toggleSidebar}
      >
        <Icon
          className="text-default-800 hover:text-default-900"
          icon="mynaui:sidebar"
          width={22}
        />
      </Button>
    </Tooltip>
  );
}
