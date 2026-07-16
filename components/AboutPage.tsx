"use client";

import Link from "next/link";
import { VALUES, TIMELINE, SKILL_GROUPS } from "@/lib/data";

export default function AboutPage() {
  const scrollContact = () => {
    // contact lives on the home page
    window.location.href = "/#contact";
  };

  return (
    <section className="max-w-content mx-auto pt-[140px] px-[clamp(20px,5vw,64px)] pb-[100px]">
      <div data-reveal="" className="flex items-center gap-[14px] mb-[30px]">
        <Link href="/" data-cursor="link" className="font-mono text-[13px] text-text-2 no-underline">
          ← Home
        </Link>
        <span className="font-mono text-[13px] text-text-2">/ about</span>
      </div>

      <div data-reveal="" className="mb-[64px]">
        <h1 className="font-heading font-normal leading-[.98] tracking-[-.02em] m-0 mb-6 max-w-[760px] text-[clamp(44px,7vw,96px)]">
          Hi, I&apos;m <span className="italic text-gold">Ahmad.</span>
        </h1>
        <p className="leading-[1.65] text-text-2 m-0 mb-5 text-[clamp(17px,1.6vw,21px)]">
          I&apos;m a full-stack developer from Faisalabad, Pakistan. I learned web
          development during my CS degree at GCUF, did SMIT&apos;s one-year MERN course
          alongside it, and I&apos;ve been building for real clients since 2025: SaaS,
          e-commerce, healthcare and education projects.
        </p>
        <p className="leading-[1.65] text-text-2 m-0 text-[clamp(17px,1.6vw,21px)]">
          I handle everything technical myself, from the database to what you see on
          screen. I like keeping things simple, giving straight answers about time and
          cost, and shipping something usable early instead of something perfect late.
        </p>
      </div>

      {/* intro video */}
      <div data-reveal="" className="mb-[80px]">
        <h2 className="font-mono text-[13px] tracking-[.18em] uppercase text-accent m-0 mb-[30px] text-center">
          A quick intro
        </h2>
        <div className="mx-auto max-w-[900px]">
          <div
            className="relative rounded-[18px] overflow-hidden border border-border bg-soft"
            style={{ aspectRatio: "16/9" }}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
            >
              <source src="/intro.mp4" type="video/mp4" />
              Your browser doesn&apos;t support embedded video.
            </video>
          </div>
        </div>
      </div>

      {/* values */}
      <div data-reveal="" className="mb-[80px]">
        <h2 className="font-mono text-[13px] tracking-[.18em] uppercase text-accent m-0 mb-[30px]">
          What I value
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[30px]">
          {VALUES.map((v) => (
            <div key={v.title}>
              <h3 className="font-heading font-normal text-[26px] m-0 mb-[10px]">
                <span className="text-gold">→ </span>
                {v.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-text-2 m-0">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* journey */}
      <div data-reveal="" className="mb-[80px]">
        <h2 className="font-mono text-[13px] tracking-[.18em] uppercase text-accent m-0 mb-[30px]">
          The journey
        </h2>
        <div className="flex flex-col">
          {TIMELINE.map((t) => (
            <div
              key={t.year}
              className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 sm:gap-6 py-6 border-t border-border"
            >
              <span className="font-mono text-[14px] text-accent">{t.year}</span>
              <div>
                <h3 className="font-heading font-normal text-[24px] m-0 mb-[6px]">{t.role}</h3>
                <p className="text-[15px] leading-[1.6] text-text-2 m-0">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* toolkit */}
      <div id="toolkit" data-reveal="" className="mb-[70px] scroll-mt-[110px]">
        <h2 className="font-mono text-[13px] tracking-[.18em] uppercase text-accent m-0 mb-[30px]">
          Full toolkit
        </h2>
        <div className="flex flex-col gap-[28px]">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title}>
              <h3 className="font-mono text-[12px] tracking-[.14em] uppercase text-text-2 m-0 mb-[12px]">
                {g.title}
              </h3>
              <div className="flex flex-wrap gap-[10px]">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[13px] text-text border border-border rounded-full py-2 px-4"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        data-reveal=""
        className="flex flex-wrap gap-4 items-center pt-[40px] border-t border-border"
      >
        <button
          onClick={scrollContact}
          data-cursor="cta"
          data-magnetic=""
          className="inline-flex items-center gap-[10px] py-4 px-7 rounded-full border-none bg-gold text-white font-semibold text-[16px] cursor-pointer"
        >
          Let&apos;s work together →
        </button>
        <a
          href="https://www.linkedin.com/in/ahmadraza161/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          data-magnetic=""
          className="inline-flex items-center gap-[10px] py-4 px-7 rounded-full border border-border text-text font-semibold text-[16px] no-underline"
        >
          View LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
