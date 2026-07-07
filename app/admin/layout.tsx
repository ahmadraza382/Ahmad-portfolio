import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import { isAdmin } from "@/lib/admin-guard";

export const metadata: Metadata = {
  title: "Admin — Ahmad Raza",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // The login page renders its own bare shell; all other admin pages are
  // wrapped in the dashboard chrome only when authenticated. Middleware +
  // this server-side check both gate access.
  return <AdminShell authed={isAdmin()}>{children}</AdminShell>;
}
