import { CoinFixed } from "@/components/ui/CoinFixed";
import { HeroScrollCue } from "@/components/ui/HeroScrollCue";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Categories } from "@/components/sections/Categories";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FormatSection } from "@/components/sections/FormatSection";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { EarlyAccess } from "@/components/sections/EarlyAccess";

export default function HomePage() {
  return (
    <>
      {/* CSS 3D coin - fixed behind everything, zero WebGL */}
      <CoinFixed />
      <HeroScrollCue />

      <Nav />

      <main style={{ position: "relative", zIndex: 10 }}>
        <Hero />
        <Ticker />
        <Categories />
        <HowItWorks />
        <FormatSection />
        <Pricing />
        <FAQ />
        <EarlyAccess />
      </main>

      <Footer />
    </>
  );
}
