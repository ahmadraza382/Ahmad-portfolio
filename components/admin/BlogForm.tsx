"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
  date: string;
}

const EMPTY: BlogFormData = {
  slug: "", sort: 0, title: "", excerpt: "", cover: "", body: "",
  tags: [], readMinutes: 0, published: false, date: "",
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
      <h2 className="font-serif text-[22px] m-0 mb-1">{title}</h2>
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
  const [data, setData] = useState<BlogFormData>(initial ?? EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);
  const isEdit = Boolean(initial?.id);

  const set = <K extends keyof BlogFormData>(k: K, v: BlogFormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const listVal = (arr: string[]) => arr.join("\n");
  const parseList = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    // Map to DB column names (read_minutes is snake_case).
    const payload = {
      slug: data.slug || slugify(data.title),
      sort: data.sort,
      title: data.title,
      excerpt: data.excerpt,
      cover: data.cover,
      body: data.body,
      tags: data.tags,
      read_minutes: data.readMinutes,
      published: data.published,
      date: data.date,
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
          <Field label="Date (e.g. 2026-02-14)">
            <input className={input} value={data.date} onChange={(e) => set("date", e.target.value)} placeholder="2026-02-14" />
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

        <label className="flex items-center gap-3 mt-5 cursor-pointer">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => set("published", e.target.checked)}
            className="w-[18px] h-[18px] accent-[var(--accent)]"
          />
          <span className="text-[14px] font-semibold">Published (visible on the public blog)</span>
        </label>
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
        desc="Markdown supported: # headings, **bold**, *italic*, `code`, [links](https://…), > quotes, - lists, 1. lists, ``` code fences, --- rules."
      >
        <Field label="Body (Markdown)">
          <textarea
            className={`${input} font-mono text-[13.5px] leading-[1.6]`}
            rows={20}
            value={data.body}
            onChange={(e) => set("body", e.target.value)}
            placeholder={"## A heading\n\nYour paragraph here. Use **bold**, *italic*, and [links](https://example.com).\n\n- point one\n- point two"}
          />
        </Field>
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
