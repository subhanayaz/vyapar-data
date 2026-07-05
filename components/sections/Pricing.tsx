"use client";

import { PRICING_PLANS } from "@/data/pricing";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { buildPlanEnquiryWhatsAppUrl } from "@/lib/whatsapp";

export function Pricing() {
  const openPlanOnWhatsApp = (tier: string, amount: string, period: string) => {
    const isCustom = amount.toLowerCase() === "custom";
    const url = buildPlanEnquiryWhatsAppUrl({ tier, amount, period, isCustom });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="split-sec" id="pricing">
      {/* ── Split: coin LEFT, content + pricing cards RIGHT (same column) ── */}
      <div className="split-grid panel-l">
        <div className="split-void" />

        <div className="split-panel">
          <ScrollReveal>
            <div className="sec-eyebrow">Pricing</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="sec-h">Pay once.<br />No subscription.</h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="sec-p">
              Pick a plan, tell us your target and location, and get your file
              the same day. Pay only for what you need - no sign-up, no renewals.
            </p>
          </ScrollReveal>
        </div>

        <div className="split-cards">
          <RevealStagger className="price-grid">
            {PRICING_PLANS.map((plan) => (
              <div key={plan.tier} className={`pc${plan.highlighted ? " hi" : ""}`}>
                <div className="pc-tier">
                  {plan.tier}
                  {plan.badge && <span className="pop-label">{plan.badge}</span>}
                </div>
                <div className="pc-note">{plan.note}</div>
                <div className="pc-amt">{plan.amount}</div>
                <div className="pc-period">{plan.period}</div>
                <ul className="pc-list">
                  {plan.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <button
                  type="button"
                  className="pc-btn"
                  onClick={() => openPlanOnWhatsApp(plan.tier, plan.amount, plan.period)}
                >
                  {plan.buttonLabel}
                </button>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
