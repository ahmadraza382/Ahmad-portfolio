import { getAllProjects } from "@/lib/projects";
import { getPublishedPosts } from "@/lib/blog";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/site";

export const revalidate = 3600;
export const runtime = "nodejs";

/**
 * GET /llms.txt — the llms.txt convention (https://llmstxt.org):
 * a plain-text, LLM-friendly map of the site. Served as text/plain.
 */
export async function GET() {
  const [projects, posts] = await Promise.all([getAllProjects(), getPublishedPosts()]);

  const projectLines = projects
    .map((p) => `- [${p.title}](${SITE_URL}/work/${p.slug}): ${p.blurb}`)
    .join("\n");

  const postLines =
    posts.length > 0
      ? posts
          .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`)
          .join("\n")
      : "- (no posts published yet)";

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Ahmad Raza is a freelance full-stack developer based in Faisalabad, Pakistan,
building production web apps end to end with React, Next.js, Node and TypeScript.

## Key pages

- [Home](${SITE_URL}/): Overview, services, skills, featured work and contact.
- [Work](${SITE_URL}/work): Selected projects and case studies.
- [Blog](${SITE_URL}/blog): Articles on web development, craft and performance.
- [About](${SITE_URL}/about): Background, values and timeline.

## Work / case studies

${projectLines}

## Blog posts

${postLines}

## Contact

- Email: ${CONTACT_EMAIL}
- GitHub: ${GITHUB_URL}
- LinkedIn: ${LINKEDIN_URL}
- Contact form: ${SITE_URL}/#contact
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
