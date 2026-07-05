"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile) return;

    const panel = panelRef.current;
    if (!panel) return;

    gsap.set(panel, { opacity: 0, y: 40 });

    const reveal = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "55% top",
      scrub: 0.85,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(panel, { opacity: progress, y: 40 * (1 - progress) });
      },
    });

    return () => { reveal.kill(); };
  }, []);

  return (
    <section className="hero-split" id="hero">
      {/* ── Content LEFT ── */}
      <div ref={panelRef} className="hero-panel">
        <div className="hero-badge">
          <span className="badge-dot" />
          Live now — no waitlist
        </div>

        <h1 className="hero-h1">
          <span className="line-wrap line-1"><span className="line-inner">India&apos;s</span></span>
          <span className="line-wrap line-2"><span className="line-inner">Business</span></span>
          <span className="line-wrap line-3"><span className="line-inner">Data.</span></span>
        </h1>

        <p className="hero-sub">
          Buy B2B contact lists as Excel or CSV. Pay once, delivered by
          email. No login, no monthly plan.
        </p>

        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={() => scrollToSection("contact")}>
            Get free sample
          </button>
          <button type="button" className="btn-ghost" onClick={() => scrollToSection("categories")}>
            Explore data
          </button>
        </div>
      </div>

      {/* ── Coin RIGHT — transparent so fixed coin shows ── */}
      <div className="hero-void" />
    </section>
  );
}
