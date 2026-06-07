import dbConnect from "../../../lib/dbConnect"
import About from "../../../models/About"
import { verifyToken } from "../../../lib/auth"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "PUT") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    const updatedAbout = await About.findByIdAndUpdate(req.query.id, req.body, { new: true })
    return res.status(200).json(updatedAbout)
  }

  res.setHeader("Allow", ["PUT"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
