"use client";

import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import UserSuspense from "@/components/suspense/UserSuspense";

export default function AvatarDropdown() {
  const router = useRouter();
  const { signOut } = useAuthActions();

  const user = useQuery(api.functions.user.currentUser);

  if (!user) {
    return <UserSuspense />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            fullWidth
            className="h-[60px] justify-start gap-3 rounded-[14px]  bg-transparent px-3 py-[10px]"
          >
            <div className="flex w-full items-center gap-3">
              <Avatar size="sm" src={user?.image} />
              <div className="flex flex-col text-left">
                <p className="text-small font-semibold leading-5 text-foreground">
                  {user?.name}
                </p>
                <p className="text-tiny text-default-400">FREE</p>
              </div>
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          className="w-[210px] bg-content1 px-[8px] py-[8px]"
          variant="flat"
        >
          <DropdownItem
            key="profile"
            className="h-14"
            onPress={() => router.push("/settings")}
          >
            <div className="flex w-full items-center gap-3">
              <Avatar size="sm" src={user?.image} />
              <div className="flex flex-col text-left">
                <p className="text-small font-normal leading-5 text-foreground">
                  {user?.name}
                </p>
                <p className="text-tiny text-default-400">{user?.email}</p>
              </div>
            </div>
          </DropdownItem>
          <DropdownSection showDivider aria-label="profile-section-2">
            <DropdownItem
              key="settings"
              className="py-[4px] text-default-500"
              onPress={() => router.push("/settings")}
            >
              Settings
            </DropdownItem>
            <DropdownItem key="my-plan" className="py-[4px] text-default-500">
              My Plan
            </DropdownItem>
          </DropdownSection>
          <DropdownSection aria-label="profile-section-3" className="mb-0">
            <DropdownItem
              key="help-and-feedback"
              className="py-[4px] text-default-500"
              onPress={() => router.push("/help")}
            >
              Help & Feedback
            </DropdownItem>

            <DropdownItem
              key="logout"
              className="pt-[4px] text-default-500"
              onPress={() => {
                signOut();
                router.push("/login");
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
