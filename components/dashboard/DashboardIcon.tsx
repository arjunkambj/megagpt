import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

import SidebarToggle from "./sub/sidebar-toggle";
import AIModelSelector from "./sub/ai-model-selector";

export default function DashboardIcon() {
  return (
    <div className="absolute top-2  left-2 flex gap-2 items-center">
      <SidebarToggle />
      <AIModelSelector />
      <Button isIconOnly as={Link} href="/chat" variant="flat">
        <Icon height={24} icon={"hugeicons:plus-sign"} width={22} />
      </Button>
    </div>
  );
}
