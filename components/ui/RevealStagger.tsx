"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  fromTop?: boolean;
};

export function RevealStagger({ children, className = "", style, fromTop = false }: RevealStaggerProps) {
  const { elementRef, isVisible } = useInView({ threshold: 0.08 });

  const base = fromTop ? "reveal-stagger-top" : "reveal-stagger";
  const visible = isVisible ? `${base}--visible` : "";

  return (
    <div
      ref={elementRef}
      className={`${base} ${visible} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
