"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/lenis-bridge";
import { scrollToHash } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Lenis defaults touch to native (unsmoothed) scrolling - syncTouch
      // opts touch drags into the same eased scrolling as wheel/trackpad.
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertiaExponent: 1.7,
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);
    setLenisInstance(lenis);

    const handleHashScroll = () => {
      if (!window.location.hash) return;
      scrollToHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;

    const timer = window.setTimeout(() => {
      scrollToHash(window.location.hash);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
