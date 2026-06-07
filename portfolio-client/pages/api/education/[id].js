import dbConnect from "../../../lib/dbConnect"
import Education from "../../../models/Education"
import { verifyToken } from "../../../lib/auth"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "PUT") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    try {
      const { degree, institution, duration, score } = req.body
      if (!degree || !institution || !duration) {
        return res.status(400).json({ message: "All fields are required" })
      }

      const education = await Education.findByIdAndUpdate(
        req.query.id,
        { degree, institution, duration, score },
        { new: true, runValidators: true }
      )

      if (!education) {
        return res.status(404).json({ message: "Education entry not found" })
      }

      return res.status(200).json(education)
    } catch (error) {
      return res.status(500).json({ message: "Unable to update education entry" })
    }
  }

  if (req.method === "DELETE") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    try {
      const education = await Education.findByIdAndDelete(req.query.id)
      if (!education) {
        return res.status(404).json({ message: "Education entry not found" })
      }

      return res.status(200).json({ message: "Education entry deleted successfully" })
    } catch (error) {
      return res.status(500).json({ message: "Unable to delete education entry" })
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
