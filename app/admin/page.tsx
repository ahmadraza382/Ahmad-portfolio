import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getAllProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const projects = await getAllProjects();
  const supabase = getSupabaseAdmin();

  let messageCount = 0;
  let unreadCount = 0;
  let dbReady = false;
  if (supabase) {
    dbReady = true;
    const { count } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true });
    messageCount = count ?? 0;
    const { count: unread } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("read", false);
    unreadCount = unread ?? 0;
  }

  const featuredCount = projects.filter((p) => p.featured).length;

  const Card = ({ label, value, href }: { label: string; value: string | number; href?: string }) => {
    const inner = (
      <div className="bg-surface border border-border rounded-[16px] p-6 h-full">
        <div className="text-[13px] text-text-2 mb-2">{label}</div>
        <div className="font-serif text-[40px] leading-none">{value}</div>
      </div>
    );
    return href ? (
      <Link href={href} className="no-underline text-text">{inner}</Link>
    ) : (
      inner
    );
  };

  return (
    <div>
      <h1 className="font-serif text-[34px] m-0 mb-2">Dashboard</h1>
      <p className="text-text-2 m-0 mb-8">
        Welcome back. {dbReady ? "Connected to Supabase." : "Using sample data — add Supabase keys to go live."}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card label="Total projects" value={projects.length} href="/admin/projects" />
        <Card label="Featured" value={featuredCount} href="/admin/projects" />
        <Card label="Messages" value={dbReady ? messageCount : "—"} href="/admin/messages" />
        <Card label="Unread" value={dbReady ? unreadCount : "—"} href="/admin/messages" />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white font-semibold text-[14px] no-underline"
        >
          + New project
        </Link>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-text font-semibold text-[14px] no-underline"
        >
          Manage projects
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-text font-semibold text-[14px] no-underline"
        >
          View site ↗
        </Link>
      </div>

      {!dbReady && (
        <div className="mt-8 bg-soft border border-border rounded-[14px] p-5 text-[14px] text-text-2 leading-relaxed">
          <strong className="text-text">Supabase not connected.</strong> Add your{" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> to{" "}
          <code>.env.local</code>, run the SQL in <code>supabase/schema.sql</code>, then{" "}
          <code>npm run seed</code> to import the sample projects. Until then the public
          site shows the built-in sample content and editing is disabled.
        </div>
      )}
    </div>
  );
}
