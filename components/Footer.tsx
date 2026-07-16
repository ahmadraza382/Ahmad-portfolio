"use client";

import { useState } from "react";
import Link from "next/link";
import QuoteButton from "./QuoteButton";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/site";

// TODO(placeholder): swap this for the final branded background image.
// CSS background-image (not next/image) so it needs no remotePatterns config
// and stays easy to replace later — just change this URL.
const BG_IMAGE =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=60";

const quickLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Selected Work", href: "/work" },
  { label: "The Blog", href: "/blog" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden rounded-t-[clamp(24px,4vw,44px)]"
      style={{ color: "var(--ft-white)" }}
    >
      {/* dark base */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--ft-dark)" }} />
      {/* background image — reference-style depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.28]"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      {/* dark → light gradient wash over the image */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(21,36,47,0.86) 0%, rgba(36,66,74,0.68) 48%, rgba(21,36,47,0.94) 100%)",
        }}
      />

      <div className="relative z-[2] max-w-content mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(56px,8vh,96px)]">
        {/* ===== columns ===== */}
        <div className="grid gap-[clamp(36px,5vw,64px)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* CTA */}
          <div data-reveal="">
            <h3
              className="font-heading font-semibold leading-[1.1] text-[clamp(26px,2.6vw,34px)] m-0"
            >
              Do You Like
              <br />
              <span style={{ color: "var(--ft-gold)" }}>What You See?</span>
            </h3>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.72)" }}>
              I help founders and businesses ship websites and apps that work
              24/7 as sales tools — clean, scalable, and easy to manage.
            </p>
            <div className="mt-7">
              <QuoteButton href="/#contact">Let&apos;s work together</QuoteButton>
            </div>
          </div>

          {/* Quick Links */}
          <nav data-reveal="" aria-label="Quick links">
            <h4
              className="font-heading font-bold text-[19px] m-0 mb-6"
            >
              Quick Links
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-[14px]">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navigation */}
          <nav data-reveal="" aria-label="Navigation">
            <h4
              className="font-heading font-bold text-[19px] m-0 mb-6"
            >
              Navigation
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-[14px]">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div data-reveal="">
            <h4
              className="font-heading font-bold text-[19px] m-0 mb-6"
            >
              Connect Me
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-[15px] text-[15px]" style={{ color: "rgba(255,255,255,0.78)" }}>
              <li className="flex items-center gap-[11px]">
                <span style={{ color: "var(--ft-gold)" }}><IconMail /></span>
                <EmailLink />
              </li>
              <li className="flex items-start gap-[11px]">
                <span className="mt-[3px]" style={{ color: "var(--ft-gold)" }}><IconPin /></span>
                <span className="leading-[1.5]" style={{ color: "rgba(255,255,255,0.78)" }}>
                  Faisalabad, Punjab
                  <br />
                  Pakistan · Remote worldwide
                </span>
              </li>
            </ul>

            <div className="flex gap-[11px] mt-7">
              <Social href={GITHUB_URL} label="GitHub"><IconGitHub /></Social>
              <Social href={LINKEDIN_URL} label="LinkedIn"><IconLinkedIn /></Social>
              <Social href={`mailto:${CONTACT_EMAIL}`} label="Email"><IconMail /></Social>
            </div>
          </div>
        </div>

        {/* ===== giant wordmark ===== */}
        <div
          aria-hidden="true"
          className="font-heading mt-[clamp(40px,6vh,72px)] select-none pointer-events-none leading-[0.82] font-black tracking-[-.03em] text-center whitespace-nowrap overflow-hidden"
          style={{
            // Sized off the container so the 5 letters always fit within the
            // max-w-content column, minus its horizontal padding.
            fontSize: "clamp(72px,18vw,232px)",
            backgroundImage:
              "linear-gradient(180deg, #ffffff 32%, rgba(255,255,255,0.28) 82%, rgba(255,255,255,0.04) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          AHMAD
        </div>

        {/* ===== bottom bar ===== */}
        <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <span className="text-[13px]" style={{ color: "var(--ft-gray)" }}>
            © 2026 Ahmad Raza — Full-Stack Developer
          </span>
          <span className="text-[13px]" style={{ color: "var(--ft-gray)" }}>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- footer link: gold text + gold underline + arrow on hover ---------- */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      data-cursor="link"
      className="inline-flex items-center gap-[7px] text-[15px] no-underline w-fit"
      style={{ color: hover ? "var(--ft-gold)" : "rgba(255,255,255,0.72)" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative pb-[3px]">
        {children}
        {/* underline: grows from left on hover */}
        <span
          aria-hidden="true"
          className="absolute left-0 bottom-0 h-px w-full origin-left"
          style={{
            background: "var(--ft-gold)",
            transform: hover ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.28s ease",
          }}
        />
      </span>
      {/* arrow: slides in on hover */}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          transform: hover ? "translateX(0)" : "translateX(-6px)",
          opacity: hover ? 1 : 0,
          transition: "transform 0.28s ease, opacity 0.28s ease",
        }}
      >
        →
      </span>
    </Link>
  );
}

/* ---------- email link: gold text + underline on hover ---------- */
function EmailLink() {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      data-cursor="link"
      className="relative break-all no-underline w-fit pb-[2px]"
      style={{ color: hover ? "var(--ft-gold)" : "rgba(255,255,255,0.78)" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {CONTACT_EMAIL}
      <span
        aria-hidden="true"
        className="absolute left-0 bottom-0 h-px w-full origin-left"
        style={{
          background: "var(--ft-gold)",
          transform: hover ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.28s ease",
        }}
      />
    </a>
  );
}

/* ---------- social pill: gold circle that rotates + zooms on hover ---------- */
function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      data-cursor="link"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-full"
      style={{
        background: "var(--ft-gold)",
        color: "var(--ft-dark)",
        transform: hover ? "rotate(360deg) scale(1.18)" : "rotate(0deg) scale(1)",
        transition: "transform 0.5s cubic-bezier(.4,0,.2,1), filter 0.3s ease",
        filter: hover ? "brightness(1.08)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  );
}

/* ---------- inline icons (no extra deps) ---------- */
function IconMail() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7 10-7" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.65h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9V9Z" />
    </svg>
  );
}
