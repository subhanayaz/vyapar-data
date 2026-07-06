import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { RelatedLocations } from "@/components/layout/FooterLocations";
import {
  LocationCategoryGrid,
  LocationCoverage,
  LocationSampleTable,
  LocationSteps,
} from "@/components/sections/LocationDetailSections";
import { LocationRequestSection } from "@/components/sections/LocationRequestSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  getAllServiceLocations,
  getLocationScopeLabel,
  getServiceLocationBySlug,
} from "@/data/locations";
import { SITE } from "@/data/site";
import {
  locationHeroLead,
  locationPageDescription,
  locationPageTitle,
  locationScopeNoun,
} from "@/lib/locationPaths";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

type LocationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceLocations().map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = getServiceLocationBySlug(slug);

  if (!match) {
    return { title: `Location Not Found | ${SITE.name}` };
  }

  const { location, region } = match;
  const title = `${locationPageTitle(location.name, location.scope)} | ${SITE.name}`;
  const description = locationPageDescription(location.name, region.title, location.scope);

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const match = getServiceLocationBySlug(slug);

  if (!match) {
    notFound();
  }

  const { location, region } = match;
  const scopeLabel = getLocationScopeLabel(location.scope);
  const scopeNoun = locationScopeNoun(location.scope);

  return (
    <>
      <Nav />

      <main className="loc-page">
        <section className="loc-hero">
          <div className="loc-wrap">
            <ScrollReveal>
              <div className="loc-hero-top">
                <div className="sec-eyebrow">{region.title}</div>
                <span className="location-scope-badge">{scopeLabel}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <h1 className="loc-hero-title">
                {location.name} <span className="loc-hero-title-dim">Companies Data</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <p className="loc-hero-lead">{locationHeroLead(location.name, location.scope)}</p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="loc-hero-actions">
                <Link href="#request" className="btn-primary">
                  Request {location.name} data
                </Link>
                <Link href="#categories" className="btn-ghost">
                  Browse industries
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={260}>
              <ul className="loc-hero-stats">
                <li>
                  <span className="loc-stat-key">Verified</span>
                  <span className="loc-stat-val">B2B &amp; B2C records</span>
                </li>
                <li>
                  <span className="loc-stat-key">Excel / CSV</span>
                  <span className="loc-stat-val">ready for any CRM</span>
                </li>
                <li>
                  <span className="loc-stat-key">Free sample</span>
                  <span className="loc-stat-val">before you pay</span>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </section>

        <section className="loc-section" id="categories">
          <div className="loc-wrap">
            <ScrollReveal>
              <div className="sec-eyebrow">Industries</div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="sec-h">Every industry in {location.name}</h2>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="sec-p sec-p--gap">
                Each industry is built and delivered as its own list. Pick a category
                to pre-fill the request form with {location.name} and that industry.
              </p>
            </ScrollReveal>
            <LocationCategoryGrid location={location} />
          </div>
        </section>

        <section className="loc-section loc-section--alt" id="coverage">
          <div className="loc-wrap">
            <ScrollReveal>
              <div className="sec-eyebrow">What you get</div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="sec-h">Inside every {location.name} file</h2>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="sec-p sec-p--gap">
                Clean, structured columns you can drop straight into calls, WhatsApp,
                or email campaigns — no formatting or clean-up needed.
              </p>
            </ScrollReveal>
            <LocationCoverage />
            <ScrollReveal delay={100}>
              <LocationSampleTable location={location} />
            </ScrollReveal>
          </div>
        </section>

        <section className="loc-section" id="how">
          <div className="loc-wrap">
            <ScrollReveal>
              <div className="sec-eyebrow">How it works</div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="sec-h">From {location.name} target to file</h2>
            </ScrollReveal>
            <LocationSteps locationName={location.name} />
          </div>
        </section>

        <section className="loc-section loc-section--alt">
          <div className="loc-wrap">
            <LocationRequestSection
              preset={{
                locationName: location.name,
                locationScope: location.scope,
                locationSlug: location.slug,
              }}
            />
          </div>
        </section>

        <section className="loc-section">
          <div className="loc-wrap">
            <ScrollReveal>
              <div className="sec-eyebrow">Nearby coverage</div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="sec-h">More {scopeNoun === "city" ? "states & regions" : "places"} we cover</h2>
            </ScrollReveal>
            <RelatedLocations
              region={region}
              activeSlug={location.slug}
              activeScope={location.scope}
            />
            <p className="loc-contact-note">
              Not listed? WhatsApp us at <strong>{WHATSAPP_DISPLAY}</strong> and we&apos;ll
              build any city or state you need.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
