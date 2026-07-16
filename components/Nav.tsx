"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Floating navigation (reference-style).
 * Over the dark home hero it is fully transparent — logo, links pill and CTA
 * float directly on the hero. Once scrolled (or on the lighter inner pages)
 * it gains a dark navy pill background so white text stays readable.
 */
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent only while sitting on the dark home hero.
  const solid = scrolled || pathname !== "/";

  const goSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeAnd = (fn?: () => void) => () => {
    setMenuOpen(false);
    fn?.();
  };

  const navLinkCls =
    "text-[14px] font-medium text-white/80 no-underline hover:text-[#c8a451] transition-colors";
  const mobileLinkCls =
    "text-[26px] font-semibold text-white no-underline py-[10px] flex justify-between items-center hover:text-[#c8a451] transition-colors";

  return (
    <>
      <nav
        className="fixed top-[18px] left-1/2 -translate-x-1/2 z-[100] w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] font-body"
      >
        {/* transparent over the hero; dark pill bar once scrolled / on light pages */}
        <div
          className="flex items-center justify-between rounded-full transition-all duration-300"
          style={
            solid
              ? {
                  background: "rgba(21,36,47,0.9)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                  padding: "8px 8px 8px 22px",
                }
              : { padding: "0" }
          }
        >
          {/* logo — stylish two-tone wordmark */}
          <Link href="/" data-cursor="link" className="no-underline group/logo">
            <span className="font-heading font-extrabold text-[21px] tracking-[-.04em] leading-none text-white inline-flex items-baseline">
              Ahmad
              <span className="ml-[5px] text-gold">R</span>
              <span className="ml-[2px] inline-block w-[6px] h-[6px] rounded-full bg-gold" />
            </span>
          </Link>

          {/* center links pill (reference style) */}
          <div
            className="hidden min-[821px]:flex items-center gap-[clamp(18px,2.4vw,32px)] absolute left-1/2 -translate-x-1/2 rounded-full px-8 py-[13px]"
            style={{ background: "rgba(255,255,255,0.09)", backdropFilter: "blur(10px)" }}
          >
            <Link href="/work" data-cursor="link" className={navLinkCls}>Work</Link>
            <Link href="/about" data-cursor="link" className={navLinkCls}>About</Link>
            <a href="#services" onClick={goSection("services")} data-cursor="link" className={navLinkCls}>Services</a>
            <Link href="/blog" data-cursor="link" className={navLinkCls}>Blog</Link>
            <a href="#contact" onClick={goSection("contact")} data-cursor="link" className={navLinkCls}>Contact</a>
          </div>

          {/* right cluster */}
          <div className="flex items-center gap-[10px]">
            {/* gold CTA */}
            <button
              onClick={goSection("contact")}
              data-cursor="cta"
              className="hidden min-[721px]:inline-flex items-center gap-[10px] rounded-full pl-5 pr-[6px] py-[6px] border-none cursor-pointer flex-none font-medium text-[14px] text-white bg-gold"
            >
              Let&apos;s talk
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center w-[28px] h-[28px] rounded-full bg-surface text-gold"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
            </button>

            {/* mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="inline-flex min-[821px]:hidden items-center justify-center w-[40px] h-[40px] rounded-full cursor-pointer flex-none text-white"
              style={{ border: "1px solid rgba(255,255,255,0.16)" }}
            >
              <span className="relative block w-[18px] h-[12px]">
                <span className="absolute left-0 top-0 w-full h-[2px] rounded-[2px] bg-current transition-transform duration-300" style={{ transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
                <span className="absolute left-0 top-[5px] w-full h-[2px] rounded-[2px] bg-current transition-opacity duration-200" style={{ opacity: menuOpen ? 0 : 1 }} />
                <span className="absolute left-0 bottom-0 w-full h-[2px] rounded-[2px] bg-current transition-transform duration-300" style={{ transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className="fixed top-[70px] left-1/2 -translate-x-1/2 z-[99] w-[min(1360px,calc(100%-24px))] rounded-[22px] px-6 pt-5 pb-6 flex flex-col gap-1 transition-[transform,opacity] duration-[380ms] [transition-timing-function:cubic-bezier(.4,0,.2,1)] font-body"
        style={{
          background: "rgba(21,36,47,0.96)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.10)",
          transform: menuOpen ? "translate(-50%,0)" : "translate(-50%,-12px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <Link href="/work" onClick={closeAnd()} data-cursor="link" className={`${mobileLinkCls} border-b border-white/10`}>
          Work <span className="text-gold text-[20px]">↗</span>
        </Link>
        <Link href="/blog" onClick={closeAnd()} data-cursor="link" className={`${mobileLinkCls} border-b border-white/10`}>
          Blog <span className="text-gold text-[20px]">↗</span>
        </Link>
        <Link href="/about" onClick={closeAnd()} data-cursor="link" className={`${mobileLinkCls} border-b border-white/10`}>
          About <span className="text-gold text-[20px]">↗</span>
        </Link>
        <a href="#services" onClick={goSection("services")} data-cursor="link" className={`${mobileLinkCls} border-b border-white/10`}>
          Services <span className="text-gold text-[20px]">↗</span>
        </a>
        <a href="#contact" onClick={goSection("contact")} data-cursor="link" className={mobileLinkCls}>
          Contact <span className="text-gold text-[20px]">↗</span>
        </a>
      </div>
    </>
  );
}
