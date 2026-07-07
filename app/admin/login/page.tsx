"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Login failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setBusy(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3 rounded-[10px] bg-bg border border-border text-text text-[15px] outline-none focus:border-accent transition-colors";

  return (
    <div className="w-full max-w-[400px] bg-surface border border-border rounded-[20px] p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-full bg-accent text-white font-serif text-[24px] leading-none pb-[2px]">
          a
        </span>
        <div>
          <h1 className="font-serif text-[26px] m-0 leading-tight">Admin</h1>
          <p className="text-[13px] text-text-2 m-0">Sign in to manage your portfolio</p>
        </div>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-[6px]">
          <span className="text-[12px] font-mono uppercase tracking-[.08em] text-text-2">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-[6px]">
          <span className="text-[12px] font-mono uppercase tracking-[.08em] text-text-2">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className={inputCls}
          />
        </label>

        {error && (
          <p className="text-[13px] m-0" style={{ color: "var(--color-text-danger, #c0392b)" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-2 w-full py-3 rounded-full border-none bg-accent text-white font-semibold text-[15px] cursor-pointer disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
