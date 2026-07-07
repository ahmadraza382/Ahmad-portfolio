// Hand-drawn accent underline that draws itself in on scroll.
// `variant` matches the three different path shapes used in the design.

interface UnderlineProps {
  variant?: "hero" | "short" | "wide";
  className?: string;
}

const PATHS: Record<NonNullable<UnderlineProps["variant"]>, { viewBox: string; d: string; sw: number }> = {
  hero: { viewBox: "0 0 300 24", d: "M4,14 C60,4 110,20 160,11 C210,3 250,17 296,9", sw: 5 },
  short: { viewBox: "0 0 120 18", d: "M3,11 C30,3 70,15 117,7", sw: 4 },
  wide: { viewBox: "0 0 400 24", d: "M4,14 C90,4 180,20 280,11 C330,6 370,16 396,10", sw: 5 },
};

export default function Underline({ variant = "short", className = "" }: UnderlineProps) {
  const p = PATHS[variant];
  return (
    <svg
      data-underline=""
      viewBox={p.viewBox}
      preserveAspectRatio="none"
      className={className}
      style={{ overflow: "visible" }}
    >
      <path
        d={p.d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={p.sw}
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}
