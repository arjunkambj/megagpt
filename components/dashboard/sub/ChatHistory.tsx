"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Icon } from "@iconify/react";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";
import { usePathname } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import Link from "next/link";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

function PromptMenu({ chatId }: { chatId: string }) {
  const deleteChat = useMutation(api.functions.chat.deleteChat);

  const handleDelete = async () => {
    try {
      await deleteChat({ chatId });
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

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
          onPress={handleDelete}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default function ChatHistory() {
  const user = useQuery(api.functions.user.currentUser);
  const chats = useQuery(
    api.functions.chat.getChatsByUserId,
    user ? { userId: user._id as Id<"users"> } : "skip",
  );

  const pathname = usePathname();

  const isChatActive = (chatId: string) => {
    return pathname === `/chat/${chatId}`;
  };

  if (!chats) {
    return (
      <div className="text-default-500 text-sm px-3">Loading chats...</div>
    );
  }

  return (
    <Listbox aria-label="Recent chats" variant="flat">
      <ListboxSection
        classNames={{
          base: "py-0",
          heading: "py-0 pl-[10px] text-small y dark:text-white",
        }}
        title="All Chats"
      >
        {chats.map((chat) => {
          return (
            <ListboxItem
              key={chat.chatId}
              as={Link}
              className={`group px-3 text-default-500  cursor-pointer ${
                isChatActive(chat.chatId)
                  ? "bg-default-100 rounded-xl text-default-900"
                  : ""
              }`}
              endContent={<PromptMenu chatId={chat.chatId} />}
              href={`/chat/${chat.chatId}`}
            >
              <div className="truncate">{chat.title}</div>
            </ListboxItem>
          );
        })}
      </ListboxSection>
    </Listbox>
  );
}
