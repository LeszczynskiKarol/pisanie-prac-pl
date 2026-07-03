// Lambda: <brand>-presign
// Wzorzec z D:\mekra.pl\aws-lambdas\presign-upload\index.mjs
//
// Generuje presigned PUT URL do uploadu pliku na S3.
// Frontend (ContactForm.astro) woła POST /presign z { filename, contentType, size },
// dostaje { uploadUrl, key }, robi PUT bezpośrednio do S3 z tą URL.
//
// ALLOWED_ORIGINS, BUCKET_NAME, AWS_REGION — z env vars (setup-contact-form.sh ustawia).

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const s3 = new S3Client({ region: process.env.AWS_REGION || "eu-central-1" });
const BUCKET = process.env.BUCKET_NAME;
const DOMAIN = process.env.DOMAIN;

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

// Rozszerzenia akceptowane domyślnie — szeroki zakres (dokumenty, obrazy, archiwa, CAD).
// Per-projekt można zawęzić edytując ALLOWED_EXTENSIONS env lub tę listę.
const ALLOWED_EXTENSIONS = (process.env.ALLOWED_EXTENSIONS?.split(",") ?? [
  ".pdf", ".doc", ".docx", ".txt", ".rtf", ".odt",
  ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".heic",
  ".pptx", ".xlsx", ".xls", ".csv",
  ".zip", ".rar", ".7z",
  ".dwg", ".dxf", ".step", ".stp", ".iges", ".igs",
  ".mp4", ".mov",
]).map((e) => e.trim().toLowerCase());

const ALLOWED_ORIGINS = [
  `https://www.${DOMAIN}`,
  `https://${DOMAIN}`,
  "http://localhost:4321",
];

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
    const { filename, contentType, size } = body;

    if (!filename || !contentType) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Brak nazwy pliku lub typu" }),
      };
    }

    if (size && size > MAX_SIZE) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Plik za duży (maks. 10 MB)" }),
      };
    }

    const ext = "." + filename.split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Niedozwolony format pliku. Dozwolone: " + ALLOWED_EXTENSIONS.join(", "),
        }),
      };
    }

    const date = new Date().toISOString().slice(0, 10);
    const uuid = randomUUID().slice(0, 8);
    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `uploads/${date}/${uuid}-${safeFilename}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 600 });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ uploadUrl, key }),
    };
  } catch (error) {
    console.error("Presign error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Błąd generowania linku" }),
    };
  }
};
