"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICE_CARDS } from "@/lib/service-cards";

/**
 * The home page service cards, laid out as a plain grid on the light
 * background — no carousel, no section heading. Card design is unchanged:
 * the image fills the card behind a dark wash on hover and the title moves
 * down above the description.
 */
export default function ServiceCardsGrid() {
  return (
    <section
      id="service-cards"
      className="mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(56px,9vh,110px)]"
    >
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SERVICE_CARDS.map((s, i) => (
          <article
            key={s.title}
            data-reveal=""
            data-delay={i * 70}
            className="group relative h-[470px] rounded-2xl overflow-hidden bg-white select-none"
            style={{ boxShadow: "inset 0 0 0 1px rgba(21,36,47,0.08)" }}
          >
            {/* hover layer: the image fills the whole card behind a dark wash */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.img}
                alt=""
                aria-hidden="true"
                loading="lazy"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,22,29,0.55) 0%, rgba(13,22,29,0.4) 45%, rgba(13,22,29,0.9) 100%)",
                }}
              />
            </div>

            {/* content */}
            <div className="relative h-full p-5 flex flex-col">
              <span className="self-start inline-flex items-center rounded-full border px-4 py-[6px] text-[12px] font-semibold tracking-[.08em] uppercase transition-colors duration-300 border-[#15242F]/40 text-[#15242F] group-hover:border-white/50 group-hover:text-white group-hover:bg-white/10">
                {s.tag}
              </span>

              <h3 className="m-0 mt-4 font-heading font-bold leading-[1.15] text-[22px] tracking-[-.01em] text-[#15242F] transition-opacity duration-300 group-hover:opacity-0">
                {s.title}
              </h3>

              <div className="mt-3 flex-1 min-h-0 rounded-xl overflow-hidden bg-[#e8e8e8] transition-opacity duration-300 group-hover:opacity-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4">
                <h3 className="m-0 overflow-hidden max-h-0 opacity-0 translate-y-2 group-hover:max-h-[70px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:mb-2 transition-all duration-400 font-heading font-bold leading-[1.12] text-[24px] tracking-[-.01em] text-white">
                  {s.title}
                </h3>
                <div className="flex items-end justify-between gap-3">
                  <p className="m-0 text-[13.5px] leading-[1.55] transition-colors duration-300 text-[#596264] group-hover:text-white/85">
                    {s.desc}
                  </p>
                  <CardArrow title={s.title} href={s.href} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* card arrow — outline by default, dark glass while the card is hovered,
   solid gold when the button itself is hovered */
function CardArrow({ title, href }: { title: string; href?: string }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href ?? "/#contact"}
      aria-label={href ? `${title} — read more about this service` : `Start a ${title} project`}
      data-cursor="cta"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={
        "shrink-0 inline-flex items-center justify-center w-[46px] h-[46px] rounded-full border transition-colors duration-300 " +
        (hover
          ? ""
          : "border-[#15242F]/30 text-[#C8A451] group-hover:border-white/25 group-hover:bg-[#15242F]/60 group-hover:text-white")
      }
      style={
        hover
          ? { background: "var(--ft-gold)", borderColor: "var(--ft-gold)", color: "var(--ft-white)" }
          : undefined
      }
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </Link>
  );
}
