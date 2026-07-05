"use client";

import { useEffect, useRef } from "react";

/**
 * Huge footer wordmark. A dim base layer sits under a second identical
 * layer whose text is filled by a radial gradient (background-clip:text)
 * centred on the cursor - so the letters catch a bright chrome highlight
 * that follows the mouse, and fade back to barely-there when it leaves.
 *
 * Font size is measured and rescaled (not just clamp()'d to viewport
 * width) so the word's rendered width always exactly fills the
 * container, edge to edge, at any screen size.
 */
export function FooterMark({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const el = textRef.current;
    if (!wrap || !el) return;

    const fit = () => {
      const currentSize = parseFloat(getComputedStyle(el).fontSize);
      const natural = el.scrollWidth;
      if (!natural || !currentSize) return;
      const fontSize = (wrap.clientWidth / natural) * currentSize;
      wrap.style.setProperty("--fs", `${fontSize}px`);
    };

    fit();
    document.fonts?.ready?.then(fit);

    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    return () => ro.disconnect();
  }, [text]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div ref={wrapRef} className="foot-mark-wrap" onMouseMove={onMove}>
      <span ref={textRef} className="foot-mark foot-mark-base">{text}</span>
      <span className="foot-mark foot-mark-glow" aria-hidden="true">{text}</span>
    </div>
  );
}
