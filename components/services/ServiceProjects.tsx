import Link from "next/link";
import Image from "next/image";
import SectionBadge from "../SectionBadge";
import QuoteButton from "../QuoteButton";
import type { Project } from "@/lib/data";

/**
 * Light section: real projects relevant to this service.
 * Projects come from the same data layer as the home page and /work — no
 * invented work. Card treatment matches FeaturedWork (cover image, gold
 * number, category eyebrow, tag pills).
 */
export default function ServiceProjects({
  projects,
  serviceName,
}: {
  projects: Project[];
  serviceName: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section
      id="selected-projects"
      className="mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] py-[clamp(56px,9vh,120px)]"
    >
      <div
        data-reveal=""
        className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 mb-[clamp(32px,5vh,56px)]"
      >
        <div className="max-w-[600px]">
          <SectionBadge className="mb-5">Selected Projects</SectionBadge>
          <h2
            className="font-heading m-0 mb-4 font-bold leading-[1.08] tracking-[-.02em] text-[clamp(28px,3.2vw,44px)]"
            style={{ color: "var(--ft-dark)" }}
          >
            Related <span style={{ color: "var(--ft-gold)" }}>work</span>
          </h2>
          <p className="m-0 text-[clamp(15px,1.5vw,17px)] leading-[1.7] text-text-2">
            Real projects where {serviceName.toLowerCase()} was part of the build.
            Each one has a full case study.
          </p>
        </div>
        <QuoteButton href="/work">View all work</QuoteButton>
      </div>

      <div className="grid gap-[clamp(20px,2.6vw,32px)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((proj, i) => (
          <Link
            key={proj.slug}
            href={`/work/${proj.slug}`}
            data-cursor="cta"
            data-reveal=""
            data-delay={i * 80}
            className="group/proj no-underline flex flex-col"
          >
            <div
              className="relative rounded-[18px] overflow-hidden border mb-5"
              style={{
                aspectRatio: "16/10",
                background: proj.bg,
                borderColor: "rgba(21,36,47,0.12)",
              }}
            >
              {proj.cover ? (
                <Image
                  src={proj.cover}
                  alt={`${proj.title} — ${proj.category}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain transition-transform duration-[600ms] group-hover/proj:scale-[1.04]"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="font-heading absolute inset-0 flex items-center justify-center font-bold opacity-20 text-[clamp(48px,7vw,90px)]"
                  style={{ color: "var(--ft-gold)" }}
                >
                  {proj.mark}
                </span>
              )}
              <span
                className="proj-overlay absolute inset-0 flex items-center justify-center text-center px-4"
                style={{ background: "rgba(21,36,47,0.88)" }}
              >
                <span className="text-white font-semibold text-[15px] inline-flex items-center gap-2">
                  View case study{" "}
                  <span className="text-[18px]" style={{ color: "var(--ft-gold)" }}>
                    ↗
                  </span>
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3 mb-[10px]">
              <span className="text-[12px] font-bold" style={{ color: "var(--ft-gold)" }}>
                {proj.no}
              </span>
              <span
                className="text-[11px] uppercase tracking-[.14em] font-semibold"
                style={{ color: "var(--ft-gray)" }}
              >
                {proj.category}
              </span>
            </div>
            <h3
              className="font-heading m-0 mb-[10px] font-bold leading-[1.2] tracking-[-.01em] text-[20px] group-hover/proj:text-accent transition-colors duration-300"
              style={{ color: "var(--ft-dark)" }}
            >
              {proj.title}
            </h3>
            <p
              className="m-0 text-[14px] leading-[1.65]"
              style={{ color: "var(--ft-gray)" }}
            >
              {proj.blurb}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
