import dbConnect from "../../../lib/dbConnect"
import Leadership from "../../../models/Leadership"
import { verifyToken } from "../../../lib/auth"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    try {
      const leadership = await Leadership.find().sort({ createdAt: -1 })
      return res.status(200).json(leadership)
    } catch (error) {
      return res.status(500).json({ message: "Unable to fetch leadership entries" })
    }
  }

  if (req.method === "POST") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    try {
      const { title, duration, description } = req.body
      if (!title || !duration || !description) {
        return res.status(400).json({ message: "All fields are required" })
      }

      const leadership = await Leadership.create({ title, duration, description })
      return res.status(201).json(leadership)
    } catch (error) {
      return res.status(500).json({ message: "Unable to create leadership entry" })
    }
  }

  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
