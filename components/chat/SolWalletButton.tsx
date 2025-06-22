"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

import "@/styles/walletstyles.css";

export default function SolWalletButton() {
  const { connected } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="">
        <div className="wallet-adapter-button wallet-adapter-button-trigger">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block">
      <WalletMultiButton
        className={connected ? "wallet-adapter-button-trigger" : ""}
        data-connected={connected}
      />
    </div>
  );
}
