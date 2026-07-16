import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

// PWA / installability + mobile browser theming. Icons reuse the in-code
// favicon route (app/icon.tsx).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Ahmad Raza",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfa",
    theme_color: "#356469",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
    ],
  };
}
