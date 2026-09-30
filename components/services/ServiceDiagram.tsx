// Per-service hero diagram — inline SVG, no image files.
// Each one shows the actual shape of the work (a request path, a shared
// codebase, a retrieval loop…) rather than being decoration. Drawn in the
// site's gold/white-on-charcoal palette and sized to the hero column.
//
// All strokes use currentColor or the gold token, so nothing new is
// introduced into the palette.

const GOLD = "var(--ft-gold)";
const LINE = "rgba(255,255,255,0.26)";
const FAINT = "rgba(255,255,255,0.13)";
const LABEL = "rgba(255,255,255,0.62)";

/** Shared chrome: a rounded node box with a label. */
function Node({
  x,
  y,
  w = 116,
  h = 40,
  label,
  accent = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={accent ? "rgba(200,164,80,0.12)" : "rgba(255,255,255,0.04)"}
        stroke={accent ? GOLD : LINE}
        strokeWidth={accent ? 1.4 : 1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="600"
        fill={accent ? GOLD : "rgba(255,255,255,0.86)"}
        fontFamily="var(--font-inter), system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

function Caption({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      fontSize="10"
      letterSpacing="1.6"
      fill={LABEL}
      fontFamily="var(--font-jetbrains), monospace"
    >
      {children}
    </text>
  );
}

/** Animated dash that travels a path — subtle, respects reduced motion via CSS. */
function Flow({ d, dur = "3s", delay = "0s" }: { d: string; dur?: string; delay?: string }) {
  return (
    <>
      <path d={d} stroke={LINE} strokeWidth="1.2" fill="none" />
      <path
        d={d}
        stroke={GOLD}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="14 150"
        opacity="0.9"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="164"
          to="0"
          dur={dur}
          begin={delay}
          repeatCount="indefinite"
        />
      </path>
    </>
  );
}

/* ============================================================
   Web development — browser → edge render → data, the request path
   ============================================================ */
function WebDiagram() {
  return (
    <svg viewBox="0 0 420 300" className="w-full h-auto" role="img" aria-label="Diagram: a browser request served by server-rendered pages backed by a database and APIs">
      <Caption x={12} y={20}>REQUEST PATH</Caption>

      {/* browser frame */}
      <rect x={12} y={38} width={150} height={96} rx={10} fill="rgba(255,255,255,0.04)" stroke={LINE} />
      <path d="M12 60 H162" stroke={LINE} strokeWidth="1" />
      <circle cx={26} cy={49} r={3} fill={GOLD} opacity="0.7" />
      <circle cx={37} cy={49} r={3} fill={FAINT} />
      <circle cx={48} cy={49} r={3} fill={FAINT} />
      <rect x={26} y={74} width={98} height={7} rx={3.5} fill="rgba(255,255,255,0.2)" />
      <rect x={26} y={89} width={122} height={7} rx={3.5} fill="rgba(255,255,255,0.12)" />
      <rect x={26} y={104} width={64} height={7} rx={3.5} fill={GOLD} opacity="0.55" />

      <Flow d="M162 86 H236" />
      <Node x={236} y={66} w={150} h={40} label="Server render" accent />

      <Flow d="M311 106 V150" delay="0.5s" />
      <Node x={236} y={150} w={150} h={38} label="Database" />

      <Flow d="M311 188 V228" delay="1s" />
      <Node x={236} y={228} w={150} h={38} label="APIs & payments" />

      {/* indexable note */}
      <g>
        <path d="M86 134 V196" stroke={FAINT} strokeWidth="1" strokeDasharray="3 4" />
        <circle cx={86} cy={206} r={13} fill="rgba(200,164,80,0.12)" stroke={GOLD} strokeWidth="1.2" />
        <path d="M80 206 l4 4 8 -8" stroke={GOLD} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x={86} y={238} textAnchor="middle" fontSize="10.5" fill={LABEL} fontFamily="var(--font-inter), system-ui, sans-serif">
          Indexable HTML
        </text>
        <text x={86} y={252} textAnchor="middle" fontSize="10.5" fill={LABEL} fontFamily="var(--font-inter), system-ui, sans-serif">
          on first load
        </text>
      </g>
    </svg>
  );
}

/* ============================================================
   Mobile — one codebase branching to two stores
   ============================================================ */
function MobileDiagram() {
  return (
    <svg viewBox="0 0 420 300" className="w-full h-auto" role="img" aria-label="Diagram: one React Native codebase building to both the App Store and Google Play, sharing one backend">
      <Caption x={12} y={20}>ONE CODEBASE</Caption>

      <Node x={132} y={36} w={156} h={42} label="React Native" accent />

      {/* branch */}
      <Flow d="M210 78 V100 H84 V124" />
      <Flow d="M210 78 V100 H336 V124" delay="0.4s" />

      {/* two phones */}
      {[
        { x: 44, label: "iOS" },
        { x: 296, label: "Android" },
      ].map((p) => (
        <g key={p.label}>
          <rect x={p.x} y={124} width={80} height={116} rx={12} fill="rgba(255,255,255,0.04)" stroke={LINE} />
          <rect x={p.x + 26} y={131} width={28} height={4} rx={2} fill={FAINT} />
          <rect x={p.x + 12} y={147} width={56} height={6} rx={3} fill="rgba(255,255,255,0.18)" />
          <rect x={p.x + 12} y={161} width={40} height={6} rx={3} fill="rgba(255,255,255,0.12)" />
          <rect x={p.x + 12} y={178} width={56} height={26} rx={6} fill="rgba(200,164,80,0.14)" stroke={GOLD} strokeWidth="1" />
          <rect x={p.x + 12} y={212} width={34} height={6} rx={3} fill="rgba(255,255,255,0.12)" />
          <text x={p.x + 40} y={260} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="rgba(255,255,255,0.86)" fontFamily="var(--font-inter), system-ui, sans-serif">
            {p.label}
          </text>
        </g>
      ))}

      {/* shared backend */}
      <path d="M84 272 H336" stroke={FAINT} strokeWidth="1" strokeDasharray="3 4" />
      <text x={210} y={290} textAnchor="middle" fontSize="10.5" fill={LABEL} fontFamily="var(--font-inter), system-ui, sans-serif">
        One shared backend
      </text>
    </svg>
  );
}

/* ============================================================
   AI — retrieval loop grounded in your own data
   ============================================================ */
function AiDiagram() {
  return (
    <svg viewBox="0 0 420 300" className="w-full h-auto" role="img" aria-label="Diagram: a question retrieves context from your documents before the model answers, with a human review step">
      <Caption x={12} y={20}>GROUNDED ANSWERS</Caption>

      <Node x={12} y={40} w={116} h={38} label="Question" />
      <Flow d="M128 59 H176" />

      {/* retrieval */}
      <Node x={176} y={40} w={128} h={38} label="Retrieve" accent />
      <Flow d="M240 78 V112" delay="0.4s" />

      {/* your docs */}
      <g>
        <rect x={176} y={112} width={128} height={44} rx={9} fill="rgba(255,255,255,0.04)" stroke={LINE} />
        <path d="M194 126 h30 M194 134 h44 M194 142 h22" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
        <text x={268} y={138} textAnchor="middle" fontSize="10.5" fill={LABEL} fontFamily="var(--font-inter), system-ui, sans-serif">
          your docs
        </text>
      </g>

      <Flow d="M304 134 H348 V78" delay="0.8s" />
      <Node x={304} y={40} w={104} h={38} label="Model" />

      {/* answer + guardrail */}
      <Flow d="M356 156 V186" delay="1.2s" />
      <Node x={284} y={186} w={124} h={38} label="Answer" accent />

      {/* human review */}
      <path d="M284 205 H188" stroke={FAINT} strokeWidth="1" strokeDasharray="3 4" />
      <g>
        <circle cx={168} cy={205} r={17} fill="rgba(255,255,255,0.04)" stroke={LINE} />
        <circle cx={168} cy={200} r={5} fill="none" stroke={GOLD} strokeWidth="1.5" />
        <path d="M159 214 a9 9 0 0 1 18 0" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <text x={168} y={244} textAnchor="middle" fontSize="10.5" fill={LABEL} fontFamily="var(--font-inter), system-ui, sans-serif">
        Human review
      </text>
      <text x={168} y={258} textAnchor="middle" fontSize="10.5" fill={LABEL} fontFamily="var(--font-inter), system-ui, sans-serif">
        where it counts
      </text>
    </svg>
  );
}

/* ============================================================
   Custom software — roles converging on one system
   ============================================================ */
function CustomDiagram() {
  return (
    <svg viewBox="0 0 420 300" className="w-full h-auto" role="img" aria-label="Diagram: several user roles with different permissions working on one system with a single database and reporting">
      <Caption x={12} y={20}>ROLE-BASED SYSTEM</Caption>

      {/* roles */}
      {["Admin", "Staff", "Manager"].map((r, i) => (
        <g key={r}>
          <Node x={12} y={40 + i * 54} w={104} h={40} label={r} />
          <Flow d={`M116 ${60 + i * 54} H168 V${131} `} delay={`${i * 0.35}s`} />
        </g>
      ))}

      {/* permission gate */}
      <g>
        <rect x={168} y={112} width={86} height={40} rx={10} fill="rgba(200,164,80,0.12)" stroke={GOLD} strokeWidth="1.4" />
        <path d="M204 126 v-4 a7 7 0 0 1 14 0 v4" fill="none" stroke={GOLD} strokeWidth="1.5" />
        <rect x={200} y={126} width={22} height={16} rx={3} fill="none" stroke={GOLD} strokeWidth="1.5" />
        <text x={185} y={137} textAnchor="middle" fontSize="10" fill={GOLD} fontFamily="var(--font-jetbrains), monospace">
          ACL
        </text>
      </g>

      <Flow d="M254 132 H300" delay="0.6s" />
      <Node x={300} y={112} w={108} h={40} label="One system" accent />

      {/* database */}
      <Flow d="M354 152 V186" delay="1s" />
      <g>
        <ellipse cx={354} cy={196} rx={40} ry={11} fill="rgba(255,255,255,0.05)" stroke={LINE} />
        <path d="M314 196 v30 c0 6 18 11 40 11 s40 -5 40 -11 v-30" fill="rgba(255,255,255,0.03)" stroke={LINE} />
        <path d="M314 212 c0 6 18 11 40 11 s40 -5 40 -11" fill="none" stroke={FAINT} />
        <text x={354} y={258} textAnchor="middle" fontSize="10.5" fill={LABEL} fontFamily="var(--font-inter), system-ui, sans-serif">
          One source of truth
        </text>
      </g>

      {/* exports */}
      <g>
        <path d="M300 132 H120 V206" stroke={FAINT} strokeWidth="1" strokeDasharray="3 4" fill="none" />
        {["PDF", "XLS", "CSV"].map((f, i) => (
          <g key={f}>
            <rect x={78 + i * 30} y={212} width={26} height={30} rx={4} fill="rgba(255,255,255,0.04)" stroke={LINE} />
            <text x={91 + i * 30} y={231} textAnchor="middle" fontSize="8" fill={LABEL} fontFamily="var(--font-jetbrains), monospace">
              {f}
            </text>
          </g>
        ))}
        <text x={120} y={258} textAnchor="middle" fontSize="10.5" fill={LABEL} fontFamily="var(--font-inter), system-ui, sans-serif">
          Reports
        </text>
      </g>
    </svg>
  );
}

/* ============================================================
   SEO — the layers, foundation first
   ============================================================ */
function SeoDiagram() {
  return (
    <svg viewBox="0 0 420 300" className="w-full h-auto" role="img" aria-label="Diagram: SEO as layers with technical foundations at the base supporting on-page work and content">
      <Caption x={12} y={20}>FOUNDATIONS FIRST</Caption>

      {/* rising bars behind */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={300 + i * 28}
          y={214 - i * 34}
          width={18}
          height={34 + i * 34}
          rx={4}
          fill={i === 3 ? "rgba(200,164,80,0.3)" : "rgba(255,255,255,0.07)"}
          stroke={i === 3 ? GOLD : FAINT}
          strokeWidth={i === 3 ? 1.2 : 1}
        />
      ))}
      <path d="M300 210 L406 112" stroke={GOLD} strokeWidth="1.6" strokeDasharray="5 5" opacity="0.7" fill="none" />

      {/* layer stack */}
      {[
        { y: 56, label: "Content", w: 148, accent: false },
        { y: 110, label: "On-page", w: 190, accent: false },
        { y: 164, label: "Technical SEO", w: 232, accent: true },
      ].map((l) => (
        <g key={l.label}>
          <rect
            x={12}
            y={l.y}
            width={l.w}
            height={42}
            rx={9}
            fill={l.accent ? "rgba(200,164,80,0.14)" : "rgba(255,255,255,0.04)"}
            stroke={l.accent ? GOLD : LINE}
            strokeWidth={l.accent ? 1.4 : 1}
          />
          <text
            x={12 + l.w / 2}
            y={l.y + 26}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="600"
            fill={l.accent ? GOLD : "rgba(255,255,255,0.86)"}
            fontFamily="var(--font-inter), system-ui, sans-serif"
          >
            {l.label}
          </text>
        </g>
      ))}

      {/* base rule */}
      <path d="M12 222 H244" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
      <text x={12} y={246} fontSize="10.5" fill={LABEL} fontFamily="var(--font-inter), system-ui, sans-serif">
        Crawlable · fast · structured
      </text>
      <text x={12} y={266} fontSize="10.5" fill={LABEL} fontFamily="var(--font-inter), system-ui, sans-serif">
        Fix the base before the content
      </text>
    </svg>
  );
}

/* ============================================================
   UI/UX — every state designed, not just the happy path
   ============================================================ */
function UxDiagram() {
  return (
    <svg viewBox="0 0 420 300" className="w-full h-auto" role="img" aria-label="Diagram: an interface designed across all of its states — default, loading, empty and error">
      <Caption x={12} y={20}>EVERY STATE DESIGNED</Caption>

      {[
        { x: 12, y: 38, label: "Default", accent: true },
        { x: 216, y: 38, label: "Loading", accent: false },
        { x: 12, y: 164, label: "Empty", accent: false },
        { x: 216, y: 164, label: "Error", accent: false },
      ].map((s) => (
        <g key={s.label}>
          <rect
            x={s.x}
            y={s.y}
            width={192}
            height={104}
            rx={11}
            fill="rgba(255,255,255,0.035)"
            stroke={s.accent ? GOLD : LINE}
            strokeWidth={s.accent ? 1.4 : 1}
          />
          {/* header bar */}
          <rect x={s.x + 14} y={s.y + 14} width={50} height={6} rx={3} fill={s.accent ? GOLD : "rgba(255,255,255,0.22)"} opacity={s.accent ? 0.8 : 1} />

          {s.label === "Default" && (
            <>
              <rect x={s.x + 14} y={s.y + 34} width={164} height={7} rx={3.5} fill="rgba(255,255,255,0.16)" />
              <rect x={s.x + 14} y={s.y + 48} width={132} height={7} rx={3.5} fill="rgba(255,255,255,0.12)" />
              <rect x={s.x + 14} y={s.y + 70} width={62} height={20} rx={6} fill="rgba(200,164,80,0.28)" stroke={GOLD} strokeWidth="1" />
            </>
          )}
          {s.label === "Loading" && (
            <>
              {[0, 1, 2].map((r) => (
                <rect key={r} x={s.x + 14} y={s.y + 34 + r * 16} width={164 - r * 34} height={7} rx={3.5} fill="rgba(255,255,255,0.1)">
                  <animate attributeName="opacity" values="0.35;0.12;0.35" dur="1.6s" begin={`${r * 0.2}s`} repeatCount="indefinite" />
                </rect>
              ))}
            </>
          )}
          {s.label === "Empty" && (
            <>
              <rect x={s.x + 68} y={s.y + 34} width={56} height={34} rx={6} fill="none" stroke={FAINT} strokeDasharray="4 4" />
              <rect x={s.x + 60} y={s.y + 78} width={72} height={6} rx={3} fill="rgba(255,255,255,0.12)" />
            </>
          )}
          {s.label === "Error" && (
            <>
              <circle cx={s.x + 96} cy={s.y + 50} r={15} fill="none" stroke={GOLD} strokeWidth="1.4" />
              <path d={`M${s.x + 96} ${s.y + 42} v10 M${s.x + 96} ${s.y + 57} v1`} stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
              <rect x={s.x + 60} y={s.y + 78} width={72} height={6} rx={3} fill="rgba(255,255,255,0.12)" />
            </>
          )}

          <text
            x={s.x + 96}
            y={s.y + 124}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={s.accent ? GOLD : LABEL}
            fontFamily="var(--font-inter), system-ui, sans-serif"
          >
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   Services index — the six services as one connected practice
   ============================================================ */
function OverviewDiagram() {
  // Six nodes on a ring around a central hub, drawn from one radius so the
  // layout stays exact at any viewBox scale.
  const cx = 210;
  const cy = 150;
  const r = 104;
  const items = [
    "Web",
    "Mobile",
    "AI",
    "Software",
    "SEO",
    "UI/UX",
  ];

  return (
    <svg
      viewBox="0 0 420 300"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: six services — web, mobile, AI, custom software, SEO and UI/UX — connected to one engineer"
    >
      <Caption x={12} y={20}>ONE ENGINEER · SIX SERVICES</Caption>

      {/* orbit ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={FAINT} strokeWidth="1" strokeDasharray="4 6" />

      {/* spokes + nodes */}
      {items.map((label, i) => {
        // start at the top and go clockwise
        const a = (Math.PI * 2 * i) / items.length - Math.PI / 2;
        const nx = cx + Math.cos(a) * r;
        const ny = cy + Math.sin(a) * r;
        // stop the spoke short of the hub and the node
        const sx = cx + Math.cos(a) * 42;
        const sy = cy + Math.sin(a) * 42;
        const ex = cx + Math.cos(a) * (r - 26);
        const ey = cy + Math.sin(a) * (r - 26);
        return (
          <g key={label}>
            <path d={`M${sx} ${sy} L${ex} ${ey}`} stroke={LINE} strokeWidth="1.1" />
            <circle cx={nx} cy={ny} r={25} fill="rgba(255,255,255,0.05)" stroke={LINE} strokeWidth="1" />
            <circle cx={nx} cy={ny} r={25} fill="none" stroke={GOLD} strokeWidth="1.4" strokeDasharray="157" strokeDashoffset="157" opacity="0.85">
              <animate
                attributeName="stroke-dashoffset"
                from="157"
                to="0"
                dur="1.1s"
                begin={`${i * 0.14}s`}
                fill="freeze"
              />
            </circle>
            <text
              x={nx}
              y={ny + 4}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="600"
              fill="rgba(255,255,255,0.88)"
              fontFamily="var(--font-inter), system-ui, sans-serif"
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* hub */}
      <circle cx={cx} cy={cy} r={38} fill="rgba(200,164,80,0.13)" stroke={GOLD} strokeWidth="1.5" />
      <text
        x={cx}
        y={cy - 2}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={GOLD}
        fontFamily="var(--font-inter), system-ui, sans-serif"
      >
        Ahmad
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fontSize="9.5"
        fill="rgba(255,255,255,0.6)"
        fontFamily="var(--font-jetbrains), monospace"
      >
        end to end
      </text>
    </svg>
  );
}

const DIAGRAMS: Record<string, () => JSX.Element> = {
  overview: OverviewDiagram,
  "web-development": WebDiagram,
  "mobile-app-development": MobileDiagram,
  "ai-solutions": AiDiagram,
  "custom-software-development": CustomDiagram,
  seo: SeoDiagram,
  "ui-ux-design": UxDiagram,
};

export default function ServiceDiagram({ slug }: { slug: string }) {
  const Diagram = DIAGRAMS[slug];
  if (!Diagram) return null;
  return <Diagram />;
}
