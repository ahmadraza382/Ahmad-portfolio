import SectionBadge from "../SectionBadge";
import type { ServiceContent } from "@/lib/services-content";

/**
 * Dark charcoal block: "Why work with me".
 * Two-column editorial list with a sticky heading — gold arrow markers and a
 * staggered reveal, so it reads as a considered argument rather than a card wall.
 */
export default function ServiceReasons({ service }: { service: ServiceContent }) {
  return (
    <section
      id="why-work-with-me"
      className="my-[clamp(8px,1.2vw,18px)] relative overflow-hidden rounded-[clamp(20px,3vw,38px)] text-white font-body"
      style={{ background: "var(--ft-dark)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 15% 12%, rgba(36,66,74,0.6) 0%, rgba(21,36,47,0) 58%), linear-gradient(180deg, rgba(21,36,47,0.92) 0%, rgba(24,43,51,0.78) 55%, rgba(18,34,43,0.97) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(56px,9vh,110px)]">
        <div className="grid gap-[clamp(32px,5vw,80px)] lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div data-reveal="" className="lg:sticky lg:top-28">
            <SectionBadge tone="dark" className="mb-5">Why Work With Me</SectionBadge>
            <h2 className="m-0 mb-5 font-heading font-bold leading-[1.06] tracking-[-.02em] text-[clamp(30px,3.6vw,50px)]">
              What you actually <span className="text-gold">get</span>
            </h2>
            <p
              className="m-0 max-w-[38ch] text-[clamp(15px,1.5vw,17px)] leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              One software engineer, not an agency layer. Direct communication,
              one person accountable, no budget spent on account managers.
            </p>
          </div>

          <div className="grid gap-x-[clamp(24px,3.5vw,56px)] gap-y-0 sm:grid-cols-2">
            {service.reasons.map((r, i) => (
              <div
                key={r.title}
                data-reveal=""
                data-delay={i * 70}
                className="group py-7 relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "rgba(255,255,255,0.13)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "var(--ft-gold)" }}
                />
                <h3 className="font-heading m-0 mb-[10px] font-bold text-[16.5px] leading-[1.3] tracking-[-.01em] text-white">
                  <span
                    aria-hidden="true"
                    className="inline-block mr-[6px] transition-transform duration-400 group-hover:translate-x-1"
                    style={{ color: "var(--ft-gold)" }}
                  >
                    →
                  </span>
                  {r.title}
                </h3>
                <p
                  className="m-0 text-[14px] leading-[1.7]"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
