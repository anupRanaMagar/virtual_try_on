import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterSection from "./landing/FooterSection";
import { Suspense } from "react";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Virtual Try On",
  description: "Discover your perfect outfit with our advanced virtual try-on",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} antialiased`}>
        <div className="h-full w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <main className={`h-full flex w-full flex-col pt-[52px] `}>
              {children}
            </main>
            <FooterSection />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
