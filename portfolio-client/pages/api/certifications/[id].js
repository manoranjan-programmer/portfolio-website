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

  if (req.method === "PUT") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    await runMiddleware(req, res, upload.fields([
      { name: "image", maxCount: 1 },
      { name: "achievementImage", maxCount: 1 },
    ]))
    const updateData = { ...req.body }

    if (req.files?.image?.[0]) {
      updateData.image = `/uploads/${req.files.image[0].filename}`
    }

    if (req.files?.achievementImage?.[0]) {
      updateData.achievementImage = `/uploads/${req.files.achievementImage[0].filename}`
    }

    if (updateData.image === "") {
      delete updateData.image
    }

    const updatedCertification = await Certification.findByIdAndUpdate(req.query.id, updateData, { new: true })
    return res.status(200).json(updatedCertification)
  }

  if (req.method === "DELETE") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    await Certification.findByIdAndDelete(req.query.id)
    return res.status(200).json({ message: "Certification deleted successfully" })
  }

  res.setHeader("Allow", ["PUT", "DELETE"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
