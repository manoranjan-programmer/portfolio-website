import jwt from "jsonwebtoken"

export function verifyAuthHeader(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.id
  } catch (error) {
    return null
  }
}

export function verifyRequestToken(request) {
  return verifyAuthHeader(request.headers.get("authorization"))
}

export function verifyToken(req, res) {
  const adminId = verifyAuthHeader(req.headers.authorization)

  if (!adminId) {
    res.status(401).json({ message: "Unauthorized" })
    return null
  }

  return adminId
}
