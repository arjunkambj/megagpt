"use client";
import * as React from "react";
import { Tab, Tabs } from "@heroui/tabs";

import ProfileSetting from "@/components/settings/profile-setting";
import BillingSetting from "@/components/settings/billing-setting";

export default function SettingsContent() {
  return (
    <Tabs
      classNames={{
        base: "",
        cursor: "bg-content1 dark:bg-content1",
        panel: "w-full p-0 pt-4",
      }}
    >
      <Tab key="account" title="Account">
        <ProfileSetting />
      </Tab>
      <Tab key="customization" title="Customization" />
      <Tab key="model" title="Manage Model" />
      <Tab key="memory" title="Memories" />
      <Tab key="billing" title="Billing">
        <BillingSetting />
      </Tab>
      <Tab key="contact" title="Contact Us" />
    </Tabs>
  );
}
