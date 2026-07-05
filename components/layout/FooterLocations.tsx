import Link from "next/link";
import type { LocationRegion, ServiceLocation } from "@/data/locations";
import { getFooterLocationSections } from "@/data/locations";
import { locationPagePath } from "@/lib/locationPaths";

type FooterLinkGroupProps = {
  locations: ServiceLocation[];
};

function FooterLinkGroup({ locations }: FooterLinkGroupProps) {
  return (
    <ul className="foot-location-row-list">
      {locations.map((location) => (
        <li key={location.slug}>
          <Link href={locationPagePath(location.slug)}>{location.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterLocationRows() {
  const { states, metroCities, otherCities, regionPacks } = getFooterLocationSections();

  return (
    <div className="foot-location-rows">
      <div className="foot-location-row">
        <h3 className="foot-location-row-title">States</h3>
        <FooterLinkGroup locations={states} />
      </div>

      <div className="foot-location-row">
        <h3 className="foot-location-row-title">Cities</h3>
        <div className="foot-location-tiers">
          <FooterLinkGroup locations={metroCities} />
          <span className="foot-tier-divider" aria-hidden />
          <FooterLinkGroup locations={otherCities} />
        </div>
      </div>

      <div className="foot-location-row">
        <h3 className="foot-location-row-title">Regional</h3>
        <FooterLinkGroup locations={regionPacks} />
      </div>
    </div>
  );
}

type RelatedLocationsProps = {
  region: LocationRegion;
  activeSlug: string;
  activeScope: ServiceLocation["scope"];
};

export function RelatedLocations({ region, activeSlug, activeScope }: RelatedLocationsProps) {
  const relatedStates = region.states.filter((entry) => entry.slug !== activeSlug).slice(0, 6);
  const relatedCities = region.cities.filter((entry) => entry.slug !== activeSlug).slice(0, 10);

  return (
    <div className="location-related-grid">
      {activeScope !== "state" && relatedStates.length > 0 && (
        <div className="location-related-group">
          <h3 className="loc-related-title">Other states in {region.title}</h3>
          <ul className="location-related-list">
            {relatedStates.map((entry) => (
              <li key={entry.slug}>
                <Link href={locationPagePath(entry.slug)}>{entry.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeScope !== "city" && relatedCities.length > 0 && (
        <div className="location-related-group">
          <h3 className="loc-related-title">Cities in {region.title}</h3>
          <ul className="location-related-list">
            {relatedCities.map((entry) => (
              <li key={entry.slug}>
                <Link href={locationPagePath(entry.slug)}>{entry.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
