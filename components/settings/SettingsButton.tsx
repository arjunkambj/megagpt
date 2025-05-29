"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

export default function SettingsButton() {
  return (
    <div className="relative flex justify-between gap-4 w-full  max-w-7xl md:px-5 py-2 md:py-6">
      <Button
        as={Link}
        className="bg-transparent hover:text-primary font-medium transform transition-all duration-300  hover:-translate-x-1"
        href="/chat"
        startContent={<Icon icon="mdi:arrow-left" width={18} />}
      >
        Back to MegaGPT
      </Button>
      <Button
        as={Link}
        className="bg-transparent hover:text-danger font-medium transform transition-all duration-300 hover:translate-x-1"
        href="/login"
        variant="flat"
      >
        Logout
        <Icon icon="mdi:arrow-right" width={18} />
      </Button>
    </div>
  );
}
