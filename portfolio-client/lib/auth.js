import jwt from "jsonwebtoken"

export function verifyToken(req, res) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" })
    return null
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.id
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" })
    return null
  }
}
