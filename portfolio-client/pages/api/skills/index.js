import dbConnect from "../../../lib/dbConnect"
import Skill from "../../../models/Skill"
import { verifyToken } from "../../../lib/auth"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    const skills = await Skill.find().sort({ createdAt: -1 })
    return res.status(200).json(skills)
  }

  if (req.method === "POST") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    const { name, category, level } = req.body
    if (!name || !category || !level) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const newSkill = await Skill.create({ name, category, level })
    return res.status(201).json(newSkill)
  }

  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
