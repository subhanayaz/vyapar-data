import { getLenisInstance } from "@/lib/lenis-bridge";

export function scrollToSection(sectionId: string) {
  const selector = `#${sectionId}`;
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(selector, { duration: 1.6 });
    return;
  }

  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}
