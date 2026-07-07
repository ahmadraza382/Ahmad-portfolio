import { SKILLS } from "@/lib/data";

export default function Skills() {
  const loop = [...SKILLS, ...SKILLS];
  const loop2 = [...SKILLS.slice().reverse(), ...SKILLS.slice().reverse()];

  return (
    <section
      id="skills"
      className="py-[clamp(50px,8vh,110px)] border-t border-b border-border overflow-hidden"
    >
      <div
        data-reveal=""
        className="max-w-content mx-auto mb-[38px] px-[clamp(20px,5vw,64px)] flex items-center gap-[14px]"
      >
        <span className="font-mono text-[13px] text-accent tracking-[.1em]">(03)</span>
        <span className="font-mono text-[13px] tracking-[.18em] uppercase text-accent">
          Stack &amp; tools
        </span>
      </div>

      <div className="flex w-max will-change-transform" style={{ animation: "marquee 28s linear infinite" }}>
        <div className="flex items-center">
          {loop.map((sk, i) => (
            <span
              key={`a-${i}`}
              className="inline-flex items-center gap-[18px] px-7 font-serif text-text whitespace-nowrap text-[clamp(34px,4vw,56px)]"
            >
              {sk}
              <span className="text-accent text-[.5em]">✳</span>
            </span>
          ))}
        </div>
      </div>

      <div
        className="flex w-max will-change-transform mt-[6px] opacity-40"
        style={{ animation: "marquee 34s linear infinite reverse" }}
      >
        <div className="flex items-center">
          {loop2.map((sk, i) => (
            <span
              key={`b-${i}`}
              className="inline-flex items-center gap-[18px] px-7 font-serif italic text-text-2 whitespace-nowrap text-[clamp(28px,3.2vw,44px)]"
            >
              {sk}
              <span className="text-[.5em]">—</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
