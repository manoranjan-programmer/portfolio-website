import { NextResponse } from "next/server"
import { verifyRequestToken } from "../../../../lib/auth"
import { parseCommaList, unauthorizedResponse } from "../../../../lib/requestData"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function PUT(request, { params }) {
  const adminId = verifyRequestToken(request)

  if (!adminId) {
    return unauthorizedResponse()
  }

  const [{ default: dbConnect }, { default: Project }] = await Promise.all([
    import("../../../../lib/dbConnect"),
    import("../../../../models/Project"),
  ])

  await dbConnect()

  const { id } = await params
  const updateData = await request.json()
  updateData.technologies = parseCommaList(updateData.technologies)

  if (updateData.image === "") {
    delete updateData.image
  }

  const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true })
  return NextResponse.json(updatedProject)
}

export async function DELETE(request, { params }) {
  const adminId = verifyRequestToken(request)

  if (!adminId) {
    return unauthorizedResponse()
  }

  const [{ default: dbConnect }, { default: Project }] = await Promise.all([
    import("../../../../lib/dbConnect"),
    import("../../../../models/Project"),
  ])

  await dbConnect()

  const { id } = await params
  await Project.findByIdAndDelete(id)

  return NextResponse.json({ message: "Project deleted successfully" })
}
