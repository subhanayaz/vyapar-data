"use client";

import { useEffect, useState } from "react";
import { usePageReady } from "@/components/providers/PageLoadGate";
import { scrollToSection } from "@/lib/scroll";

export function HeroScrollCue() {
  const pageReady = usePageReady();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!pageReady) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile) return;

    const showCue = () => setVisible(window.scrollY < 72);
    // Was 1900ms - combined with the page-load gate, the button could sit
    // un-tappable (pointer-events:none until "is-visible") for 2.5s+, long
    // enough that an early tap silently did nothing and read as broken.
    const appearTimer = window.setTimeout(showCue, 500);

    window.addEventListener("scroll", showCue, { passive: true });

    return () => {
      window.clearTimeout(appearTimer);
      window.removeEventListener("scroll", showCue);
    };
  }, [pageReady]);

  return (
    <button
      type="button"
      className={`hero-scroll-cue${visible ? " is-visible" : ""}`}
      aria-label="Scroll down for content"
      // Jumps straight to the content section (same target as the "Explore
      // data" CTA) instead of an arbitrary one-viewport nudge, so it always
      // lands somewhere meaningful regardless of hero height.
      onClick={() => scrollToSection("hero-panel")}
    >

      <span className="hero-scroll-cue-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 5v10M7 12l5 5 5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="hero-scroll-cue-label">Scroll for content</span>
    </button>
  );
}
