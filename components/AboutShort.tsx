"use client";

import QuoteButton from "./QuoteButton";
import SectionBadge from "./SectionBadge";

export default function AboutShort() {
  return (
    <section
      id="about"
      className="mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(60px,10vh,140px)]"
    >
      {/* ===== reference-style intro: badge + heading | text + CTA ===== */}
      <div
        data-reveal=""
        className="grid gap-[clamp(28px,4vw,72px)] lg:grid-cols-[0.85fr_1.35fr] items-start mb-[clamp(48px,7vw,84px)]"
      >
        {/* LEFT: badge + big heading */}
        <div>
          <SectionBadge className="mb-6">About Me</SectionBadge>
          <h2
            className="m-0 font-heading font-bold leading-[1.06] tracking-[-.02em] text-[clamp(32px,3.6vw,52px)]"
            style={{ color: "var(--ft-dark)" }}
          >
            Built To Be
            <br />
            Used, Made
            <br />
            To Last
          </h2>
        </div>

        {/* RIGHT: bold intro + paragraph + CTA */}
        <div className="lg:pt-[6px]">
          <p
            className="m-0 mb-4 font-bold leading-[1.5] text-[clamp(16px,1.3vw,18px)]"
            style={{ color: "var(--ft-dark)" }}
          >
            I&apos;m a client-focused full-stack developer dedicated to building
            websites, apps and SaaS products that deliver clear, results-driven value.
          </p>
          <p
            className="m-0 leading-[1.7] text-[clamp(14.5px,1.15vw,16px)]"
            style={{ color: "var(--ft-gray)" }}
          >
            I&apos;ve built products people actually use: an English-learning platform
            with 10,000+ learners, a dental-supplies platform trusted by 12,000+
            professionals, and a management system a government college runs every day.
            Frontend and backend, both mine. What I enjoy most is taking something messy
            and making it simple to use — because your idea deserves more than code,
            it deserves craft.
          </p>
          <div className="mt-8">
            <QuoteButton href="/#contact">Get a free quote</QuoteButton>
          </div>
        </div>
      </div>

      {/* ===== intro video (unchanged) ===== */}
      <div id="intro-video" data-reveal="" data-delay="120" className="relative mx-auto max-w-[900px]">
        <div className="relative rounded-[18px] overflow-hidden bg-soft border border-border" style={{ aspectRatio: "16/9" }}>
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
    </section>
  );
}
