import dbConnect from "../../../lib/dbConnect"
import Project from "../../../models/Project"
import { verifyToken } from "../../../lib/auth"
import upload, { runMiddleware } from "../../../lib/uploadMiddleware"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    const projects = await Project.find()
    return res.status(200).json(projects)
  }

  if (req.method === "POST") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    await runMiddleware(req, res, upload.single("image"))
    const projectData = { ...req.body }

    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`
    }

    if (typeof projectData.technologies === "string") {
      projectData.technologies = projectData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean)
    }

    const project = await Project.create(projectData)
    return res.status(201).json(project)
  }

  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
