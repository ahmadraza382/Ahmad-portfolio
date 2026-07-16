"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionBadge from "./SectionBadge";

// TODO(placeholder): swap for a final branded section background.
const SECTION_BG =
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=60";

// TODO(placeholder): swap these Unsplash images for real service shots.
const SERVICES: {
  tag: string;
  title: string;
  desc: string;
  img: string;
}[] = [
  {
    tag: "Web",
    title: "Custom Websites",
    desc: "Business websites that look premium, load fast and work perfectly on phones. Design included if you need it.",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=600&q=60",
  },
  {
    tag: "Mobile",
    title: "Mobile Apps",
    desc: "Android and iOS apps from one codebase with React Native — native feel, both app stores, easier to maintain.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=60",
  },
  {
    tag: "SaaS",
    title: "SaaS Products",
    desc: "Have an idea people would pay monthly for? I build the whole product: accounts, payments, subscriptions, your admin area.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=60",
  },
  {
    tag: "E-commerce",
    title: "Online Stores & Shopify",
    desc: "Stores that make buying easy — custom builds or Shopify, with payments, shipping and inventory sorted.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=60",
  },
  {
    tag: "WordPress",
    title: "WordPress",
    desc: "WordPress sites built, fixed or sped up: themes, plugins, performance — or a full modern rebuild.",
    img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=60",
  },
  {
    tag: "Desktop",
    title: "Desktop Apps",
    desc: "Windows and Mac software for your business: internal tools, dashboards and systems your team runs every day.",
    img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=60",
  },
  {
    tag: "SEO",
    title: "SEO",
    desc: "Get found on Google. Technical fixes, on-page work and content planning so customers find you first.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=60",
  },
  {
    tag: "Ads",
    title: "Meta Ads",
    desc: "Facebook and Instagram campaigns that bring customers, not just likes: setup, targeting, creatives, reporting.",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=60",
  },
];

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });
  const [canScroll, setCanScroll] = useState({ prev: false, next: true });

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScroll({
      prev: el.scrollLeft > 5,
      next: el.scrollLeft < el.scrollWidth - el.clientWidth - 5,
    });
  };

  useEffect(() => {
    updateScrollState();
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 350, behavior: "smooth" });
  };

  // drag-to-scroll (mouse; touch scrolls natively)
  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.pageX, scrollLeft: el.scrollLeft, moved: false };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.pageX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  return (
    <section
      id="services"
      className="  my-[clamp(8px,1.2vw,18px)] relative overflow-hidden rounded-[clamp(20px,3vw,38px)] text-white bg-charcoal"
    >
      {/* faint background image (reference-style) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.22]"
        style={{ backgroundImage: `url(${SECTION_BG})` }}
      />
      {/* teal glow depth over the image, same family as the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 70% 20%, rgba(36,66,74,0.55) 0%, rgba(21,36,47,0) 60%), linear-gradient(180deg, rgba(21,36,47,0.82) 0%, rgba(24,43,51,0.68) 55%, rgba(18,34,43,0.92) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(48px,8vh,90px)]">
        {/* ===== header row ===== */}
        <div
          data-reveal=""
          className="flex flex-wrap items-start justify-between gap-x-8 gap-y-6 mb-[clamp(32px,5vh,56px)]"
        >
          <div>
            <SectionBadge tone="dark" className="mb-5">My Services</SectionBadge>
            <h2
              className="m-0 font-heading font-bold leading-[1.05] tracking-[-.02em] text-[clamp(32px,3.6vw,52px)]"
            >
              Trusted
              <br />
              <span className="text-gold">Expertise</span>
            </h2>
          </div>

          <div className="max-w-[360px]">
            <p className="m-0 text-[15px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.8)" }}>
              I deliver end-to-end websites, apps and SaaS products with proven
              experience and a results-driven focus.
            </p>
            <div className="flex gap-3 mt-5">
              <ArrowButton
                dir="left"
                enabled={canScroll.prev}
                label="Previous services"
                onClick={() => scrollByCard(-1)}
              />
              <ArrowButton
                dir="right"
                enabled={canScroll.next}
                label="Next services"
                onClick={() => scrollByCard(1)}
              />
            </div>
          </div>
        </div>

        {/* ===== draggable card track ===== */}
        <div
          ref={trackRef}
          data-reveal=""
          className="flex gap-5 overflow-x-auto pb-2 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onScroll={updateScrollState}
        >
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group relative shrink-0 w-[clamp(270px,26vw,326px)] h-[470px] rounded-2xl overflow-hidden bg-white select-none"
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
                {/* category pill (goes glassy over the image) */}
                <span className="self-start inline-flex items-center rounded-full border px-4 py-[6px] text-[12px] font-semibold tracking-[.08em] uppercase transition-colors duration-300 border-[#15242F]/40 text-[#15242F] group-hover:border-white/50 group-hover:text-white group-hover:bg-white/10">
                  {s.tag}
                </span>

                {/* default title (top) — fades out on hover */}
                <h3
                  className="m-0 mt-4 font-heading font-bold leading-[1.15] text-[22px] tracking-[-.01em] text-[#15242F] transition-opacity duration-300 group-hover:opacity-0"
                >
                  {s.title}
                </h3>

                {/* boxed image — fades out when the full-bleed version takes over */}
                <div
                  className="mt-3 flex-1 min-h-0 rounded-xl overflow-hidden bg-[#e8e8e8] transition-opacity duration-300 group-hover:opacity-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* bottom block: hover title slides in above the description */}
                <div className="mt-4">
                  <h3
                    className="m-0 overflow-hidden max-h-0 opacity-0 translate-y-2 group-hover:max-h-[70px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:mb-2 transition-all duration-400 font-heading font-bold leading-[1.12] text-[24px] tracking-[-.01em] text-white"
                  >
                    {s.title}
                  </h3>
                  <div className="flex items-end justify-between gap-3">
                    <p className="m-0 text-[13.5px] leading-[1.55] transition-colors duration-300 text-[#596264] group-hover:text-white/85">
                      {s.desc}
                    </p>
                    <CardArrow
                      title={s.title}
                      onClick={(e) => {
                        // don't navigate if the user was dragging the track
                        if (drag.current.moved) e.preventDefault();
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* card arrow — outline by default, dark glass while the card is hovered,
   solid gold when the button itself is hovered */
function CardArrow({
  title,
  onClick,
}: {
  title: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href="/#contact"
      aria-label={`Start a ${title} project`}
      data-cursor="cta"
      onClick={onClick}
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

/* carousel arrow — reference style: white circle + gold chevron when usable,
   dark gray + faded chevron when that direction is exhausted */
function ArrowButton({
  dir,
  enabled,
  label,
  onClick,
}: {
  dir: "left" | "right";
  enabled: boolean;
  label: string;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const active = enabled && hover;
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-disabled={!enabled}
      data-cursor="link"
      className="inline-flex items-center justify-center w-[46px] h-[46px] rounded-full border-none transition-all duration-300"
      style={{
        background: active
          ? "var(--ft-gold)"
          : enabled
            ? "var(--ft-white)"
            : "rgba(255,255,255,0.14)",
        color: active ? "var(--ft-white)" : enabled ? "var(--ft-gold)" : "rgba(255,255,255,0.75)",
        cursor: enabled ? "pointer" : "default",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Chevron dir={dir} />
    </button>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
