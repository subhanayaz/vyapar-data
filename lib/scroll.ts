import { getLenisInstance } from "@/lib/lenis-bridge";

type LenisScrollTarget = number | string | HTMLElement;

function smoothScrollTo(target: LenisScrollTarget, duration = 1.6) {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(target, { duration });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  const element = typeof target === "string"
    ? document.querySelector<HTMLElement>(target)
    : target;
  element?.scrollIntoView({ behavior: "smooth" });
}

export function scrollToSection(sectionId: string) {
  smoothScrollTo(`#${sectionId}`);
}

export function scrollByViewport(viewports = 1) {
  smoothScrollTo(window.scrollY + window.innerHeight * viewports);
}
