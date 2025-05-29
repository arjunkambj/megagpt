"use client";

import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

import SidebarToggle from "./sub/sidebar-toggle";
import AIModelSelector from "./sub/ai-model-selector";

import { useSidebarToggle } from "@/atoms/sidebarState";

export default function DashboardIcon() {
  const { isOpen } = useSidebarToggle();

  return (
    <div className="absolute top-2  z-10 left-0 flex gap-2 items-center">
      <SidebarToggle />
      <AIModelSelector />
      <Button
        isIconOnly
        as={Link}
        className={` ${isOpen ? "hidden" : "block"} dark:bg-[#141414] rounded-lg `}
        href="/chat"
        variant="flat"
      >
        <div className="flex items-center  bg-[#141414] w-full h-full justify-center">
          <Icon height={22} icon={"hugeicons:plus-sign"} width={22} />
        </div>
      </Button>
    </div>
  );
}
