"use client";

import { useEffect, useRef } from "react";

const REDUCED = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const c = cursorRef.current;
    if (!c) return;
    if ("ontouchstart" in window) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      c.style.opacity = "1";
    };
    window.addEventListener("mousemove", move);

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      c.style.left = cx + "px";
      c.style.top = cy + "px";
      raf = requestAnimationFrame(loop);
    };
    loop();

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      if (t) {
        const k = t.getAttribute("data-cursor");
        c.style.width = k === "cta" ? "56px" : "46px";
        c.style.height = k === "cta" ? "56px" : "46px";
        c.style.background = "var(--accent-soft)";
        c.style.border = "1px solid var(--accent)";
      }
    };
    const out = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      if (t) {
        c.style.width = "14px";
        c.style.height = "14px";
        c.style.background = "var(--accent)";
        c.style.border = "none";
      }
    };
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return cursorRef;
}

export function useReveal(dep?: unknown) {
  useEffect(() => {
    const reduced = REDUCED();

    const show = (el: HTMLElement) => {
      if (el.hasAttribute("data-show")) return;
      const d = reduced ? 0 : +(el.getAttribute("data-delay") || 0);
      window.setTimeout(() => el.setAttribute("data-show", "1"), d);
    };

    document.querySelectorAll<SVGElement>("[data-underline]").forEach((u) => {
      if (!u.closest("[data-reveal]")) u.classList.add("draw-now");
    });

    document.querySelectorAll<HTMLElement>("[data-float]").forEach((el) => {
      if (!reduced) el.style.animation = "floaty 6s ease-in-out infinite";
    });

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-show])")
    );

    if (reduced) {
      targets.forEach(show);
      return;
    }

    const hasIO = typeof IntersectionObserver !== "undefined";

    if (hasIO) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              show(entry.target as HTMLElement);
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
      );
      targets.forEach((el) => io.observe(el));

      const vh = window.innerHeight;
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.96 && r.bottom > 0) show(el);
      });

      return () => io.disconnect();
    }

    const check = () => {
      const vh = window.innerHeight;
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-show])")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.94 && r.bottom > -40) show(el);
        });
    };
    check();
    const timers = [80, 260, 560, 900].map((t) => window.setTimeout(check, t));
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}

export function useMagnetic(dep?: unknown) {
  useEffect(() => {
    if (REDUCED()) return;
    const cleanups: Array<() => void> = [];

    document
      .querySelectorAll<HTMLElement>("[data-magnetic]:not([data-mag])")
      .forEach((el) => {
        el.setAttribute("data-mag", "1");
        el.style.transition = "transform .35s cubic-bezier(.2,.8,.2,1)";
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const mx = e.clientX - r.left - r.width / 2;
          const my = e.clientY - r.top - r.height / 2;
          el.style.transform = `translate(${mx * 0.3}px,${my * 0.4}px)`;
        };
        const onLeave = () => {
          el.style.transform = "translate(0,0)";
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}
