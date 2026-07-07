"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function MessagesList({ messages }: { messages: AdminMessage[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const toggleRead = async (m: AdminMessage) => {
    setBusy(m.id);
    await fetch(`/api/admin/messages/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
    });
    setBusy(null);
    router.refresh();
  };

  const del = async (m: AdminMessage) => {
    if (!confirm(`Delete message from ${m.name}?`)) return;
    setBusy(m.id);
    await fetch(`/api/admin/messages/${m.id}`, { method: "DELETE" });
    setBusy(null);
    router.refresh();
  };

  if (messages.length === 0) {
    return (
      <div className="bg-soft border border-border rounded-[14px] p-8 text-center text-text-2">
        No messages yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((m) => (
        <div
          key={m.id}
          className="bg-surface border rounded-[14px] p-5"
          style={{ borderColor: m.read ? "var(--border)" : "var(--accent)" }}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[15px]">{m.name}</span>
                {!m.read && (
                  <span className="text-[11px] font-mono px-2 py-[2px] rounded-full bg-accent-soft text-accent">
                    new
                  </span>
                )}
              </div>
              <a href={`mailto:${m.email}`} className="text-[13px] text-accent no-underline">
                {m.email}
              </a>
            </div>
            <span className="text-[12px] text-text-2 font-mono whitespace-nowrap">
              {new Date(m.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-[14px] leading-[1.6] text-text-2 m-0 mb-3 whitespace-pre-wrap">
            {m.message}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => toggleRead(m)}
              disabled={busy === m.id}
              className="px-3 py-[6px] rounded-[8px] border border-border text-[12px] font-semibold bg-transparent text-text cursor-pointer disabled:opacity-50"
            >
              Mark {m.read ? "unread" : "read"}
            </button>
            <button
              onClick={() => del(m)}
              disabled={busy === m.id}
              className="px-3 py-[6px] rounded-[8px] border border-border text-[12px] font-semibold bg-transparent cursor-pointer disabled:opacity-50"
              style={{ color: "#c0392b" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
