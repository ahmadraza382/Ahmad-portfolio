import SectionBadge from "./SectionBadge";
import QuoteButton from "./QuoteButton";

// TODO(placeholder): swap for a final branded section background.
const SECTION_BG =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=60";

// TODO(placeholder): swap step images for real ones.
const STEPS: { no: string; title: string; desc: string; img: string; icon: React.ReactNode }[] = [
  {
    no: "01.",
    title: "Requirements Planning",
    desc: "We discuss your idea, goals and budget, and turn them into a clear, agreed scope.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=60",
    icon: <IconClipboard />,
  },
  {
    no: "02.",
    title: "Design",
    desc: "Wireframes and UI designs so you see exactly how it will look before any code.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=500&q=60",
    icon: <IconPen />,
  },
  {
    no: "03.",
    title: "Development",
    desc: "Frontend and backend built in small, reviewable milestones you can follow.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=60",
    icon: <IconCode />,
  },
  {
    no: "04.",
    title: "Testing",
    desc: "Every feature tested across devices and edge cases before it ships.",
    img: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=500&q=60",
    icon: <IconCheck />,
  },
  {
    no: "05.",
    title: "Deployment",
    desc: "Launch on production infrastructure: domain, hosting, SSL and analytics set up.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=60",
    icon: <IconRocket />,
  },
  {
    no: "06.",
    title: "Maintenance",
    desc: "Ongoing support, fixes and improvements so the product keeps earning.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=60",
    icon: <IconWrench />,
  },
];

// Desktop composition (design canvas 1400 × 680): card positions ascending
// bottom-left → top-right, reference style. Dots sit just above each card.
const POS = [
  { left: 2.8, top: 63 },
  { left: 18.9, top: 52 },
  { left: 35, top: 41 },
  { left: 51.1, top: 30 },
  { left: 67.2, top: 19 },
  { left: 83.3, top: 8 },
];

export default function Process() {
  return (
    <section
      id="process"
      className="my-[clamp(8px,1.2vw,18px)] relative overflow-hidden rounded-[clamp(20px,3vw,38px)] text-white font-body"
      style={{ background: "var(--ft-dark)" }}
    >
      {/* faint background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.2]"
        style={{ backgroundImage: `url(${SECTION_BG})` }}
      />
      {/* dark wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 30% 15%, rgba(36,66,74,0.55) 0%, rgba(21,36,47,0) 60%), linear-gradient(180deg, rgba(21,36,47,0.84) 0%, rgba(24,43,51,0.7) 55%, rgba(18,34,43,0.92) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(48px,7vh,80px)]">
        <div data-reveal="" className="relative lg:h-[700px]">
          {/* ===== header (top-left inside the composition) ===== */}
          <div className="lg:absolute lg:top-0 lg:left-0 lg:max-w-[580px] lg:z-[3]">
            <SectionBadge tone="dark" className="mb-5">Process</SectionBadge>
            <h2
              className="m-0 mb-4 font-heading font-bold leading-[1.08] tracking-[-.02em] text-[clamp(28px,2.9vw,42px)]"
            >
              Simple Working <span className="text-gold">Process</span>
            </h2>
            <p className="m-0 mb-7 max-w-[440px] text-[15px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.78)" }}>
              I follow a clear, structured approach so every project is handled
              with precision, transparency and care — from the first requirements
              session to long-term maintenance after launch.
            </p>
            <QuoteButton href="/#contact">Get a free quote</QuoteButton>
          </div>

          {/* ===== desktop: wavy gold path through the dots ===== */}
          <svg
            aria-hidden="true"
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1400 700"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* dark under-stroke, then the gold line (reference has this double edge) */}
            {[
              { stroke: "rgba(0,0,0,0.4)", width: 8 },
              { stroke: "var(--ft-gold)", width: 3 },
            ].map((s, i) => (
              <path
                key={i}
                d="M -40 372 C -10 452, 25 462, 60 418
                   C 135 338, 211 421, 286 341
                   C 361 261, 436 344, 511 264
                   C 586 184, 661 267, 736 187
                   C 811 107, 887 190, 962 110
                   C 1037 30, 1112 113, 1187 33
                   C 1240 -22, 1300 55, 1440 28"
                stroke={s.stroke}
                strokeWidth={s.width}
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* ===== desktop: floating compact cards ===== */}
          <div className="hidden lg:block">
            {STEPS.map((s, i) => (
              <div
                key={s.no}
                className="absolute w-[15.4%]"
                style={{ left: `${POS[i].left}%`, top: `${POS[i].top}%` }}
              >
                {/* dot on the path bend, above the card's left corner */}
                <span
                  aria-hidden="true"
                  className="absolute -top-[34px] left-[10px] w-[22px] h-[22px] rounded-full z-[2]"
                  style={{ background: "var(--ft-gold)", border: "6px solid rgba(96,110,117,0.95)" }}
                />
                <StepCard s={s} />
              </div>
            ))}
          </div>

          {/* ===== mobile / tablet: stacked ===== */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5 mt-[clamp(32px,5vh,48px)]">
            {STEPS.map((s) => (
              <StepCard key={s.no} s={s} alwaysDesc />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* compact card — white by default; hover on desktop turns it into the
   reference's dark glass card with the description visible */
function StepCard({
  s,
  alwaysDesc = false,
}: {
  s: (typeof STEPS)[number];
  alwaysDesc?: boolean;
}) {
  const darkText = "text-[#15242F] lg:group-hover:text-white";
  return (
    <div
      className={
        "group relative overflow-hidden rounded-2xl p-5 transition-shadow duration-300 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] lg:group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),inset_0_0_80px_rgba(0,0,0,1)] bg-white"
      }
    >
      {/* bg image (faint) + solid-reading dark wash — fills the whole card on hover */}
      <div
        className={
          "absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none opacity-0 lg:group-hover:opacity-100"
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.img}
          alt=""
          aria-hidden="true"
          loading="lazy"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(15,24,32,0.85)" }} />
      </div>

      <div className="relative z-[1] flex items-start justify-between gap-3">
        <span
          className="font-heading font-extrabold leading-none text-[30px] tracking-[-.02em] transition-colors duration-300 text-[#15242F] lg:group-hover:text-gold"
        >
          {s.no}
        </span>
        <span
          className={
            "inline-flex items-center justify-center w-[38px] h-[38px] rounded-full shrink-0 transition-colors duration-300 text-gold border border-gold/55 lg:group-hover:bg-gray-800 lg:group-hover:border-white/25 lg:group-hover:text-white"
          }
        >
          {s.icon}
        </span>
      </div>

      <h3
        className={`relative z-[1] m-0 mt-7 font-heading font-bold leading-[1.15] text-[19px] tracking-[-.01em] transition-colors duration-300 ${darkText}`}
      >
        {s.title}
      </h3>

      <div
        className={
          "relative z-[1] " +
          (alwaysDesc
            ? ""
            : "overflow-hidden transition-all duration-300 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-[150px] lg:group-hover:opacity-100")
        }
      >
        <p
          className={
            "m-0 mt-3 text-[13px] leading-[1.55] font-semibold text-[#555555] transition-colors duration-300 lg:group-hover:text-white"
          }
        >
          {s.desc}
        </p>
      </div>
    </div>
  );
}

/* ---------- step icons ---------- */
function IconClipboard() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}
function IconPen() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}
function IconCode() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}
function IconRocket() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 8-10c1.5.5 3.5 2.5 4 4a22 22 0 0 1-10 8z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
function IconWrench() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
