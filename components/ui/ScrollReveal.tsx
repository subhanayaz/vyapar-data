"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  className?: string;
};

export function ScrollReveal({
  children,
  delay = 0,
  style = {},
  className = "",
}: ScrollRevealProps) {
  const { elementRef, isVisible } = useInView();

  return (
    <div
      ref={elementRef}
      className={`reveal ${isVisible ? "reveal--visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
