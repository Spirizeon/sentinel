import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleGeminiEffect from "@/components/Gemini";
import GlobeDemo from "@/components/Globe";

import { CardHoverEffectDemo } from "@/components/Cards";
import { TextHoverEffectDemo } from "@/components/Hover";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sentinel",
  description: "supercharged oss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleGeminiEffect />
        <GlobeDemo />
        <CardHoverEffectDemo />
        <TextHoverEffectDemo />
        {children}
      </body>
    </html>
  );
}
