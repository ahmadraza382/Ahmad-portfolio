import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Escape user input before interpolating into the HTML email body. */
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const LIMITS = { name: 100, email: 200, message: 5000 };

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  // 1) Store in Supabase (table: contact_messages). Skipped silently if not configured.
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });
    if (error) {
      console.error("Supabase insert failed:", error.message);
    }
  }

  // 2) Send email via Nodemailer (SMTP). Skipped if SMTP env vars are missing.
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${SMTP_USER}>`,
        to: CONTACT_TO_EMAIL || SMTP_USER,
        replyTo: email,
        subject: `New message from ${name.slice(0, 80)}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<h2>New portfolio message</h2>
               <p><strong>Name:</strong> ${escapeHtml(name)}</p>
               <p><strong>Email:</strong> ${escapeHtml(email)}</p>
               <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      });
    } catch (err) {
      console.error("Email send failed:", err);
      return NextResponse.json(
        { error: "Saved, but email delivery failed." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
