import { TextHoverEffectDemo } from "@/components/HoverAPI";

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
