"use client";

import { useState } from "react";
import Link from "next/link";
import { SKILLS } from "@/lib/data";
import SectionBadge from "./SectionBadge";

export default function Skills() {
  const [paused, setPaused] = useState(false);
  const loop = [...SKILLS, ...SKILLS];
  const loop2 = [...SKILLS.slice().reverse(), ...SKILLS.slice().reverse()];

  return (
    <section
      id="skills"
      className="py-[clamp(50px,8vh,110px)] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        data-reveal=""
        className="mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] mb-[38px] flex items-center justify-between gap-4"
      >
        <SectionBadge>Stack &amp; Tools</SectionBadge>
        <Link
          href="/about#toolkit"
          data-cursor="link"
          className="font-semibold text-accent text-[15px] underline underline-offset-4 whitespace-nowrap"
        >
          View all →
        </Link>
      </div>

      <div
        className="flex w-max will-change-transform"
        style={{ animation: "marquee 28s linear infinite", animationPlayState: paused ? "paused" : "running" }}
      >
        <div className="flex items-center">
          {loop.map((sk, i) => (
            <span
              key={`a-${i}`}
              className="inline-flex items-center gap-[18px] px-7 font-heading font-bold whitespace-nowrap text-[clamp(30px,3.6vw,50px)] tracking-[-.02em]"
              style={{ color: "var(--ft-dark)" }}
            >
              {sk}
              <span className="text-[.5em] text-gold">✳</span>
            </span>
          ))}
        </div>
      </div>

      <div
        className="flex w-max will-change-transform mt-[10px]"
        style={{ animation: "marquee 34s linear infinite reverse", animationPlayState: paused ? "paused" : "running" }}
      >
        <div className="flex items-center">
          {loop2.map((sk, i) => (
            <span
              key={`b-${i}`}
              className="inline-flex items-center gap-[18px] px-7 font-medium whitespace-nowrap text-[clamp(24px,2.8vw,38px)]"
              style={{ color: "color-mix(in srgb, var(--ft-gray) 55%, transparent)" }}
            >
              {sk}
              <span className="text-[.5em] text-gold">—</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
