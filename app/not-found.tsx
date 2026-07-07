import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-[1100px] mx-auto pt-[180px] px-[clamp(20px,5vw,64px)] pb-[120px] text-center">
      <h1 className="font-serif font-normal leading-none tracking-[-.02em] m-0 mb-6 text-[clamp(60px,12vw,140px)]">
        404
      </h1>
      <p className="text-text-2 text-[18px] mb-8">This page wandered off.</p>
      <Link
        href="/"
        data-cursor="cta"
        className="inline-flex items-center gap-2 py-4 px-7 rounded-full bg-accent text-white font-semibold text-[16px] no-underline"
      >
        Back home →
      </Link>
    </section>
  );
}
