import dbConnect from "../../../lib/dbConnect"
import About from "../../../models/About"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    const about = await About.findOne()
    return res.status(200).json(about)
  }

  if (req.method === "POST") {
    const about = await About.create(req.body)
    return res.status(201).json(about)
  }

  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
