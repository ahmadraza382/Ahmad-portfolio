"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { CATEGORIES } from "@/lib/data";

interface Section {
  heading: string;
  body: string;
}

export interface ProjectFormData {
  id?: string;
  slug: string;
  sort: number;
  no: string;
  mark: string;
  shot: string;
  category: string;
  filters: string[];
  featured: boolean;
  bg: string;
  title: string;
  blurb: string;
  tags: string[];
  year: string;
  role: string;
  live: string;
  cover: string;
  shots: string[];
  summary: string;
  problem: string;
  process: string[];
  stack: string[];
  results: [string, string][];
  sections: Section[];
}

const EMPTY: ProjectFormData = {
  slug: "", sort: 0, no: "", mark: "◆", shot: "screen", category: "",
  filters: [],
  featured: false, bg: "var(--sand)", title: "", blurb: "", tags: [], year: "",
  role: "", live: "", cover: "", shots: [], summary: "", problem: "",
  process: [], stack: [], results: [], sections: [],
};

const BGS = [
  { label: "Sand", value: "var(--sand)" },
  { label: "Soft", value: "var(--soft)" },
];

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

/** Multi-select dropdown: pick one or more service categories for a project.
 *  NOTE: must NOT be rendered inside a <label> (like Field) — label click
 *  forwarding would re-toggle the button and the popup could never close. */
function CategoriesDropdown({
  label,
  selected,
  onChange,
}: {
  label: string;
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = (cat: string) =>
    onChange(
      selected.includes(cat) ? selected.filter((c) => c !== cat) : [...selected, cat]
    );

  return (
    <div
      className="flex flex-col gap-[6px]"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          setOpen(false);
          btnRef.current?.focus();
        }
      }}
    >
      <span className={labelText}>{label}</span>
      <div className="relative">
        <button
          ref={btnRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`${input} relative z-20 flex items-center justify-between gap-2 text-left cursor-pointer`}
        >
          <span className={`truncate ${selected.length === 0 ? "text-text-2" : ""}`}>
            {selected.length === 0 ? "Select categories…" : selected.join(", ")}
          </span>
          <span className="text-text-2 text-[11px] shrink-0">{open ? "▲" : "▼"}</span>
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute z-20 top-full left-0 right-0 mt-1 max-h-[280px] overflow-y-auto bg-surface border border-border rounded-[10px] p-2 shadow-[0_12px_32px_rgba(0,0,0,.12)]">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-[10px] px-2 py-[7px] rounded-[8px] cursor-pointer hover:bg-soft text-[14px]"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(cat)}
                    onChange={() => toggle(cat)}
                    className="w-4 h-4 accent-[var(--accent)]"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
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

