"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FILTERS, type Project } from "@/lib/data";

export default function WorkGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);

  const list =
    filter === "All" ? projects : projects.filter((p) => p.filters.includes(filter));

  // The site-wide reveal animation (data-reveal → data-show) is only wired up
  // on route change, so cards remounted by a filter switch would stay at
  // opacity 0 forever. Once the user filters, show new cards immediately.
  useEffect(() => {
    if (!interacted.current) return;
    gridRef.current
      ?.querySelectorAll("[data-reveal]:not([data-show])")
      .forEach((el) => el.setAttribute("data-show", ""));
  }, [filter]);

  const pickFilter = (f: string) => {
    interacted.current = true;
    setFilter(f);
  };

  return (
    <section className="max-w-content mx-auto pt-[140px] px-[clamp(20px,5vw,64px)] pb-[90px]">
      <div data-reveal="" className="mb-[48px]">
        <div className="flex items-center gap-[14px] mb-5">
          <Link href="/" data-cursor="link" className="font-mono text-[13px] text-text-2 no-underline">
            ← Home
          </Link>
          <span className="font-mono text-[13px] text-text-2">/ work</span>
        </div>
        <h1 className="font-serif font-normal leading-[.98] tracking-[-.02em] m-0 text-[clamp(44px,8vw,108px)]">
          Selected <span className="italic text-accent">work</span>
        </h1>
        <p className="mt-[22px] text-text-2 max-w-[48ch] text-[clamp(16px,1.5vw,20px)]">
          Everything I&apos;ve shipped that I can show publicly. Use the filters to
          narrow things down.
        </p>
      </div>

      <div data-reveal="" className="flex flex-wrap gap-[10px] mb-[44px]">
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => pickFilter(f)}
              data-cursor="link"
              className="py-[10px] px-5 rounded-full font-sans font-semibold text-[14px] cursor-pointer transition-all duration-300"
              style={{
                border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                background: active ? "var(--accent)" : "transparent",
                color: active ? "#fff" : "var(--text)",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {list.length === 0 && (
        <div className="border border-dashed border-border rounded-[16px] px-8 py-16 text-center">
          <p className="text-text-2 text-[16px] m-0">
            Nothing in “{filter}” yet.{" "}
            <button
              onClick={() => pickFilter("All")}
              data-cursor="link"
              className="bg-transparent border-none p-0 font-semibold text-accent text-[16px] cursor-pointer underline underline-offset-4"
            >
              See all work →
            </button>
          </p>
        </div>
      )}

      <div
        ref={gridRef}
        className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-[clamp(20px,3vw,40px)]"
      >
        {list.map((proj) => (
          <div key={proj.slug} data-reveal="" className="group/proj">
            <Link
              href={`/work/${proj.slug}`}
              data-cursor="cta"
              data-magnetic=""
              aria-label={proj.title}
              className="block cursor-pointer"
            >
              <div
                className="proj-card relative rounded-[16px] overflow-hidden border border-border mb-[18px]"
                style={proj.cover ? { background: proj.bg } : { aspectRatio: "16/11", background: proj.bg }}
              >
                {proj.cover ? (
                  <Image
                    key={proj.cover}
                    src={proj.cover}
                    alt={proj.title}
                    width={1600}
                    height={1100}
                    sizes="(min-width: 700px) 33vw, 100vw"
                    className="w-full h-auto block"
                  />
                ) : (
                  <>
                    <span className="absolute top-[14px] left-[14px] font-mono text-[11px] text-text-2 z-[2]">
                      [ {proj.shot} ]
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center font-serif text-accent opacity-20 text-[clamp(70px,10vw,120px)]">
                      {proj.mark}
                    </div>
                  </>
                )}
                <span className="absolute top-[14px] right-4 font-mono text-[12px] bg-bg/80 text-text-2 z-[2] px-2 py-[2px] rounded-[6px]">
                  {proj.year}
                </span>
                <div className="proj-overlay absolute inset-0 bg-accent flex items-center justify-center">
                  <span className="text-white font-semibold text-[16px]">View case study ↗</span>
                </div>
              </div>
            </Link>
            <div className="flex items-baseline gap-3">
              <Link
                href={`/work/${proj.slug}`}
                data-cursor="link"
                className="flex-1 min-w-0 no-underline"
              >
                <h3 className="font-serif font-normal text-[26px] leading-[1.1] tracking-[-.01em] m-0 line-clamp-2 text-text transition-colors duration-200 group-hover/proj:text-accent">
                  {proj.title}
                </h3>
              </Link>
              <span className="flex-1 min-w-0 text-right font-mono text-[11px] text-text-2 uppercase tracking-[.1em]">
                {proj.category}
              </span>
            </div>
            <p className="text-[14px] leading-[1.55] text-text-2 mt-2">{proj.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
