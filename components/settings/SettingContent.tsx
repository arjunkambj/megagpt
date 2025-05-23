"use client";

import { Tab, Tabs } from "@heroui/tabs";

import Customization from "./sub/customization";
import Account from "./sub/account";
import ContactUs from "./sub/contact-us";

export default function SettingsContent() {
  return (
    <Tabs className="w-full">
      <Tab key="account" className="w-full" title="Account">
        <div className="py-4 w-full">
          <Account />
        </div>
      </Tab>
      <Tab key="customization" className="w-full" title="Customization">
        <div className="py-4 w-full">
          <Customization />
        </div>
      </Tab>
      <Tab key="contact" className="w-full" title="Contact Us">
        <div className="py-4 w-full">
          <ContactUs />
        </div>
      </Tab>
    </Tabs>
  );
}
