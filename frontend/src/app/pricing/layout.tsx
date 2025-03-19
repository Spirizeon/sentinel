import { TextHoverEffectDemo } from "@/components/HoverPricing";
import GlowingStarsBackgroundCard from "./page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TextHoverEffectDemo />
        {children}
      </body>
    </html>
  );
}
