import dbConnect from "../../../lib/dbConnect"
import Leadership from "../../../models/Leadership"
import { verifyToken } from "../../../lib/auth"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "PUT") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    try {
      const { title, duration, description } = req.body
      if (!title || !duration || !description) {
        return res.status(400).json({ message: "All fields are required" })
      }

      const leadership = await Leadership.findByIdAndUpdate(
        req.query.id,
        { title, duration, description },
        { new: true, runValidators: true }
      )

      if (!leadership) {
        return res.status(404).json({ message: "Leadership entry not found" })
      }

      return res.status(200).json(leadership)
    } catch (error) {
      return res.status(500).json({ message: "Unable to update leadership entry" })
    }
  }

  if (req.method === "DELETE") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    try {
      const leadership = await Leadership.findByIdAndDelete(req.query.id)
      if (!leadership) {
        return res.status(404).json({ message: "Leadership entry not found" })
      }

      return res.status(200).json({ message: "Leadership entry deleted successfully" })
    } catch (error) {
      return res.status(500).json({ message: "Unable to delete leadership entry" })
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
