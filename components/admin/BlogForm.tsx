"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

export interface BlogFormData {
  id?: string;
  slug: string;
  sort: number;
  title: string;
  excerpt: string;
  cover: string;
  body: string;
  tags: string[];
  readMinutes: number;
  published: boolean;
  /** ISO go-live time when scheduled; "" = none. */
  publishAt: string;
  date: string;
  metaTitle: string;
  metaDescription: string;
}

/** Today's date as YYYY-MM-DD (for auto-dating new posts). */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** ISO → value for <input type="datetime-local"> in the browser's local time. */
function toLocalInput(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

/** A sensible default schedule: 1 hour from now, local time, for the input. */
function defaultSchedule(): string {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

type PubMode = "draft" | "now" | "schedule";

/** Derive the publishing mode from stored fields. */
function modeOf(published: boolean, publishAt: string): PubMode {
  if (!published) return "draft";
  if (publishAt && new Date(publishAt).getTime() > Date.now()) return "schedule";
  return "now";
}

const EMPTY: BlogFormData = {
  slug: "", sort: 0, title: "", excerpt: "", cover: "", body: "",
  tags: [], readMinutes: 0, published: false, publishAt: "", date: "",
  metaTitle: "", metaDescription: "",
};

const input =
  "w-full px-3 py-[10px] rounded-[10px] bg-bg border border-border text-text text-[14px] outline-none focus:border-accent transition-colors";
const labelText = "text-[12px] font-mono uppercase tracking-[.06em] text-text-2";

// Defined OUTSIDE the form component so inputs keep focus while typing.
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-[6px]">
      <span className={labelText}>{label}</span>
      {children}
    </label>
  );
}

function Group({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="bg-surface border border-border rounded-[16px] p-6 mb-5">
      <h2 className="font-heading text-[22px] m-0 mb-1">{title}</h2>
      {desc && <p className="text-[13px] text-text-2 m-0 mb-5">{desc}</p>}
      {!desc && <div className="mb-5" />}
      {children}
    </section>
  );
}

/** Uploads one image to /api/admin/upload and calls onDone(url). */
function UploadButton({
  label,
  onDone,
  onError,
}: {
  label: string;
  onDone: (url: string) => void;
  onError: (msg: string) => void;
}) {
  const [busy, setBusy] = useState(false);

  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.url) onDone(d.url);
      else onError(d.error || "Upload failed.");
    } catch {
      onError("Upload failed — check your connection.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <label
      className={`inline-flex items-center gap-2 px-4 py-[10px] rounded-[10px] border border-border text-[13px] font-semibold cursor-pointer hover:bg-soft transition-colors ${busy ? "opacity-60 pointer-events-none" : ""}`}
    >
      <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={pick} />
      {busy ? "Uploading…" : label}
    </label>
  );
}

