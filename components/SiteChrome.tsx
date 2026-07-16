"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";
import RouteProgress from "./RouteProgress";
import { useCursor, useReveal, useMagnetic } from "@/hooks/useInteractions";

const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

/**
 * Wraps every page: grain overlay, custom cursor, fixed nav, and the
 * scroll-reveal / magnetic interactions (re-armed on route change).
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const cursorRef = useCursor();
  useReveal(pathname);
  useMagnetic(pathname);

  // The admin area has its own layout — no public nav, cursor or grain.
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen [overflow-x:clip]">
      {/* top progress bar on route changes */}
      <RouteProgress />
      {/* grain */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[9998] pointer-events-none mix-blend-multiply"
        style={{ opacity: "var(--grain)", backgroundImage: `url("${GRAIN}")` }}
      />
      {/* custom cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[14px] h-[14px] rounded-full bg-accent z-[9999] pointer-events-none opacity-0 will-change-transform"
        style={{
          transform: "translate(-50%,-50%)",
          transition:
            "width .25s cubic-bezier(.4,0,.2,1),height .25s cubic-bezier(.4,0,.2,1),background .25s,opacity .3s",
        }}
      />
      <Nav />
      <main>{children}</main>
      {/* One footer for every public page (admin is returned early above). */}
      <Footer />
    </div>
  );
}
