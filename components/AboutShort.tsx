"use client";

import { useRef, useState } from "react";
import QuoteButton from "./QuoteButton";
import SectionBadge from "./SectionBadge";

const VIDEO_SRC =
  "https://lljgmcbhflfroeofxrag.supabase.co/storage/v1/object/public/Intro%20Video/Ahmad%20Intro%20video.mp4";

export default function AboutShort() {
  const mainRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  /* keep the blurred background video in sync with the main one */
  const syncBg = () => {
    if (bgRef.current && mainRef.current) {
      bgRef.current.currentTime = mainRef.current.currentTime;
    }
  };

  const handlePlay = () => {
    syncBg();
    bgRef.current?.play().catch(() => { });
  };
  const handlePause = () => bgRef.current?.pause();
  const handleSeeked = () => syncBg();

  /* click overlay → hide it, start video */
  const startVideo = () => {
    setPlaying(true);
    setTimeout(() => {
      mainRef.current?.play().catch(() => { });
    }, 100);
  };

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
            What I enjoy most is taking something messy
            and making it simple to use because your idea deserves more than code,
            it deserves craft.
          </p>
          <div className="mt-8">
            <QuoteButton href="/#contact">Get a free quote</QuoteButton>
          </div>
        </div>
      </div>

      {/* ===== intro video — blurred mirror background + play button overlay ===== */}
      <div id="intro-video" data-reveal="" data-delay="120" className="relative mx-auto max-w-[400px] md:max-w-[900px]">
        <div
          className="relative rounded-[18px] overflow-hidden border border-border aspect-[9/16] md:aspect-[16/9]"
          style={{ background: "#0a0a0a" }}
        >
          {/* BACKGROUND: blurred, scaled-up copy of the video (desktop only) */}
          <video
            ref={bgRef}
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
            style={{ filter: "blur(28px) brightness(0.6) saturate(1.2)", transform: "scale(1.15)" }}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          {/* FOREGROUND: actual portrait video, centered */}
          <video
            ref={mainRef}
            className="absolute inset-0 w-full h-full object-cover md:object-contain md:top-0 md:left-1/2 md:-translate-x-1/2 md:h-full md:w-auto"
            style={{ zIndex: 1 }}
            controls={playing}
            preload="metadata"
            playsInline
            onPlay={handlePlay}
            onPause={handlePause}
            onSeeked={handleSeeked}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            Your browser doesn&apos;t support embedded video.
          </video>

          {/* PLAY BUTTON OVERLAY — shown until user clicks play */}
          <button
            type="button"
            onClick={startVideo}
            aria-label="Play intro video"
            className="absolute inset-0 z-[3] w-full h-full border-none p-0 cursor-pointer flex flex-col items-center justify-center group"
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              opacity: playing ? 0 : 1,
              pointerEvents: playing ? "none" : "auto",
              transition: "opacity 0.4s ease",
            }}
          >
            {/* Play button with glow & hover effect */}
            <div
              className="relative flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
              style={{
                width: "clamp(64px, 8vw, 84px)",
                height: "clamp(64px, 8vw, 84px)",
                background: "linear-gradient(135deg, #d4af37 0%, #b8932b 100%)",
                boxShadow:
                  "0 0 35px rgba(200, 164, 81, 0.55), 0 10px 25px rgba(0, 0, 0, 0.6)",
              }}
            >
              {/* subtle pulse animation ring */}
              <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-[#c8a451]" />
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="white"
                style={{ marginLeft: "3px" }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            {/* Glassmorphism badge under button */}
            <div className="mt-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[12px] md:text-[13px] font-semibold tracking-wider uppercase shadow-xl transition-transform duration-300 group-hover:scale-105 flex items-center gap-1.5">
              <span>Watch Intro</span>
              <span className="text-[11px] text-[#d4af37] font-normal tracking-normal">
                • 0:20
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
