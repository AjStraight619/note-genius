import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note Genius",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className} suppressHydrationWarning>
          <Theme accentColor="indigo" appearance="dark">
            {/* <Navbar /> */}
            {children}
          </Theme>
        </body>
      </Providers>
    </html>
  );
}
