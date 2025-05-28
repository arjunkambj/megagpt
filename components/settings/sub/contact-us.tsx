"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";

export default function ContactUs() {
  return (
    <Card className="shadow-none flexw-full">
      <CardHeader className="flex gap-1 flex-col">
        <h2 className="text-xl font-bold">Contact Support</h2>
        <p className="text-sm text-default-500">We are here to help</p>
      </CardHeader>
      <CardBody className="gap-4 flex flex-col items-end">
        <Input label="Subject" placeholder="How can we help?" />
        <Input label="Email" placeholder="Your email" />
        <Textarea
          label="Message"
          minRows={15}
          placeholder="Describe your issue..."
        />
        <Button
          className="mt-2 w-auto"
          color="primary"
          onPress={() => {
            addToast({
              title: "Message sent",
              description: "We will get back to you as soon as possible",
            });
          }}
        >
          Send Message
        </Button>
      </CardBody>
    </Card>
  );
}
