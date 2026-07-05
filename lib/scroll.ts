import { getLenisInstance } from "@/lib/lenis-bridge";

export function sectionHref(sectionId: string) {
  return `/#${sectionId}`;
}

export function scrollToSection(sectionId: string) {
  const selector = `#${sectionId}`;
  const target = document.querySelector(selector);

  if (!target) {
    window.location.assign(sectionHref(sectionId));
    return;
  }

  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(selector, { duration: 1.6 });
    return;
  }

  target.scrollIntoView({ behavior: "smooth" });
}

export function scrollToHash(hash: string, lenisDuration = 1.4) {
  if (!hash.startsWith("#")) return;

  const target = document.querySelector(hash);
  if (!target) return;

  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(hash, { duration: lenisDuration });
    return;
  }

  target.scrollIntoView({ behavior: "smooth" });
}
