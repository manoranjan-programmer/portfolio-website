import { NextResponse } from "next/server"
import { verifyRequestToken } from "../../../../lib/auth"
import { unauthorizedResponse } from "../../../../lib/requestData"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function PUT(request, { params }) {
  const adminId = verifyRequestToken(request)

  if (!adminId) {
    return unauthorizedResponse()
  }

  const [{ default: dbConnect }, { default: Certification }] = await Promise.all([
    import("../../../../lib/dbConnect"),
    import("../../../../models/Certification"),
  ])

  await dbConnect()

  const { id } = await params
  const updateData = await request.json()

  if (updateData.image === "") {
    delete updateData.image
  }

  if (updateData.achievementImage === "") {
    delete updateData.achievementImage
  }

  const updatedCertification = await Certification.findByIdAndUpdate(id, updateData, { new: true })
  return NextResponse.json(updatedCertification)
}

export async function DELETE(request, { params }) {
  const adminId = verifyRequestToken(request)

  if (!adminId) {
    return unauthorizedResponse()
  }

  const [{ default: dbConnect }, { default: Certification }] = await Promise.all([
    import("../../../../lib/dbConnect"),
    import("../../../../models/Certification"),
  ])

  await dbConnect()

  const { id } = await params
  await Certification.findByIdAndDelete(id)

  return NextResponse.json({ message: "Certification deleted successfully" })
}
