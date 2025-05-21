import { Button } from "@heroui/button";
import SidebarToggle from "./sub/sidebar-toggle";
import AIModelSelector from "./sub/ai-model-selector";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function DashboardIcon() {
  return (
    <div className="absolute top-2  left-2 flex gap-2 items-center">
      <SidebarToggle />
      <AIModelSelector />
      <Button isIconOnly as={Link} href="/chat" variant="flat">
        <Icon height={24} icon={"solar:add-circle-linear"} width={24} />
      </Button>
    </div>
  );
}
