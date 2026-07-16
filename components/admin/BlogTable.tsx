"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface AdminBlogRow {
  id: string;
  slug: string;
  title: string;
  date: string;
  published: boolean;
  /** ISO scheduled go-live; "" = none. */
  publishAt?: string;
}

/** draft | scheduled | published — from the stored fields. */
function statusOf(p: AdminBlogRow): "draft" | "scheduled" | "published" {
  if (!p.published) return "draft";
  if (p.publishAt && new Date(p.publishAt).getTime() > Date.now()) return "scheduled";
  return "published";
}

export default function BlogTable({ rows }: { rows: AdminBlogRow[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const del = async (id: string, title: string) => {
    if (!confirm(`Delete “${title}”? This cannot be undone.`)) return;
    setBusy(id);
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setBusy(null);
    if (res.ok) router.refresh();
    else alert("Delete failed.");
  };

  if (rows.length === 0) {
    return (
      <div className="bg-soft border border-border rounded-[14px] p-8 text-center text-text-2">
        No posts yet.{" "}
        <Link href="/admin/blog/new" className="text-accent font-semibold no-underline">
          Write your first post →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-[16px] overflow-hidden">
      {rows.map((p, i) => (
        <div
          key={p.id}
          className="flex items-center gap-4 px-5 py-4"
          style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[15px] truncate">{p.title}</span>
              {(() => {
                const s = statusOf(p);
                if (s === "published")
                  return <span className="text-[11px] font-mono px-2 py-[2px] rounded-full bg-accent-soft text-accent">published</span>;
                if (s === "scheduled")
                  return <span className="text-[11px] font-mono px-2 py-[2px] rounded-full" style={{ background: "var(--gold-soft)", color: "var(--gold)" }}>scheduled</span>;
                return <span className="text-[11px] font-mono px-2 py-[2px] rounded-full bg-soft text-text-2 border border-border">draft</span>;
              })()}
            </div>
            <div className="text-[12px] text-text-2 font-mono mt-[2px]">
              /{p.slug}
              {statusOf(p) === "scheduled" && p.publishAt
                ? ` · goes live ${new Date(p.publishAt).toLocaleString()}`
                : p.date ? ` · ${p.date}` : ""}
            </div>
          </div>
          <Link
            href={`/admin/blog/${p.id}`}
            className="px-4 py-2 rounded-[10px] border border-border text-text text-[13px] font-semibold no-underline"
          >
            Edit
          </Link>
          <button
            onClick={() => del(p.id, p.title)}
            disabled={busy === p.id}
            className="px-4 py-2 rounded-[10px] border border-border text-[13px] font-semibold cursor-pointer disabled:opacity-50"
            style={{ color: "#c0392b" }}
          >
            {busy === p.id ? "…" : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
