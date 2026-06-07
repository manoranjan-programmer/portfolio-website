import dbConnect from "../../../lib/dbConnect"
import Experience from "../../../models/Experience"
import { verifyToken } from "../../../lib/auth"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "PUT") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    const updatedExperience = await Experience.findByIdAndUpdate(req.query.id, req.body, { new: true })
    return res.status(200).json(updatedExperience)
  }

  if (req.method === "DELETE") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    await Experience.findByIdAndDelete(req.query.id)
    return res.status(200).json({ message: "Experience deleted successfully" })
  }

  res.setHeader("Allow", ["PUT", "DELETE"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
