"use client";

import React, { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerBody } from "@heroui/drawer";

import SidebarContent from "./sub/sidebar-content";

import { useSidebarToggle } from "@/atoms/sidebarState";

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarToggle();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  if (!isClient) {
    return (
      <section className="h-full bg-default-50">
        <SidebarContent onClose={() => {}} />
      </section>
    );
  }

  return (
    <>
      <section className=" h-full bg-default-50">
        {!isMobile && <SidebarContent onClose={() => {}} />}

        {isMobile && (
          <Drawer
            hideCloseButton
            className={`${isMobile ? "" : "hidden"} max-w-[270px] w-[270px] p-0`}
            isOpen={isOpen}
            placement="left"
            radius="none"
            onOpenChange={setIsOpen}
          >
            <DrawerContent className="p-0">
              {(onClose) => (
                <>
                  <DrawerBody className="p-0 rounded-none">
                    <SidebarContent onClose={onClose} />
                  </DrawerBody>
                </>
              )}
            </DrawerContent>
          </Drawer>
        )}
      </section>
    </>
  );
}
