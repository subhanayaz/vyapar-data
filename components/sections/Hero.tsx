"use client";

import { scrollToSection } from "@/lib/scroll";

export function Hero() {
  return (
    <section className="hero-split" id="hero">
      {/* ── Content LEFT ── */}
      <div className="hero-panel">
        <div className="hero-badge">
          <span className="badge-dot" />
          Fresh data · sourced from Google
        </div>

        <h1 className="hero-h1">
          <span className="line-wrap line-1"><span className="line-inner">Reach Every</span></span>
          {/* <span className="line-wrap line-2"><span className="line-inner">Every</span></span> */}
          <span className="line-wrap line-3"><span className="line-inner">Customer.</span></span>
        </h1>

        <p className="hero-sub">
          Verified B2B &amp; B2C leads, pulled fresh from Google and public
          listings. Delivered as Excel or CSV - pay once, no subscription,
          no login.
        </p>

        <div className="hero-actions" id="hero-panel">
          <button type="button" className="btn-primary" onClick={() => scrollToSection("contact")}>
            Get free sample
          </button>
          <button type="button" className="btn-ghost" onClick={() => scrollToSection("categories")}>
            Explore data
          </button>
        </div>
      </div>

      {/* ── Coin RIGHT - transparent so fixed coin shows ── */}
      <div className="hero-void" />
    </section>
  );
}
