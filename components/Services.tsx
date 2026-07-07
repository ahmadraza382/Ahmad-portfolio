import SectionLabel from "./SectionLabel";
import { SERVICES, TEAM_BLURB, TEAM_AREAS } from "@/lib/data";

export default function Services() {
  return (
    <section
      id="services"
      className="max-w-content mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(40px,7vh,90px)]"
    >
      <div
        data-reveal=""
        className="flex items-end justify-between flex-wrap gap-5 mb-[clamp(36px,5vw,64px)]"
      >
        <div>
          <div className="mb-[18px]">
            <SectionLabel no="02" label="Services" />
          </div>
          <h2 className="font-serif font-normal leading-[1.02] tracking-[-.02em] m-0 max-w-[16ch] text-[clamp(32px,5vw,66px)]">
            What I can do for you
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(248px,1fr))] gap-[18px]">
        {SERVICES.map((svc) => (
          <div
            key={svc.no}
            data-reveal=""
            data-magnetic=""
            data-cursor="link"
            className="relative pt-[30px] px-7 pb-[34px] rounded-[18px] bg-surface border border-border overflow-hidden cursor-pointer"
          >
            <span className="absolute top-[22px] right-6 font-mono text-[12px] text-text-2">
              {svc.no}
            </span>
            <div className="w-[48px] h-[48px] rounded-[12px] bg-accent-soft flex items-center justify-center text-[24px] mb-[22px]">
              {svc.icon}
            </div>
            <h3 className="font-serif font-normal text-[26px] tracking-[-.01em] m-0 mb-[10px]">
              {svc.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-text-2 m-0">{svc.desc}</p>
          </div>
        ))}
      </div>

      {/* Extended team */}
      <div
        data-reveal=""
        className="mt-[18px] rounded-[18px] border border-border bg-soft px-7 py-[30px] min-[861px]:px-[38px] flex flex-col min-[861px]:flex-row min-[861px]:items-center gap-6 min-[861px]:gap-[40px]"
      >
        <div className="flex-1">
          <h3 className="font-serif font-normal text-[26px] tracking-[-.01em] m-0 mb-[10px]">
            Bigger project? <span className="italic text-accent">I bring a team.</span>
          </h3>
          <p className="text-[15px] leading-[1.6] text-text-2 m-0 max-w-[62ch]">{TEAM_BLURB}</p>
        </div>
        <div className="flex flex-wrap gap-[10px] min-[861px]:justify-end min-[861px]:max-w-[300px]">
          {TEAM_AREAS.map((area) => (
            <span
              key={area}
              className="font-mono text-[13px] text-text border border-border bg-surface rounded-full py-2 px-4"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
