"use client";

import { scrollToSection } from "@/lib/scroll";

export function Hero() {
  return (
    <section className="hero-split" id="hero">
      {/* ── Content LEFT ── */}
      <div className="hero-panel">
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
