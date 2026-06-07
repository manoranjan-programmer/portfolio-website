import dbConnect from "../../../lib/dbConnect"
import { verifyToken } from "../../../lib/auth"
import Project from "../../../models/Project"
import Experience from "../../../models/Experience"
import Certification from "../../../models/Certification"
import Skill from "../../../models/Skill"
import Contact from "../../../models/Contact"
import Education from "../../../models/Education"
import Leadership from "../../../models/Leadership"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const adminId = verifyToken(req, res)
  if (!adminId) return

  const [
    projectCount,
    experienceCount,
    certificationCount,
    skillCount,
    contactCount,
    educationCount,
    leadershipCount,
  ] = await Promise.all([
    Project.countDocuments(),
    Experience.countDocuments(),
    Certification.countDocuments(),
    Skill.countDocuments(),
    Contact.countDocuments(),
    Education.countDocuments(),
    Leadership.countDocuments(),
  ])

  return res.status(200).json({
    projectCount,
    experienceCount,
    certificationCount,
    skillCount,
    contactCount,
    educationCount,
    leadershipCount,
  })
}
