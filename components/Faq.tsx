"use client";

import { useState } from "react";
import SectionBadge from "./SectionBadge";
import QuoteButton from "./QuoteButton";

// TODO(placeholder): swap for a final branded section background.
const SECTION_BG =
  "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=1600&q=60";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do you offer an initial consultation?",
    a: "Yes — we start with a free call to understand your goals, scope and timeline before any commitment.",
  },
  {
    q: "How are project costs calculated?",
    a: "Costs depend on scope, complexity and timeline. We explain all pricing clearly before starting any work.",
  },
  {
    q: "Will my information remain confidential?",
    a: "Absolutely. All project details and data are kept strictly confidential and never shared with third parties.",
  },
  {
    q: "How long will my project take?",
    a: "Timelines vary by scope, but most projects ship in a few weeks. You'll get a clear estimate after our first call.",
  },
  {
    q: "Do you work with clients outside your city?",
    a: "Yes, I work fully remote with clients worldwide, with clear async communication throughout.",
  },
  {
    q: "How can I get started?",
    a: "Reach out via the contact form or book a free quote call — we'll take it from there.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(1);

  return (
    <section
      id="faq"
      className="my-[clamp(8px,1.2vw,18px)] relative overflow-hidden rounded-[clamp(20px,3vw,38px)] text-white font-body"
      style={{ background: "var(--ft-dark)" }}
    >
      {/* faint background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.35]"
        style={{ backgroundImage: `url(${SECTION_BG})` }}
      />
      {/* dark wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 20% 20%, rgba(36,66,74,0.5) 0%, rgba(21,36,47,0) 60%), linear-gradient(180deg, rgba(21,36,47,0.86) 0%, rgba(24,43,51,0.8) 55%, rgba(18,34,43,0.94) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(48px,7vh,80px)]">
        <div data-reveal="" className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-[clamp(32px,5vw,64px)] items-start">
          {/* ===== left: heading ===== */}
          <div className="lg:sticky lg:top-24">
            <SectionBadge tone="dark" className="mb-5">FAQ</SectionBadge>
            <h2 className="m-0 mb-4 font-heading font-bold leading-[1.08] tracking-[-.02em] text-[clamp(28px,2.9vw,42px)]">
              Answers To <span className="text-gold">Questions.</span>
            </h2>
            <p className="m-0 mb-7 max-w-[420px] text-[15px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.78)" }}>
              Our FAQ section is designed to answer common questions about our
              services, process, and collaboration. We believe in transparency.
            </p>
            {/* CTA is desktop-only — hidden on small screens */}
            <div className="hidden lg:block">
              <QuoteButton href="/#contact">Get a free quote</QuoteButton>
            </div>
          </div>

          {/* ===== right: accordion ===== */}
          <div className="flex flex-col gap-4">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl bg-white overflow-hidden transition-shadow duration-300"
                  style={{
                    boxShadow: isOpen
                      ? "0 14px 36px rgba(0,0,0,0.28)"
                      : "0 4px 14px rgba(0,0,0,0.12)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    data-cursor="link"
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer bg-transparent border-none"
                  >
                    <span className="font-heading font-bold text-[16px] leading-[1.3]" style={{ color: "var(--ft-dark)" }}>
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-full shrink-0 transition-all duration-300"
                      style={{
                        background: isOpen ? "var(--ft-gold)" : "transparent",
                        border: isOpen ? "none" : "1px solid rgba(21,36,47,0.25)",
                        color: isOpen ? "var(--ft-white)" : "var(--ft-dark)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? "160px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p
                      className="m-0 px-6 pb-5 text-[14px] leading-[1.65] font-semibold"
                      style={{ color: "var(--ft-gray)" }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
