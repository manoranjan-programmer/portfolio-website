import dbConnect from "../../../lib/dbConnect"
import Skill from "../../../models/Skill"
import { verifyToken } from "../../../lib/auth"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "PUT") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    const { name, category, level } = req.body
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.query.id,
      { name, category, level },
      { new: true }
    )

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" })
    }

    return res.status(200).json(updatedSkill)
  }

  if (req.method === "DELETE") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    const deletedSkill = await Skill.findByIdAndDelete(req.query.id)
    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" })
    }

    return res.status(200).json({ message: "Skill deleted successfully" })
  }

  res.setHeader("Allow", ["PUT", "DELETE"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
