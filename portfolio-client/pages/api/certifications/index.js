import dbConnect from "../../../lib/dbConnect"
import Certification from "../../../models/Certification"
import { verifyToken } from "../../../lib/auth"
import upload, { runMiddleware } from "../../../lib/uploadMiddleware"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    const certifications = await Certification.find()
    return res.status(200).json(certifications)
  }

  if (req.method === "POST") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    await runMiddleware(req, res, upload.fields([
      { name: "image", maxCount: 1 },
      { name: "achievementImage", maxCount: 1 },
    ]))
    const certificationData = { ...req.body }

    if (req.files?.image?.[0]) {
      certificationData.image = `/uploads/${req.files.image[0].filename}`
    }

    if (req.files?.achievementImage?.[0]) {
      certificationData.achievementImage = `/uploads/${req.files.achievementImage[0].filename}`
    }

    const certification = await Certification.create(certificationData)
    return res.status(201).json(certification)
  }

  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
