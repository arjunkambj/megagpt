"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

export default function Account() {
  return (
    <Card className="shadow-none  flexw-full">
      <CardHeader className="flex gap-1 flex-col">
        <h2 className="text-xl font-bold">Account</h2>
        <p className="text-sm text-default-500">Manage your account</p>
      </CardHeader>
      <CardBody className="gap-4 flex flex-col items-end">
        <Input label="Name" placeholder="Your name" />
        <Input label="Email" placeholder="Your email" />
        <Input label="Password" placeholder="Your password" />
        <Button
          className="mt-2 w-auto"
          color="primary"
          onPress={() => {
            addToast({
              title: "Account updated",
              description: "Your account has been updated",
            });
          }}
        >
          Update Account
        </Button>
      </CardBody>
    </Card>
  );
}
