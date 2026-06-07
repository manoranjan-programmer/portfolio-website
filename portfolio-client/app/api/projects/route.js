import { NextResponse } from "next/server"
import { verifyRequestToken } from "../../../lib/auth"
import { parseCommaList, unauthorizedResponse } from "../../../lib/requestData"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const [{ default: dbConnect }, { default: Project }] = await Promise.all([
    import("../../../lib/dbConnect"),
    import("../../../models/Project"),
  ])

  await dbConnect()

  const projects = await Project.find()
  return NextResponse.json(projects)
}

export async function POST(request) {
  const adminId = verifyRequestToken(request)

  if (!adminId) {
    return unauthorizedResponse()
  }

  const [{ default: dbConnect }, { default: Project }] = await Promise.all([
    import("../../../lib/dbConnect"),
    import("../../../models/Project"),
  ])

  await dbConnect()

  const projectData = await request.json()
  projectData.technologies = parseCommaList(projectData.technologies)

  const project = await Project.create(projectData)
  return NextResponse.json(project, { status: 201 })
}
