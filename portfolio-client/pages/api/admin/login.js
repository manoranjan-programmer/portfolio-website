import dbConnect from "../../../lib/dbConnect"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Admin from "../../../models/Admin"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { email, password } = req.body
  const admin = await Admin.findOne({ email })
  if (!admin) {
    return res.status(400).json({ message: "Admin not found" })
  }

  const isMatch = await bcrypt.compare(password, admin.password)
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

  return res.status(200).json({
    message: "Login successful",
    token,
    admin: { id: admin._id, email: admin.email },
  })
}
