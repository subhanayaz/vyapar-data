"use client";

import { useEffect, useRef, useState } from "react";
import { usePageReady } from "@/components/providers/PageLoadGate";
import { getLenisInstance } from "@/lib/lenis-bridge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Deterministic pseudo-random, seeded by index - Math.random() directly
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

/* Engraved emblem - a small team (three business contacts) with a growth
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
const CONTENT_MAX = 1400; // px - page never grows wider than this
const VOID_FRAC   = 0.30; // coin/void column's share of the content width

/**
 * Per-section side (desktop). +1 → content-left / coin right half.
 * -1 → content-right / coin left half. The actual pixel offset is
 * derived at measure-time from the *current* viewport, clamped to
 * CONTENT_MAX - see coinOffsetPx() below.
 *
 * Ticker is deliberately absent - it's a thin full-width marquee, not a
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
   * Four-layer transform hierarchy - each ref owns one concern:
   *
   *   sizeRef  - CSS scale only  (mobile: 0.5×, tablet: 0.65×, desktop: 1×)
   *              GSAP NEVER touches this element.
   *
   *   posRef   - translateX, eased every frame toward a scrollY-derived
   *              target (desktop: slides left / right per section)
   *
   *   tiltRef  - direct style.transform rotateX/Y  (mouse parallax)
   *              GSAP NEVER touches this element.
   *
   *   coinRef  - rotateY, eased every frame toward the same scrollY-
   *              derived target (flip) / GSAP y-tween (idle float)
   *              NO CSS transform in stylesheet, no idle rotation.
   *              Size stays constant - only sizeRef scales, per breakpoint.
   */
  const screenRef = useRef<HTMLDivElement>(null);
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

  /* ── Mobile: cinematic intro - the coin is already visible at rest
     (centred, below the nav bar) from first paint - no drop-in from
     above the screen. It's launched with a sharp rotational impulse
     (fast spin + tumble right from the start, easing out) and tosses
     itself up toward the top of the screen (just below the nav bar),
     losing upward speed as it rises - real gravity decelerating a
     toss - then falls from there all the way to the bottom, the fall
     doing the opposite curve: it *starts* slow right at the apex and
     keeps *accelerating* the whole way down (ease-in), like an actual
     object under gravity. The spin/tumble keeps going the whole time,
     settling into a graceful, decelerating tumble with a gentle
     residual wobble as "gravity takes over" on the way down. The page
     auto-scrolls to the Hero right as the coin clears the screen.

     Like a real toss, this can't be cut short once it's thrown - scroll
     input (wheel/touch) and clicks (the logo doing a same-page nav, any
     other link) are blocked for its exact duration, then released right
     as the auto-scroll takes over. Without this, scrolling (or a click
     that scrolled the page, e.g. the logo) during the toss fed straight
     into the scroll-linked fade/collapse effect below, which visibly
     cut the animation off mid-flight. ────────────────────────────────*/
  useEffect(() => {
    if (!pageReady) return;
    if (!window.matchMedia("(max-width: 900px)").matches) return;

    const pos = posRef.current;
    const tilt = tiltRef.current;
    const coin = coinRef.current;
    if (!pos) return;

    const lenis = getLenisInstance();
    const blockInteraction = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.documentElement.classList.add("coin-toss-lock");
    lenis?.stop();
    window.addEventListener("wheel", blockInteraction, { passive: false });
    window.addEventListener("touchmove", blockInteraction, { passive: false });
    document.addEventListener("click", blockInteraction, true);

    const release = () => {
      document.documentElement.classList.remove("coin-toss-lock");
      lenis?.start();
      window.removeEventListener("wheel", blockInteraction);
      window.removeEventListener("touchmove", blockInteraction);
      document.removeEventListener("click", blockInteraction, true);
    };

    const vh = window.innerHeight;
    const RISE_DURATION = 0.75;
    const FALL_DURATION = 1.85;
    const TOTAL_DURATION = RISE_DURATION + FALL_DURATION;
    const tl = gsap.timeline({ delay: 0.2 });

    /* Rise: from rest (y:0, matching the CSS default so there's no jump
       when this tween takes over) up toward the top, clearing the
       nav bar (clip-path already keeps anything above that hidden).
       Decelerating - a toss losing speed to gravity on the way up. */
    tl.fromTo(pos,
      { y: 0 },
      { y: -(vh * 0.66), duration: RISE_DURATION, ease: "power2.out" },
      0,
    );
    /* Fall: from the apex down past the bottom edge. Gravity-style
       acceleration - slow right at the top, fastest right before it
       clears the screen. */
    tl.to(pos, { y: vh * 1.15, duration: FALL_DURATION, ease: "power2.in" }, RISE_DURATION);

    /* Spin on the vertical axis - the "sharp impulse": fast right away,
       decelerating (the opposite curve from the fall) so it visibly
       settles down as it drops, like spin bleeding off to air
       resistance while gravity keeps winning on the way down. */
    if (coin) {
      tl.fromTo(coin,
        { rotateY: 0 },
        { rotateY: 1080, duration: TOTAL_DURATION, ease: "power3.out" },
        0,
      );
    }

    /* Tumble end-over-end, same decelerating shape, then a small
       residual wobble once it's essentially settled - "gently wobbles
       as gravity takes over" - before it drops out of frame. */
    if (tilt) {
      tl.fromTo(tilt,
        { rotateX: -8, rotateZ: -10 },
        { rotateX: 430, rotateZ: 8, duration: TOTAL_DURATION * 0.75, ease: "power3.out" },
        0,
      );
      tl.to(tilt, {
        rotateZ: -6, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 3,
      }, TOTAL_DURATION * 0.7);
    }

    tl.call(() => {
      release();
      if (lenis) {
        lenis.scrollTo(vh, { duration: 1.1 });
      } else {
        window.scrollTo({ top: vh, behavior: "smooth" });
      }
    }, undefined, TOTAL_DURATION);

    return () => {
      tl.kill();
      release();
    };
  }, [pageReady]);

  /* ── X-position + flip: a single deterministic function of scrollY,
     re-evaluated every frame - NOT multiple independent GSAP tweens on
     the same shared properties. (An earlier version used one gsap.fromTo
     scrub-tween per section, all targeting the same pos.x / coin.rotateY.
     Each one renders its own "from" state the instant it's created, and
     since every band's progress is 0 at mount, the LAST one created wins
     - which put Hero at Contact's "from" position/face instead of its
     own. Same class of bug could re-fire on any ScrollTrigger refresh.)
     Here there's exactly one owner: each frame we find which transition
     band scrollY falls in, linearly interpolate x/rotateY within it, and
     ease the coin toward that target - always correct regardless of
     scroll speed, direction, or refreshes.
     Each transition is a full 360° turn (not a 180° flip), so the coin
     always comes to rest showing the SAME face on both the left and the
     right - the back face has no readable content, so resting on it left
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
    let heroX = 0; // px - recomputed in measure(), used as the pre-Categories default

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
       hero default - browsers restore scroll position on refresh, so
       always starting from heroX/0 made the coin visibly slide/rotate
       into place on every reload of a mid-page scroll position. */
    const initial = targetFor(window.scrollY);
    let curX = initial.x, curRot = initial.rot, raf: number;

    /* The browser's own scroll-restoration-on-refresh isn't guaranteed to
       have landed by the time this effect runs - it can arrive a frame
       or few later (Lenis re-reads real scrollY too), which would jump
       window.scrollY out from under us mid-mount. Snapping (no easing)
       for a brief settle window after mount absorbs that jump instantly
       instead of visibly gliding to the corrected pose - that glide is
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

  /* ── Desktop: un-pin from the viewport once the last coin section
     (#contact) ends, so the coin scrolls away with the page instead of
     staying fixed and getting clipped/covered by the footer beneath it.
     Freezes it exactly where it visually sits at that boundary, then
     restores position:fixed if the user scrolls back up above it. ─── */
  useEffect(() => {
    const wrap = wrapRef.current;
    const last = document.querySelector("#contact");
    if (!wrap || !last) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

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

  /* ── Mobile: the browser restores scroll position on a hard reload by
     default (history.scrollRestoration = "auto") - so refreshing while
     scrolled past the coin lands right back there, and it never gets
     to show. Incognito/a fresh tab has no history to restore from,
     which is why it always worked there. Opting out and snapping to
     the top makes every fresh load of this page start at the coin,
     matching a hard refresh's intent regardless of prior scroll. ──── */
  useEffect(() => {
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  /* ── Mobile: the coin lives in its own normal (non-fixed) 100vh screen
     at the very top of the page (see the JSX below + globals.css) - it
     never slides or stays pinned behind Hero/Ticker/Categories, it just
     scrolls away like any other section once the user scrolls past it.

     Two things plain scrolling wouldn't do on its own:
     1. Scrolling through a static 100vh block feels like dead space -
        so its opacity is tied directly to scroll progress across that
        first screen, fading smoothly to invisible by the time the user
        has scrolled past it, instead of just sliding away unchanged.
     2. Stop the user from scrolling back UP into that screen again -
        so the instant they cross it (once, ever, per page load), its
        height collapses to 0 - permanently, until an actual reload -
        and the scroll position is nudged up by exactly that (fixed,
        known: one viewport height) amount in the same tick, so nothing
        visibly jumps.

     Lenis owns scrolling here (SmoothScroll.tsx), not the browser - it
     re-asserts its own tracked position every rAF tick, so nudging the
     native scroll directly would get fought/overwritten by Lenis a
     frame later. Going through lenis.scrollTo with immediate:true keeps
     Lenis's own state in sync instead of fighting it.

     Plain scroll listener, not GSAP ScrollTrigger - this only needs a
     one-time threshold check, and remembering trigger-refresh semantics
     that need to work correctly. ────────────────────────────────────*/
  useEffect(() => {
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    const screen = screenRef.current;
    const wrap = wrapRef.current;
    if (!screen || !wrap) return;

    let collapsed = false;

    const onScroll = () => {
      if (collapsed) return;
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / vh));

      wrap.style.opacity = String(1 - progress);

      if (progress < 1) return;

      collapsed = true;
      window.removeEventListener("scroll", onScroll);

      screen.style.height = "0px";
      screen.style.overflow = "hidden";

      const targetY = window.scrollY - vh;
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <div ref={screenRef} className="coin-mobile-screen">
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

        {/* Particles: client-only - inline styles with sub-pixel values hydrate
            differently between React SSR and the browser in Next 15. */}
        {particlesReady && (
          <ul className="coin-particles">
            {PARTICLES.map((style, i) => (
              <li key={i} className="particle" style={style} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
