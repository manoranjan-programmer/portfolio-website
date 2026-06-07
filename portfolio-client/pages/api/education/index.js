import dbConnect from "../../../lib/dbConnect"
import Education from "../../../models/Education"
import { verifyToken } from "../../../lib/auth"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    try {
      const education = await Education.find().sort({ createdAt: -1 })
      return res.status(200).json(education)
    } catch (error) {
      return res.status(500).json({ message: "Unable to fetch education entries" })
    }
  }

  if (req.method === "POST") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    try {
      const { degree, institution, duration, score } = req.body
      if (!degree || !institution || !duration) {
        return res.status(400).json({ message: "All fields are required" })
      }

      const education = await Education.create({ degree, institution, duration, score })
      return res.status(201).json(education)
    } catch (error) {
      return res.status(500).json({ message: "Unable to create education entry" })
    }
  }

  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
