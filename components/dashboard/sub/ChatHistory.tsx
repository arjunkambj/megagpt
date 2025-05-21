"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Icon } from "@iconify/react";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";
import { ScrollShadow } from "@heroui/scroll-shadow";

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
          key="share"
          className="text-default-500 data-[hover=true]:text-default-500"
          startContent={
            <Icon
              className="text-default-300"
              height={20}
              icon="solar:square-share-line-linear"
              width={20}
            />
          }
        >
          Share
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
          key="archive"
          className="text-default-500 data-[hover=true]:text-default-500"
          startContent={
            <Icon
              className="text-default-300"
              height={20}
              icon="solar:folder-open-linear"
              width={20}
            />
          }
        >
          Archive
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
  return (
    <ScrollShadow className="-mr-6 h-full max-h-full pr-6">
      <Listbox aria-label="Recent chats" variant="flat">
        <ListboxSection
          classNames={{
            base: "py-0",
            heading: "py-0 pl-[10px] text-small text-default-400",
          }}
          title="Recent"
        >
          <ListboxItem
            key="financial-planning"
            className="group h-[44px] px-[12px] py-[10px] text-default-500"
            endContent={<PromptMenu />}
          >
            Financial Planning
          </ListboxItem>
          <ListboxItem
            key="email-template"
            className="h-[44px] px-[12px] py-[10px] text-default-500"
            endContent={<PromptMenu />}
          >
            Email template
          </ListboxItem>
          <ListboxItem
            key="react-19-example"
            className="h-[44px] px-[12px] py-[10px] text-default-500"
            endContent={<PromptMenu />}
          >
            React 19 examples
          </ListboxItem>
          <ListboxItem
            key="custom-support-message"
            className="h-[44px] px-[12px] py-[10px] text-default-500"
            endContent={<PromptMenu />}
          >
            Custom support message
          </ListboxItem>
          <ListboxItem
            key="resignation-letter"
            className="h-[44px] px-[12px] py-[10px] text-default-500"
            endContent={<PromptMenu />}
          >
            Resignation Letter
          </ListboxItem>
          <ListboxItem
            key="design-test-review"
            className="h-[44px] px-[12px] py-[10px] text-default-500"
            endContent={<PromptMenu />}
          >
            Design test review
          </ListboxItem>
          <ListboxItem
            key="design-system-modules"
            className="h-[44px] px-[12px] py-[10px] text-default-500"
            endContent={<PromptMenu />}
          >
            Design systems modules
          </ListboxItem>
          <ListboxItem
            key="how-a-taximeter-works"
            className="h-[44px] px-[12px] py-[10px] text-default-500"
            endContent={<PromptMenu />}
          >
            How a taximeter works
          </ListboxItem>
          <ListboxItem
            key="show-more"
            className="h-[44px] px-[12px] py-[10px] text-default-400"
            endContent={
              <Icon
                className="text-default-300"
                icon="solar:alt-arrow-down-linear"
                width={20}
              />
            }
          >
            Show more
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </ScrollShadow>
  );
}
