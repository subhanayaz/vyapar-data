"use client";

import { Suspense } from "react";
import { ContactForm, type ContactFormPreset } from "@/components/sections/ContactForm";

type LocationRequestSectionProps = {
  preset: ContactFormPreset;
};

function LocationRequestSectionInner({ preset }: LocationRequestSectionProps) {
  const scopeNoun =
    preset.locationScope === "city"
      ? "city"
      : preset.locationScope === "state"
        ? "state"
        : "region";

  return (
    <section className="location-request-section" id="request">
      <div className="sec-eyebrow">Request a sample</div>
      <h2 className="location-request-title">Get {preset.locationName} leads on WhatsApp</h2>
      <p className="location-request-copy">
        This form is already set to the {preset.locationName} {scopeNoun}. Pick your
        industry and audience, and we&apos;ll reply on WhatsApp with a free sample and a
        clear quote before you pay anything.
      </p>
      <ContactForm preset={preset} compact />
    </section>
  );
}

export function LocationRequestSection({ preset }: LocationRequestSectionProps) {
  return (
    <Suspense fallback={<div className="contact-form-card contact-form-card--loading" aria-hidden />}>
      <LocationRequestSectionInner preset={preset} />
    </Suspense>
  );
}
