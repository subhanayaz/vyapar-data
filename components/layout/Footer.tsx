import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FooterMark } from "@/components/ui/FooterMark";
import { FooterLocationRows } from "@/components/layout/FooterLocations";
import { SITE } from "@/data/site";
import { sectionHref } from "@/lib/scroll";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot-wrap">
        <div className="foot-brand">
          <Logo />
          <p className="foot-desc">{SITE.description}</p>
        </div>
        <div className="foot-links">
          <a href={sectionHref("categories")}>Categories</a>
          <a href={sectionHref("how")}>How It Works</a>
          <a href={sectionHref("pricing")}>Pricing</a>
          <a href={sectionHref("faq")}>FAQ</a>
          <a href={sectionHref("contact")}>Contact</a>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>

      <section className="foot-locations" aria-label="Companies data by location">
        <h2 className="foot-locations-title">Companies Data by Location</h2>
        <FooterLocationRows />
      </section>

      <FooterMark text={SITE.name} />

      <div className="foot-bot">
        <span className="foot-copy">{SITE.copyright}</span>
        <span className="foot-right">{SITE.footerDomainNote}</span>
      </div>
    </footer>
  );
}
