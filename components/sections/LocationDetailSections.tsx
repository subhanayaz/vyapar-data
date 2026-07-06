import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import type { ServiceLocation } from "@/data/locations";
import { BoxSlider } from "@/components/ui/BoxSlider";
import { CATEGORY_ICONS } from "@/components/ui/CategoryIcons";
import { DrawIcon } from "@/components/ui/DrawIcon";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { locationPagePath, locationRequestAnchor } from "@/lib/locationPaths";

type LocationCategoryGridProps = {
  location: ServiceLocation;
};

export function LocationCategoryGrid({ location }: LocationCategoryGridProps) {
  const renderCard = (category: (typeof CATEGORIES)[number], index: number) => {
    const Icon = CATEGORY_ICONS[category.name];
    const href = `${locationPagePath(location.slug)}?category=${encodeURIComponent(
      category.name,
    )}${locationRequestAnchor()}`;

    return (
      <Link key={category.number} href={href} className="cat-card loc-cat-card">
        <div className="cat-num">{category.number}</div>
        {Icon && (
          <DrawIcon size={34} delay={index * 90}>
            <Icon />
          </DrawIcon>
        )}
        <div className="cat-name">{category.name}</div>
        <p className="cat-desc">{category.description}</p>
        <span className="loc-cat-cta">Request in {location.name} →</span>
      </Link>
    );
  };

  return (
    <>
      <RevealStagger className="cat-grid loc-cat-grid loc-grid-desktop" fromTop>
        {CATEGORIES.map(renderCard)}
      </RevealStagger>
      <BoxSlider ariaLabel="Browse industries" className="loc-slider-mobile">
        {CATEGORIES.map(renderCard)}
      </BoxSlider>
    </>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a1 1 0 011-1h10a1 1 0 011 1v18" />
      <path d="M2 22h20" /><path d="M9 9h1" /><path d="M14 9h1" />
      <path d="M9 13h1" /><path d="M14 13h1" /><path d="M9 22v-4h6v4" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2 7 12 13 22 7" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41L11 3.83A2 2 0 009.59 3.17L3 3v6.59a2 2 0 00.59 1.41l9.58 9.58a2 2 0 002.83 0l6.59-6.59a2 2 0 000-2.83z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  );
}

const COVERAGE_FIELDS = [
  { label: "Business name", detail: "Registered trade name of each company.", icon: BuildingIcon },
  { label: "Contact person", detail: "Owner or decision-maker where publicly listed.", icon: UserIcon },
  { label: "Phone & WhatsApp", detail: "Verified mobile numbers for direct outreach.", icon: PhoneIcon },
  { label: "Email", detail: "Business email addresses, where available.", icon: MailIcon },
  { label: "Full address", detail: "Street, area, city, state, and pincode.", icon: PinIcon },
  { label: "Category & website", detail: "Industry tag plus website or map link.", icon: TagIcon },
] as const;

export function LocationCoverage() {
  return (
    <BoxSlider ariaLabel="What's inside every file">
      {COVERAGE_FIELDS.map((field, i) => {
        const Icon = field.icon;
        return (
          <div key={field.label} className="loc-coverage-card" role="listitem">
            <DrawIcon size={28} delay={i * 60}>
              <Icon />
            </DrawIcon>
            <div className="fi-title">{field.label}</div>
            <p className="fi-desc">{field.detail}</p>
          </div>
        );
      })}
    </BoxSlider>
  );
}

const SAMPLE_ROW_SEEDS = [
  { businessName: "Sharma Enterprises", type: "Mfg", phonePrefix: "98" },
  { businessName: "Patel Traders", type: "Retail", phonePrefix: "97" },
  { businessName: "Reddy Associates", type: "Service", phonePrefix: "99" },
  { businessName: "Khan Distributors", type: "Dist", phonePrefix: "76" },
  { businessName: "Iyer & Sons", type: "Export", phonePrefix: "95" },
] as const;

type LocationSampleTableProps = {
  location: ServiceLocation;
};

export function LocationSampleTable({ location }: LocationSampleTableProps) {
  return (
    <div className="sample-table-section">
      <div className="sec-eyebrow">Live preview</div>
      <div className="sample-table-wrap" data-lenis-prevent-horizontal>
        <div className="sample-table">
          <div className="st-head">
            <span>Business</span><span>Mobile</span><span>City</span>
            <span>Website</span><span>Type</span>
          </div>
          {SAMPLE_ROW_SEEDS.map((row, i) => (
            <div key={row.businessName} className="st-row">
              <span>{row.businessName}</span>
              <span className="muted-cell">{`${row.phonePrefix}XXXXX${String(i + 1).padStart(2, "0")}`}</span>
              <span>{location.name}</span>
              <span className="muted-cell">https://www.xyz.com</span>
              <span><span className="st-tag">{row.type}</span></span>
            </div>
          ))}
        </div>
      </div>
      <p className="sample-preview-note">Preview only · real files include full contact &amp; address details</p>
    </div>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function SampleFileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" /><polyline points="9 15 12 18 15 15" /><line x1="12" y1="10" x2="12" y2="18" />
    </svg>
  );
}
function PayCardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}
function DeliverIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const LOCATION_STEP_ICONS = [TargetIcon, SampleFileIcon, PayCardIcon, DeliverIcon];

type LocationStepsProps = {
  locationName: string;
};

export function LocationSteps({ locationName }: LocationStepsProps) {
  const steps = [
    {
      title: "Share your target",
      body: `Tell us your industry, audience, and how many ${locationName} leads you need.`,
    },
    {
      title: "Get a free sample",
      body: "We send a free sample so you can judge the data quality first.",
    },
    {
      title: "Approve & pay once",
      body: "Approve the quote — a one-time payment, no subscription.",
    },
    {
      title: "Receive your file",
      body: "Get the full Excel or CSV file on email and WhatsApp.",
    },
  ];

  const renderStep = (step: (typeof steps)[number], i: number) => {
    const Icon = LOCATION_STEP_ICONS[i];
    return (
      <div key={step.title} className="step loc-step-card" role="listitem">
        <DrawIcon size={30} delay={i * 80}>
          <Icon />
        </DrawIcon>
        <div className="step-n">{String(i + 1).padStart(2, "0")}</div>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
      </div>
    );
  };

  return (
    <>
      <RevealStagger className="steps loc-grid-desktop" fromTop>
        {steps.map(renderStep)}
      </RevealStagger>
      <BoxSlider ariaLabel="How it works" className="loc-slider-mobile">
        {steps.map(renderStep)}
      </BoxSlider>
    </>
  );
}
