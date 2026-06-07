import { NextResponse } from "next/server"
import { uploadBlobFile, isUploadFile } from "../../../lib/blobUpload"
import { verifyRequestToken } from "../../../lib/auth"
import { unauthorizedResponse } from "../../../lib/requestData"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request) {
  try {
    const adminId = verifyRequestToken(request)

    if (!adminId) {
      return unauthorizedResponse()
    }

    const formData = await request.formData()
    const files = [
      ...formData.getAll("file"),
      ...formData.getAll("files"),
    ].filter((file) => isUploadFile(file) && file.size > 0)

    if (files.length === 0) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const blob = await uploadBlobFile(file)

        return {
          url: blob.url,
          pathname: blob.pathname,
          contentType: blob.contentType,
          size: file.size,
        }
      })
    )

    return NextResponse.json({
      url: uploads[0].url,
      urls: uploads.map((upload) => upload.url),
      files: uploads,
    })
  } catch (error) {
    console.error("Blob upload failed:", error)

    const message = error instanceof Error ? error.message : "Upload failed"
    const isBlobStoreConfigError =
      message.includes("This store does not exist") ||
      message.includes("Missing BLOB_READ_WRITE_TOKEN")

    return NextResponse.json(
      {
        message: isBlobStoreConfigError
          ? "Vercel Blob is not connected correctly. Reconnect/create a Blob store for this Vercel project and redeploy so BLOB_READ_WRITE_TOKEN points to an existing store."
          : "Upload failed",
        detail: message,
      },
      { status: isBlobStoreConfigError ? 500 : 400 }
    )
  }
}
