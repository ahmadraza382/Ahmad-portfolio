import { NextResponse } from "next/server";
import { checkCredentials, createToken, SESSION_COOKIE, cookieOptions } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const password = body.password || "";

  if (!checkCredentials(email, password)) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createToken(), cookieOptions);
  return res;
}
