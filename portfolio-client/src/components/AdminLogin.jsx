import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaEye, FaEyeSlash, FaLock, FaArrowLeft } from "react-icons/fa"
import API from "../services/api.js"

function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      const response = await API.post("/admin/login", formData)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("admin", JSON.stringify(response.data.admin))
      setLoading(false)
      router.push("/dashboard")
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error.response?.data?.message || "Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6 overflow-hidden relative">

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/8 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Back to Portfolio link */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors duration-300"
      >
        <FaArrowLeft className="text-indigo-400" />
        Back to Portfolio
      </Link>

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-[#070b18]/70 backdrop-blur-xl border border-white/8 rounded-3xl p-10 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        >
          {/* Lock Icon header */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                <FaLock className="text-indigo-400 text-3xl" />
              </div>
              {/* Pulsing outer ring */}
              <div className="absolute inset-0 rounded-2xl border border-indigo-500/20 animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Admin <span className="gradient-text-indigo-emerald">Portal</span>
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Secure JWT-authenticated content management
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6 text-xs font-semibold text-center animate-fadeIn">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="mb-5 space-y-2">
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@portfolio.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-white focus:outline-none transition-all duration-300 text-sm"
            />
          </div>

          {/* Password Field */}
          <div className="mb-8 space-y-2">
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 pr-14 rounded-2xl text-white focus:outline-none transition-all duration-300 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-300 transition-colors duration-300"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-4 rounded-2xl font-bold tracking-wide hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_30px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_45px_rgba(16,185,129,0.3)] text-sm uppercase cursor-pointer"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>

          {/* Footer note */}
          <p className="text-center text-[10px] text-slate-600 font-mono mt-6">
            PROTECTED ROUTE — JWT VERIFIED SESSION
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default AdminLogin
