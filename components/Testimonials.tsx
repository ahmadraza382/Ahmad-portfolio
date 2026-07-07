"use client";

import { useEffect, useState } from "react";
import SectionLabel from "./SectionLabel";
import { TESTIMONIALS, STATEMENTS } from "@/lib/data";

/**
 * Big centered quote section above Contact.
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
    <section id="testimonials" className="border-t border-border bg-soft">
      <div className="max-w-[1100px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(60px,10vh,130px)] text-center">
        <div data-reveal="" className="mb-[38px]">
          <SectionLabel no="05" label={isReal ? "Kind words" : "How I work"} center />
        </div>

        <blockquote
          data-reveal=""
          className="font-serif font-normal leading-[1.28] tracking-[-.01em] mx-auto mb-9 max-w-[24ch] min-h-[2.6em] text-[clamp(26px,3.6vw,46px)]"
        >
          <span className="text-accent">“</span>
          {t.quote}
          <span className="text-accent">”</span>
        </blockquote>

        <div data-reveal="" className="flex flex-col items-center gap-1">
          <span className="font-bold text-[16px]">{t.name}</span>
          <span className="text-[14px] text-text-2">{t.role}</span>
        </div>

        <div className="flex items-center justify-center gap-[10px] mt-[34px]">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor="link"
              aria-label={"quote " + (i + 1)}
              className="h-[8px] rounded-full border-none cursor-pointer transition-[width,background] duration-[400ms]"
              style={{
                width: i === active ? "28px" : "8px",
                background: i === active ? "var(--accent)" : "var(--border)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
