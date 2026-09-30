import Link from "next/link";
import QuoteButton from "../QuoteButton";
import ServiceDiagram from "./ServiceDiagram";
import type { ServiceContent } from "@/lib/services-content";

/**
 * Service page hero — same dark charcoal block, teal radial glow and
 * `</>` watermark as the home hero, sized for an inner page.
 * Includes the visible breadcrumb trail (the JSON-LD version lives on the page).
 */
export default function ServiceHero({ service }: { service: ServiceContent }) {
  // No top margin and square top corners — the hero sits flush against the
  // viewport top exactly like the home page hero.
  return (
    <section className="mb-[clamp(8px,1.2vw,18px)]">
      <div
        className="relative overflow-hidden rounded-b-[clamp(20px,3vw,38px)] text-white"
        style={{ background: "var(--ft-dark)" }}
      >
        {/* teal glow + gradient depth — matches Hero.tsx */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 60% 35%, rgba(36,66,74,0.75) 0%, rgba(21,36,47,0) 55%), linear-gradient(180deg, #15242f 0%, #16283190 40%, #15242f 100%)",
          }}
        />
        {/* faint code-bracket watermark */}
        {/* watermark sits behind the copy column only — the diagram occupies
            the right side, so a centred one would collide with it */}
        <div
          aria-hidden="true"
          className="absolute left-[18%] top-[52%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-heading font-black leading-none hidden lg:block"
          style={{
            fontSize: "clamp(180px,26vw,380px)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.04)",
          }}
        >
          {"</>"}
        </div>

        <div className="relative z-[2] mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] pt-[clamp(104px,14vh,150px)] pb-[clamp(48px,8vh,86px)]">
          {/* breadcrumbs — mono eyebrow, same treatment as /work and /about */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-[10px] mb-7 font-mono text-[13px]"
          >
            <Link
              href="/"
              data-cursor="link"
              className="no-underline"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Home
            </Link>
            <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.35)" }}>/</span>
            <Link
              href="/services"
              data-cursor="link"
              className="no-underline"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Services
            </Link>
            <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.35)" }}>/</span>
            <span aria-current="page" style={{ color: "var(--ft-gold)" }}>
              {service.name}
            </span>
          </nav>

          <div className="grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span
                className="inline-flex items-center gap-[9px] rounded-full py-[7px] pl-[10px] pr-[15px] mb-6 text-[12px] font-semibold tracking-[.08em] uppercase"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <span className="relative flex w-[9px] h-[9px]">
                  <span
                    className="absolute inline-flex w-full h-full rounded-full opacity-70"
                    style={{
                      background: "var(--ft-gold)",
                      animation: "pulsedot 1.8s ease-in-out infinite",
                    }}
                  />
                  <span
                    className="relative inline-flex w-[9px] h-[9px] rounded-full"
                    style={{ background: "var(--ft-gold)" }}
                  />
                </span>
                {service.badge}
              </span>

              <h1
                className="m-0 font-heading font-extrabold leading-[1.04] tracking-[-.02em] max-w-[16ch]"
                style={{ fontSize: "clamp(34px,4.6vw,64px)" }}
              >
                {service.h1}{" "}
                <span style={{ color: "var(--ft-gold)" }}>{service.h1Accent}</span>
              </h1>

              <p
                className="mt-6 max-w-[56ch] text-[clamp(15px,1.4vw,17px)] leading-[1.65]"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {service.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <QuoteButton href="/#contact">Let&apos;s work together</QuoteButton>
                <Link
                  href="/work"
                  data-cursor="link"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-[14px] text-[15px] font-medium no-underline text-white"
                  style={{
                    border: "1px solid rgba(255,255,255,0.22)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  See my work
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* technical diagram — the hero's visual anchor. Inline SVG so it
                costs no image request and follows the site's palette. */}
            <div className="relative lg:pb-2">
              <ServiceDiagram slug={service.slug} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
