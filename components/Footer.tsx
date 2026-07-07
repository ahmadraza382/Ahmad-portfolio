"use client";

import Underline from "./Underline";

export default function Footer() {
  const scrollContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-content mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(60px,9vh,120px)] pb-[40px]">
        <div data-reveal="" className="text-center mb-[clamp(50px,8vh,90px)]">
          <a
            href="#contact"
            onClick={scrollContact}
            data-cursor="cta"
            data-magnetic=""
            className="inline-block no-underline text-text"
          >
            <span className="font-serif italic leading-none tracking-[-.02em] text-[clamp(40px,9vw,120px)]">
              Have something to build?{" "}
              <span className="relative inline-block text-accent">
                Let&apos;s talk.
                <Underline variant="wide" className="absolute left-0 bottom-[-.1em] w-full h-[.34em]" />
              </span>
            </span>
          </a>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-5 pt-8 border-t border-border">
          <span className="text-[14px] text-text-2">© 2026 Ahmad Raza — Full-Stack Developer</span>
          <div className="flex gap-[22px] items-center">
            <a
              href="https://github.com/ahmadraza382"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="text-[14px] text-text-2 no-underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ahmadraza161/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="text-[14px] text-text-2 no-underline"
            >
              LinkedIn
            </a>
            <button
              onClick={toTop}
              data-cursor="cta"
              className="inline-flex items-center gap-[7px] bg-accent border-none rounded-full py-[9px] px-4 text-white text-[13px] font-semibold cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
