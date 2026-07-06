"use client";

import { useRef, useState, type ReactNode } from "react";

type BoxSliderProps = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
};

export function BoxSlider({ children, ariaLabel, className = "" }: BoxSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  };

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = (card?.getBoundingClientRect().width ?? 280) + 16;
    track.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className={`box-slider ${className}`.trim()}>
      <div
        ref={trackRef}
        className="box-slider-track"
        role="list"
        aria-label={ariaLabel}
        onScroll={updateEdges}
        data-lenis-prevent-horizontal
      >
        {children}
      </div>
      <div className="box-slider-nav">
        <button
          type="button"
          className="box-slider-arrow"
          onClick={() => scroll(-1)}
          disabled={atStart}
          aria-label="Scroll left"
        >
          ‹
        </button>
        <button
          type="button"
          className="box-slider-arrow"
          onClick={() => scroll(1)}
          disabled={atEnd}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
}
