// ============================================================
// Rich-text helpers for blog posts (body is HTML from the admin editor).
// - sanitizeHtml: strips anything unsafe (scripts, event handlers, etc.)
//   so admin-authored HTML can be rendered without XSS risk.
// - htmlToText: plain-text version for meta descriptions / excerpts.
// ============================================================
import "server-only";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "b", "em", "i", "s", "u", "mark", "sub", "sup",
  "ul", "ol", "li", "blockquote", "pre", "code",
  "a", "img", "figure", "figcaption", "span", "div",
  "table", "thead", "tbody", "tr", "th", "td",
];

const ALLOWED_ATTR = ["href", "src", "alt", "title", "target", "rel", "class", "colspan", "rowspan"];

/** Sanitize admin-authored HTML into a safe subset. */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Only allow http(s), mailto, tel and same-origin/anchor links.
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[/#])/i,
    ADD_ATTR: ["target"],
  });
}

/** Plain text from HTML, collapsed and trimmed to `max` chars (for meta). */
export function htmlToText(html: string, max = 160): string {
  const text = (html ?? "")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;
}
