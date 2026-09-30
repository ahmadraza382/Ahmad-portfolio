"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SERVICE_PAGES } from "@/lib/services-content";

/**
 * Floating navigation (reference-style).
 * Over the dark home hero it is fully transparent — logo, links pill and CTA
 * float directly on the hero. Once scrolled (or on the lighter inner pages)
 * it gains a dark navy pill background so white text stays readable.
 */
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  // Small close delay so the pointer can travel from the trigger to the panel.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the services dropdown on route change and on Escape.
  useEffect(() => {
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140);
  };

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

            {/* Services — links to the services index, with a dropdown of all six pages */}
            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <Link
                href="/services"
                data-cursor="link"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onFocus={openServices}
                className={`${navLinkCls} inline-flex items-center gap-[5px]`}
              >
                Services
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300"
                  style={{ transform: servicesOpen ? "rotate(180deg)" : "none" }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </Link>

              {/* invisible bridge so the pointer can cross the gap to the panel */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 top-full h-[18px] w-[320px]"
                style={{ pointerEvents: servicesOpen ? "auto" : "none" }}
              />

              <div
                className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+16px)] w-[min(540px,92vw)] rounded-[20px] overflow-hidden transition-[opacity,transform] duration-300"
                style={{
                  background: "rgba(18,31,41,0.98)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow:
                    "0 28px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                  opacity: servicesOpen ? 1 : 0,
                  transform: servicesOpen
                    ? "translate(-50%,0) scale(1)"
                    : "translate(-50%,-10px) scale(0.98)",
                  pointerEvents: servicesOpen ? "auto" : "none",
                }}
              >
                {/* gold hairline along the top edge */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--ft-gold), transparent)",
                  }}
                />

                <div className="grid grid-cols-2 gap-1 p-3">
                  {SERVICE_PAGES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      data-cursor="link"
                      onClick={() => setServicesOpen(false)}
                      className="group/item relative flex flex-col rounded-[14px] py-[11px] pl-5 pr-3 no-underline transition-colors duration-250 hover:bg-white/[0.06]"
                    >
                      {/* gold marker that grows on hover, in place of an icon */}
                      <span
                        aria-hidden="true"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-[3px] h-0 rounded-full transition-all duration-300 group-hover/item:h-[28px]"
                        style={{ background: "var(--ft-gold)" }}
                      />
                      <span className="text-[14px] font-semibold leading-[1.3] text-white/90 transition-colors duration-250 group-hover/item:text-[#c8a451]">
                        {s.name}
                      </span>
                      <span className="mt-[3px] text-[12px] leading-[1.45] text-white/45">
                        {s.badge}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* footer row → all services */}
                <Link
                  href="/services"
                  data-cursor="link"
                  onClick={() => setServicesOpen(false)}
                  className="group/all flex items-center justify-between gap-3 px-6 py-[15px] no-underline transition-colors duration-250 hover:bg-white/[0.04]"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <span className="text-[13px] font-medium text-white/65">
                    Not sure which you need?
                  </span>
                  <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-gold">
                    View all services
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/all:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </div>
            </div>

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

        <Link href="/about" onClick={closeAnd()} data-cursor="link" className={`${mobileLinkCls} border-b border-white/10`}>
          About <span className="text-gold text-[20px]">↗</span>
        </Link>
        {/* Services — tap the chevron to expand the six service pages */}
        <div className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <Link
              href="/services"
              onClick={closeAnd()}
              data-cursor="link"
              className={`${mobileLinkCls} flex-1 border-none`}
            >
              Services
            </Link>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((o) => !o)}
              aria-expanded={mobileServicesOpen}
              aria-label={mobileServicesOpen ? "Hide service pages" : "Show service pages"}
              className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-full bg-transparent cursor-pointer text-gold"
              style={{ border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300"
                style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "none" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
          </div>
          <div
            className="grid transition-all duration-300"
            style={{
              gridTemplateRows: mobileServicesOpen ? "1fr" : "0fr",
              opacity: mobileServicesOpen ? 1 : 0,
            }}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col pb-3 pl-1">
                {SERVICE_PAGES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={closeAnd()}
                    data-cursor="link"
                    className="py-[9px] text-[16px] font-medium text-white/70 no-underline hover:text-[#c8a451] transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <a href="#contact" onClick={goSection("contact")} data-cursor="link" className={mobileLinkCls}>
          Contact <span className="text-gold text-[20px]">↗</span>
        </a>
      </div>
    </>
  );
}
