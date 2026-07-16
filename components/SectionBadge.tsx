// Outlined pill eyebrow ("ABOUT ME", "MY SERVICES", …) used above each
// redesigned section. `tone="dark"` renders white-on-dark for navy sections.

interface SectionBadgeProps {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionBadge({
  children,
  tone = "light",
  className = "",
}: SectionBadgeProps) {
  const isDark = tone === "dark";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-[20px] py-[9px] text-[12px] font-semibold tracking-[.1em] uppercase ${className}`}
      style={{
        // reference style: subtle translucent fill + clearly visible border
        background: isDark ? "rgba(255,255,255,0.07)" : "rgba(21,36,47,0.04)",
        borderColor: isDark ? "rgba(255,255,255,0.55)" : "rgba(21,36,47,0.6)",
        color: isDark ? "var(--ft-white)" : "var(--ft-dark)",
        backdropFilter: "blur(6px)",
      }}
    >
      {children}
    </span>
  );
}
