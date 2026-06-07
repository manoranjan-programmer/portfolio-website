import dbConnect from "../../../lib/dbConnect"
import bcrypt from "bcryptjs"
import Admin from "../../../models/Admin"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { email, password } = req.body
  const existingAdmin = await Admin.findOne({ email })

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const admin = await Admin.create({ email, password: hashedPassword })

  return res.status(201).json({
    message: "Admin registered successfully",
    admin: {
      id: admin._id,
      email: admin.email,
    },
  })
}
