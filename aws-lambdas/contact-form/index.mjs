// Lambda: <brand>-contact
// Wzorzec z D:\mekra.pl\aws-lambdas\contact-form\index.mjs
//
// Przyjmuje POST /contact z body:
//   {
//     name, email, phone?, message,
//     attachments?: [{ key, name, size }],  // klucze z presign-upload
//     ...extra fields (Lambda przepuszcza dowolne, zapisuje do treści maila)
//   }
// Wysyła HTML mail przez SES do TO_EMAIL.
// Załączniki: NIE pobiera plików — generuje 7-dniowe signed URL-e i wkleja
// jako linki do pobrania (oszczędność czasu Lambdy i kosztów transferu).

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = process.env.AWS_REGION || "eu-central-1";
const SES_REGION = "us-east-1";
const ses = new SESClient({ region: SES_REGION });
const s3 = new S3Client({ region: REGION });

const BUCKET = process.env.BUCKET_NAME;
const DOMAIN = process.env.DOMAIN;
const TO_EMAIL = process.env.TO_EMAIL || `kontakt@${DOMAIN}`;
const FROM_EMAIL = process.env.FROM_EMAIL || `formularz@${DOMAIN}`;
const FROM_NAME = process.env.FROM_NAME || DOMAIN;

const ALLOWED_ORIGINS = [
  `https://www.${DOMAIN}`,
  `https://${DOMAIN}`,
  "http://localhost:4321",
];

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export const handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  const allowOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : `https://www.${DOMAIN}`;

  const headers = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, phone, message, attachments, company, ...extra } = body;

    // Honeypot — pole `company` ukryte w HTML; legalni zostawiają puste.
    if (company) {
      console.warn("Honeypot tripped, dropping silently");
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Brak wymaganych pól (name, email, message)" }),
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Nieprawidłowy adres email" }),
      };
    }

    // Generuj linki do pobrania załączników (7 dni)
    let attachmentsHtml = "";
    if (BUCKET && Array.isArray(attachments) && attachments.length > 0) {
      const links = [];
      for (const att of attachments) {
        try {
          const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: att.key });
          const downloadUrl = await getSignedUrl(s3, cmd, { expiresIn: 7 * 24 * 60 * 60 });
          links.push(`
            <tr>
              <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">
                <a href="${downloadUrl}" style="color:#0f4c81;text-decoration:none">${escapeHtml(att.name)}</a>
                <span style="color:#94a3b8;font-size:12px"> · ${formatSize(att.size)}</span>
              </td>
            </tr>
          `);
        } catch (e) {
          console.error("Presign download error", att.key, e);
        }
      }
      if (links.length > 0) {
        attachmentsHtml = `
          <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:0.08em;color:#475569">
            Załączniki (${links.length}) — linki ważne 7 dni
          </h3>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden">
            ${links.join("")}
          </table>`;
      }
    }

    // Extra fields (cokolwiek dodatkowego klient włożył w form)
    let extraHtml = "";
    const extraEntries = Object.entries(extra).filter(([, v]) => v != null && v !== "");
    if (extraEntries.length > 0) {
      extraHtml = `
        <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;margin-top:8px">
          ${extraEntries.map(([k, v]) => `
            <tr>
              <td style="padding:10px 14px;font-weight:600;width:180px;border-bottom:1px solid #e2e8f0;text-transform:capitalize">${escapeHtml(k)}</td>
              <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0">${escapeHtml(v)}</td>
            </tr>
          `).join("")}
        </table>`;
    }

    const dateStr = new Date().toLocaleString("pl-PL", {
      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
    });

    const htmlBody = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f1f5f9;color:#0f172a">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px">
    <div style="border-left:4px solid #0f4c81;padding:8px 16px;margin-bottom:24px">
      <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#475569">Formularz · ${escapeHtml(DOMAIN)}</p>
      <h1 style="margin:6px 0 0;font-size:20px;font-weight:600">Nowe zapytanie</h1>
      <p style="margin:4px 0 0;font-size:12px;color:#94a3b8">${dateStr}</p>
    </div>

    <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden">
      <tr><td style="padding:12px 16px;font-weight:600;width:140px;border-bottom:1px solid #e2e8f0">Imię / firma</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:12px 16px;font-weight:600;border-bottom:1px solid #e2e8f0">E-mail</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0"><a href="mailto:${escapeHtml(email)}" style="color:#0f4c81">${escapeHtml(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:12px 16px;font-weight:600;border-bottom:1px solid #e2e8f0">Telefon</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0"><a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}" style="color:#0f4c81">${escapeHtml(phone)}</a></td></tr>` : ""}
      <tr><td style="padding:12px 16px;font-weight:600;vertical-align:top">Wiadomość</td>
          <td style="padding:12px 16px;line-height:1.6">${escapeHtml(message).replace(/\n/g, "<br>")}</td></tr>
    </table>

    ${extraHtml}
    ${attachmentsHtml}

    <div style="text-align:center;margin:28px 0">
      <a href="mailto:${escapeHtml(email)}"
         style="display:inline-block;padding:12px 28px;background:#0f4c81;color:#ffffff;text-decoration:none;font-size:14px;border-radius:6px;font-weight:500">
        Odpowiedz nadawcy →
      </a>
    </div>

    <p style="font-size:11px;color:#94a3b8;text-align:center;text-transform:uppercase;letter-spacing:0.06em">
      Wiadomość z formularza ${escapeHtml(DOMAIN)}
    </p>
  </div>
</body></html>`;

    const command = new SendEmailCommand({
      Source: `${FROM_NAME} <${FROM_EMAIL}>`,
      Destination: { ToAddresses: [TO_EMAIL] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `Wycena — ${name}`, Charset: "UTF-8" },
        Body: { Html: { Data: htmlBody, Charset: "UTF-8" } },
      },
    });

    const result = await ses.send(command);
    console.log("SES OK", result.MessageId, "→", TO_EMAIL);

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error("Contact form error:", error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Błąd wysyłania" }) };
  }
};
