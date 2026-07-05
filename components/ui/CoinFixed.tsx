"use client";

import { useEffect, useRef, useState } from "react";
import { usePageReady } from "@/components/providers/PageLoadGate";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Deterministic pseudo-random, seeded by index — Math.random() directly
   in render produces different values on the server vs. the client,
   which React flags as a hydration mismatch. This is a pure function of
   `seed`, so server and client always compute the identical value. */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function round(value: number, places: number) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  left:              `${round(10 + seededRandom(i * 7 + 1) * 80, 4)}%`,
  top:               `${round(5  + seededRandom(i * 7 + 2) * 90, 4)}%`,
  width:             `${round(1  + seededRandom(i * 7 + 3) * 2.5, 5)}px`,
  height:            `${round(1  + seededRandom(i * 7 + 4) * 2.5, 5)}px`,
  animationDelay:    `${round(seededRandom(i * 7 + 5) * 10, 4)}s`,
  animationDuration: `${round(5  + seededRandom(i * 7 + 6) * 9, 4)}s`,
  opacity:            round(0.12 + seededRandom(i * 7 + 7) * 0.22, 6),
}));

/* Engraved emblem — a small team (three business contacts) with a growth
   arrow rising through them: this data turns into leads, and leads turn
   into growth. Original artwork (not traced from any reference), same
   embossed treatment as the old "V" letterform: a light highlight
   top-left + dark shadow bottom-right so it reads as pressed metal,
   not flat print. */
function CoinEmblem() {
  return (
    <svg className="coin-emblem" viewBox="0 0 100 100" aria-hidden="true">
      <g className="coin-emblem-shape">
        {/* Left teammate (behind) */}
        <g className="coin-emblem-person">
          <circle cx="28" cy="34" r="8" />
          <path d="M18,60 L18,49 A10,10 0 0 1 38,49 L38,60 Z" />
        </g>
        {/* Right teammate (behind) */}
        <g className="coin-emblem-person">
          <circle cx="72" cy="34" r="8" />
          <path d="M62,60 L62,49 A10,10 0 0 1 82,49 L82,60 Z" />
        </g>
        {/* Centre teammate (in front) */}
        <g className="coin-emblem-person">
          <circle cx="50" cy="28" r="9.5" />
          <path d="M38.5,64 L38.5,50 A11.5,11.5 0 0 1 61.5,50 L61.5,64 Z" />
        </g>
      </g>
    </svg>
  );
}

function CoinRingText({ id, text }: { id: string; text: string }) {
  return (
    <svg className="coin-ring-svg" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id={id} d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0" />
      </defs>
      <text fontSize="7.2" fill="rgba(45,45,45,0.52)" fontFamily="Inter,sans-serif"
        letterSpacing="2.8" fontWeight="500">
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </svg>
  );
}

/* Must mirror --content-max / the 7fr:3fr split in globals.css. */
const CONTENT_MAX = 1400; // px — page never grows wider than this
const VOID_FRAC   = 0.30; // coin/void column's share of the content width

/**
 * Per-section side (desktop). +1 → content-left / coin right half.
 * -1 → content-right / coin left half. The actual pixel offset is
 * derived at measure-time from the *current* viewport, clamped to
 * CONTENT_MAX — see coinOffsetPx() below.
 *
 * Ticker is deliberately absent — it's a thin full-width marquee, not a
 * left/right content section, so it's skipped as a coin checkpoint. The
 * coin stays on the hero's side (right) straight through the ticker and
 * only makes its first move when Categories arrives.
 */
const SECTION_SIDE: { sel: string; side: 1 | -1 }[] = [
  { sel: "#categories", side: -1 }, // categories content-right → coin left
  { sel: "#how",        side:  1 }, // how-it-works content-left → coin right
  { sel: "#format",     side: -1 }, // format content-right → coin left
  { sel: "#pricing",    side:  1 }, // pricing content-left → coin right
  { sel: "#faq",        side: -1 }, // faq content-right → coin left
  { sel: "#contact",    side:  1 }, // early-access content-left → coin right
];