export default function ProjectForm({ initial }: { initial?: ProjectFormData }) {
  const router = useRouter();
  const [data, setData] = useState<ProjectFormData>(initial ?? EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);
  const isEdit = Boolean(initial?.id);

  const set = <K extends keyof ProjectFormData>(k: K, v: ProjectFormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.filters.length === 0) {
      setError("Pick at least one category — otherwise the project won't show under any /work filter.");
      return;
    }
    setBusy(true);
    setError(null);
    const url = isEdit ? `/api/admin/projects/${initial!.id}` : "/api/admin/projects";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Save failed.");
      setBusy(false);
    }
  };

  const listVal = (arr: string[]) => arr.join("\n");
  const parseList = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
  const resultsVal = (r: [string, string][]) => r.map((x) => `${x[0]} | ${x[1]}`).join("\n");
  const parseResults = (s: string): [string, string][] =>
    s
      .split("\n")
      .map((line) => line.split("|").map((x) => x.trim()))
      .filter((parts) => parts[0])
      .map((parts) => [parts[0], parts[1] || ""] as [string, string]);

  const addSection = () => set("sections", [...data.sections, { heading: "", body: "" }]);
  const updateSection = (i: number, key: keyof Section, val: string) =>
    set(
      "sections",
      data.sections.map((s, idx) => (idx === i ? { ...s, [key]: val } : s))
    );
  const removeSection = (i: number) =>
    set("sections", data.sections.filter((_, idx) => idx !== i));
  const moveSection = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= data.sections.length) return;
    const next = [...data.sections];
    [next[i], next[j]] = [next[j], next[i]];
    set("sections", next);
  };

  return (
    <form onSubmit={submit} className="max-w-[800px]">
      <Group title="Basic info" desc="Shown on the work gallery and home page cards.">
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Title *">
            <input className={input} value={data.title} onChange={(e) => set("title", e.target.value)} required />
          </Field>
          <Field label="Slug * (url, e.g. linkshort)">
            <input className={input} value={data.slug} onChange={(e) => set("slug", e.target.value)} required />
          </Field>
          <Field label="Card label (free text, e.g. Online Store · Live)">
            <input className={input} value={data.category} onChange={(e) => set("category", e.target.value)} />
          </Field>
          <CategoriesDropdown
            label="Categories (pick one or more — the /work filter bar)"
            selected={data.filters}
            onChange={(next) => set("filters", next)}
          />
          <Field label="Year">
            <input className={input} value={data.year} onChange={(e) => set("year", e.target.value)} />
          </Field>
          <Field label="Role">
            <input className={input} value={data.role} onChange={(e) => set("role", e.target.value)} />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Blurb (short card text)">
            <textarea className={input} rows={2} value={data.blurb} onChange={(e) => set("blurb", e.target.value)} />
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
            checked={data.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="w-[18px] h-[18px] accent-[var(--accent)]"
          />
          <span className="text-[14px] font-semibold">Show on home page (featured)</span>
        </label>
      </Group>

      <Group
        title="Images"
        desc="Stored in Supabase Storage. Cover shows on cards and as the case-study hero (16:9 works best); screenshots show in the case-study grid. Upload attaches to the form only — click Save changes below to make it live."
      >
        <div className="flex flex-col gap-6">
          <div>
            <span className={labelText}>Cover image</span>
            <div className="mt-2 flex items-start gap-4 flex-wrap">
              {data.cover ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.cover}
                    alt="Cover"
                    className="w-[220px] rounded-[10px] border border-border object-cover"
                    style={{ aspectRatio: "16/10" }}
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
                  className="w-[220px] rounded-[10px] border border-dashed border-border flex items-center justify-center text-[12px] font-mono text-text-2"
                  style={{ aspectRatio: "16/10" }}
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
          </div>

          <div>
            <span className={labelText}>Screenshots (case study)</span>
            <div className="mt-2 flex items-start gap-4 flex-wrap">
              {data.shots.map((url, i) => (
                <div key={url + i} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Screenshot ${i + 1}`}
                    className="w-[160px] rounded-[10px] border border-border object-cover"
                    style={{ aspectRatio: "4/3" }}
                  />
                  <button
                    type="button"
                    onClick={() => set("shots", data.shots.filter((_, idx) => idx !== i))}
                    className="absolute top-2 right-2 px-2 py-1 rounded-[8px] border-none text-[12px] font-semibold cursor-pointer bg-[rgba(0,0,0,.65)] text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <UploadButton
                label="+ Add screenshot"
                onDone={(url) => { setImgError(null); set("shots", [...data.shots, url]); }}
                onError={setImgError}
              />
            </div>
          </div>

          {imgError && <p className="text-[13px] m-0" style={{ color: "#c0392b" }}>{imgError}</p>}
        </div>
      </Group>

      <Group title="Case study" desc="Shown on the project detail page. All optional.">
        <div className="grid gap-5">
          <Field label="Summary (one-line tagline)">
            <textarea className={input} rows={2} value={data.summary} onChange={(e) => set("summary", e.target.value)} />
          </Field>
          <Field label="The problem">
            <textarea className={input} rows={3} value={data.problem} onChange={(e) => set("problem", e.target.value)} />
          </Field>
          <Field label="How I approached it — process steps (one per line)">
            <textarea className={input} rows={4} value={listVal(data.process)} onChange={(e) => set("process", parseList(e.target.value))} />
          </Field>
          <Field label="Built with — stack (one per line)">
            <textarea className={input} rows={3} value={listVal(data.stack)} onChange={(e) => set("stack", parseList(e.target.value))} />
          </Field>
          <Field label="Live URL">
            <input className={input} value={data.live} onChange={(e) => set("live", e.target.value)} />
          </Field>
        </div>
      </Group>

      <Group
        title="Custom sections"
        desc="Add your own blocks (heading + text). They appear on the case study page in this order."
      >
        <div className="flex flex-col gap-4">
          {data.sections.length === 0 && (
            <p className="text-[13px] text-text-2 m-0">No custom sections yet.</p>
          )}
          {data.sections.map((s, i) => (
            <div key={i} className="border border-border rounded-[12px] p-4 bg-bg">
              <div className="flex items-center gap-2 mb-3">
                <input
                  className={`${input} flex-1`}
                  placeholder="Section heading (e.g. The challenge)"
                  value={s.heading}
                  onChange={(e) => updateSection(i, "heading", e.target.value)}
                />
                <button type="button" onClick={() => moveSection(i, -1)} disabled={i === 0}
                  className="px-2 py-2 rounded-[8px] border border-border text-[13px] cursor-pointer disabled:opacity-40" aria-label="Move up">↑</button>
                <button type="button" onClick={() => moveSection(i, 1)} disabled={i === data.sections.length - 1}
                  className="px-2 py-2 rounded-[8px] border border-border text-[13px] cursor-pointer disabled:opacity-40" aria-label="Move down">↓</button>
                <button type="button" onClick={() => removeSection(i)}
                  className="px-3 py-2 rounded-[8px] border border-border text-[13px] cursor-pointer" style={{ color: "#c0392b" }}>Remove</button>
              </div>
              <textarea
                className={input}
                rows={3}
                placeholder="Section text..."
                value={s.body}
                onChange={(e) => updateSection(i, "body", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="self-start px-4 py-[10px] rounded-[10px] border border-border text-[14px] font-semibold bg-transparent text-text cursor-pointer hover:bg-soft transition-colors"
          >
            + Add section
          </button>
        </div>
      </Group>

      <Group title="Results" desc="Big stat numbers on the case study. Format: value | label.">
        <Field label="Results (one per line)">
          <textarea
            className={input}
            rows={3}
            placeholder="In production | at a government college"
            value={resultsVal(data.results)}
            onChange={(e) => set("results", parseResults(e.target.value))}
          />
        </Field>
      </Group>

      <Group title="Display (advanced)" desc="Visual details — defaults are usually fine.">
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Number badge (01)">
            <input className={input} value={data.no} onChange={(e) => set("no", e.target.value)} />
          </Field>
          <Field label="Sort order (lower = first)">
            <input type="number" className={input} value={data.sort} onChange={(e) => set("sort", Number(e.target.value))} />
          </Field>
          <Field label="Mark glyph">
            <input className={input} value={data.mark} onChange={(e) => set("mark", e.target.value)} />
          </Field>
          <Field label="Shot label (dashboard)">
            <input className={input} value={data.shot} onChange={(e) => set("shot", e.target.value)} />
          </Field>
          <Field label="Card background">
            <select className={input} value={data.bg} onChange={(e) => set("bg", e.target.value)}>
              {BGS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </Field>
        </div>
      </Group>

      {error && <p className="text-[13px] mb-4" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="flex gap-3 sticky bottom-0 bg-bg py-4">
        <button
          type="submit"
          disabled={busy}
          className="px-6 py-3 rounded-full bg-accent text-white font-semibold text-[14px] border-none cursor-pointer disabled:opacity-60"
        >
          {busy ? "Saving..." : isEdit ? "Save changes" : "Create project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="px-6 py-3 rounded-full border border-border text-text font-semibold text-[14px] bg-transparent cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
