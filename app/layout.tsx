import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PageLoadGate } from "@/components/providers/PageLoadGate";
import { AmbientDust } from "@/components/ui/AmbientDust";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-inter",
});

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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <PageLoadGate>
          <AmbientDust />
          <SmoothScroll>{children}</SmoothScroll>
        </PageLoadGate>
      </body>
    </html>
  );
}
