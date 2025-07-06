import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingHeader } from "@/components/floating-header";
import { BackgroundOrbs } from "@/components/background-orbs";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PingLab - Test APIs Instantly",
  description: "Built for Speed & Focus - Instant API testing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <BackgroundOrbs />
        <FloatingHeader />
        <main className="pt-16">
          {children}
        </main>
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
