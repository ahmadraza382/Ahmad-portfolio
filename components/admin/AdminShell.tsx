"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminShell({
  children,
  authed,
}: {
  children: React.ReactNode;
  authed: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Login page: render bare, centered, no sidebar.
  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-bg text-text flex items-center justify-center px-5 font-sans">
        {children}
      </div>
    );
  }

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-[240px] md:min-h-screen border-b md:border-b-0 md:border-r border-border bg-surface flex md:flex-col">
        <div className="flex items-center gap-3 px-5 py-5 border-border md:border-b">
          <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-accent text-white font-serif text-[22px] leading-none pb-[2px]">
            a
          </span>
          <div className="leading-tight">
            <div className="font-bold text-[15px]">Ahmad Raza</div>
            <div className="text-[12px] text-text-2">Admin panel</div>
          </div>
        </div>
        <nav className="flex md:flex-col gap-1 p-3 flex-1">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-[10px] rounded-[10px] text-[14px] font-semibold no-underline transition-colors"
                style={{
                  background: active ? "var(--accent-soft)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text)",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 hidden md:block">
          <button
            onClick={logout}
            className="w-full px-4 py-[10px] rounded-[10px] text-[14px] font-semibold border border-border bg-transparent text-text cursor-pointer hover:bg-soft transition-colors"
          >
            Log out
          </button>
        </div>
        <button
          onClick={logout}
          className="md:hidden m-3 px-4 py-[10px] rounded-[10px] text-[14px] font-semibold border border-border bg-transparent text-text cursor-pointer"
        >
          Log out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 px-5 py-8 md:px-10 md:py-10 max-w-[1100px] w-full mx-auto">
        {!authed ? (
          <div className="text-text-2">Redirecting to login…</div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
