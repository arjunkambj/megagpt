"use client";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";

export default function AiModels() {
  const models = [
    {
      id: "model-1",
      name: "Neo Web3 Ultra",
    },
    {
      id: "model-2",
      name: "Neo Web3 Agent",
    },
    {
      id: "model-3",
      name: "Neo Web3 DeepThink",
    },
    {
      id: "model-4",
      name: "Neo Web3 DeepResearch",
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Select Model</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection title="Models">
          {models.map((model) => (
            <DropdownItem key={model.id}>{model.name}</DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
