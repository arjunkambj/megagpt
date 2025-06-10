"use client";
import { useQuery } from "convex-helpers/react/cache/hooks";
import { useMutation } from "convex/react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { addToast } from "@heroui/toast";

import { useSidebarToggle } from "@/atoms/sidebarState";
import { api } from "@/convex/_generated/api";

export default function ChatHistory() {
  const user = useQuery(api.functions.user.currentUser);
  const chats = useQuery(
    api.functions.chat.getChatsByUserId,
    user ? { userId: user._id } : "skip",
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
    return <div className="text-default-700 text-sm px-3">Recent chats</div>;
  }

  // Separate pinned and unpinned chats
  const pinnedChats = chats.filter((chat) => chat.isPinned);
  const recentChats = chats
    .filter((chat) => !chat.isPinned)
    .sort(
      (a, b) =>
        (b.updatedAt ?? b._creationTime ?? 0) -
        (a.updatedAt ?? a._creationTime ?? 0),
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
    <div key={chat.chatId} className="w-full">
      <Button
        as={Link}
        className={`group relative flex h-9 w-full items-center justify-start gap-2.5 px-3 rounded-medium text-small hover:bg-default-100 hover:text-default-700 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-focus transition-colors duration-100 ${
          isChatActive(chat.chatId)
            ? "bg-default-100 rounded-xl text-default-800"
            : "text-default-600"
        }`}
        href={`/chat/${chat.chatId}`}
        variant="light"
        onPress={handleChatClick}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 truncate flex-1 min-w-0">
            <span className="truncate text-left">{chat.title}</span>
          </div>
          <div className="flex-shrink-0 ml-2">
            <PromptMenu chatId={chat.chatId} isPinned={chat.isPinned} />
          </div>
        </div>
      </Button>
    </div>
  );

  return (
    <div className="w-full">
      {/* Pinned Section */}
      {pinnedChats.length > 0 && (
        <div className="mb-4">
          <div className="py-0 pl-[10px] text-small text-default-800 mb-2 flex items-center gap-2">
            <Icon
              className="text-default-700"
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
          <div className="py-0 pl-[10px] text-small text-default-800 mb-2">
            Today
          </div>
          <div className="">{categorizedChats.today.map(renderChatItem)}</div>
        </div>
      )}

      {/* Yesterday Section */}
      {categorizedChats.yesterday.length > 0 && (
        <div className="mb-4">
          <div className="py-0 pl-[10px] text-small text-default-800 mb-2">
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
          <div className="py-0 pl-[10px] text-small text-default-800 mb-2">
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
          <div className="py-0 pl-[10px] text-small text-default-800 mb-2">
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
          <div className="py-0 pl-[10px] text-small text-default-800 mb-2">
            Older
          </div>
          <div className="">{categorizedChats.older.map(renderChatItem)}</div>
        </div>
      )}
    </div>
  );
}

function PromptMenu({
  chatId,
  isPinned,
}: {
  chatId: string;
  isPinned: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const deleteChat = useMutation(api.functions.chat.deleteChatByChatId);
  const updateChatIsPinned = useMutation(api.functions.chat.updateChatIsPinned);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteChat({ chatId });

      if (pathname === `/chat/${chatId}`) {
        router.push("/chat");
      }
    } catch (error) {
      void error;
      addToast({
        title: "Error deleting chat",
        description: "Please try again",
        color: "danger",
      });
    }
  };

  const handlePin = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await updateChatIsPinned({ chatId, isPinned: !isPinned });
    } catch (error) {
      void error;
      addToast({
        title: "Error",
        description: "Something went wrong",
        color: "danger",
      });
    }
  };

  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 z-10">
      <Icon
        className="text-default-700 hover:text-default-900 cursor-pointer transition-colors duration-150"
        height={16}
        icon={isPinned ? "solar:pin-bold" : "solar:pin-linear"}
        width={16}
        onClick={handlePin}
      />
      <Icon
        className="text-default-700 hover:text-danger cursor-pointer transition-colors duration-150"
        height={16}
        icon="material-symbols:delete-outline"
        width={16}
        onClick={handleDelete}
      />
    </div>
  );
}
