import Link from "next/link";
import QuoteButton from "../QuoteButton";
import { CONTACT_EMAIL } from "@/lib/site";
import type { ServiceContent } from "@/lib/services-content";
import { getServiceBySlug } from "@/lib/services-content";

/**
 * Closing block: final CTA into the existing contact form, plus internal
 * links to the other service pages. Light section so it doesn't collide
 * with the dark footer that follows.
 */
export default function ServiceCta({ service }: { service: ServiceContent }) {
  const related = service.related
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServiceContent => Boolean(s));

  return (
    <section
      id="get-started"
      className="mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(56px,9vh,120px)]"
    >
      <div
        data-reveal=""
        className="relative overflow-hidden rounded-[clamp(20px,3vw,32px)] text-white px-[clamp(24px,5vw,72px)] py-[clamp(40px,7vh,80px)]"
        style={{ background: "var(--ft-dark)" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 110% at 80% 10%, rgba(36,66,74,0.7) 0%, rgba(21,36,47,0) 60%)",
          }}
        />
        <div className="relative z-[2] grid gap-[clamp(24px,4vw,56px)] lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <h2 className="m-0 mb-5 font-heading font-bold leading-[1.08] tracking-[-.02em] text-[clamp(28px,3.4vw,46px)] max-w-[18ch]">
              {service.ctaHeading}{" "}
              <span style={{ color: "var(--ft-gold)" }}>{service.ctaAccent}</span>
            </h2>
            <p
              className="m-0 max-w-[52ch] text-[clamp(15px,1.5vw,17px)] leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {service.ctaBody}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <QuoteButton href="/#contact">Let&apos;s work together</QuoteButton>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              data-cursor="link"
              className="text-[14px] no-underline"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              or email {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* ===== other services — internal linking ===== */}
      {related.length > 0 && (
        <div data-reveal="" className="mt-[clamp(40px,6vh,72px)]">
          <h2
            className="font-mono text-[12px] tracking-[.18em] uppercase m-0 mb-6"
            style={{ color: "var(--accent)" }}
          >
            Other services
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                data-cursor="cta"
                className="group no-underline rounded-2xl p-[clamp(20px,2.4vw,26px)] flex items-start justify-between gap-4 transition-colors duration-300"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <span>
                  <span
                    className="font-heading block font-bold text-[17px] leading-[1.3] tracking-[-.01em] mb-2 transition-colors duration-300 group-hover:text-accent"
                    style={{ color: "var(--ft-dark)" }}
                  >
                    {r.name}
                  </span>
                  <span className="block text-[13.5px] leading-[1.6] text-text-2">
                    {r.badge}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-[36px] h-[36px] rounded-full shrink-0 transition-colors duration-300 text-gold border border-gold/45 group-hover:bg-gold group-hover:border-gold group-hover:text-white"
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
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
