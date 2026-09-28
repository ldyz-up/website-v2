const ALLOWED_ORIGINS = new Set([
  "https://ldyzgroup.com",
  "https://www.ldyzgroup.com"
]);
const MAX_TOTAL_FILE_BYTES = 15 * 1024 * 1024;
const MAX_FIELD_LENGTH = 12000;
const ALLOWED_EXTENSIONS = new Set([
  "png", "jpg", "jpeg", "webp", "pdf", "ai", "psd", "dxf", "dwg",
  "doc", "docx", "xls", "xlsx", "svg"
]);

function json(data, status, origin) {
  const headers = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["access-control-allow-origin"] = origin;
    headers["access-control-allow-methods"] = "POST, OPTIONS";
    headers["access-control-allow-headers"] = "content-type";
    headers["access-control-max-age"] = "86400";
    headers["vary"] = "Origin";
  }
  return new Response(JSON.stringify(data), { status, headers });
}

function clean(value, max = MAX_FIELD_LENGTH) {
  return String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function safeFilename(value) {
  const leaf = clean(value, 180).split(/[\\/]/).pop() || "inquiry-file";
  const name = leaf.replace(/[^A-Za-z0-9._-]/g, "_");
  const ext = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
  if (!ALLOWED_EXTENSIONS.has(ext) || /\.(php\d*|phtml|phar|html?|js|mjs|svgz)$/i.test(name)) {
    throw new Error("One of the attachments has an unsupported file type.");
  }
  return name;
}

function toBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let start = 0; start < bytes.length; start += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(start, start + chunkSize));
  }
  return btoa(binary);
}

function ownerDetails(form) {
  const owner = clean(form.get("original_source_owner"), 20).toUpperCase();
  if (owner === "LDYZ") return { code: owner, label: "龙德益智 LDYZ" };
  if (owner === "LDPLASTIC") return { code: owner, label: "龙德塑胶 LDPLASTIC" };
  return { code: "SHARED", label: "共享/未分配" };
}

function formFields(form) {
  const result = [];
  for (const [key, value] of form.entries()) {
    if (value instanceof File || key === "access_key" || key === "subject" || key === "website") continue;
    const label = clean(key, 80);
    if (!label) continue;
    result.push([label, clean(value)]);
  }
  return result;
}

async function handle(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (request.method === "OPTIONS") {
    if (!ALLOWED_ORIGINS.has(origin)) return json({ success: false, message: "Origin not allowed." }, 403, origin);
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": origin,
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type",
        "access-control-max-age": "86400",
        "vary": "Origin"
      }
    });
  }
  if (request.method !== "POST") return json({ success: false, message: "Use POST to submit an inquiry." }, 405, origin);
  if (!ALLOWED_ORIGINS.has(origin)) return json({ success: false, message: "Origin not allowed." }, 403, origin);
  if (!env.RESEND_API_KEY || !env.INQUIRY_TO || !env.INQUIRY_FROM) {
    return json({ success: false, message: "The inquiry email service is not configured yet." }, 503, origin);
  }
  if (!(request.headers.get("content-type") || "").toLowerCase().includes("multipart/form-data")) {
    return json({ success: false, message: "Expected a form submission." }, 415, origin);
  }

  let form;
  try { form = await request.formData(); }
  catch (_) { return json({ success: false, message: "The submitted form could not be read." }, 400, origin); }
  if (clean(form.get("website"), 200)) return json({ success: true }, 200, origin);

  const name = clean(form.get("name"), 100);
  const company = clean(form.get("company"), 120);
  const email = clean(form.get("email"), 254).toLowerCase();
  if (!name || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ success: false, message: "Please check the required name, company and email fields." }, 400, origin);
  }

  const attachments = [];
  let totalBytes = 0;
  try {
    for (const [field, value] of form.entries()) {
      if (!(value instanceof File) || value.size === 0) continue;
      totalBytes += value.size;
      if (totalBytes > MAX_TOTAL_FILE_BYTES) throw new Error("Attachments must be 15 MB or smaller in total.");
      const filename = field === "preview_file" ? "binder-configuration-preview.svg" : safeFilename(value.name);
      if (field === "preview_file" && value.size > 5 * 1024 * 1024) throw new Error("The generated preview file is too large.");
      const bytes = new Uint8Array(await value.arrayBuffer());
      attachments.push({ filename, content: toBase64(bytes), content_type: value.type || "application/octet-stream" });
    }
  } catch (error) {
    return json({ success: false, message: error.message || "An attachment could not be processed." }, 400, origin);
  }

  const fields = formFields(form);
  const owner = ownerDetails(form);
  const source = clean(form.get("original_utm_source"), 80) || "direct";
  const lang = clean(form.get("lang"), 20) || "unknown";
  const product = clean(form.get("product") || form.get("category"), 160) || "Website inquiry";
  const subject = `[归属:${owner.label}][${source}] [${lang}] 官网询盘 - ${company} - ${product}`.replace(/[\r\n]+/g, " ").slice(0, 240);
  const textBody = fields.map(([key, value]) => `${key}:\n${value || "-"}`).join("\n\n");
  const htmlRows = fields.map(([key, value]) => `<tr><th style="text-align:left;background:#f7f6ef;padding:8px;border:1px solid #ddd">${escapeHtml(key)}</th><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap;word-break:break-word">${escapeHtml(value || "-")}</td></tr>`).join("");
  const message = {
    from: env.INQUIRY_FROM,
    to: [env.INQUIRY_TO],
    reply_to: [email],
    subject,
    text: textBody,
    html: `<div style="font-family:Arial,sans-serif;color:#16324f"><h2>New website inquiry</h2><p><strong>Attribution:</strong> ${escapeHtml(owner.label)} · ${escapeHtml(source)}</p><table style="border-collapse:collapse;width:100%">${htmlRows}</table></div>`
  };
  if (attachments.length) message.attachments = attachments;

  let sent;
  try {
    sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "authorization": `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify(message)
    });
  } catch (_) {
    return json({ success: false, message: "The email provider could not be reached. Your form is still available; please retry." }, 502, origin);
  }
  const result = await sent.json().catch(() => ({}));
  if (!sent.ok || !result.id) {
    console.error("Inquiry delivery rejected by email provider", sent.status, result.name || result.message || "unknown error");
    return json({ success: false, message: "The email provider did not accept this inquiry. Please retry or contact sales@longdeyizhi.com." }, 502, origin);
  }
  return json({ success: true, id: result.id }, 200, origin);
}

export default { fetch: handle };
