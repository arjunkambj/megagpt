import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";

import Price from "@/components/pricing/Price";

export const metadata: Metadata = {
  title: "NeoChat - Pricing",
  description: "Pricing for NeoChat",
};

export default function PricingPage() {
  return (
    <div className="flex relative flex-col items-center justify-center bg-gradient-to-b from-neutral-950 to-[#151515] min-h-dvh">
      <Link
        className="absolute top-5 left-4 group flex items-center gap-2 text-default-600 hover:text-primary transition-all duration-200 text-sm font-medium"
        href="/chat"
      >
        <Icon
          className="text-lg group-hover:-translate-x-1 transition-transform duration-200"
          icon="mdi:arrow-left"
        />
        <span className="">Back to Chat</span>
      </Link>
      <Price />
    </div>
  );
}
