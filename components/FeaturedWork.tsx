"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import SectionLabel from "./SectionLabel";
import type { Project } from "@/lib/data";

export default function FeaturedWork({ featured }: { featured: Project[] }) {
  const router = useRouter();

  return (
    <section
      id="work"
      className="max-w-content mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(60px,10vh,140px)]"
    >
      <div
        data-reveal=""
        className="flex items-end justify-between flex-wrap gap-5 mb-[clamp(40px,5vw,72px)]"
      >
        <div>
          <div className="mb-[18px]">
            <SectionLabel no="04" label="Selected work" />
          </div>
          <h2 className="font-serif font-normal leading-[1.02] tracking-[-.02em] m-0 text-[clamp(32px,5vw,66px)]">
            Things I&apos;ve shipped
          </h2>
        </div>
        <button
          onClick={() => router.push("/work")}
          data-cursor="cta"
          data-magnetic=""
          className="inline-flex items-center gap-2 py-[13px] px-[22px] rounded-full border-none bg-accent text-white font-sans font-semibold text-[15px] cursor-pointer"
        >
          View all work →
        </button>
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
                  className={`group/proj proj-media relative rounded-[18px] overflow-hidden border border-border ${mediaOrder}`}
                  style={{ aspectRatio: "16/9", background: proj.bg }}
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
                      <span className="absolute top-4 left-4 font-mono text-[11px] text-text-2 tracking-[.08em] z-[2]">
                        [ {proj.shot} ]
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center font-serif text-accent opacity-20 text-[clamp(60px,9vw,140px)]">
                        {proj.mark}
                      </div>
                    </>
                  )}
                  <div className="proj-overlay absolute inset-0 bg-accent opacity-0 group-hover/proj:opacity-90 flex items-center justify-center">
                    <span className="text-white font-semibold text-[17px] inline-flex items-center gap-2">
                      View case study <span className="text-[19px]">↗</span>
                    </span>
                  </div>
                </div>

                <div className={textOrder}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[13px] text-accent">{proj.no}</span>
                    <span className="font-mono text-[12px] text-text-2 uppercase tracking-[.14em]">
                      {proj.category}
                    </span>
                  </div>
                  <h3 className="font-serif font-normal leading-[1.04] tracking-[-.01em] m-0 mb-[14px] text-[clamp(28px,3.6vw,46px)]">
                    {proj.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-text-2 m-0 mb-5 max-w-[46ch]">
                    {proj.blurb}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] font-mono text-text-2 border border-border rounded-full py-[5px] px-3"
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