/** Distance (px) from the centred content column's centre-line to the
 *  centre of its 30%-wide void/coin half, clamped to CONTENT_MAX so the
 *  coin never drags out toward the edges of an ultra-wide viewport. */
function coinOffsetPx() {
  const w = Math.min(window.innerWidth, CONTENT_MAX);
  return w * (0.5 - VOID_FRAC / 2);
}

export function CoinFixed() {
  const pageReady = usePageReady();
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    setParticlesReady(true);
  }, []);

  /**
   * Four-layer transform hierarchy — each ref owns one concern:
   *
   *   sizeRef  — CSS scale only  (mobile: 0.5×, tablet: 0.65×, desktop: 1×)
   *              GSAP NEVER touches this element.
   *
   *   posRef   — translateX, eased every frame toward a scrollY-derived
   *              target (desktop: slides left / right per section)
   *
   *   tiltRef  — direct style.transform rotateX/Y  (mouse parallax)
   *              GSAP NEVER touches this element.
   *
   *   coinRef  — rotateY, eased every frame toward the same scrollY-
   *              derived target (flip) / GSAP y-tween (idle float)
   *              NO CSS transform in stylesheet, no idle rotation.
   *              Size stays constant — only sizeRef scales, per breakpoint.
   */
  const wrapRef  = useRef<HTMLDivElement>(null);
  const sizeRef  = useRef<HTMLDivElement>(null);
  const posRef   = useRef<HTMLDivElement>(null);
  const tiltRef  = useRef<HTMLDivElement>(null);
  const coinRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageReady) return;
    const el = coinRef.current;
    if (!el) return;
    const t = gsap.to(el, {
      y: -18, duration: 2.8, ease: "power1.inOut", yoyo: true, repeat: -1,
    });
    return () => { t.kill(); };
  }, [pageReady]);

  /* ── Intro: coin drops in from above on first load ────────────
     Desktop: vertical drop on posRef.
     Mobile/tablet: roll in from above — posRef y + tiltRef rotateX
     (tumble) + coinRef rotateY (spin) for a coin rolling out feel. */
  useEffect(() => {
    if (!pageReady) return;

    const pos = posRef.current;
    const tilt = tiltRef.current;
    const coin = coinRef.current;
    if (!pos) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    if (isMobile && tilt && coin) {
      gsap.set(tilt, { rotateX: -720, rotateZ: 8 });
      gsap.set(coin, { rotateY: -540 });
      gsap.set(pos, { y: -(window.innerHeight * 0.62 + 140) });

      const timeline = gsap.timeline({ delay: 0.15 });
      timeline.to(pos,  { y: 0, duration: 1.7, ease: "power3.out" }, 0);
      timeline.to(tilt, { rotateX: 0, rotateZ: 0, duration: 1.7, ease: "power3.out" }, 0);
      timeline.to(coin, { rotateY: 0, duration: 1.7, ease: "power3.out" }, 0);
      return () => { timeline.kill(); };
    }

    const tween = gsap.to(pos, {
      y: 0, duration: 1.4, delay: 0.3, ease: "power3.out",
    });
    return () => { tween.kill(); };
  }, [pageReady]);

  /* ── X-position + flip: a single deterministic function of scrollY,
     re-evaluated every frame — NOT multiple independent GSAP tweens on
     the same shared properties. (An earlier version used one gsap.fromTo
     scrub-tween per section, all targeting the same pos.x / coin.rotateY.
     Each one renders its own "from" state the instant it's created, and
     since every band's progress is 0 at mount, the LAST one created wins
     — which put Hero at Contact's "from" position/face instead of its
     own. Same class of bug could re-fire on any ScrollTrigger refresh.)
     Here there's exactly one owner: each frame we find which transition
     band scrollY falls in, linearly interpolate x/rotateY within it, and
     ease the coin toward that target — always correct regardless of
     scroll speed, direction, or refreshes.
     Each transition is a full 360° turn (not a 180° flip), so the coin
     always comes to rest showing the SAME face on both the left and the
     right — the back face has no readable content, so resting on it left
     the coin looking blank on every left-side section. A full turn still
     reads as a lively "flip" mid-transition without ever settling there.
     Desktop only; the coin stays put with no turn on mobile since it
     never slides there. ─────────────────────────────────────────── */
  useEffect(() => {
    const pos = posRef.current;
    const coin = coinRef.current;
    if (!pos || !coin) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    if (isMobile) {
      gsap.set(pos, { x: 0 });
      return;
    }

    type Band = { start: number; end: number; xFrom: number; xTo: number; rotFrom: number; rotTo: number };
    let bands: Band[] = [];
    let heroX = 0; // px — recomputed in measure(), used as the pre-Categories default

    const measure = () => {
      const vh = window.innerHeight;
      const offset = coinOffsetPx();
      heroX = offset; // hero: content-left → coin right
      let prevX = heroX;
      bands = [];
      SECTION_SIDE.forEach(({ sel, side }, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const xTo = side * offset;
        bands.push({
          start: top - vh * 0.60,
          end:   top - vh * 0.12,
          xFrom: prevX,        xTo,
          rotFrom: i * 360,    rotTo: (i + 1) * 360,
        });
        prevX = xTo;
      });
    };

    const targetFor = (y: number) => {
      let x = heroX, rot = 0;
      for (const b of bands) {
        if (y <= b.start) break;
        if (y >= b.end) { x = b.xTo; rot = b.rotTo; continue; }
        const t = (y - b.start) / (b.end - b.start);
        x   = b.xFrom   + (b.xTo   - b.xFrom)   * t;
        rot = b.rotFrom + (b.rotTo - b.rotFrom) * t;
        break;
      }
      return { x, rot };
    };

    measure();
    /* Start already at the pose matching the CURRENT scrollY, not the
       hero default — browsers restore scroll position on refresh, so
       always starting from heroX/0 made the coin visibly slide/rotate
       into place on every reload of a mid-page scroll position. */
    const initial = targetFor(window.scrollY);
    let curX = initial.x, curRot = initial.rot, raf: number;

    /* The browser's own scroll-restoration-on-refresh isn't guaranteed to
       have landed by the time this effect runs — it can arrive a frame
       or few later (Lenis re-reads real scrollY too), which would jump
       window.scrollY out from under us mid-mount. Snapping (no easing)
       for a brief settle window after mount absorbs that jump instantly
       instead of visibly gliding to the corrected pose — that glide is
       what read as a "shake" on refresh. Normal scroll-driven easing
       resumes right after.  */
    const mountedAt = performance.now();
    const SETTLE_MS = 400;

    const tick = () => {
      const { x: tx, rot: tr } = targetFor(window.scrollY);
      if (performance.now() - mountedAt < SETTLE_MS) {
        curX = tx;
        curRot = tr;
      } else {
        curX   += (tx  - curX)   * 0.12;
        curRot += (tr - curRot) * 0.12;
      }
      gsap.set(pos,  { x: curX });
      gsap.set(coin, { rotateY: curRot });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("resize", measure);
    ScrollTrigger.addEventListener("refresh", measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      ScrollTrigger.removeEventListener("refresh", measure);
    };
  }, []);

  /* ── Un-pin from the viewport once the last coin section (#contact)
     ends, so the coin scrolls away with the page instead of staying
     fixed and getting clipped/covered by the footer beneath it.
     Freezes it exactly where it visually sits at that boundary, then
     restores position:fixed if the user scrolls back up above it. ─── */
  useEffect(() => {
    const wrap = wrapRef.current;
    const last = document.querySelector("#contact");
    if (!wrap || !last) return;

    const st = ScrollTrigger.create({
      trigger: last,
      start: "bottom bottom",
      onEnter: () => {
        const rect = wrap.getBoundingClientRect();
        Object.assign(wrap.style, {
          position: "absolute",
          top:    `${window.scrollY + rect.top}px`,
          left:   "0",
          right:  "0",
          bottom: "auto",
          height: `${rect.height}px`,
        });
      },
      onLeaveBack: () => {
        Object.assign(wrap.style, {
          position: "", top: "", left: "", right: "", bottom: "", height: "",
        });
      },
    });

    return () => st.kill();
  }, []);

  /* ── Mobile/tablet: coin eases back as hero content scrolls over ─ */
  useEffect(() => {
    if (!window.matchMedia("(max-width: 900px)").matches) return;

    const size = sizeRef.current;
    const wrap = wrapRef.current;
    const hero = document.querySelector("#hero");
    if (!size || !wrap || !hero) return;

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "55% top",
      scrub: 0.85,
      onUpdate: (self) => {
        const progress = self.progress;
        size.style.setProperty("--coin-scroll-scale", String(1 - progress * 0.12));
        wrap.style.opacity = String(1 - progress * 0.4);
      },
    });

    return () => {
      st.kill();
      size.style.removeProperty("--coin-scroll-scale");
      wrap.style.opacity = "";
    };
  }, []);

  /* ── Mouse parallax → tiltRef only (GSAP never touches it) ──── */
  useEffect(() => {
    const tilt = tiltRef.current;
    if (!tilt) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, raf: number;

    const onMove = (e: MouseEvent) => {
      tx =  (e.clientX / window.innerWidth  - 0.5) * 14;
      ty = -(e.clientY / window.innerHeight - 0.5) *  8;
    };

    const tick = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      tilt.style.transform = `rotateY(${cx}deg) rotateX(${cy}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="coin-fixed-wrap" aria-hidden="true">
      <div className="coin-ambient" />

      {/* Layer 1: CSS-only scale for mobile/tablet */}
      <div ref={sizeRef} className="coin-size-wrap">

        {/* Layer 2: GSAP x-slide */}
        <div ref={posRef} className="coin-positioner">

          {/* Layer 3: mouse tilt */}
          <div ref={tiltRef} className="coin-tilt">
            <div className="coin-scene">

              {/* Layer 4: GSAP rotation + float */}
              <div ref={coinRef} className="coin-3d">

                <div className="coin-face coin-front">
                  <div className="coin-sheen" />
                  <div className="coin-face-content">
                    <CoinEmblem />
                    <CoinRingText id="ring-front"
                      text="  VYAPAR · DATA · INDIA · BUSINESS LEADS ·  " />
                  </div>
                  <div className="coin-ring-outer" />
                  <div className="coin-ring-inner" />
                </div>

                <div className="coin-face coin-back">
                  <div className="coin-sheen coin-sheen-back" />
                  <div className="coin-face-content coin-back-content">
                    <span className="coin-b2b">B2B</span>
                    <span className="coin-data-lbl">DATA</span>
                    <span className="coin-india-lbl">INDIA</span>
                    <CoinRingText id="ring-back"
                      text="  VERIFIED · LEADS · EXCEL · CSV · READY ·  " />
                  </div>
                  <div className="coin-ring-outer" />
                  <div className="coin-ring-inner" />
                </div>

                <div className="coin-edge" />
              </div>

              <div className="coin-reflection" />
            </div>
          </div>
        </div>
      </div>

      {/* Particles: client-only — inline styles with sub-pixel values hydrate
          differently between React SSR and the browser in Next 15. */}
      {particlesReady && (
        <ul className="coin-particles">
          {PARTICLES.map((style, i) => (
            <li key={i} className="particle" style={style} />
          ))}
        </ul>
      )}
    </div>
  );
}
