"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useMutation } from "convex/react";
import { useState, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { RadioGroup, Radio } from "@heroui/radio";

import { useUser } from "@/hooks/useUser";
import { api } from "@/convex/_generated/api";

const expirationOptions = [
  { key: "1d", label: "1 Day" },
  { key: "2d", label: "2 Days" },
  { key: "7d", label: "7 Days" },
  { key: "never", label: "Never" },
];

const ShareModel = memo(function ShareModel({ chatId }: { chatId: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const user = useUser();

  const [selectedExpiration, setSelectedExpiration] = useState<
    "1d" | "2d" | "7d" | "never"
  >("1d");
  const [isLoading, setIsLoading] = useState(false);
  const createShare = useMutation(api.function.share.createShareChat);

  if (!user) {
    return null;
  }

  const shareId = uuidv4();
  const shareLink = `${process.env.NEXT_PUBLIC_URL}/share/${shareId}`;

  const handleShare = async () => {
    try {
      setIsLoading(true);

      await createShare({
        chatId,
        userId: user._id,
        expiresAt: selectedExpiration,
        shareId,
      });

      await navigator.clipboard.writeText(shareLink);

      addToast({
        title: "Copied to clipboard",
        description: "Share link copied to clipboard",
        color: "success",
        timeout: 2000,
      });

      onClose();
    } catch (error) {
      void error;
      addToast({
        title: "Error",
        description: "Failed to share chat. Please try again.",
        color: "danger",
        timeout: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="absolute right-8 top-3 z-20 justify-start text-default-800 bg-default-100 rounded-full "
        startContent={<Icon icon="solar:share-linear" width={20} />}
        variant="flat"
        onPress={onOpen}
      >
        Share Chat
      </Button>
      <Modal
        backdrop="blur"
        className="max-w-lg shadow-none"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-4 pt-5">
                <div className="relative flex flex-col space-y-3">
                  <div>
                    <h2 className="text-3xl font-semibold text-white">
                      Share Chat
                    </h2>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody className="pb-1 px-8 pt-1">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm font-medium text-default-700"
                      htmlFor="expiration"
                    >
                      Expiration
                    </label>
                    <RadioGroup
                      className="gap-2"
                      defaultValue="1d"
                      orientation="horizontal"
                      value={selectedExpiration}
                      onValueChange={(value) => {
                        setSelectedExpiration(
                          value as "1d" | "2d" | "7d" | "never"
                        );
                      }}
                    >
                      {expirationOptions.map((option) => (
                        <Radio key={option.key} value={option.key}>
                          {option.label}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="my-2 flex flex-col gap-2">
                <div className="flex justify-end gap-2">
                  <Button
                    color="primary"
                    disabled={isLoading}
                    isLoading={isLoading}
                    startContent={<Icon icon="solar:share-bold" width={16} />}
                    onPress={handleShare}
                  >
                    {isLoading ? "Creating Link..." : "Share Chat"}
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
});

export default ShareModel;
