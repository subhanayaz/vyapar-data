"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CustomSelect, type SelectOption } from "@/components/ui/CustomSelect";
import { buildSampleRequestWhatsAppUrl, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const OTHER = "Other";

const LEAD_TYPE_OPTIONS: SelectOption[] = [
  { value: "B2B — reach businesses", label: "B2B — reach businesses" },
  { value: "B2C — reach consumers", label: "B2C — reach consumers" },
  { value: "Both B2B & B2C", label: "Both B2B & B2C" },
];

const INDUSTRY_OPTIONS: SelectOption[] = [
  ...CATEGORIES.map((category) => ({ value: category.name, label: category.name })),
  { value: OTHER, label: OTHER },
];

const VOLUME_OPTIONS: SelectOption[] = [
  { value: "Up to 2,000 leads", label: "Up to 2,000 leads" },
  { value: "Up to 10,000 leads", label: "Up to 10,000 leads" },
  { value: "50,000+ leads", label: "50,000+ leads" },
  { value: "Not sure yet", label: "Not sure yet" },
];

export function EarlyAccess() {
  const [fullName, setFullName] = useState("");
  const [leadType, setLeadType] = useState("");
  const [industry, setIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const resolvedIndustry = industry === OTHER ? customIndustry.trim() : industry.trim();
  const canSend =
    fullName.trim().length > 0 &&
    leadType.length > 0 &&
    resolvedIndustry.length > 0 &&
    location.trim().length > 0;

  const openWhatsApp = () => {
    if (!canSend) return;
    const url = buildSampleRequestWhatsAppUrl({
      fullName: fullName.trim(),
      leadType,
      industry: resolvedIndustry,
      location: location.trim(),
      quantity,
      notes: notes.trim(),
    });
    window.open(url, "_blank", "noopener,noreferrer");
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
              Tell us who you want to reach and we&apos;ll send 100 verified sample
              leads straight to WhatsApp — no cost, no commitment.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="contact-form-card">
              <div className="contact-grid">
                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-name">
                    Your name
                  </label>
                  <input
                    id="cf-name"
                    className="contact-input"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </div>

                <div className="contact-field">
                  <span className="contact-label">Who do you want to reach?</span>
                  <CustomSelect
                    ariaLabel="Lead type"
                    value={leadType}
                    onChange={setLeadType}
                    options={LEAD_TYPE_OPTIONS}
                    placeholder="Select lead type"
                  />
                </div>

                <div className="contact-field">
                  <span className="contact-label">Industry / category</span>
                  <CustomSelect
                    ariaLabel="Industry or category"
                    value={industry}
                    onChange={setIndustry}
                    options={INDUSTRY_OPTIONS}
                    placeholder="Select industry"
                  />
                </div>

                {industry === OTHER && (
                  <div className="contact-field">
                    <label className="contact-label" htmlFor="cf-custom">
                      Your industry
                    </label>
                    <input
                      id="cf-custom"
                      className="contact-input"
                      type="text"
                      placeholder="e.g. Pharma distributors"
                      value={customIndustry}
                      onChange={(event) => setCustomIndustry(event.target.value)}
                    />
                  </div>
                )}

                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-location">
                    Target city / state
                  </label>
                  <input
                    id="cf-location"
                    className="contact-input"
                    type="text"
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  />
                </div>

                <div className="contact-field">
                  <span className="contact-label">
                    How many leads?{" "}
                    <span className="contact-optional">(optional)</span>
                  </span>
                  <CustomSelect
                    ariaLabel="Number of leads"
                    value={quantity}
                    onChange={setQuantity}
                    options={VOLUME_OPTIONS}
                    placeholder="Select a range"
                  />
                </div>

                <div className="contact-field span-2">
                  <label className="contact-label" htmlFor="cf-notes">
                    Anything specific?{" "}
                    <span className="contact-optional">(optional)</span>
                  </label>
                  <textarea
                    id="cf-notes"
                    className="contact-input contact-textarea"
                    rows={3}
                    placeholder="e.g. only businesses with an email and website"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                  />
                </div>
              </div>

              <div className="hero-actions contact-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={openWhatsApp}
                  disabled={!canSend}
                >
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
