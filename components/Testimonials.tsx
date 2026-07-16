"use client";

import { useEffect, useState } from "react";
import SectionBadge from "./SectionBadge";
import QuoteButton from "./QuoteButton";
import { TESTIMONIALS, STATEMENTS } from "@/lib/data";

/**
 * Big centered quote section above FAQ.
 * Shows real client testimonials once TESTIMONIALS has entries;
 * until then it rotates Ahmad's own working principles (STATEMENTS).
 */
export default function Testimonials() {
  const isReal = TESTIMONIALS.length > 0;
  const items = isReal
    ? TESTIMONIALS
    : STATEMENTS.map((quote) => ({
        quote,
        name: "Ahmad Raza",
        role: "Full-Stack Developer",
      }));
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % items.length);
    }, 6000);
    return () => clearInterval(t);
  }, [items.length]);

  if (items.length === 0) return null;
  const t = items[active % items.length];

  return (
    <section
      id="testimonials"
      className="my-[clamp(8px,1.2vw,18px)] relative overflow-hidden rounded-[clamp(20px,3vw,38px)] text-text font-body"
    >
      <div className="relative z-[2] mx-auto w-[min(1100px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(56px,9vh,120px)] text-center">
        <div data-reveal="" className="flex justify-center mb-6">
          <SectionBadge>{isReal ? "Kind words" : "How I work"}</SectionBadge>
        </div>

        <blockquote
          data-reveal=""
          className="font-heading font-bold leading-[1.28] tracking-[-.01em] mx-auto mb-9 max-w-[24ch] min-h-[2.6em] text-[clamp(26px,3.6vw,46px)]"
        >
          <span className="text-gold">“</span>
          {t.quote}
          <span className="text-gold">”</span>
        </blockquote>

        <div data-reveal="" className="flex flex-col items-center gap-1 mb-9">
          <span className="font-bold text-[16px]">{t.name}</span>
          <span className="text-[14px] text-text-2">{t.role}</span>
        </div>

        <div className="flex items-center justify-center gap-[10px] mb-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor="link"
              aria-label={"quote " + (i + 1)}
              className="h-[8px] rounded-full border-none cursor-pointer transition-[width,background] duration-[400ms]"
              style={{
                width: i === active ? "28px" : "8px",
                background: i === active ? "var(--ft-gold)" : "var(--border)",
              }}
            />
          ))}
        </div>

         
      </div>
    </section>
  );
}
