import SectionBadge from "../SectionBadge";
import QuoteButton from "../QuoteButton";
import type { ServiceContent } from "@/lib/services-content";

/**
 * Light section: the six-step process as a horizontal timeline on desktop
 * (gold rule running through numbered nodes) and a vertical one on mobile.
 * Placed on the light background so it breaks up the run of dark blocks.
 */
export default function ServiceProcess({ service }: { service: ServiceContent }) {
  return (
    <section
      id="process"
      className="mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(60px,10vh,130px)]"
    >
      <div
        data-reveal=""
        className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 mb-[clamp(44px,7vh,80px)]"
      >
        <div className="max-w-[560px]">
          <SectionBadge className="mb-5">Process</SectionBadge>
          <h2
            className="font-heading m-0 mb-4 font-bold leading-[1.06] tracking-[-.02em] text-[clamp(30px,3.6vw,50px)]"
            style={{ color: "var(--ft-dark)" }}
          >
            How the work <span style={{ color: "var(--ft-gold)" }}>gets done</span>
          </h2>
          <p className="m-0 max-w-[46ch] text-[clamp(15px,1.5vw,17px)] leading-[1.7] text-text-2">
            Six stages, each with something you can see and sign off.
          </p>
        </div>
        <QuoteButton href="/#contact">Get a free quote</QuoteButton>
      </div>

      <ol className="list-none p-0 m-0 relative grid gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-5">
        {/* desktop: the continuous gold rule the nodes sit on */}
        <span
          aria-hidden="true"
          className="hidden lg:block absolute top-[17px] left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, var(--ft-gold) 0%, var(--ft-gold) 88%, transparent 100%)",
            opacity: 0.45,
          }}
        />

        {service.process.map((step, i) => (
          <li
            key={step.no}
            data-reveal=""
            data-delay={i * 90}
            className="group relative lg:pt-0"
          >
            {/* node */}
            <span
              aria-hidden="true"
              className="relative z-[1] flex items-center justify-center w-[34px] h-[34px] rounded-full mb-5 transition-all duration-400 group-hover:scale-110"
              style={{
                background: "var(--bg)",
                border: "2px solid var(--ft-gold)",
                boxShadow: "0 0 0 5px var(--bg)",
              }}
            >
              <span
                className="w-[9px] h-[9px] rounded-full transition-transform duration-400 group-hover:scale-125"
                style={{ background: "var(--ft-gold)" }}
              />
            </span>

            <span
              className="font-heading block font-black leading-none mb-3 tabular-nums text-[clamp(30px,3vw,40px)] transition-colors duration-400"
              style={{ color: "rgba(21,36,47,0.13)" }}
            >
              {step.no}
            </span>
            <h3
              className="font-heading m-0 mb-[10px] font-bold text-[17px] leading-[1.25] tracking-[-.01em]"
              style={{ color: "var(--ft-dark)" }}
            >
              {step.title}
            </h3>
            <p className="m-0 text-[13.5px] leading-[1.65] text-text-2 max-w-[34ch]">
              {step.desc}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
