// Small mono "(0X) — LABEL" eyebrow used above each section.

interface SectionLabelProps {
  no: string;
  label: string;
  center?: boolean;
}

export default function SectionLabel({ no, label, center = false }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-[14px] ${center ? "justify-center" : ""}`}
    >
      <span className="font-mono text-[13px] text-accent tracking-[.1em]">({no})</span>
      <span className="font-mono text-[13px] tracking-[.18em] uppercase text-accent">
        {label}
      </span>
    </div>
  );
}
