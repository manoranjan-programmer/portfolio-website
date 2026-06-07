export function unauthorizedResponse() {
  return Response.json({ message: "Unauthorized" }, { status: 401 })
}

export function parseCommaList(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value !== "string") {
    return []
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}
