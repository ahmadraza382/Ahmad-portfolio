// Inline stroke icons for the service pages — same style as the icons
// already used in Process.tsx and Footer.tsx (24px grid, 1.8 stroke,
// currentColor) so nothing new is introduced visually or as a dependency.

import type { IconKey } from "@/lib/services-content";

const PATHS: Record<IconKey, React.ReactNode> = {
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5M3 16.5l9 5 9-5" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h3l2.6 12.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
    </>
  ),
  cloud: (
    <>
      <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.3 11.2 3.9 3.9 0 0 0 7 19h10.5Z" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2v6M15 2v6" />
      <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8Z" />
      <path d="M12 17v5" />
    </>
  ),
  gauge: (
    <>
      <path d="M21 12a9 9 0 1 0-18 0" />
      <path d="m14.5 9.5-3.1 3.1" />
      <circle cx="12" cy="13" r="1.2" />
      <path d="M3 12h2M19 12h2M12 3v2" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  store: (
    <>
      <path d="M3 9.5 4.5 4h15L21 9.5" />
      <path d="M3 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 3 0" />
      <path d="M5 11v9h14v-9" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 6-2 7-2 7h16s-2-1-2-7" />
      <path d="M13.7 19a2 2 0 0 1-3.4 0" />
    </>
  ),
  sync: (
    <>
      <path d="M21 12a9 9 0 0 1-14.9 6.8L3 16" />
      <path d="M3 12a9 9 0 0 1 14.9-6.8L21 8" />
      <path d="M21 3v5h-5M3 21v-5h5" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5a3 3 0 0 0-5.7-1.3A2.8 2.8 0 0 0 3.6 8 3 3 0 0 0 4 13.8 3 3 0 0 0 7 19a3 3 0 0 0 5 1.2Z" />
      <path d="M12 5a3 3 0 0 1 5.7-1.3A2.8 2.8 0 0 1 20.4 8a3 3 0 0 1-.4 5.8A3 3 0 0 1 17 19a3 3 0 0 1-5 1.2Z" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5a8 8 0 0 1-11.6 7.1L3.5 20.5l1.9-5.9A8 8 0 1 1 21 11.5Z" />
      <path d="M9 11h.01M12.5 11h.01M16 11h.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.9-3.9" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
      <path d="M6 9v5a2 2 0 0 0 2 2h7" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 15l3.5-4 3 2.5L20 7" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.7v5.6c0 4.6 3.1 8.8 7.5 10.2 4.4-1.4 7.5-5.6 7.5-10.2V5.7L12 2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  desktop: (
    <>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </>
  ),
  link: (
    <>
      <path d="M10 13.5a4 4 0 0 0 5.7.3l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.5 1.5" />
      <path d="M14 10.5a4 4 0 0 0-5.7-.3l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.5-1.5" />
    </>
  ),
  graph: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="8" r="2.5" />
      <circle cx="9" cy="18" r="2.5" />
      <path d="M8.2 7.2 15.8 7M7.4 8.2 8.4 15.5M11.3 17l5.4-6.9" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  pen: (
    <>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z" />
      <path d="m14.5 5.5 3 3" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </>
  ),
  wand: (
    <>
      <path d="m4 20 10-10" />
      <path d="m14.5 3.5 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" />
      <path d="m19 14 .7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6Z" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="7.5" r="1.2" />
      <path d="M8 10.5h8M12 10.5V15M12 15l-2 4M12 15l2 4" />
    </>
  ),
  handoff: (
    <>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
      <path d="m13.5 4-3 16" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6.5L4.8 18A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3L14 9.5V3" />
      <path d="M7.5 15h9" />
    </>
  ),
};

export default function ServiceIcon({
  name,
  size = 20,
}: {
  name: IconKey;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
