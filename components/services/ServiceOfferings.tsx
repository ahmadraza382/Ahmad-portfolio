import SectionBadge from "../SectionBadge";
import ServiceIcon from "./ServiceIcon";
import type { ServiceContent } from "@/lib/services-content";

/**
 * Dark charcoal block: "What I Offer".
 * Editorial layout rather than a flat card grid — an oversized gold index
 * number per item, a hairline rule that fills gold on hover, and a staggered
 * reveal. The first item spans wider so the grid reads composed, not uniform.
 */
export default function ServiceOfferings({ service }: { service: ServiceContent }) {
  return (
    <section
      id="what-i-offer"
      className="my-[clamp(8px,1.2vw,18px)] relative overflow-hidden rounded-[clamp(20px,3vw,38px)] text-white font-body"
      style={{ background: "var(--ft-dark)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 75% 10%, rgba(36,66,74,0.62) 0%, rgba(21,36,47,0) 58%), linear-gradient(180deg, rgba(21,36,47,0.92) 0%, rgba(24,43,51,0.8) 55%, rgba(18,34,43,0.97) 100%)",
        }}
      />
      {/* oversized watermark of the service initial — depth without an image */}
      <div
        aria-hidden="true"
        className="absolute -right-[2%] top-1/2 -translate-y-1/2 select-none pointer-events-none font-heading font-black leading-none hidden lg:block"
        style={{
          fontSize: "clamp(220px,26vw,420px)",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255,255,255,0.045)",
        }}
      >
        {service.name.charAt(0)}
      </div>

      <div className="relative z-[2] mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(56px,9vh,110px)]">
        <div data-reveal="" className="max-w-[620px] mb-[clamp(40px,6vh,72px)]">
          <SectionBadge tone="dark" className="mb-5">What I Offer</SectionBadge>
          <h2 className="m-0 font-heading font-bold leading-[1.06] tracking-[-.02em] text-[clamp(30px,3.6vw,50px)]">
            {service.name.replace(/ Services$/, "")}{" "}
            <span className="text-gold">services</span>
          </h2>
        </div>

        <div className="grid gap-x-[clamp(24px,4vw,64px)] gap-y-0 md:grid-cols-2">
          {service.offerings.map((o, i) => (
            <article
              key={o.title}
              data-reveal=""
              data-delay={i * 70}
              className="group relative pt-8 pb-9"
            >
              {/* hairline that fills gold from the left on hover */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "rgba(255,255,255,0.14)" }}
              />
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: "var(--ft-gold)" }}
              />

              <div className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="font-heading font-black leading-none shrink-0 tabular-nums transition-colors duration-400 text-[clamp(34px,4vw,52px)]"
                  style={{ color: "rgba(255,255,255,0.13)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full shrink-0 transition-all duration-400 text-gold border border-gold/40 group-hover:bg-gold group-hover:border-gold group-hover:text-white group-hover:rotate-[8deg]">
                      <ServiceIcon name={o.icon} size={17} />
                    </span>
                    <h3 className="font-heading m-0 font-bold leading-[1.25] text-[clamp(17px,1.7vw,20px)] tracking-[-.01em] text-white">
                      {o.title}
                    </h3>
                  </div>
                  <p
                    className="m-0 text-[14.5px] leading-[1.7] max-w-[46ch]"
                    style={{ color: "rgba(255,255,255,0.66)" }}
                  >
                    {o.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
