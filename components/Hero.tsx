"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Underline from "./Underline";

export default function Hero() {
  const router = useRouter();
  const scrollContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center px-[clamp(20px,5vw,64px)] pt-[128px] pb-[76px] overflow-hidden">
      {/* kinetic outline backdrop */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-[7%] z-0 flex w-max pointer-events-none select-none opacity-50"
        style={{ animation: "marquee 40s linear infinite" }}
      >
        <span
          className="font-serif italic whitespace-nowrap leading-[.9]"
          style={{
            fontSize: "clamp(110px,19vw,300px)",
            color: "transparent",
            WebkitTextStroke: "1.3px var(--border)",
          }}
        >
          design&nbsp;·&nbsp;build&nbsp;·&nbsp;launch&nbsp;·&nbsp;design&nbsp;·&nbsp;build&nbsp;·&nbsp;launch&nbsp;·&nbsp;
        </span>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-[104px] right-[clamp(20px,5vw,64px)] font-mono text-[12px] tracking-[.14em] text-accent z-[3]"
      >
        (01 / PORTFOLIO)
      </div>

      <div className="relative z-[2] max-w-content mx-auto w-full grid grid-cols-1 min-[861px]:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-[clamp(40px,5vw,80px)] items-center">
        {/* LEFT */}
        <div>
          <div
            className="flex items-center gap-[14px] mb-[30px] opacity-0"
            style={{ animation: "heroIn .8s cubic-bezier(.4,0,.2,1) .05s both" }}
          >
            <span className="inline-flex items-center gap-[9px] font-mono text-[13px] tracking-[.12em] uppercase text-accent">
              <span
                className="w-[7px] h-[7px] rounded-full bg-accent"
                style={{ animation: "pulsedot 1.8s ease-in-out infinite" }}
              />
              Ahmad Raza
            </span>
            <span className="h-px w-[46px] bg-border" />
            <span className="font-mono text-[13px] text-text-2">Remote · Worldwide</span>
          </div>

          <h1
            className="font-serif font-normal leading-[1.0] tracking-[-.02em] m-0"
            style={{ fontSize: "clamp(44px,7vw,104px)" }}
          >
            <span
              className="block opacity-0"
              style={{
                animation: "heroIn .9s cubic-bezier(.4,0,.2,1) .12s both",
                color: "transparent",
                WebkitTextStroke: "1.5px var(--text)",
              }}
            >
              Your idea,
            </span>
            <span
              className="block opacity-0"
              style={{ animation: "heroIn .9s cubic-bezier(.4,0,.2,1) .22s both" }}
            >
              designed, built
            </span>
            <span
              className="block opacity-0"
              style={{ animation: "heroIn .9s cubic-bezier(.4,0,.2,1) .32s both" }}
            >
              <span className="relative inline-block italic text-accent">
                and&nbsp;launched
                <Underline
                  variant="hero"
                  className="absolute left-[-2%] bottom-[-.16em] w-[104%] h-[.4em]"
                />
              </span>
              <span className="text-text">.</span>
            </span>
          </h1>

          <p
            className="mt-[36px] max-w-[50ch] leading-[1.6] text-text-2 opacity-0"
            style={{
              fontSize: "clamp(17px,1.5vw,21px)",
              animation: "heroIn .9s cubic-bezier(.4,0,.2,1) .45s both",
            }}
          >
            Hi, I&apos;m Ahmad. Websites, mobile apps, online stores, SaaS products —
            plus the marketing that brings customers in (SEO, Meta ads). You explain
            the idea; my team and I handle the rest, from design to launch.
          </p>

          <div
            className="flex flex-wrap gap-4 mt-[40px] items-center opacity-0"
            style={{ animation: "heroIn .9s cubic-bezier(.4,0,.2,1) .55s both" }}
          >
            <button
              onClick={() => router.push("/work")}
              data-cursor="cta"
              data-magnetic=""
              className="inline-flex items-center gap-[10px] py-4 px-[30px] rounded-full border-none bg-accent text-white font-sans font-semibold text-[16px] cursor-pointer"
            >
              View work <span className="text-[18px]">↘</span>
            </button>
            <button
              onClick={scrollContact}
              data-cursor="link"
              data-magnetic=""
              className="inline-flex items-center gap-[10px] py-4 px-[30px] rounded-full border border-border bg-transparent text-text font-sans font-semibold text-[16px] cursor-pointer"
            >
              Let&apos;s work together
            </button>
          </div>
        </div>

        {/* RIGHT: portrait + rotating badge */}
        <div
          className="relative flex justify-center opacity-0"
          style={{ animation: "heroIn 1s cubic-bezier(.4,0,.2,1) .4s both" }}
        >
          <div
            className="relative w-[min(340px,82%)] rounded-[20px] bg-soft border border-border overflow-hidden"
            style={{ aspectRatio: "3/4", transform: "rotate(2.2deg)" }}
          >
            <Image
              src="/ahmad.png"
              alt="Ahmad Raza — Full-Stack Developer"
              fill
              priority
              sizes="340px"
              className="object-cover object-top"
            />
            <span className="absolute top-4 right-4 font-mono text-[11px] text-text-2 bg-bg/70 px-2 py-[2px] rounded-[6px] z-[2]">
              Pakistan
            </span>
          </div>
          <div className="absolute bottom-[-22px] left-[2%] w-[120px] h-[120px] bg-bg rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,.10)]">
            <svg
              viewBox="0 0 120 120"
              className="absolute inset-0 w-full h-full"
              style={{ animation: "spin 20s linear infinite" }}
            >
              <defs>
                <path id="heroBadgeArc" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text fill="var(--text-2)" style={{ fontFamily: "var(--font-jetbrains),monospace", fontSize: "9px", letterSpacing: "1.8px" }}>
                <textPath href="#heroBadgeArc">AVAILABLE FOR FREELANCE • OPEN FOR WORK • </textPath>
              </text>
            </svg>
            <span className="font-serif text-[40px] text-accent leading-none">✳</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[10px] text-text-2 font-mono text-[12px] tracking-[.1em] z-[3]">
        <span className="relative block w-px h-[38px] bg-border overflow-visible">
          <span
            className="absolute left-1/2 top-0 w-[5px] h-[5px] -ml-[2.5px] rounded-full bg-accent"
            style={{ animation: "scrollDot 1.9s cubic-bezier(.4,0,.2,1) infinite" }}
          />
        </span>
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}
