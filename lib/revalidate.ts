// ============================================================
// ISR revalidation helpers. Public content pages use `revalidate`
// (ISR); after an admin write we call these so the change appears
// immediately instead of waiting for the time-based fallback.
// ============================================================
import { revalidatePath } from "next/cache";

/** Refresh the public pages that render project content. */
export function revalidateProjects(slug?: string) {
  revalidatePath("/");
  revalidatePath("/work");
  if (slug) revalidatePath(`/work/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
}

/** Refresh the public pages that render blog content. */
export function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
}
