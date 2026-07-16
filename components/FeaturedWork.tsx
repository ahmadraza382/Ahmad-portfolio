"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import SectionBadge from "./SectionBadge";
import QuoteButton from "./QuoteButton";
import type { Project } from "@/lib/data";

export default function FeaturedWork({ featured }: { featured: Project[] }) {
  const router = useRouter();

  return (
    <section
      id="work"
      className="mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(60px,10vh,140px)]"
    >
      <div
        data-reveal=""
        className="flex items-end justify-between flex-wrap gap-5 mb-[clamp(40px,5vw,72px)]"
      >
        <div>
          <SectionBadge className="mb-5">Selected Work</SectionBadge>
          <h2
            className="font-heading m-0 font-bold leading-[1.05] tracking-[-.02em] text-[clamp(32px,3.6vw,52px)]"
            style={{ color: "var(--ft-dark)" }}
          >
            Things I&apos;ve <span style={{ color: "var(--ft-gold)" }}>Shipped</span>
          </h2>
        </div>
        <QuoteButton href="/work">View all work</QuoteButton>
      </div>

      <div className="flex flex-col gap-[clamp(28px,4vw,56px)]">
        {featured.map((proj, i) => {
          const cols =
            i % 2 === 0
              ? "min-[861px]:grid-cols-[1.18fr_0.82fr]"
              : "min-[861px]:grid-cols-[0.82fr_1.18fr]";
          const mediaOrder = i % 2 === 0 ? "min-[861px]:order-1" : "min-[861px]:order-2";
          const textOrder = i % 2 === 0 ? "min-[861px]:order-2" : "min-[861px]:order-1";

          return (
            <div
              key={proj.slug}
              data-reveal=""
              onClick={() => router.push(`/work/${proj.slug}`)}
              data-cursor="cta"
              className="grid grid-cols-1 gap-6 cursor-pointer items-center"
            >
              <div className={`grid grid-cols-1 ${cols} gap-[clamp(20px,3vw,44px)] items-center`}>
                <div
                  className={`group/proj proj-media relative rounded-[18px] overflow-hidden border ${mediaOrder}`}
                  style={{ aspectRatio: "16/9", background: proj.bg, borderColor: "rgba(21,36,47,0.12)" }}
                >
                  {proj.cover ? (
                    <Image
                      key={proj.cover}
                      src={proj.cover}
                      alt={proj.title}
                      fill
                      sizes="(min-width: 861px) 60vw, 100vw"
                      className="object-contain"
                      priority={i === 0}
                    />
                  ) : (
                    <>
                      <span className="absolute top-4 left-4 text-[11px] tracking-[.08em] z-[2]" style={{ color: "var(--ft-gray)" }}>
                        [ {proj.shot} ]
                      </span>
                      <div
                        className="font-heading absolute inset-0 flex items-center justify-center font-bold opacity-20 text-[clamp(60px,9vw,140px)]"
                        style={{ color: "var(--ft-gold)" }}
                      >
                        {proj.mark}
                      </div>
                    </>
                  )}
                  <div
                    className="proj-overlay absolute inset-0 opacity-0 group-hover/proj:opacity-100 flex items-center justify-center"
                    style={{ background: "rgba(21,36,47,0.88)" }}
                  >
                    <span className="text-white font-semibold text-[17px] inline-flex items-center gap-2">
                      View case study <span className="text-[19px]" style={{ color: "var(--ft-gold)" }}>↗</span>
                    </span>
                  </div>
                </div>

                <div className={textOrder}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[13px] font-bold" style={{ color: "var(--ft-gold)" }}>{proj.no}</span>
                    <span className="text-[12px] uppercase tracking-[.14em] font-semibold" style={{ color: "var(--ft-gray)" }}>
                      {proj.category}
                    </span>
                  </div>
                  <h3
                    className="font-heading m-0 mb-[14px] font-bold leading-[1.08] tracking-[-.01em] text-[clamp(26px,3vw,40px)]"
                    style={{ color: "var(--ft-dark)" }}
                  >
                    {proj.title}
                  </h3>
                  <p className="text-[15px] leading-[1.65] m-0 mb-5 max-w-[46ch]" style={{ color: "var(--ft-gray)" }}>
                    {proj.blurb}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] font-semibold rounded-full py-[5px] px-3 border"
                        style={{ color: "var(--ft-gray)", borderColor: "rgba(21,36,47,0.18)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
