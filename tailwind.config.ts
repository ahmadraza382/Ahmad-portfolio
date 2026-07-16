import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Driven by CSS variables so light/dark themes swap automatically.
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        "text-2": "var(--text-2)",
        accent: "var(--accent)",           // Ocean Pine
        "accent-soft": "var(--accent-soft)",
        gold: "var(--gold)",               // Accent gold
        "gold-soft": "var(--gold-soft)",
        charcoal: "var(--charcoal)",       // Dark surface
        border: "var(--border)",
        soft: "var(--soft)",
        sand: "var(--sand)",
        // Raw brand swatches (exact spec values).
        brand: {
          gold: "var(--brand-gold)",
          text: "var(--brand-text)",
          light: "var(--brand-light)",
          dark: "var(--brand-dark)",
          muted: "var(--brand-muted)",
          charcoal: "var(--brand-charcoal)",
          ocean: "var(--brand-ocean)",
        },
      },
      fontFamily: {
        // Design system: Unbounded (headings) + Inter (body).
        heading: ["var(--font-unbounded)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        // Typography scale from the design spec.
        "display": ["62px", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "h1": ["46px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "h2": ["36px", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "h3": ["32px", { lineHeight: "1.15" }],
        "h4": ["30px", { lineHeight: "1.2" }],
        "h5": ["26px", { lineHeight: "1.25" }],
      },
      maxWidth: {
        content: "1400px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        spin: {
          from: { transform: "rotate(0)" },
          to: { transform: "rotate(360deg)" },
        },
        pulsedot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".4", transform: "scale(.7)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        heroIn: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "none" },
        },
        heroFloat: {
          "0%,100%": { transform: "rotate(2.2deg) translateY(0)" },
          "50%": { transform: "rotate(2.2deg) translateY(-12px)" },
        },
        scrollDot: {
          "0%": { transform: "translateY(-9px)", opacity: "0" },
          "25%": { opacity: "1" },
          "75%": { opacity: "1" },
          "100%": { transform: "translateY(28px)", opacity: "0" },
        },
        scrollArrow: {
          "0%": { transform: "translateY(-3px)", opacity: ".3" },
          "50%": { transform: "translateY(3px)", opacity: "1" },
          "100%": { transform: "translateY(-3px)", opacity: ".3" },
        },
        revealUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "none" },
        },
        drawLine: {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        spin: "spin 20s linear infinite",
        pulsedot: "pulsedot 1.8s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
        heroFloat: "heroFloat 7s ease-in-out infinite",
        scrollDot: "scrollDot 1.9s cubic-bezier(.4,0,.2,1) infinite",
        scrollArrow: "scrollArrow 1.9s cubic-bezier(.4,0,.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
