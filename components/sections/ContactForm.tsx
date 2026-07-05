"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import {
  getLocationFormDefaults,
  getLocationScopeCopy,
  locationRequestAnchor,
} from "@/lib/locationPaths";
import { getServiceLocationBySlug } from "@/data/locations";
import type { LocationScope } from "@/data/locations";
import { CustomSelect, type SelectOption } from "@/components/ui/CustomSelect";
import { buildSampleRequestWhatsAppUrl, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const OTHER = "Other";

const LEAD_TYPE_OPTIONS: SelectOption[] = [
  { value: "B2B — reach businesses", label: "B2B — reach businesses" },
  { value: "B2C — reach consumers", label: "B2C — reach consumers" },
  { value: "Both B2B & B2C", label: "Both B2B & B2C" },
];

const VOLUME_OPTIONS: SelectOption[] = [
  { value: "Up to 2,000 leads", label: "Up to 2,000 leads" },
  { value: "Up to 10,000 leads", label: "Up to 10,000 leads" },
  { value: "50,000+ leads", label: "50,000+ leads" },
  { value: "Not sure yet", label: "Not sure yet" },
];

export type ContactFormPreset = {
  locationName: string;
  locationScope: LocationScope;
  locationSlug: string;
  defaultIndustry?: string;
};

type ContactFormProps = {
  preset?: ContactFormPreset;
  compact?: boolean;
};

function buildIndustryOptions(selectedIndustry?: string): SelectOption[] {
  const baseOptions = CATEGORIES.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  if (selectedIndustry && !baseOptions.some((option) => option.value === selectedIndustry)) {
    return [...baseOptions, { value: selectedIndustry, label: selectedIndustry }, { value: OTHER, label: OTHER }];
  }

  return [...baseOptions, { value: OTHER, label: OTHER }];
}

export function ContactForm({ preset, compact = false }: ContactFormProps) {
  const searchParams = useSearchParams();
  const querySlug = searchParams.get("location") ?? searchParams.get("city") ?? searchParams.get("state");
  const queryIndustry = searchParams.get("category") ?? searchParams.get("industry");

  const resolvedPreset = useMemo(() => {
    if (preset) {
      return {
        ...preset,
        defaultIndustry: preset.defaultIndustry ?? queryIndustry ?? undefined,
      };
    }

    if (!querySlug) return undefined;

    const match = getServiceLocationBySlug(querySlug);
    if (!match) return undefined;

    return {
      locationName: match.location.name,
      locationScope: match.location.scope,
      locationSlug: match.location.slug,
      defaultIndustry: queryIndustry ?? undefined,
    };
  }, [preset, querySlug, queryIndustry]);

  const formDefaults = resolvedPreset
    ? getLocationFormDefaults(resolvedPreset.locationName, resolvedPreset.locationScope)
    : null;

  const scopeCopy = resolvedPreset
    ? getLocationScopeCopy(resolvedPreset.locationName, resolvedPreset.locationScope)
    : null;

  const [fullName, setFullName] = useState("");
  const [leadType, setLeadType] = useState("");
  const [industry, setIndustry] = useState(resolvedPreset?.defaultIndustry ?? "");
  const [customIndustry, setCustomIndustry] = useState("");
  const [location, setLocation] = useState(formDefaults?.locationValue ?? "");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!resolvedPreset) return;

    const defaults = getLocationFormDefaults(
      resolvedPreset.locationName,
      resolvedPreset.locationScope,
    );

    setLocation(defaults.locationValue);

    if (resolvedPreset.defaultIndustry) {
      setIndustry(resolvedPreset.defaultIndustry);
    }
  }, [resolvedPreset]);

  const industryOptions = buildIndustryOptions(resolvedPreset?.defaultIndustry);
  const resolvedIndustry = industry === OTHER ? customIndustry.trim() : industry.trim();
  const lockLocation = Boolean(resolvedPreset);

  const canSend =
    fullName.trim().length > 0 &&
    leadType.length > 0 &&
    resolvedIndustry.length > 0 &&
    location.trim().length > 0;

  const openWhatsApp = () => {
    if (!canSend) return;

    const scopeNote = resolvedPreset
      ? `${formDefaults?.scopeLabel}: ${resolvedPreset.locationName}`
      : undefined;

    const url = buildSampleRequestWhatsAppUrl({
      fullName: fullName.trim(),
      leadType,
      industry: resolvedIndustry,
      location: scopeNote ? `${location.trim()} (${scopeNote})` : location.trim(),
      quantity,
      notes: notes.trim(),
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`contact-form-card${compact ? " contact-form-card--compact" : ""}`} id="request">
      {resolvedPreset && scopeCopy && (
        <div className="contact-form-context">
          <span className="contact-form-badge">{scopeCopy.eyebrow}</span>
          <p className="contact-form-context-title">{scopeCopy.headline}</p>
          <p className="contact-form-context-copy">{scopeCopy.summary}</p>
        </div>
      )}

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
            options={industryOptions}
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
            {resolvedPreset?.locationScope === "state"
              ? "Target state"
              : resolvedPreset?.locationScope === "region"
                ? "Target region"
                : "Target city"}
          </label>
          <input
            id="cf-location"
            className="contact-input"
            type="text"
            placeholder={formDefaults?.locationPlaceholder ?? "e.g. Mumbai, Maharashtra"}
            value={location}
            readOnly={lockLocation}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>

        <div className="contact-field">
          <span className="contact-label">
            How many leads? <span className="contact-optional">(optional)</span>
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
            Anything specific? <span className="contact-optional">(optional)</span>
          </label>
          <textarea
            id="cf-notes"
            className="contact-input contact-textarea"
            rows={3}
            placeholder={formDefaults?.notesPlaceholder ?? "e.g. only businesses with an email and website"}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
      </div>

      <div className="hero-actions contact-actions">
        <button type="button" className="btn-primary" onClick={openWhatsApp} disabled={!canSend}>
          Message on WhatsApp
        </button>
      </div>

      <p className="contact-note">WhatsApp: {WHATSAPP_DISPLAY}</p>
    </div>
  );
}

export function contactFormHref(slug: string, category?: string) {
  const params = new URLSearchParams({ location: slug });
  if (category) params.set("category", category);
  return `/?${params.toString()}${locationRequestAnchor()}`;
}
