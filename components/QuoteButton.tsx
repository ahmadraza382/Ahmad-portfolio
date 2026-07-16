"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * QuoteButton — gold pill CTA with a dark circular arrow badge on the right.
 * Reusable across the site (footer, hero, contact, etc.).
 *
 * Renders as:
 *  - a Next.js <Link> when `href` is an internal path ("/...", "#...")
 *  - a plain <a> when `href` is external / mailto
 *  - a <button> when `onClick` is given and no `href`
 *
 * Colors come from the footer palette CSS variables (--ft-*), so it stays
 * consistent with the footer and easy to retheme.
 */
export default function QuoteButton({
  children = "Let's work together",
  href,
  onClick,
  className = "",
}: {
  children?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) {
  const [hover, setHover] = useState(false);

  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      {/* white circular arrow badge */}
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center rounded-full shrink-0"
        style={{
          width: 40,
          height: 40,
          background: "var(--ft-white)",
          color: "var(--ft-gold)",
          transform: hover ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* arrow pointing up-right — larger */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </span>
    </>
  );

  const commonProps = {
    "data-cursor": "cta",
    "data-magnetic": "",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    className:
      "group inline-flex items-center gap-3 rounded-full font-normal no-underline cursor-pointer select-none " +
      className,
    style: {
      background: "var(--ft-gold)",
      color: "var(--ft-white)",
      padding: "8px 8px 8px 24px",
      fontSize: 15,
      border: "none",
      boxShadow: hover
        ? "0 10px 26px color-mix(in srgb, var(--ft-gold) 45%, transparent)"
        : "0 4px 14px color-mix(in srgb, var(--ft-gold) 22%, transparent)",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      transition: "transform 0.28s ease, box-shadow 0.28s ease, filter 0.28s ease",
      filter: hover ? "brightness(1.04)" : "none",
    } as React.CSSProperties,
  };

  // internal link → Next Link
  if (href && (href.startsWith("/") || href.startsWith("#"))) {
    return (
      <Link href={href} {...commonProps}>
        {content}
      </Link>
    );
  }
  // external / mailto → plain anchor
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...commonProps}
      >
        {content}
      </a>
    );
  }
  // no href → button
  return (
    <button type="button" onClick={onClick} {...commonProps}>
      {content}
    </button>
  );
}
