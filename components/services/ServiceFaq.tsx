"use client";

import { useState } from "react";
import SectionBadge from "../SectionBadge";
import QuoteButton from "../QuoteButton";
import type { ServiceFaq as FaqItem } from "@/lib/services-content";

/**
 * Dark charcoal block: service-specific FAQ accordion.
 * Same structure, card style and chevron behaviour as the home page Faq,
 * driven by per-service questions.
 */
export default function ServiceFaq({
  faqs,
  serviceName,
}: {
  faqs: FaqItem[];
  serviceName: string;
}) {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="my-[clamp(8px,1.2vw,18px)] relative overflow-hidden rounded-[clamp(20px,3vw,38px)] text-white font-body"
      style={{ background: "var(--ft-dark)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 20% 20%, rgba(36,66,74,0.55) 0%, rgba(21,36,47,0) 60%), linear-gradient(180deg, rgba(21,36,47,0.9) 0%, rgba(24,43,51,0.8) 55%, rgba(18,34,43,0.96) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(48px,8vh,90px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-[clamp(32px,5vw,64px)] items-start">
          <div data-reveal="" className="lg:sticky lg:top-28">
            <SectionBadge tone="dark" className="mb-5">FAQ</SectionBadge>
            <h2 className="m-0 mb-4 font-heading font-bold leading-[1.08] tracking-[-.02em] text-[clamp(28px,3.2vw,44px)]">
              Common <span className="text-gold">questions.</span>
            </h2>
            <p
              className="m-0 mb-7 max-w-[42ch] text-[15px] leading-[1.65]"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              The things clients ask most before starting a {serviceName.toLowerCase()}{" "}
              project. Anything not covered here, just ask.
            </p>
            <div className="hidden lg:block">
              <QuoteButton href="/#contact">Get a free quote</QuoteButton>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  data-reveal=""
                  data-delay={i * 60}
                  className="rounded-2xl bg-white overflow-hidden transition-shadow duration-300"
                  style={{
                    boxShadow: isOpen
                      ? "0 14px 36px rgba(0,0,0,0.28)"
                      : "0 4px 14px rgba(0,0,0,0.12)",
                  }}
                >
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      data-cursor="link"
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer bg-transparent border-none"
                    >
                      <span
                        className="font-heading font-bold text-[16px] leading-[1.35]"
                        style={{ color: "var(--ft-dark)" }}
                      >
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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    className="grid transition-all duration-300"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="m-0 px-6 pb-5 text-[14px] leading-[1.7] font-medium"
                        style={{ color: "var(--ft-gray)" }}
                      >
                        {item.a}
                      </p>
                    </div>
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
