"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FILTERS, type Project } from "@/lib/data";

export default function WorkGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const router = useRouter();

  const list = filter === "All" ? projects : projects.filter((p) => p.filter === filter);

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
              onClick={() => setFilter(f)}
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

      <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-[clamp(20px,3vw,40px)]">
        {list.map((proj) => (
          <div
            key={proj.slug}
            data-reveal=""
            onClick={() => router.push(`/work/${proj.slug}`)}
            data-cursor="cta"
            data-magnetic=""
            className="cursor-pointer"
          >
            <div
              className="group/proj proj-card relative rounded-[16px] overflow-hidden border border-border mb-[18px]"
              style={{ aspectRatio: "16/11", background: proj.bg }}
            >
              {proj.cover ? (
                <Image
                  src={proj.cover}
                  alt={proj.title}
                  fill
                  sizes="(min-width: 700px) 33vw, 100vw"
                  className="object-cover"
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
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif font-normal text-[26px] tracking-[-.01em] m-0">
                {proj.title}
              </h3>
              <span className="font-mono text-[11px] text-text-2 uppercase tracking-[.1em] whitespace-nowrap">
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
