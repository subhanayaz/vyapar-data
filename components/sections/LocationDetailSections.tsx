import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import type { ServiceLocation } from "@/data/locations";
import { CATEGORY_ICONS } from "@/components/ui/CategoryIcons";
import { DrawIcon } from "@/components/ui/DrawIcon";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { locationPagePath, locationRequestAnchor } from "@/lib/locationPaths";

type LocationCategoryGridProps = {
  location: ServiceLocation;
};

export function LocationCategoryGrid({ location }: LocationCategoryGridProps) {
  return (
    <RevealStagger className="cat-grid loc-cat-grid" fromTop>
      {CATEGORIES.map((category, index) => {
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
      })}
    </RevealStagger>
  );
}

const COVERAGE_FIELDS = [
  { label: "Business name", detail: "Registered trade name of each company." },
  { label: "Contact person", detail: "Owner or decision-maker where publicly listed." },
  { label: "Phone & WhatsApp", detail: "Verified mobile numbers for direct outreach." },
  { label: "Email", detail: "Business email addresses, where available." },
  { label: "Full address", detail: "Street, area, city, state, and pincode." },
  { label: "Category & website", detail: "Industry tag plus website or map link." },
];

export function LocationCoverage() {
  return (
    <RevealStagger className="loc-coverage-grid" fromTop>
      {COVERAGE_FIELDS.map((field) => (
        <div key={field.label} className="loc-coverage-item">
          <div className="loc-coverage-label">{field.label}</div>
          <p className="loc-coverage-detail">{field.detail}</p>
        </div>
      ))}
    </RevealStagger>
  );
}
