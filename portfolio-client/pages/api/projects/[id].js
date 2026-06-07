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

  if (req.method === "PUT") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    await runMiddleware(req, res, upload.single("image"))
    const updateData = { ...req.body }

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`
    }

    if (typeof updateData.technologies === "string") {
      updateData.technologies = updateData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean)
    }

    if (updateData.image === "") {
      delete updateData.image
    }

    const updatedProject = await Project.findByIdAndUpdate(req.query.id, updateData, { new: true })
    return res.status(200).json(updatedProject)
  }

  if (req.method === "DELETE") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    await Project.findByIdAndDelete(req.query.id)
    return res.status(200).json({ message: "Project deleted successfully" })
  }

  res.setHeader("Allow", ["PUT", "DELETE"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
