"use client";

import Link from "next/link";
import { VALUES, TIMELINE, SKILL_GROUPS } from "@/lib/data";
import { INTRO_VIDEO_SRC } from "@/lib/media";

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
        <div className=" ">
          <p className="leading-[1.7] text-text-2 m-0 mb-5 text-[clamp(17px,1.6vw,21px)]">
            I&apos;m a software engineer focused on building modern digital
            products that are useful, reliable, and easy to use.
          </p>
          <p className="leading-[1.7] text-text-2 m-0 mb-5 text-[clamp(16px,1.5vw,19px)]">
            I work on websites, web applications, mobile apps, AI-powered solutions,
            custom software, and digital experiences for businesses, startups, and
            individuals. I enjoy taking an idea from the early planning stage and
            turning it into something people can actually use. Whether it&apos;s a
            business website, a web application, an internal system, or a custom
            digital product, I focus on understanding the purpose behind it before
            deciding how to build it.
          </p>
          <p className="leading-[1.7] text-text-2 m-0 mb-5 text-[clamp(16px,1.5vw,19px)]">
            My work covers the complete development process, including planning,
            architecture, development, database integration, APIs, frontend interfaces,
            testing, deployment, and ongoing improvements. I choose technologies based
            on what the project actually needs rather than adding complexity just for
            the sake of it.
          </p>
          <p className="leading-[1.7] text-text-2 m-0 mb-5 text-[clamp(16px,1.5vw,19px)]">
            I also believe that good development is about more than writing code. Clear
            communication, realistic timelines, thoughtful decisions, and understanding
            the client&apos;s goals are just as important. I like keeping the process
            straightforward, explaining technical things in simple terms, and making
            sure there is a clear direction throughout the project.
          </p>
          
        </div>
      </div>

      {/* intro video */}
      <div data-reveal="" className="mb-[80px]">
        <h2 className="font-mono text-[13px] tracking-[.18em] uppercase text-accent m-0 mb-[30px] text-center">
          A quick intro
        </h2>
        {/* Same intro video as the home page. The source is portrait, so a
            blurred, scaled copy fills the 16/9 frame behind it on desktop —
            matching the AboutShort treatment instead of cropping the subject. */}
        <div className="mx-auto max-w-[400px] md:max-w-[900px]">
          <div
            className="relative rounded-[18px] overflow-hidden border border-border aspect-[9/16] md:aspect-[16/9]"
            style={{ background: "#0a0a0a" }}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover hidden md:block"
              style={{ filter: "blur(28px) brightness(0.6) saturate(1.2)", transform: "scale(1.15)" }}
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={INTRO_VIDEO_SRC} type="video/mp4" />
            </video>

            <video
              className="absolute inset-0 w-full h-full object-cover md:object-contain md:left-1/2 md:-translate-x-1/2 md:h-full md:w-auto"
              style={{ zIndex: 1 }}
              controls
              preload="metadata"
              playsInline
            >
              <source src={INTRO_VIDEO_SRC} type="video/mp4" />
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
          href="https://www.linkedin.com/in/ahmadraza382/"
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
