import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default function NewProject() {
  return (
    <div>
      <Link href="/admin/projects" className="text-[13px] font-mono text-text-2 no-underline">
        ← Projects
      </Link>
      <h1 className="font-serif text-[34px] m-0 mt-2 mb-6">New project</h1>
      <ProjectForm />
    </div>
  );
}
