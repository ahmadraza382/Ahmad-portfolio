"use client";

import Image from "next/image";
import QuoteButton from "./QuoteButton";

// TODO(placeholder): set REVIEW_RATING / REVIEW_COUNT to your REAL numbers.
// Showing fabricated review counts on a live site can mislead clients.
const REVIEW_RATING = "4.8";
const REVIEW_COUNT = "Client reviews";

const STATS: { value: string; label: string; icon: React.ReactNode }[] = [
  { value: "12+", label: "Projects Shipped", icon: <IconRocket /> },
  { value: "15+", label: "Technologies", icon: <IconCode /> },
  { value: "100%", label: "Client-Focused", icon: <IconHeart /> },
  { value: "Remote", label: "Worldwide", icon: <IconGlobe /> },
];

export default function Hero() {
  return (
    <section className=" ">
      <div
        className="relative overflow-hidden rounded-[clamp(20px,3vw,38px)] text-white"
        style={{ background: "var(--ft-dark)" }}
      >
        {/* teal glow + gradient depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 p-4" 
          style={{
            background:
              "radial-gradient(120% 90% at 60% 35%, rgba(36,66,74,0.75) 0%, rgba(21,36,47,0) 55%), linear-gradient(180deg, #15242f 0%, #16283190 40%, #15242f 100%)",
          }}
        />
        {/* faint code-bracket watermark (dev equivalent of the reference's scales) */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-heading font-black leading-none"
          style={{
            fontSize: "clamp(220px,40vw,560px)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.05)",
          }}
        >
          {"</>"}
        </div>

        {/* content aligned to the same 1400px grid as the nav and footer */}
        <div className="relative z-[2] mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] pt-[clamp(96px,13vh,140px)] pb-[clamp(22px,4vh,38px)]">
          {/* ===== main composition ===== */}
          <div className="grid items-center gap-[clamp(28px,4vw,44px)] lg:grid-cols-[1.05fr_0.95fr_1.05fr] min-h-[clamp(400px,56vh,540px)]">
            {/* LEFT: badge + heading (centered under the portrait on small screens) */}
            <div className="order-2 lg:order-1 relative z-[3] text-center lg:text-left">
              <span
                className="hidden lg:inline-flex items-center gap-[9px] rounded-full py-[7px] pl-[10px] pr-[14px] mb-6 text-[12px] font-semibold tracking-[.08em] uppercase"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}
              >
                <span className="relative flex w-[9px] h-[9px]">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-70" style={{ background: "var(--ft-gold)", animation: "pulsedot 1.8s ease-in-out infinite" }} />
                  <span className="relative inline-flex w-[9px] h-[9px] rounded-full" style={{ background: "var(--ft-gold)" }} />
                </span>
                Available for Freelance
              </span>

              <h1
                className="m-0 font-heading font-extrabold leading-[1.02] tracking-[-.02em]"
                style={{ fontSize: "clamp(42px,5.6vw,78px)" }}
              >
                Your Idea,
                <br />
                Built &amp;
                <br />
                <span style={{ color: "var(--ft-gold)" }}>Launched</span>
              </h1>

              <p className="mt-6 max-w-[44ch] mx-auto lg:mx-0 lg:max-w-[42ch] text-[15px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.7)" }}>
                Websites, mobile apps, online stores and SaaS products — designed,
                built and shipped end to end. You explain the idea; I handle the rest.
              </p>
            </div>

            {/* CENTER: portrait (first on small screens, reference style) */}
            <div className="order-1 lg:order-2 relative flex flex-col lg:flex-row justify-center items-center lg:items-end self-stretch">
              <div className="relative w-[min(340px,86%)] lg:w-[clamp(360px,34vw,470px)] lg:max-w-none aspect-[3/4] lg:-mb-[clamp(24px,4vh,44px)]">
                {/* soft edge fade + a bottom fade so the photo melts into the
                    background (reference style) — behind the badge on mobile,
                    into the stats divider on desktop */}
                <div className="absolute inset-0 [-webkit-mask-image:linear-gradient(to_bottom,#000_72%,transparent_98%)] [mask-image:linear-gradient(to_bottom,#000_72%,transparent_98%)] lg:[-webkit-mask-image:linear-gradient(to_bottom,#000_82%,transparent_99%)] lg:[mask-image:linear-gradient(to_bottom,#000_82%,transparent_99%)]">
                  <Image
                    src="/ahmad.png"
                    alt="Ahmad Raza — Full-Stack Developer"
                    fill
                    priority
                    sizes="360px"
                    className="object-cover object-top [-webkit-mask-image:radial-gradient(120%_100%_at_50%_40%,#000_62%,transparent_92%)] [mask-image:radial-gradient(120%_100%_at_50%_40%,#000_62%,transparent_92%)]"
                  />
                </div>
                {/* mobile: availability badge overlaid on the bottom of the portrait */}
                <span
                  className="lg:hidden absolute bottom-[3%] left-1/2 -translate-x-1/2 z-[2] inline-flex items-center gap-[9px] whitespace-nowrap rounded-full py-[7px] pl-[10px] pr-[14px] text-[11px] font-semibold tracking-[.08em] uppercase text-white"
                  style={{ background: "rgba(21,36,47,0.72)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(6px)" }}
                >
                  <span className="relative flex w-[9px] h-[9px]">
                    <span className="absolute inline-flex w-full h-full rounded-full opacity-70" style={{ background: "var(--ft-gold)", animation: "pulsedot 1.8s ease-in-out infinite" }} />
                    <span className="relative inline-flex w-[9px] h-[9px] rounded-full" style={{ background: "var(--ft-gold)" }} />
                  </span>
                  Available for Freelance
                </span>
              </div>
              {/* mobile: compact reviews row under the portrait */}
              <div className="lg:hidden mt-5 flex items-center justify-center gap-3">
                <div className="flex items-center">
                  <IconGoogle />
                  <span className="-ml-[9px]"><IconFacebook /></span>
                </div>
                <div>
                  <div className="flex items-center gap-[6px]">
                    <Stars />
                    <span className="text-[16px] font-bold text-white">{REVIEW_RATING}</span>
                  </div>
                  <div className="mt-[2px] text-[12px] font-semibold tracking-[.03em]" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {REVIEW_COUNT}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: reviews card + CTA (card is desktop-only; mobile shows the compact row under the portrait) */}
            <div className="order-3 relative z-[3] flex flex-col items-center lg:items-end gap-5">
              <div
                className="hidden lg:block w-full max-w-[250px] rounded-2xl p-5"
                style={{
                  // glass card: border brighter on the top-left, fading to the
                  // bottom-right (reference style)
                  border: "1px solid transparent",
                  background:
                    "linear-gradient(rgba(255,255,255,0.07), rgba(255,255,255,0.07)) padding-box, linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.04) 70%) border-box",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center">
                    <IconGoogle />
                    <span className="-ml-[9px]"><IconFacebook /></span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-[6px] justify-end">
                      <Stars />
                      <span className="text-[16px] font-bold text-white">{REVIEW_RATING}</span>
                    </div>
                    <div className="mt-[3px] text-[12px] font-semibold tracking-[.03em]" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {REVIEW_COUNT}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[13.5px] leading-[1.55]" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Modern websites, apps & SaaS — clear guidance from first idea to launch.
                </p>
              </div>

              <QuoteButton href="/#contact">Start a project</QuoteButton>
            </div>
          </div>

          {/* ===== stats bar ===== */}
          <div className="mt-[clamp(24px,4vh,44px)] pt-[clamp(22px,3vh,34px)] border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-7 gap-x-4">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col  ">
                  <div className="flex items-center gap-[6px]">
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>{s.icon}</span>
                    <span
                      className="font-heading font-extrabold leading-none text-white"
                      style={{ fontSize: "clamp(28px,3.2vw,44px)" }}
                    >
                      {s.value}
                    </span>
                  </div>
                  <span className="text-[18.5px]" style={{ color: "rgba(255,255,255,0.7)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- stars ---------- */
function Stars() {
  return (
    <span className="inline-flex gap-[1px]" style={{ color: "var(--ft-gold)" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.26L21 9.27l-4.5 4.38L17.8 21 12 17.27 6.2 21l1.3-7.35L3 9.27l6.1-1.01z" />
        </svg>
      ))}
    </span>
  );
}

/* ---------- brand icons ---------- */
function IconGoogle() {
  return (
    <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-white">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.2-2.2H12v4h6.6c-.1 1-.9 2.6-2.5 3.6l3.6 2.8c2.2-2 3.8-5 3.8-8.2z" />
        <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.6-2.8c-1 .7-2.3 1.2-4.4 1.2-3.4 0-6.2-2.3-7.3-5.4l-3.7 2.9C1 21.2 6.1 24 12 24z" />
        <path fill="#FBBC05" d="M4.7 14.1c-.3-.9-.4-1.4-.4-2.1s.2-1.5.4-2.1L1 6.9C.3 8.4 0 10.1 0 12s.3 3.6 1 5.1z" />
        <path fill="#EA4335" d="M12 4.7c1.9 0 3.1.8 3.9 1.5l2.9-2.8C17 1.7 14.7.6 12 .6 6.1.6 1 3.4 0 8l3.7 2.9C4.8 7 7.6 4.7 12 4.7z" />
      </svg>
    </span>
  );
}
function IconFacebook() {
  return (
    <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full ring-2 ring-[var(--ft-dark)]" style={{ background: "#1877F2" }}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path d="M24 12c0-6.6-5.4-12-12-12S0 5.4 0 12c0 6 4.4 11 10.1 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4C19.6 23 24 18 24 12z" />
      </svg>
    </span>
  );
}

/* ---------- stat icons ---------- */
function IconRocket() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 8-10c1.5.5 3.5 2.5 4 4a22 22 0 0 1-10 8z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
function IconCode() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
