"use client";
import { useQuery } from "convex-helpers/react/cache/hooks";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import ChatHistoryDropdown from "./ChatHistoryDropdown";

import { useSidebarToggle } from "@/atoms/sidebarState";
import { api } from "@/convex/_generated/api";

export default function ChatHistory() {
  const user = useQuery(api.function.users.currentUser);
  const chats = useQuery(
    api.function.chats.getChatsByUserId,
    user ? { userId: user._id } : "skip"
  );

  const pathname = usePathname();
  const { setIsOpen } = useSidebarToggle();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isChatActive = (chatId: string) => {
    return pathname === `/chat/${chatId}`;
  };

  const handleChatClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  if (!chats) {
    return null;
  }

  // Separate pinned and unpinned chats
  const pinnedChats = chats.filter((chat) => chat.isPinned);
  const recentChats = chats
    .filter((chat) => !chat.isPinned)
    .sort(
      (a, b) =>
        (b.updatedAt ?? b._creationTime ?? 0) -
        (a.updatedAt ?? a._creationTime ?? 0)
    );

  // Helper function to categorize chats by time
  const categorizeChats = (chats: any[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const categories = {
      today: [] as any[],
      yesterday: [] as any[],
      previous7Days: [] as any[],
      previous30Days: [] as any[],
      older: [] as any[],
    };

    chats.forEach((chat) => {
      const chatDate = new Date(chat.updatedAt ?? chat._creationTime);

      if (chatDate >= today) {
        categories.today.push(chat);
      } else if (chatDate >= yesterday) {
        categories.yesterday.push(chat);
      } else if (chatDate >= sevenDaysAgo) {
        categories.previous7Days.push(chat);
      } else if (chatDate >= thirtyDaysAgo) {
        categories.previous30Days.push(chat);
      } else {
        categories.older.push(chat);
      }
    });

    return categories;
  };

  const categorizedChats = categorizeChats(recentChats);

  const renderChatItem = (chat: any) => (
    <div
      key={chat.chatId}
      className={`${
        isChatActive(chat.chatId)
          ? "rounded-xl bg-default-100 text-default-800"
          : "text-default-600"
      } group relative flex ml-1 mt-0 py-2  items-center rounded-xl hover:bg-default-100 mb-0.5 hover:text-default-700`}
    >
      <Link
        className={`group relative flex  w-full cursor-pointer items-center justify-start rounded-medium px-4 text-small outline-none transition-colors duration-100 hover:bg-default-100 hover:text-default-800 focus-visible:ring-2 focus-visible:ring-default-200 focus-visible:ring-offset-2 focus-visible:ring-offset-default-100`}
        href={`/chat/${chat.chatId}`}
        onClick={handleChatClick}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-2 truncate">
            {chat.isBranchChat && (
              <Icon
                className="flex-shrink-0 text-default-500"
                height={14}
                icon="solar:branch-bold"
                width={14}
              />
            )}
            <span
              className={`truncate text-left text-sm group-hover:text-default-800 ${
                isChatActive(chat.chatId)
                  ? "text-default-800"
                  : "text-default-600"
              }`}
            >
              {chat.title}
            </span>
          </div>
        </div>
      </Link>

      <div className="absolute right-2 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ChatHistoryDropdown chatId={chat.chatId} isPinned={chat.isPinned} />
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Pinned Section */}
      {pinnedChats.length > 0 && (
        <div className="mb-4">
          <div className="py-0 pl-[10px] text-small text-default-900 mb-2  flex items-center gap-2">
            <Icon
              className="text-default-900"
              height={14}
              icon="solar:pin-bold"
              width={14}
            />
            Pinned
          </div>
          <div className="">{pinnedChats.map(renderChatItem)}</div>
        </div>
      )}

      {/* Today Section */}
      {categorizedChats.today.length > 0 && (
        <div className="mb-4">
          <div className="py-0 pl-[10px] text-small text-default-900 mb-2">
            Today
          </div>
          <div className="">{categorizedChats.today.map(renderChatItem)}</div>
        </div>
      )}

      {/* Yesterday Section */}
      {categorizedChats.yesterday.length > 0 && (
        <div className="mb-4">
          <div className="py-0 pl-[10px] text-small text-default-900 mb-2">
            Yesterday
          </div>
          <div className="">
            {categorizedChats.yesterday.map(renderChatItem)}
          </div>
        </div>
      )}

      {/* Previous 7 Days Section */}
      {categorizedChats.previous7Days.length > 0 && (
        <div className="mb-4">
          <div className="py-0 pl-[10px] text-small text-default-900 mb-2">
            Previous 7 days
          </div>
          <div className="">
            {categorizedChats.previous7Days.map(renderChatItem)}
          </div>
        </div>
      )}

      {/* Previous 30 Days Section */}
      {categorizedChats.previous30Days.length > 0 && (
        <div className="mb-4">
          <div className="py-0 pl-[10px] text-small text-default-900 mb-2">
            Previous 30 days
          </div>
          <div className="">
            {categorizedChats.previous30Days.map(renderChatItem)}
          </div>
        </div>
      )}

      {/* Older Section */}
      {categorizedChats.older.length > 0 && (
        <div className="mb-4">
          <div className="py-0 pl-[10px] text-small text-default-900 mb-2">
            Older
          </div>
          <div className="">{categorizedChats.older.map(renderChatItem)}</div>
        </div>
      )}
    </div>
  );
}
