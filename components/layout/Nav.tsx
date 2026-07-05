"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { scrollToSection, sectionHref } from "@/lib/scroll";

const LINKS = [
  { id: "categories", label: "Data" },
  { id: "how", label: "How It Works" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Get free sample" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <nav className="nav">
      <div className="nav-inner">
        <Logo />
        <ul className="nav-links">
          {LINKS.filter((link) => link.id !== "contact").map((link) => (
            <li key={link.id}><a href={sectionHref(link.id)}>{link.label}</a></li>
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
            <li key={link.id}>
              <a href={sectionHref(link.id)} onClick={() => setOpen(false)}>{link.label}</a>
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
