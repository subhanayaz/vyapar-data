"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { scrollToSection } from "@/lib/scroll";

const LINKS = [
  { href: "#categories", label: "Data" },
  { href: "#how", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Get free sample" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <nav className="nav">
      <div className="nav-inner">
        <Logo />
        <ul className="nav-links">
          {LINKS.filter((link) => link.href !== "#contact").map((link) => (
            <li key={link.href}><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
        <button
          type="button"
          className="nav-cta"
          onClick={() => scrollToSection("contact")}
        >
          Get free sample
        </button>
        <button
          type="button"
          className={`nav-hamburger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile-menu${open ? " is-open" : ""}`}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>

    <button
      type="button"
      className={`nav-overlay${open ? " is-open" : ""}`}
      aria-label="Close menu"
      tabIndex={open ? 0 : -1}
      onClick={() => setOpen(false)}
    />
    </>
  );
}
