import dbConnect from "../../../lib/dbConnect"
import Experience from "../../../models/Experience"
import { verifyToken } from "../../../lib/auth"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    const experiences = await Experience.find()
    return res.status(200).json(experiences)
  }

  if (req.method === "POST") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    const experience = await Experience.create(req.body)
    return res.status(201).json(experience)
  }

  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
