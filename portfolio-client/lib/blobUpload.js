import { put } from "@vercel/blob"

function sanitizeFileName(fileName) {
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
}

export function isUploadFile(value) {
  return value && typeof value === "object" && typeof value.arrayBuffer === "function"
}

export async function uploadBlobFile(file, folder = "uploads") {
  const safeName = sanitizeFileName(file.name || "upload")
  const pathname = `${folder}/${Date.now()}-${safeName}`

  return put(pathname, file, {
    access: "public",
    contentType: file.type || "application/octet-stream",
  })
}
