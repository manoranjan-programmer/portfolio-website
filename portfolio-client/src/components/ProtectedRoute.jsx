import { useEffect, useState } from "react"
import { useRouter } from "next/router"

function ProtectedRoute({ children }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (!token) {
      router.replace("/admin-login")
    } else {
      setAuthorized(true)
    }
  }, [router])

  if (!authorized) {
    return null
  }

  return children
}

export default ProtectedRoute
