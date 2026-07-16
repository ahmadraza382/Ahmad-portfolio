"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Slim top progress bar for App Router client-side navigation.
 * Starts on nav intent (internal <a> clicks, router.push via history.pushState,
 * and browser back/forward), trickles to ~90%, and completes when the committed
 * route (pathname) changes. No external library.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  const running = useRef(false);
  const trickle = useRef<number | null>(null);
  const timeouts = useRef<number[]>([]);

  const clearTimers = () => {
    if (trickle.current) {
      clearInterval(trickle.current);
      trickle.current = null;
    }
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];
  };

  const start = () => {
    if (running.current) return;
    running.current = true;
    clearTimers();
    setVisible(true);
    setWidth(10);
    trickle.current = window.setInterval(() => {
      setWidth((w) => (w >= 90 ? w : w + Math.max(0.4, (90 - w) * 0.05)));
    }, 180);
    // Safety net: never leave the bar stuck if a navigation is cancelled.
    timeouts.current.push(window.setTimeout(() => done(), 10000));
  };

  const done = () => {
    if (!running.current) return;
    running.current = false;
    clearTimers();
    setWidth(100);
    timeouts.current.push(window.setTimeout(() => setVisible(false), 220));
    timeouts.current.push(window.setTimeout(() => setWidth(0), 450));
  };

  // Complete whenever the committed route actually changes.
  useEffect(() => {
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Start on navigation intent. Patched once; reads the live pathname via ref.
  useEffect(() => {
    const isModified = (e: MouseEvent) =>
      e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

    const onClick = (e: MouseEvent) => {
      if (isModified(e)) return;
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      const target = a.getAttribute("target");
      if (!href || target === "_blank") return;
      if (/^(https?:|mailto:|tel:)/i.test(href)) return; // external
      if (href.startsWith("#")) return; // same-page anchor
      const dest = href.split("#")[0].split("?")[0];
      if (dest === pathnameRef.current) return; // already here
      start();
    };

    const origPush = history.pushState;
    history.pushState = function (this: History, ...args) {
      start();
      return origPush.apply(this, args as Parameters<typeof origPush>);
    };
    const onPop = () => start();

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      history.pushState = origPush;
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible && width === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9997] pointer-events-none h-[3px]"
    >
      <div
        style={{
          width: `${width}%`,
          height: "100%",
          background: "var(--gold)",
          boxShadow: "0 0 10px var(--gold), 0 0 4px var(--gold)",
          opacity: visible ? 1 : 0,
          transition: width === 0 ? "none" : "width .2s ease, opacity .3s ease",
        }}
      />
    </div>
  );
}
