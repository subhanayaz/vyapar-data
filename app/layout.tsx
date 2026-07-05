import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/data/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PageLoadGate } from "@/components/providers/PageLoadGate";

export const metadata: Metadata = {
  title: `${SITE.name} | India's Verified B2B & B2C Leads`,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <PageLoadGate>
          <SmoothScroll>{children}</SmoothScroll>
        </PageLoadGate>
      </body>
    </html>
  );
}
