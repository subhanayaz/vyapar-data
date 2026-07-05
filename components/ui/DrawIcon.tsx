"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type DrawIconProps = {
  children: ReactNode;
  delay?: number;
  size?: number;
};

export function DrawIcon({ children, delay = 0, size = 36 }: DrawIconProps) {
  const { elementRef, isVisible } = useInView({ threshold: 0.3 });

  return (
    <div
      ref={elementRef}
      className={`draw-icon${isVisible ? " draw-icon--visible" : ""}`}
      style={{ width: size, height: size, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
