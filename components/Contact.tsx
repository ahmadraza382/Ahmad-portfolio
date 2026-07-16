"use client";

import { useState } from "react";
import SectionBadge from "./SectionBadge";
import QuoteButton from "./QuoteButton";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

const BANNER_IMG = "/ahmad.png";

const SERVICES = [
  "Custom Websites",
  "Mobile Apps",
  "SaaS Products",
  "Online Stores & Shopify",
  "WordPress",
  "Desktop Apps",
  "SEO",
  "Meta Ads",
];

type Field = "name" | "email" | "phone" | "service" | "subject" | "message";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subject: "",
    message: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // scroll up to the intro video (AboutShort section) and start playing it
  const goToIntroVideo = () => {
    const el = document.getElementById("intro-video");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.querySelector("video")?.play().catch(() => {});
  };

  const update =
    (field: Field) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) {
      setError("Please confirm the information provided is accurate.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const details = [
        form.phone && `Phone: ${form.phone}`,
        form.service && `Service: ${form.service}`,
        form.subject && `Subject: ${form.subject}`,
        "",
        form.message,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: details }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError("Something went wrong — please email me directly instead.");
    } finally {
      setSending(false);
    }
  };

  const fieldCls =
    "w-full px-4 py-[15px] bg-white border border-border rounded-[12px] text-text font-sans text-[14px] outline-none transition-colors duration-200 focus:border-accent placeholder:text-text-2";

  return (
    <section id="contact" className="max-w-content mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(70px,11vh,150px)]">
      {/* ===== top banner: heading + CTA / photo card ===== */}
      <div
        data-reveal=""
        className="grid grid-cols-1 min-[861px]:grid-cols-[minmax(0,1fr)_320px] gap-[clamp(28px,5vw,56px)] items-center pb-[clamp(36px,5vh,56px)] border-b border-border"
      >
        <div>
          <SectionBadge className="mb-5">Contact</SectionBadge>
          <h2 className="font-heading font-bold leading-[1.08] tracking-[-.02em] m-0 mb-6 text-[clamp(30px,4vw,48px)]">
            Let&apos;s Discuss Your <br className="hidden sm:block" />
            Next Project
          </h2>
          <QuoteButton href="#contact-form">Get a free quote</QuoteButton>
        </div>

        <button
          type="button"
          onClick={goToIntroVideo}
          aria-label="Watch the intro video"
          data-cursor="link"
          className="hidden min-[861px]:block group relative w-full rounded-[20px] overflow-hidden min-[861px]:h-[190px] p-0 border-none cursor-pointer"
          style={{ background: "var(--ft-dark)" }}
        >
          {/* teal glow behind the cutout — same treatment as the hero */}
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 60% 35%, rgba(36,66,74,0.75) 0%, rgba(21,36,47,0) 55%), linear-gradient(180deg, #15242f 0%, #16283190 40%, #15242f 100%)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BANNER_IMG}
            alt=""
            aria-hidden="true"
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 inline-flex items-center justify-center w-[50px] h-[50px] rounded-full transition-transform duration-200 group-hover:scale-110"
            style={{ background: "var(--gold)", color: "var(--ft-white)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      </div>

      {/* ===== bottom: info + form ===== */}
      <div
        id="contact-form"
        className="grid grid-cols-1 min-[861px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] gap-[clamp(32px,5vw,72px)] items-start pt-[clamp(36px,5vh,56px)]"
      >
        <div data-reveal="">
          <h3 className="font-heading font-bold text-[22px] m-0 mb-4">Contact</h3>
          <p className="text-[15px] leading-[1.65] text-text-2 max-w-[38ch] m-0 mb-7">
            Have a project in mind or need technical guidance? Reach out to
            schedule a call and get clear, practical advice tailored to your
            goals.
          </p>
          <h4 className="font-heading font-bold text-[15px] m-0 mb-2">Email Me</h4>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-cursor="link"
            className="inline-flex items-center text-[15px] text-text no-underline font-semibold"
          >
            {CONTACT_EMAIL}
          </a>

          <h4 className="font-heading font-bold text-[15px] m-0 mt-7 mb-3">Follow Me</h4>
          <div className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              aria-label="GitHub"
              className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-full border border-border text-text transition-colors duration-200 hover:bg-gold hover:border-gold hover:text-white"
            >
              <IconGithub />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-full border border-border text-text transition-colors duration-200 hover:bg-gold hover:border-gold hover:text-white"
            >
              <IconLinkedin />
            </a>
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
              <h3 className="font-heading text-[30px] m-0 mb-[10px]">Message sent</h3>
              <p className="text-text-2 text-[15px] m-0">
                Thanks — I&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="bg-surface border border-border rounded-[20px] p-[clamp(22px,3vw,34px)] flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={form.name}
                  onChange={update("name")}
                  data-cursor="link"
                  placeholder="Your Name"
                  required
                  className={fieldCls}
                />
                <input
                  value={form.email}
                  onChange={update("email")}
                  type="email"
                  data-cursor="link"
                  placeholder="Email Address"
                  required
                  className={fieldCls}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  type="tel"
                  data-cursor="link"
                  placeholder="Phone Number"
                  className={fieldCls}
                />
                <select
                  value={form.service}
                  onChange={update("service")}
                  data-cursor="link"
                  className={`${fieldCls} appearance-none cursor-pointer ${form.service ? "" : "text-text-2"}`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23555555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                  }}
                >
                  <option value="">Service Needed</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <input
                value={form.subject}
                onChange={update("subject")}
                data-cursor="link"
                placeholder="Subject"
                className={fieldCls}
              />
              <textarea
                value={form.message}
                onChange={update("message")}
                rows={5}
                data-cursor="link"
                placeholder="Your Message"
                required
                className={`${fieldCls} resize-none`}
              />
              <label className="inline-flex items-start gap-[10px] text-[13px] text-text-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-[3px] w-4 h-4 accent-[var(--gold)] cursor-pointer shrink-0"
                />
                I confirm the information provided is accurate.
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
                className="mt-1 self-start inline-flex items-center gap-3 rounded-full font-normal no-underline cursor-pointer select-none disabled:opacity-60"
                style={{
                  background: "var(--gold)",
                  color: "var(--ft-white)",
                  padding: "8px 8px 8px 24px",
                  fontSize: 15,
                  fontWeight: 600,
                  border: "none",
                }}
              >
                {sending ? "Sending…" : "Request Consultation"}
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center rounded-full shrink-0"
                  style={{ width: 36, height: 36, background: "var(--ft-white)", color: "var(--gold)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function IconGithub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
function IconLinkedin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
