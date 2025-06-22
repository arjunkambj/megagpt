"use client";

import { HelioCheckout } from "@heliofi/checkout-react";
import { useQuery } from "convex/react";
import { useMemo } from "react";
import { addToast } from "@heroui/toast";

import { api } from "@/convex/_generated/api";

export default function HelioWidget() {
  const User = useQuery(api.function.users.currentUser);

  const helioConfig = useMemo(
    () => ({
      paylinkId: "68575a5b2d2ac3bd6e78a627",
      theme: {
        themeMode: "light" as const,
      },
      display: "inline" as const,
      onSuccess: () => {
        addToast({
          title: "Payment successful",
          description: "Your payment has been successful",
          color: "success",
        });
      },
      ...(User && {
        additionalJSON: {
          user_id: User._id,
          user_name: User.name || "",
          user_email: User.email || "",
          subscriptionTier: "Plus",
          subscriptionEnds: Date.now() + 30 * 24 * 60 * 60 * 1000,
        },
      }),
    }),
    [User],
  );

  if (!User) return <div>Loading...</div>;

  return <HelioCheckout config={helioConfig} />;
}
