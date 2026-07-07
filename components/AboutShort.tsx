"use client";

import Link from "next/link";
import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Underline from "./Underline";

export default function AboutShort() {
  return (
    <section
      id="about"
      className="max-w-content mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(60px,10vh,140px)] grid grid-cols-1 gap-[clamp(40px,6vw,80px)] items-center"
    >
      <div className="grid grid-cols-1 min-[861px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-[clamp(36px,5vw,72px)] items-center">
        <div data-reveal="">
          <div className="mb-[26px]">
            <SectionLabel no="01" label="About" />
          </div>
          <h2 className="font-serif font-normal leading-[1.08] tracking-[-.02em] m-0 mb-6 text-[clamp(30px,4.4vw,58px)]">
            I build it like I&apos;m the one{" "}
            <span className="relative inline-block italic text-accent">
              maintaining
              <Underline variant="short" className="absolute left-0 bottom-[-.16em] w-full h-[.4em]" />
            </span>{" "}
            it.
          </h2>
          <p className="leading-[1.65] text-text-2 max-w-[54ch] m-0 mb-[22px] text-[clamp(16px,1.4vw,19px)]">
            I&apos;ve built products people actually use: an English-learning platform
            with 10,000+ learners, a dental-supplies platform trusted by 12,000+
            professionals, and a management system a government college runs every day.
            Frontend and backend, both mine. What I enjoy most is taking something messy
            and making it simple to use.
          </p>
          <Link
            href="/about"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-accent font-semibold text-[16px] no-underline"
          >
            More about me <span className="text-[18px]">→</span>
          </Link>
        </div>

        <div data-reveal="" data-delay="120" className="relative">
          <div className="relative rounded-[18px] overflow-hidden bg-soft border border-border" style={{ aspectRatio: "4/5" }}>
            <Image
              src="/ahmad.png"
              alt="Ahmad Raza"
              fill
              sizes="(min-width: 861px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute bottom-[-18px] left-[-18px] flex items-center gap-[9px] bg-surface border border-border rounded-full py-[10px] px-4 shadow-[0_12px_30px_rgba(0,0,0,.08)]">
            <span
              className="w-[9px] h-[9px] rounded-full bg-accent"
              style={{ animation: "pulsedot 1.8s ease-in-out infinite" }}
            />
            <span className="text-[13px] font-semibold">Available for freelance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
