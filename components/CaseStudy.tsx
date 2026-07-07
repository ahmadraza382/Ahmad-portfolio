"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/data";

export default function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const router = useRouter();

  return (
    <article className="max-w-[1100px] mx-auto pt-[140px] px-[clamp(20px,5vw,64px)] pb-[100px]">
      <div data-reveal="" className="flex items-center gap-[14px] mb-[34px]">
        <Link href="/work" data-cursor="link" className="font-mono text-[13px] text-accent no-underline">
          ← All work
        </Link>
        <span className="font-mono text-[13px] text-accent">/ {project.slug}</span>
      </div>

      <div data-reveal="" className="flex items-center gap-3 mb-[18px]">
        <span className="font-mono text-[13px] text-accent">{project.no}</span>
        <span className="font-mono text-[12px] text-text-2 uppercase tracking-[.14em]">
          {project.category}
        </span>
      </div>

      <h1
        data-reveal=""
        className="font-serif font-normal leading-[.96] tracking-[-.02em] m-0 mb-[22px] text-[clamp(44px,8vw,104px)]"
      >
        {project.title}
      </h1>

      <p
        data-reveal=""
        className="leading-[1.45] text-text max-w-[40ch] m-0 mb-[40px] font-serif italic text-[clamp(18px,2vw,26px)]"
      >
        {project.summary}
      </p>

      <div
        data-reveal=""
        className="flex flex-wrap gap-[40px] py-[26px] border-t border-b border-border mb-[50px]"
      >
        <div>
          <div className="font-mono text-[11px] text-text-2 tracking-[.1em] mb-[6px]">ROLE</div>
          <div className="font-semibold text-[15px]">{project.role}</div>
        </div>
        <div>
          <div className="font-mono text-[11px] text-text-2 tracking-[.1em] mb-[6px]">YEAR</div>
          <div className="font-semibold text-[15px]">{project.year}</div>
        </div>
        {project.live && project.live !== "#" && (
          <div className="flex-1 min-w-[160px] flex items-end justify-end">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="cta"
              data-magnetic=""
              className="inline-flex items-center gap-2 py-[13px] px-6 rounded-full bg-accent text-white font-semibold text-[14px] no-underline"
            >
              Visit live site ↗
            </a>
          </div>
        )}
      </div>

      <div
        data-reveal=""
        className="rounded-[18px] border border-border overflow-hidden flex items-center justify-center mb-[60px] relative"
        style={{ aspectRatio: "16/9", background: project.bg }}
      >
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(min-width: 1100px) 1100px, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <>
            <span className="absolute top-4 left-4 font-mono text-[11px] text-text-2">
              [ hero screenshot ]
            </span>
            <span className="font-serif text-accent opacity-[.18] text-[clamp(90px,16vw,200px)]">
              {project.mark}
            </span>
          </>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[50px] mb-[60px]">
        <div data-reveal="">
          <h2 className="font-serif font-normal text-[30px] m-0 mb-4">The problem</h2>
          <p className="text-[16px] leading-[1.7] text-text-2 m-0">{project.problem}</p>
        </div>
        <div data-reveal="" data-delay="100">
          <h2 className="font-serif font-normal text-[30px] m-0 mb-4">How I approached it</h2>
          <div className="flex flex-col gap-[14px]">
            {project.process.map((step, i) => (
              <div key={i} className="flex gap-[14px] items-start">
                <span className="font-mono text-[12px] text-accent mt-[3px]">
                  {"0" + (i + 1)}
                </span>
                <p className="text-[15px] leading-[1.6] text-text-2 m-0">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {project.shots && project.shots.length > 0 ? (
        <div data-reveal="" className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-5 mb-[60px]">
          {project.shots.map((shot, i) => (
            <div
              key={shot + i}
              className="rounded-[14px] border border-border overflow-hidden relative bg-soft"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={shot}
                alt={`${project.title} — screenshot ${i + 1}`}
                fill
                sizes="(min-width: 600px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div data-reveal="" className="grid grid-cols-2 gap-5 mb-[60px]">
          <div
            className="rounded-[14px] bg-soft border border-border flex items-center justify-center relative"
            style={{ aspectRatio: "4/3" }}
          >
            <span className="absolute top-[14px] left-[14px] font-mono text-[11px] text-text-2">
              [ screen ]
            </span>
            <span className="font-serif text-[80px] text-accent opacity-[.16]">{project.mark}</span>
          </div>
          <div
            className="rounded-[14px] bg-sand border border-border flex items-center justify-center relative"
            style={{ aspectRatio: "4/3" }}
          >
            <span className="absolute top-[14px] left-[14px] font-mono text-[11px] text-text-2">
              [ screen ]
            </span>
            <span className="font-serif text-[80px] text-accent opacity-[.16]">✳</span>
          </div>
        </div>
      )}

      {project.sections && project.sections.length > 0 && (
        <div className="mb-[60px] flex flex-col gap-[50px]">
          {project.sections
            .filter((s) => s.heading?.trim() || s.body?.trim())
            .map((s, i) => (
              <div data-reveal="" key={i}>
                {s.heading?.trim() && (
                  <h2 className="font-serif font-normal text-[30px] m-0 mb-4">{s.heading}</h2>
                )}
                <p className="text-[16px] leading-[1.7] text-text-2 m-0 whitespace-pre-wrap">
                  {s.body}
                </p>
              </div>
            ))}
        </div>
      )}

      <div data-reveal="" className="mb-[60px]">
        <h2 className="font-serif font-normal text-[30px] m-0 mb-[18px]">Built with</h2>
        <div className="flex flex-wrap gap-[10px]">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[13px] text-text border border-border rounded-full py-2 px-4"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        data-reveal=""
        className="bg-soft border border-border rounded-[20px] p-[clamp(30px,4vw,56px)] mb-[60px]"
      >
        <h2 className="font-serif font-normal text-[30px] m-0 mb-[30px]">The results</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[30px]">
          {project.results.map(([val, label], i) => (
            <div key={i}>
              <div className="font-serif leading-none text-accent mb-[10px] text-[clamp(38px,5vw,58px)]">
                {val}
              </div>
              <div className="text-[14px] text-text-2">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        data-reveal=""
        className="flex items-center justify-between flex-wrap gap-5 pt-9 border-t border-border"
      >
        <span className="font-mono text-[13px] text-text-2">Next project</span>
        <button
          onClick={() => router.push(`/work/${next.slug}`)}
          data-cursor="cta"
          data-magnetic=""
          className="inline-flex items-center gap-3 bg-transparent border-none cursor-pointer text-text"
        >
          <span className="font-serif italic text-[clamp(26px,4vw,42px)]">{next.title}</span>
          <span className="text-accent text-[28px]">→</span>
        </button>
      </div>
    </article>
  );
}
