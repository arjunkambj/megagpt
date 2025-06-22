"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Drawer, DrawerContent, DrawerBody } from "@heroui/drawer";

import SidebarContent from "./sub/sidebar-content";

import { useSidebarToggle } from "@/atoms/sidebarState";

const Sidebar = React.memo(({ className }: { className?: string }) => {
  const { isOpen, setIsOpen } = useSidebarToggle();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleClose = useCallback(() => {}, []);

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

  const sidebarContent = useMemo(
    () => <SidebarContent onClose={handleClose} />,
    [handleClose],
  );

  if (!isClient) {
    return <section className={`h-full`}>{sidebarContent}</section>;
  }

  return (
    <>
      <section className={` h-full ${className}`}>
        {!isMobile && sidebarContent}

        {isMobile && (
          <Drawer
            hideCloseButton
            backdrop="transparent"
            className="max-w-[250px] w-[250px] bg-default-50 shadow-none p-0"
            isOpen={isOpen}
            placement="left"
            radius="none"
            onOpenChange={setIsOpen}
          >
            <DrawerContent className="p-0">
              {(onClose) => (
                <>
                  <DrawerBody className="p-0  rounded-none">
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
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
