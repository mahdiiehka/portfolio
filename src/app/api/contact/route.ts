import { NextResponse } from "next/server";

/**
 * ارسال پیام فرم تماس.
 *
 * برای فعال‌سازی، در فایل `.env.local` این‌ها را پر کن:
 *   CONTACT_TO_EMAIL=you@example.com
 *   و یکی از دو گزینه:
 *   RESEND_API_KEY=...            (پیشنهادی)
 *   WEB3FORMS_ACCESS_KEY=...      (بدون نیاز به دامنه)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // جلوگیری از بزرگ شدن بی‌نهایت حافظه
  if (hits.size > 5000) hits.clear();

  return recent.length > MAX_REQUESTS;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return fail("invalid_json", 400);
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const honeypot =
    typeof payload.company === "string" ? payload.company.trim() : "";

  // میدان تله برای ربات‌ها؛ به کاربر واقعی پاسخ موفق می‌دهیم
  if (honeypot) return NextResponse.json({ ok: true });

  if (name.length < 2 || name.length > 80) return fail("invalid_name", 422);
  if (!EMAIL_RE.test(email) || email.length > 160) {
    return fail("invalid_email", 422);
  }
  if (message.length < 10 || message.length > 4000) {
    return fail("invalid_message", 422);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) return fail("rate_limited", 429);

  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!to) return fail("not_configured", 503);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const subject = `Portfolio message from ${name}`;
  const text = `${message}\n\n— ${name} <${email}>`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,Arial,sans-serif;line-height:1.7;color:#1b1815">
      <h2 style="margin:0 0 16px;font-size:18px">New message from your portfolio</h2>
      <p style="margin:0 0 8px"><strong>Name:</strong> ${safeName}</p>
      <p style="margin:0 0 8px"><strong>Email:</strong> ${safeEmail}</p>
      <hr style="border:none;border-top:1px solid #ded5c5;margin:16px 0" />
      <p style="margin:0;white-space:normal">${safeMessage}</p>
    </div>
  `.trim();

  // ── گزینهٔ ۱: Resend ─────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY?.trim();

  if (resendKey) {
    const from =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      "Portfolio <onboarding@resend.dev>";

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error("Resend error:", await response.text());
      return fail("send_failed", 502);
    }

    return NextResponse.json({ ok: true });
  }

  // ── گزینهٔ ۲: Web3Forms ──────────────────────────────────────
  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();

  if (web3formsKey) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject,
        from_name: "Portfolio",
        name,
        email,
        message,
      }),
    });

    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
    } | null;

    if (!response.ok || !result?.success) {
      console.error("Web3Forms error:", result);
      return fail("send_failed", 502);
    }

    return NextResponse.json({ ok: true });
  }

  // ── گزینهٔ ۳: FormSubmit (بدون کلید؛ اولین ارسال ایمیل تأیید می‌فرستد) ──
  const formsubmitEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`;

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const origin =
    request.headers.get("origin") ??
    (host ? `https://${host}` : "https://localhost:3000");
  const referer = request.headers.get("referer") ?? `${origin}/`;

  try {
    const response = await fetch(formsubmitEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: referer,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: subject,
        _template: "table",
        _captcha: "false",
      }),
    });

    const result = (await response.json().catch(() => null)) as {
      success?: boolean | string;
      message?: string;
    } | null;

    const success =
      result?.success === true || result?.success === "true";

    if (success) {
      return NextResponse.json({ ok: true });
    }

    // اولین ارسال: FormSubmit ایمیل فعال‌سازی می‌فرستد
    if (/activation/i.test(result?.message ?? "")) {
      return NextResponse.json({ ok: true, activationRequired: true });
    }

    console.error("FormSubmit error:", result);
    return fail("send_failed", 502);
  } catch (error) {
    console.error("FormSubmit request failed:", error);
    return fail("send_failed", 502);
  }
}
