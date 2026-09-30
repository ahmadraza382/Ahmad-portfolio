// ============================================================
// Service cards — shared by the home page carousel (components/Services.tsx)
// and the /services grid (components/services/ServiceCardsGrid.tsx), so the
// two never drift apart.
//
// TODO(placeholder): swap these Unsplash images for real service shots.
// `href` points at the matching /services page where one exists; cards
// without one link to the contact section instead.
// ============================================================

export interface ServiceCard {
  tag: string;
  title: string;
  desc: string;
  img: string;
  href?: string;
}

export const SERVICE_CARDS: ServiceCard[] = [
  {
    tag: "Web",
    title: "Custom Websites",
    desc: "Business websites that look premium, load fast and work perfectly on phones. Design included if you need it.",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=560&q=55&fm=webp",
    href: "/services/web-development",
  },
  {
    tag: "Mobile",
    title: "Mobile Apps",
    desc: "Android and iOS apps from one codebase with React Native — native feel, both app stores, easier to maintain.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=560&q=55&fm=webp",
    href: "/services/mobile-app-development",
  },
  {
    tag: "SaaS",
    title: "SaaS Products",
    desc: "Have an idea people would pay monthly for? I build the whole product: accounts, payments, subscriptions, your admin area.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=560&q=55&fm=webp",
    href: "/services/custom-software-development",
  },
  {
    tag: "E-commerce",
    title: "Online Stores & Shopify",
    desc: "Stores that make buying easy — custom builds or Shopify, with payments, shipping and inventory sorted.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=560&q=55&fm=webp",
    href: "/services/web-development",
  },
  {
    tag: "WordPress",
    title: "WordPress",
    desc: "WordPress sites built, fixed or sped up: themes, plugins, performance — or a full modern rebuild.",
    img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=560&q=55&fm=webp",
  },
  {
    tag: "Desktop",
    title: "Desktop Apps",
    desc: "Windows and Mac software for your business: internal tools, dashboards and systems your team runs every day.",
    img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=560&q=55&fm=webp",
    href: "/services/custom-software-development",
  },
  {
    tag: "SEO",
    title: "SEO",
    desc: "Get found on Google. Technical fixes, on-page work and content planning so customers find you first.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=560&q=55&fm=webp",
    href: "/services/seo",
  },
  {
    tag: "Ads",
    title: "Meta Ads",
    desc: "Facebook and Instagram campaigns that bring customers, not just likes: setup, targeting, creatives, reporting.",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=560&q=55&fm=webp",
  },
];
