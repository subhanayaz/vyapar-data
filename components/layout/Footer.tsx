import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FooterMark } from "@/components/ui/FooterMark";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot-wrap">
        <div className="foot-brand">
          <Logo />
          <p className="foot-desc">{SITE.description}</p>
        </div>
        <div className="foot-links">
          <a href="#categories">Categories</a>
          <a href="#how">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>

      <FooterMark text={SITE.name} />

      <div className="foot-bot">
        <span className="foot-copy">{SITE.copyright}</span>
        <span className="foot-right">{SITE.footerDomainNote}</span>
      </div>
    </footer>
  );
}