/** Simple slugifier used when the author hasn't set a slug yet. */
function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogForm({ initial }: { initial?: BlogFormData }) {
  const router = useRouter();
  // New posts default the date to today; editing keeps the saved date.
  const [data, setData] = useState<BlogFormData>(
    initial ?? { ...EMPTY, date: today() }
  );
  // Publishing state: mode + the datetime-local input value (local time).
  const [mode, setMode] = useState<PubMode>(
    modeOf(initial?.published ?? false, initial?.publishAt ?? "")
  );
  const [scheduleLocal, setScheduleLocal] = useState<string>(
    initial?.publishAt ? toLocalInput(initial.publishAt) : ""
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);
  const isEdit = Boolean(initial?.id);

  const pickMode = (m: PubMode) => {
    setMode(m);
    if (m === "schedule" && !scheduleLocal) setScheduleLocal(defaultSchedule());
  };

  const set = <K extends keyof BlogFormData>(k: K, v: BlogFormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const listVal = (arr: string[]) => arr.join("\n");
  const parseList = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Resolve publishing state from the mode.
    let published = false;
    let publish_at: string | null = null;
    if (mode === "now") {
      published = true;
    } else if (mode === "schedule") {
      if (!scheduleLocal) {
        setError("Schedule ke liye ek date & time chuno.");
        return;
      }
      const when = new Date(scheduleLocal);
      if (Number.isNaN(when.getTime())) {
        setError("Schedule time galat hai.");
        return;
      }
      if (when.getTime() <= Date.now()) {
        setError("Schedule time future mein honi chahiye (ya 'Publish now' use karo).");
        return;
      }
      published = true;
      publish_at = when.toISOString();
    }

    setBusy(true);
    setError(null);

    // Map to DB column names (snake_case).
    const payload = {
      slug: data.slug || slugify(data.title),
      sort: data.sort,
      title: data.title,
      excerpt: data.excerpt,
      cover: data.cover,
      body: data.body,
      tags: data.tags,
      read_minutes: data.readMinutes,
      published,
      publish_at,
      date: data.date || today(),
      meta_title: data.metaTitle,
      meta_description: data.metaDescription,
    };

    const url = isEdit ? `/api/admin/blog/${initial!.id}` : "/api/admin/blog";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Save failed.");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-[800px]">
      <Group title="Post" desc="Shown on the blog index and as the article page.">
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Title *">
            <input className={input} value={data.title} onChange={(e) => set("title", e.target.value)} required />
          </Field>
          <Field label="Slug * (url, e.g. shipping-fast)">
            <input
              className={input}
              value={data.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder={data.title ? slugify(data.title) : "auto from title"}
              required
            />
          </Field>
          <Field label="Date">
            <div className="flex gap-2">
              <input
                type="date"
                className={input}
                value={data.date}
                onChange={(e) => set("date", e.target.value)}
              />
              <button
                type="button"
                onClick={() => set("date", today())}
                className="px-3 rounded-[10px] border border-border text-[13px] font-semibold cursor-pointer hover:bg-soft transition-colors whitespace-nowrap"
              >
                Today
              </button>
            </div>
          </Field>
          <Field label="Read time (minutes, 0 = auto)">
            <input type="number" className={input} value={data.readMinutes} onChange={(e) => set("readMinutes", Number(e.target.value))} />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Excerpt (short card summary)">
            <textarea className={input} rows={2} value={data.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Tags (one per line)">
            <textarea className={input} rows={3} value={listVal(data.tags)} onChange={(e) => set("tags", parseList(e.target.value))} />
          </Field>
        </div>

        <div className="mt-6">
          <span className={labelText}>Publishing</span>
          <div className="mt-2 inline-flex rounded-[10px] border border-border overflow-hidden">
            {(
              [
                ["draft", "Draft"],
                ["now", "Publish now"],
                ["schedule", "Schedule"],
              ] as [PubMode, string][]
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => pickMode(m)}
                className={`px-4 py-[10px] text-[13px] font-semibold cursor-pointer border-none transition-colors ${
                  mode === m ? "bg-accent text-white" : "bg-bg text-text-2 hover:bg-soft"
                }`}
                style={{ borderRight: m !== "schedule" ? "1px solid var(--border)" : "none" }}
              >
                {label}
              </button>
            ))}
          </div>

          {mode === "schedule" && (
            <div className="mt-3 max-w-[320px]">
              <Field label="Publish at (your local time)">
                <input
                  type="datetime-local"
                  className={input}
                  value={scheduleLocal}
                  onChange={(e) => setScheduleLocal(e.target.value)}
                />
              </Field>
            </div>
          )}

          <p className="text-[12px] text-text-2 mt-2 m-0">
            {mode === "draft" && "Draft — public blog par nahi dikhegi."}
            {mode === "now" && "Save karte hi live ho jayegi."}
            {mode === "schedule" &&
              (scheduleLocal
                ? `Scheduled — ${new Date(scheduleLocal).toLocaleString()} par live hogi (±5 min).`
                : "Ek date & time chuno.")}
          </p>
        </div>
      </Group>

      <Group
        title="Cover image"
        desc="Stored in Supabase Storage. Shows on the blog card, as the article hero, and as the social-share (OG) image. 16:9 works best. Upload attaches to the form only — click Save below to make it live."
      >
        <div className="flex items-start gap-4 flex-wrap">
          {data.cover ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.cover}
                alt="Cover"
                className="w-[260px] rounded-[10px] border border-border object-cover"
                style={{ aspectRatio: "16/9" }}
              />
              <button
                type="button"
                onClick={() => set("cover", "")}
                className="absolute top-2 right-2 px-2 py-1 rounded-[8px] border-none text-[12px] font-semibold cursor-pointer bg-[rgba(0,0,0,.65)] text-white"
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              className="w-[260px] rounded-[10px] border border-dashed border-border flex items-center justify-center text-[12px] font-mono text-text-2"
              style={{ aspectRatio: "16/9" }}
            >
              no cover yet
            </div>
          )}
          <UploadButton
            label={data.cover ? "Replace cover" : "+ Upload cover"}
            onDone={(url) => { setImgError(null); set("cover", url); }}
            onError={setImgError}
          />
        </div>
        {imgError && <p className="text-[13px] m-0 mt-3" style={{ color: "#c0392b" }}>{imgError}</p>}
      </Group>

      <Group
        title="Content"
        desc="Use the toolbar to format: bold, italic, headings, lists, quotes, links and images. Images upload to Supabase Storage as you insert them."
      >
        <span className={labelText}>Body</span>
        <div className="mt-2">
          <RichTextEditor
            value={data.body}
            onChange={(html) => set("body", html)}
            onError={setImgError}
          />
        </div>
      </Group>

      <Group
        title="SEO"
        desc="Optional. Controls how this post appears in Google and social shares. Leave blank to fall back to the title / excerpt above."
      >
        <div className="grid gap-5">
          <Field label="Meta title (blank = post title)">
            <input
              className={input}
              value={data.metaTitle}
              onChange={(e) => set("metaTitle", e.target.value)}
              placeholder={data.title || "Post title"}
              maxLength={70}
            />
          </Field>
          <Field label="Meta description (blank = excerpt)">
            <textarea
              className={input}
              rows={3}
              value={data.metaDescription}
              onChange={(e) => set("metaDescription", e.target.value)}
              placeholder={data.excerpt || "A short, search-friendly summary (about 150–160 characters)."}
              maxLength={200}
            />
          </Field>
          <p className="text-[12px] text-text-2 font-mono m-0">
            {data.metaDescription.length}/200 characters · aim for 150–160
          </p>
        </div>
      </Group>

      <Group title="Display (advanced)" desc="Ordering — default is usually fine.">
        <Field label="Sort order (lower = first)">
          <input type="number" className={input} value={data.sort} onChange={(e) => set("sort", Number(e.target.value))} />
        </Field>
      </Group>

      {error && <p className="text-[13px] mb-4" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="flex gap-3 sticky bottom-0 bg-bg py-4">
        <button
          type="submit"
          disabled={busy}
          className="px-6 py-3 rounded-full bg-accent text-white font-semibold text-[14px] border-none cursor-pointer disabled:opacity-60"
        >
          {busy ? "Saving..." : isEdit ? "Save changes" : "Create post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="px-6 py-3 rounded-full border border-border text-text font-semibold text-[14px] bg-transparent cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
