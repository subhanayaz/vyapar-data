import { SITE } from "@/data/site";

type LogoProps = {
  href?: string;
};

/** Abstract chrome network mark - three connected nodes standing in for a
 *  network of business data, rendered with the same metallic gradients
 *  as the hero coin so the material language matches without repeating
 *  its literal letterform. */
function LogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" className="logo-mark">
      <defs>
        <linearGradient id="logoNodeFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#f6f6f6" />
          <stop offset="50%"  stopColor="#c9c9c9" />
          <stop offset="100%" stopColor="#767676" />
        </linearGradient>
        <linearGradient id="logoLineStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>
      <line x1="16" y1="8"  x2="7.4"  y2="22.5" stroke="url(#logoLineStroke)" strokeWidth="1.3" />
      <line x1="16" y1="8"  x2="24.6" y2="22.5" stroke="url(#logoLineStroke)" strokeWidth="1.3" />
      <line x1="7.4" y1="22.5" x2="24.6" y2="22.5" stroke="url(#logoLineStroke)" strokeWidth="1.3" />
      <circle cx="16"   cy="7"    r="3.4" fill="url(#logoNodeFill)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
      <circle cx="7"    cy="23.4" r="3.4" fill="url(#logoNodeFill)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
      <circle cx="25"   cy="23.4" r="3.4" fill="url(#logoNodeFill)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
    </svg>
  );
}

export function Logo({ href = "#" }: LogoProps) {
  return (
    <a href={href} className="logo">
      <LogoMark />
      <div className="logo-word">
        <div className="logo-text">{SITE.name}</div>
        {/* <div className="logo-sub">{SITE.tagline}</div> */}
      </div>
    </a>
  );
}
