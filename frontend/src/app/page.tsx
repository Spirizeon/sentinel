import GoogleGeminiEffect from "@/components/Gemini";
import GlobeDemo from "@/components/Globe";
import LayoutGridDemo from "@/components/Grid";
import { CardHoverEffectDemo } from "@/components/Cards";
import { TextHoverEffectDemo } from "@/components/Hover";
import GlowingEffectDemo from "@/components/Glow";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <GoogleGeminiEffect />
      <TextHoverEffectDemo />
      <GlowingEffectDemo />
      <GlobeDemo />
    </>
  );
}
