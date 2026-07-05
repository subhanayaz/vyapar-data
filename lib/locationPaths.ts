import type { LocationScope } from "@/data/locations";

export function locationPagePath(slug: string) {
  return `/companies-data/${slug}`;
}

export function locationRequestAnchor() {
  return "#request";
}

export function locationPageTitle(locationName: string, scope: LocationScope) {
  if (scope === "city") return `${locationName} Companies Data`;
  if (scope === "state") return `${locationName} Companies Data`;
  return `${locationName} Companies Data`;
}

export function locationScopeNoun(scope: LocationScope) {
  if (scope === "city") return "city";
  if (scope === "state") return "state";
  return "region";
}

export function locationPageDescription(
  locationName: string,
  regionTitle: string,
  scope: LocationScope,
) {
  const coverage =
    scope === "city"
      ? `every industry across ${locationName}`
      : scope === "state"
        ? `every district and city in ${locationName}`
        : `all states and cities in ${locationName}`;

  return `Buy verified B2B & B2C company data for ${locationName}. Covers ${coverage}, sourced from Google and public listings and delivered as a clean Excel or CSV file. Free sample first. Part of ${regionTitle}.`;
}

export function locationHeroLead(locationName: string, scope: LocationScope) {
  if (scope === "city") {
    return `Reach verified businesses across ${locationName} — owners, decision-makers, and buyers. Filter by industry and audience, preview a free sample, and get a clean Excel or CSV file the same day.`;
  }

  if (scope === "state") {
    return `Cover the entire ${locationName} market in one file — every major city and industrial cluster. Filter by industry and audience, preview a free sample, and receive verified records as Excel or CSV.`;
  }

  return `Run outreach across all of ${locationName} in one order. We scope the states, cities, and industries you want, share a free sample, and deliver verified records as Excel or CSV.`;
}

export type LocationScopeCopy = {
  eyebrow: string;
  headline: string;
  summary: string;
};

export function getLocationScopeCopy(
  locationName: string,
  scope: LocationScope,
): LocationScopeCopy {
  if (scope === "city") {
    return {
      eyebrow: "Single-city list",
      headline: `${locationName} city list`,
      summary: `Businesses located inside ${locationName}, filtered by the industry and audience you choose.`,
    };
  }

  if (scope === "state") {
    return {
      eyebrow: "Full-state list",
      headline: `${locationName} state list`,
      summary: `Every city and industrial belt across ${locationName} — a wider list than any single city.`,
    };
  }

  return {
    eyebrow: "Regional pack",
    headline: `${locationName} pack`,
    summary: `Multiple states and cities bundled into one order, scoped to exactly what you need.`,
  };
}

export function getLocationFormDefaults(
  locationName: string,
  scope: LocationScope,
) {
  const scopeLabel = scope === "city" ? "City" : scope === "state" ? "State" : "Region";
  return {
    locationValue: locationName,
    locationPlaceholder:
      scope === "city"
        ? "e.g. Mumbai"
        : scope === "state"
          ? "e.g. Maharashtra"
          : "e.g. All Western India",
    notesPlaceholder:
      scope === "city"
        ? `e.g. only ${locationName} businesses with an email`
        : scope === "state"
          ? `e.g. full ${locationName} coverage, manufacturers only`
          : "e.g. which states and cities to include",
    scopeLabel,
  };
}
