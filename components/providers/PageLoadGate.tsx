"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { SITE } from "@/data/site";

const MIN_LOAD_MS = 900;
const FADE_MS = 650;
const MAX_WAIT_MS = 5000;

type PageLoadGateContextValue = {
  ready: boolean;
};

const PageLoadGateContext = createContext<PageLoadGateContextValue>({ ready: false });

export function usePageReady() {
  return useContext(PageLoadGateContext).ready;
}

async function waitForInitialLoad() {
  const waits: Promise<unknown>[] = [
    new Promise((resolve) => window.setTimeout(resolve, MIN_LOAD_MS)),
  ];

  if (document.fonts?.ready) waits.push(document.fonts.ready);

  if (document.readyState !== "complete") {
    waits.push(new Promise((resolve) => {
      window.addEventListener("load", resolve, { once: true });
    }));
  }

  await Promise.race([
    Promise.all(waits),
    new Promise((resolve) => window.setTimeout(resolve, MAX_WAIT_MS)),
  ]);
}

function PageLoader({ exiting }: { exiting: boolean }) {
  return (
    <div
      className={`page-loader${exiting ? " is-exiting" : ""}`}
      aria-live="polite"
      aria-busy={!exiting}
      aria-label="Loading page"
    >
      <div className="page-loader-inner">
        <div className="page-loader-ring" aria-hidden="true" />
        <p className="page-loader-brand">{SITE.name}</p>
      </div>
    </div>
  );
}

export function PageLoadGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const ready = phase !== "loading";

  useLayoutEffect(() => {
    document.documentElement.classList.add("is-loading");
    return () => {
      document.documentElement.classList.remove("is-loading", "is-loaded");
    };
  }, []);

  useEffect(() => {
    let fadeTimer: number;

    waitForInitialLoad().then(() => {
      setPhase("exiting");
      fadeTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("is-loading");
        document.documentElement.classList.add("is-loaded");
        setPhase("done");
      }, FADE_MS);
    });

    return () => window.clearTimeout(fadeTimer);
  }, []);

  return (
    <PageLoadGateContext.Provider value={{ ready }}>
      {phase !== "done" && <PageLoader exiting={phase === "exiting"} />}
      {children}
    </PageLoadGateContext.Provider>
  );
}
