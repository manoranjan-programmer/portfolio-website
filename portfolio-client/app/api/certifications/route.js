import { NextResponse } from "next/server"
import { verifyRequestToken } from "../../../lib/auth"
import { unauthorizedResponse } from "../../../lib/requestData"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const [{ default: dbConnect }, { default: Certification }] = await Promise.all([
    import("../../../lib/dbConnect"),
    import("../../../models/Certification"),
  ])

  await dbConnect()

  const certifications = await Certification.find()
  return NextResponse.json(certifications)
}

export async function POST(request) {
  const adminId = verifyRequestToken(request)

  if (!adminId) {
    return unauthorizedResponse()
  }

  const [{ default: dbConnect }, { default: Certification }] = await Promise.all([
    import("../../../lib/dbConnect"),
    import("../../../models/Certification"),
  ])

  await dbConnect()

  const certificationData = await request.json()
  const certification = await Certification.create(certificationData)

  return NextResponse.json(certification, { status: 201 })
}
