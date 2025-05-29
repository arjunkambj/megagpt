"use client";

import type { IconProps } from "@iconify/react";

import React from "react";
import { Link } from "@heroui/link";
import { Icon } from "@iconify/react";

type SocialIconProps = Omit<IconProps, "icon">;

const footerNavigation = {
  usefulLinks: [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ],
  legal: [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Cookies", href: "#" },
    { name: "Data Processing", href: "#" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: (props: SocialIconProps) => <Icon {...props} icon="mdi:twitter" />,
    },
    {
      name: "Discord",
      href: "#",
      icon: (props: SocialIconProps) => <Icon {...props} icon="mdi:discord" />,
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: SocialIconProps) => <Icon {...props} icon="mdi:github" />,
    },
    {
      name: "Telegram",
      href: "#",
      icon: (props: SocialIconProps) => <Icon {...props} icon="mdi:telegram" />,
    },
  ],
};

export default function Component() {
  const renderList = React.useCallback(
    ({
      title,
      items,
    }: {
      title: string;
      items: { name: string; href: string }[];
    }) => (
      <div>
        <h3 className="text-sm font-semibold text-white mb-6">{title}</h3>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                className="text-white/60 hover:text-emerald-600 transition-colors duration-300 text-sm"
                href={item.href}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ),
    [],
  );

  return (
    <footer className="relative w-full mt-12" id="contact">
      {/* Background with consistent glass-morphism styling */}
      <div className="absolute inset-0 border-t border-white/10 bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-sm" />

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="relative h-8 w-8">
                  <svg
                    fill="none"
                    height="32"
                    viewBox="0 0 32 32"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2Z"
                      fill="#16a34a"
                    />
                    <path
                      d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6Z"
                      fill="#F5f5f5"
                    />
                    <path
                      d="M16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10Z"
                      fill="#16a34a"
                    />
                  </svg>
                </span>
                <span className="text-xl font-semibold text-white">
                  MegaGPT
                </span>
              </div>
              <p className="text-white/60 leading-relaxed mb-8 max-w-sm">
                MegaGPT unifies all AI models in one platform. Access OpenAI,
                Claude, Gemini and more in a single subscription with Web3
                capabilities.
              </p>
              <div className="flex space-x-4">
                {footerNavigation.social.map((item) => (
                  <Link
                    key={item.name}
                    isExternal
                    className="group"
                    href={item.href}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-emerald-600/20 group-hover:scale-110">
                      <item.icon
                        aria-hidden="true"
                        className="w-5 h-5 text-white/70 group-hover:text-emerald-400 transition-colors duration-300"
                      />
                    </div>
                    <span className="sr-only">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Section */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-12">
                <div>
                  {renderList({
                    title: "Useful Links",
                    items: footerNavigation.usefulLinks,
                  })}
                </div>
                <div>
                  {renderList({
                    title: "Legal",
                    items: footerNavigation.legal,
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} MegaGPT. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  className="text-white/50 hover:text-emerald-600 transition-colors duration-300 text-sm"
                  href="#"
                >
                  Privacy Policy
                </Link>
                <Link
                  className="text-white/50 hover:text-emerald-600 transition-colors duration-300 text-sm"
                  href="#"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
