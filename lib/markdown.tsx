// ============================================================
// Tiny, dependency-free, XSS-safe Markdown renderer (server-side).
// Escapes ALL HTML first, then applies a fixed subset of Markdown:
//   # ## ### headings, **bold**, *italic*, `code`, [links](url),
//   > blockquotes, - / 1. lists, ``` fenced code, --- rules, paragraphs.
// Returns React elements (real <h2>/<h3> etc.) — good for SEO, no raw HTML.
// ============================================================
import React from "react";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Inline formatting on an already-escaped string → React nodes. */
function inline(escaped: string, keyBase: string): React.ReactNode[] {
  // Order matters: code first (so its contents aren't further parsed), then links, bold, italic.
  const tokens: React.ReactNode[] = [];
  let rest = escaped;
  let i = 0;

  const pattern =
    /(`[^`]+`)|(\[[^\]]+\]\((?:https?:\/\/|\/|mailto:|#)[^)\s]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/;

  while (rest.length) {
    const m = rest.match(pattern);
    if (!m || m.index === undefined) {
      tokens.push(rest);
      break;
    }
    if (m.index > 0) tokens.push(rest.slice(0, m.index));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;

    if (tok.startsWith("`")) {
      tokens.push(
        <code
          key={key}
          className="font-mono text-[.9em] px-[6px] py-[2px] rounded-[6px] bg-soft border border-border"
        >
          {tok.slice(1, -1)}
        </code>
      );
    } else if (tok.startsWith("[")) {
      const linkMatch = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const external = /^https?:\/\//.test(href);
        tokens.push(
          <a
            key={key}
            href={href}
            data-cursor="link"
            className="text-accent underline underline-offset-2 decoration-1 hover:opacity-80"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>
        );
      } else {
        tokens.push(tok);
      }
    } else if (tok.startsWith("**")) {
      tokens.push(
        <strong key={key} className="font-semibold text-text">
          {tok.slice(2, -2)}
        </strong>
      );
    } else if (tok.startsWith("*")) {
      tokens.push(
        <em key={key} className="italic">
          {tok.slice(1, -1)}
        </em>
      );
    }
    rest = rest.slice(m.index + tok.length);
  }
  return tokens;
}

/**
 * Render trusted-but-user-authored Markdown to safe React elements.
 * All HTML is escaped, so authored `<script>` etc. can never execute.
 */
export function Markdown({ source }: { source: string }): React.ReactElement {
  const lines = (source ?? "").replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];

  let i = 0;
  let key = 0;
  const para = "text-text-2 leading-[1.75] text-[clamp(16px,1.5vw,19px)] m-0";

  while (i < lines.length) {
    const line = lines[i];

    // Blank line → skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Fenced code block ```
    if (line.trim().startsWith("```")) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      i++; // consume closing fence
      blocks.push(
        <pre
          key={key++}
          className="overflow-x-auto rounded-[12px] border border-border bg-soft p-4 text-[13.5px] leading-[1.6] font-mono"
        >
          <code>{buf.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push(<hr key={key++} className="my-8 border-0 border-t border-border" />);
      i++;
      continue;
    }

    // Headings
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const content = inline(escapeHtml(h[2].trim()), `h${key}`);
      const cls =
        level === 1
          ? "font-serif font-normal text-[clamp(30px,4vw,44px)] tracking-[-.02em] mt-10 mb-4"
          : level === 2
          ? "font-serif font-normal text-[clamp(24px,3vw,32px)] tracking-[-.01em] mt-9 mb-3"
          : "font-serif font-normal text-[clamp(20px,2.4vw,25px)] mt-7 mb-2";
      const Tag = (`h${Math.min(level + 1, 6)}` as unknown) as keyof React.JSX.IntrinsicElements;
      blocks.push(
        <Tag key={key++} className={cls}>
          {content}
        </Tag>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.trimStart().startsWith(">")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith(">")) {
        buf.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote
          key={key++}
          className="border-l-[3px] border-accent pl-5 my-6 font-serif italic text-[clamp(18px,2vw,23px)] leading-[1.5] text-text"
        >
          {inline(escapeHtml(buf.join(" ")), `q${key}`)}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-5 pl-5 flex flex-col gap-2 list-disc marker:text-accent">
          {items.map((it, idx) => (
            <li key={idx} className={para}>
              {inline(escapeHtml(it), `ul${key}-${idx}`)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="my-5 pl-5 flex flex-col gap-2 list-decimal marker:text-accent marker:font-mono">
          {items.map((it, idx) => (
            <li key={idx} className={para}>
              {inline(escapeHtml(it), `ol${key}-${idx}`)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph — gather consecutive non-blank, non-special lines
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,4})\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trimStart().startsWith(">") &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^(-{3,}|\*{3,})$/.test(lines[i].trim())
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className={para}>
        {inline(escapeHtml(buf.join(" ")), `p${key}`)}
      </p>
    );
  }

  return <div className="flex flex-col">{blocks}</div>;
}

/** Plain-text excerpt of Markdown (for meta descriptions), trimmed to `max` chars. */
export function stripMarkdown(source: string, max = 160): string {
  const text = (source ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*`_-]/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;
}
