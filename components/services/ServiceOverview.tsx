import Link from "next/link";
import SectionBadge from "../SectionBadge";
import type { ServiceContent } from "@/lib/services-content";

/**
 * Light section: what the service is, plus a "good fit if…" panel.
 * The panel is offset and gold-ruled so the section reads as a composition
 * rather than two equal columns of text.
 */
export default function ServiceOverview({ service }: { service: ServiceContent }) {
  return (
    <section
      id="overview"
      className="mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(60px,10vh,130px)]"
    >
      <div className="grid gap-[clamp(32px,5vw,88px)] lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div data-reveal="">
          <SectionBadge className="mb-5">Overview</SectionBadge>
          <h2
            className="font-heading m-0 mb-7 font-bold leading-[1.06] tracking-[-.02em] text-[clamp(30px,3.6vw,50px)] max-w-[15ch]"
            style={{ color: "var(--ft-dark)" }}
          >
            {service.overviewHeading}{" "}
            <span style={{ color: "var(--ft-gold)" }}>{service.overviewAccent}</span>
          </h2>

          {/* lead paragraph gets a gold rule and slightly larger type */}
          <div className="relative pl-6 mb-6">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[6px] bottom-[6px] w-[2px] rounded-full"
              style={{ background: "var(--ft-gold)" }}
            />
            <p className="m-0 max-w-[58ch] text-[clamp(16px,1.7vw,19px)] leading-[1.7] text-text">
              {service.overviewBody[0]}
            </p>
          </div>

          {service.overviewBody.slice(1).map((p) => (
            <p
              key={p.slice(0, 40)}
              className="m-0 mb-5 max-w-[62ch] text-[clamp(15px,1.5vw,17px)] leading-[1.75] text-text-2"
            >
              {p}
            </p>
          ))}

          {/* Contextual in-body link — carries more SEO weight than nav links */}
          <p className="m-0 max-w-[62ch] text-[clamp(15px,1.5vw,17px)] leading-[1.75] text-text-2">
            {service.overviewLink.before}
            <Link
              href={service.overviewLink.href}
              data-cursor="link"
              className="text-accent font-medium"
            >
              {service.overviewLink.linkText}
            </Link>
            {service.overviewLink.after}
          </p>
        </div>

        {/* "Good fit if…" — offset panel, gold top rule */}
        <aside
          data-reveal=""
          data-delay={120}
          className="relative rounded-2xl p-[clamp(26px,3.2vw,38px)] lg:mt-[76px]"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 18px 50px rgba(21,36,47,0.07)",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute top-0 left-[clamp(26px,3.2vw,38px)] right-[clamp(26px,3.2vw,38px)] h-[3px] rounded-full"
            style={{ background: "var(--ft-gold)" }}
          />
          <h3
            className="font-heading m-0 mb-7 font-bold text-[18px] leading-[1.3] tracking-[-.01em]"
            style={{ color: "var(--ft-dark)" }}
          >
            This is a good fit if
          </h3>
          <ul className="list-none p-0 m-0 flex flex-col gap-[18px]">
            {service.goodFit.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full shrink-0 mt-[2px]"
                  style={{ background: "var(--gold-soft)", color: "var(--ft-gold)" }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <span className="text-[14.5px] leading-[1.6] text-text-2">{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
