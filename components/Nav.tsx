"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

/**
 * Fixed top navigation + slide-down mobile menu.
 * In-page links (Services / Contact) smooth-scroll on the home page,
 * or navigate home first then scroll. Work / About are real routes.
 */
export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
    "text-[14px] font-semibold text-text no-underline opacity-[.85] hover:opacity-100 transition-opacity";
  const mobileLinkCls =
    "font-serif text-[34px] text-text no-underline py-[10px] flex justify-between items-center";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between py-[22px] px-[clamp(20px,5vw,64px)] backdrop-blur-[10px] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] border-b border-border">
        <Link
          href="/"
          data-cursor="link"
          className="flex items-center gap-3 no-underline text-text"
        >
          <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-accent text-white font-serif text-[22px] leading-none pb-[2px]">
            a
          </span>
          <span className="font-bold text-[16px] tracking-[-.02em]">Ahmad Raza</span>
        </Link>

        <div className="flex items-center gap-[clamp(14px,2.4vw,38px)]">
          <div className="hidden min-[821px]:flex gap-[clamp(14px,2.4vw,38px)] items-center">
            <Link href="/work" data-cursor="link" className={navLinkCls}>
              Work
            </Link>
            <Link href="/about" data-cursor="link" className={navLinkCls}>
              About
            </Link>
            <a href="#services" onClick={goSection("services")} data-cursor="link" className={navLinkCls}>
              Services
            </a>
            <a href="#contact" onClick={goSection("contact")} data-cursor="link" className={navLinkCls}>
              Contact
            </a>
          </div>

          <button
            onClick={toggleTheme}
            data-cursor="link"
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-full border border-border bg-surface text-text cursor-pointer flex-none"
          >
            <span className="text-[16px] leading-none">{theme === "light" ? "☾" : "☀"}</span>
          </button>

          <button
            onClick={goSection("contact")}
            data-cursor="cta"
            className="hidden min-[721px]:inline-flex items-center gap-2 py-[11px] px-5 rounded-full border-none bg-accent text-white font-sans font-semibold text-[14px] cursor-pointer flex-none"
          >
            Let&apos;s talk
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="inline-flex min-[821px]:hidden items-center justify-center w-[42px] h-[42px] rounded-[12px] border border-border bg-surface text-text cursor-pointer flex-none"
          >
            <span className="relative block w-[18px] h-[12px]">
              <span
                className="absolute left-0 top-0 w-full h-[2px] rounded-[2px] bg-current transition-transform duration-300"
                style={{ transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }}
              />
              <span
                className="absolute left-0 top-[5px] w-full h-[2px] rounded-[2px] bg-current transition-opacity duration-200"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="absolute left-0 bottom-0 w-full h-[2px] rounded-[2px] bg-current transition-transform duration-300"
                style={{ transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className="fixed top-0 left-0 right-0 z-[99] bg-bg border-b border-border pt-[92px] px-[clamp(20px,5vw,64px)] pb-[30px] flex flex-col gap-1 transition-[transform,opacity] duration-[420ms] [transition-timing-function:cubic-bezier(.4,0,.2,1)]"
        style={{
          transform: menuOpen ? "translateY(0)" : "translateY(-102%)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <Link href="/work" onClick={closeAnd()} data-cursor="link" className={`${mobileLinkCls} border-b border-border`}>
          Work <span className="text-accent text-[22px]">↘</span>
        </Link>
        <Link href="/about" onClick={closeAnd()} data-cursor="link" className={`${mobileLinkCls} border-b border-border`}>
          About <span className="text-accent text-[22px]">↘</span>
        </Link>
        <a href="#services" onClick={goSection("services")} data-cursor="link" className={`${mobileLinkCls} border-b border-border`}>
          Services <span className="text-accent text-[22px]">↘</span>
        </a>
        <a href="#contact" onClick={goSection("contact")} data-cursor="link" className={mobileLinkCls}>
          Contact <span className="text-accent text-[22px]">↘</span>
        </a>
      </div>
    </>
  );
}
