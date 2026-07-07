"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";

type Field = "name" | "email" | "message";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const label = e.target.parentElement?.querySelector("span");
    if (label) {
      label.style.transform = "translateY(-11px)";
      label.style.fontSize = "11px";
      label.style.color = "var(--accent)";
    }
    e.target.style.borderColor = "var(--accent)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const label = e.target.parentElement?.querySelector("span");
    if (label && !e.target.value) {
      label.style.transform = "none";
      label.style.fontSize = "13px";
      label.style.color = "var(--text-2)";
    }
    e.target.style.borderColor = "var(--border)";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError("Something went wrong — please email me directly instead.");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full pt-[26px] px-4 pb-[12px] bg-transparent border border-border rounded-[12px] text-text font-sans text-[16px] outline-none transition-colors duration-200 focus:border-accent";
  const labelCls =
    "absolute left-4 top-[18px] text-text-2 text-[13px] pointer-events-none font-mono tracking-[.06em] transition-[transform,font-size,color] duration-200";

  return (
    <section
      id="contact"
      className="max-w-content mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(70px,11vh,150px)]"
    >
      <div className="grid grid-cols-1 gap-[clamp(40px,6vw,80px)]">
        <div className="grid grid-cols-1 min-[861px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-[clamp(40px,6vw,90px)] items-start">
          <div data-reveal="">
            <div className="mb-6">
              <SectionLabel no="06" label="Contact" />
            </div>
            <h2 className="font-serif font-normal leading-[1.0] tracking-[-.02em] m-0 mb-6 text-[clamp(36px,5.4vw,72px)]">
              Working on something?{" "}
              <span className="italic text-accent">Tell me about it.</span>
            </h2>
            <p className="text-[16px] leading-[1.65] text-text-2 max-w-[42ch] m-0 mb-8">
              Send me a few lines about your project. I reply within a day, usually
              faster. Open for freelance and contract work right now.
            </p>
            <div className="flex flex-col gap-[14px]">
              <a
                href="mailto:382ahmadraza@gmail.com"
                data-cursor="link"
                className="inline-flex items-center gap-[10px] text-[16px] text-text no-underline font-semibold"
              >
                <span className="text-accent">✉</span> 382ahmadraza@gmail.com
              </a>
              <div className="flex gap-[18px] mt-[6px]">
                <a
                  href="https://github.com/ahmadraza382"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="font-mono text-[13px] text-text-2 no-underline"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/ahmadraza161/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="font-mono text-[13px] text-text-2 no-underline"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>

          <div data-reveal="" data-delay="100">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center bg-surface border border-border rounded-[20px] pt-[60px] px-[40px] pb-[60px] min-h-[360px]">
                <div className="w-[64px] h-[64px] rounded-full bg-accent flex items-center justify-center mb-6">
                  <svg viewBox="0 0 32 32" width="30" height="30" style={{ overflow: "visible" }}>
                    <path
                      d="M7,17 L13,23 L25,9"
                      fill="none"
                      stroke="#fff"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-[30px] m-0 mb-[10px]">Message sent</h3>
                <p className="text-text-2 text-[15px] m-0">
                  Thanks — I&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="bg-surface border border-border rounded-[20px] p-[clamp(26px,3vw,40px)] flex flex-col gap-[22px]"
              >
                <label className="relative block">
                  <input
                    value={form.name}
                    onChange={update("name")}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    data-cursor="link"
                    placeholder=" "
                    required
                    className={inputCls}
                  />
                  <span className={labelCls}>YOUR NAME</span>
                </label>
                <label className="relative block">
                  <input
                    value={form.email}
                    onChange={update("email")}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    type="email"
                    data-cursor="link"
                    placeholder=" "
                    required
                    className={inputCls}
                  />
                  <span className={labelCls}>EMAIL</span>
                </label>
                <label className="relative block">
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    rows={4}
                    data-cursor="link"
                    placeholder=" "
                    required
                    className={`${inputCls} resize-none`}
                  />
                  <span className={labelCls}>PROJECT DETAILS</span>
                </label>
                {error && (
                  <p className="text-[14px] leading-[1.5] m-0 text-red-600" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  data-cursor="cta"
                  data-magnetic=""
                  className="mt-[6px] self-start inline-flex items-center gap-[10px] py-4 px-[30px] rounded-full border-none bg-accent text-white font-sans font-semibold text-[16px] cursor-pointer disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send message"} <span className="text-[18px]">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
