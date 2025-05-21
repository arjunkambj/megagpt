import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html suppressHydrationWarning lang="en">
        <head />
        <body
          className={clsx(
            "min-h-dvh bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ConvexClientProvider>
            <Providers
              themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
              <main className="relative w-full h-full">{children}</main>
            </Providers>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
