import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin-guard";

export const runtime = "nodejs";

const BUCKET = "project-images";
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB
const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

/**
 * POST /api/admin/upload — multipart form with a `file` field.
 * Stores the image in the public `project-images` bucket and
 * returns { url } (the public URL to save on the project).
 */
export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }
  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Only PNG, JPG, WebP or GIF images." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image too large — max 4 MB." }, { status: 400 });
  }

  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(name, buf, { contentType: file.type, upsert: false });
  if (error) {
    return NextResponse.json(
      { error: `Upload failed: ${error.message}. (Bucket missing? Re-run supabase/schema.sql.)` },
      { status: 500 }
    );
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(name);
  return NextResponse.json({ url: data.publicUrl });
}
