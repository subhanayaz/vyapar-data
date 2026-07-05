"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buildSampleRequestWhatsAppUrl, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const OTHER = "Other";

export function EarlyAccess() {
  const [industry,       setIndustry]       = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [details,        setDetails]        = useState("");

  const resolved = industry === OTHER ? customIndustry.trim() : industry.trim();
  const canSend  = resolved.length > 0;

  const openWhatsApp = () => {
    if (!canSend) return;
    window.open(buildSampleRequestWhatsAppUrl(resolved, details), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="split-sec" id="contact">
      {/* ── Split: coin LEFT, content RIGHT ── */}
      <div className="split-head panel-l">
        <div className="split-void" />

        <div className="split-panel">
          <ScrollReveal>
            <div className="sec-eyebrow">Contact</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="sec-h">Get a free sample on WhatsApp</h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="sec-p sec-p--gap">
              Choose your industry and we&apos;ll send 100 sample contacts straight
              to WhatsApp.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="contact-form-card">
              <label className="contact-label" htmlFor="ci">Industry</label>
              <select id="ci" className="contact-input" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option value="">Select industry</option>
                {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                <option value={OTHER}>{OTHER}</option>
              </select>

              {industry === OTHER && (
                <>
                  <label className="contact-label" htmlFor="cc">Your industry</label>
                  <input id="cc" className="contact-input" type="text" placeholder="e.g. Pharma distributors" value={customIndustry} onChange={(e) => setCustomIndustry(e.target.value)} />
                </>
              )}

              <label className="contact-label" htmlFor="cd">
                City / state <span className="contact-optional">(optional)</span>
              </label>
              <input
                id="cd" className="contact-input" type="text"
                placeholder="e.g. Mumbai, Maharashtra"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && openWhatsApp()}
              />

              <div className="hero-actions contact-actions">
                <button type="button" className="btn-primary" onClick={openWhatsApp} disabled={!canSend}>
                  Message on WhatsApp
                </button>
              </div>
            </div>
            <p className="contact-note">WhatsApp: {WHATSAPP_DISPLAY}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
