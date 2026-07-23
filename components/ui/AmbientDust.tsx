"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  createAmbientDustParticles,
  DESKTOP_DUST_COUNT,
  MOBILE_DUST_COUNT,
} from "@/Domain/ambientDust";

const DESKTOP_PARTICLES = createAmbientDustParticles(DESKTOP_DUST_COUNT);
const MOBILE_PARTICLES = createAmbientDustParticles(MOBILE_DUST_COUNT);

export function AmbientDust() {
  const [particles, setParticles] = useState<typeof DESKTOP_PARTICLES | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const apply = () => {
      setParticles(mediaQuery.matches ? MOBILE_PARTICLES : DESKTOP_PARTICLES);
    };
    apply();
    mediaQuery.addEventListener("change", apply);
    return () => mediaQuery.removeEventListener("change", apply);
  }, []);

  if (!particles) return null;

  return (
    <ul className="ambient-dust" aria-hidden="true">
      {particles.map((particle, index) => {
        const style = {
          left: particle.left,
          top: particle.top,
          animationDelay: particle.animationDelay,
          animationDuration: particle.animationDuration,
          "--dust-x": particle.driftX,
          "--dust-y": particle.driftY,
        } as CSSProperties;

        return <li key={index} className="ambient-dust-dot" style={style} />;
      })}
    </ul>
  );
}
