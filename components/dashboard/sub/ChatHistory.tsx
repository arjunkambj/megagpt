"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Icon } from "@iconify/react";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";
import { usePathname, useRouter } from "next/navigation";

function PromptMenu() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Icon
          className="text-default-500 opacity-0 group-hover:opacity-100"
          icon="solar:menu-dots-bold"
          width={24}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown menu with icons"
        className="py-2"
        variant="faded"
      >
        <DropdownItem
          key="pin"
          className="text-default-500 data-[hover=true]:text-default-500"
          startContent={
            <Icon
              className="text-default-300"
              height={20}
              icon="solar:pin-linear"
              width={20}
            />
          }
        >
          Pin
        </DropdownItem>
        <DropdownItem
          key="rename"
          className="text-default-500 data-[hover=true]:text-default-500"
          startContent={
            <Icon
              className="text-default-300"
              height={20}
              icon="solar:pen-linear"
              width={20}
            />
          }
        >
          Rename
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger-500 data-[hover=true]:text-danger-500"
          color="danger"
          startContent={
            <Icon
              className="text-danger-500"
              height={20}
              icon="solar:trash-bin-minimalistic-linear"
              width={20}
            />
          }
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default function ChatHistory() {
  const chats = [
    { id: "1", title: "Chat 1" },
    { id: "2", title: "Chat 2" },
    { id: "3", title: "Chat 3" },
  ];

  const pathname = usePathname();
  const router = useRouter();
  const isChatActive = (chatId: string) => {
    return pathname === `/chat/${chatId}`;
  };

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <Listbox aria-label="Recent chats" variant="flat">
      <ListboxSection
        classNames={{
          base: "py-0",
          heading: "py-0 pl-[10px] text-small y text-default-400",
        }}
        title="All Chats"
      >
        {chats.map((chat) => {
          return (
            <ListboxItem
              key={chat.id}
              className={`group h-[44px] px-[12px] py-[10px] text-default-500 cursor-pointer ${
                isChatActive(chat.id) ? "bg-default-100" : ""
              }`}
              endContent={<PromptMenu />}
              onClick={() => handleChatClick(chat.id)}
            >
              {chat.title}
            </ListboxItem>
          );
        })}
      </ListboxSection>
    </Listbox>
  );
}
