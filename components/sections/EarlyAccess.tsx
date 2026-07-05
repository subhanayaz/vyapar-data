"use client";

import { Suspense } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/sections/ContactForm";

function ContactFormFallback() {
  return <div className="contact-form-card contact-form-card--loading" aria-hidden />;
}

export function EarlyAccess() {
  return (
    <section className="split-sec" id="contact">
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
              Tell us who you want to reach and we&apos;ll send 100 verified sample leads
              straight to WhatsApp — no cost, no commitment. City and state lists are
              priced differently; we&apos;ll confirm the right plan when you message us.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Suspense fallback={<ContactFormFallback />}>
              <ContactForm />
            </Suspense>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
