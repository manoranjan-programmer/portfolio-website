import dbConnect from "../../../lib/dbConnect"
import Contact from "../../../models/Contact"
import { verifyToken } from "../../../lib/auth"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    const adminId = verifyToken(req, res)
    if (!adminId) return

    const messages = await Contact.find().sort({ createdAt: -1 })
    return res.status(200).json(messages)
  }

  if (req.method === "POST") {
    const contact = await Contact.create(req.body)
    return res.status(201).json({ message: "Message Sent Successfully", contact })
  }

  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
