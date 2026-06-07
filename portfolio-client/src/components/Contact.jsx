import { useState } from "react"
import { motion } from "framer-motion"
import { FaEnvelope, FaPhoneAlt, FaGithub as FaGithubIcon, FaLinkedin as FaLinkedinIcon, FaInstagram as FaInstagramIcon, FaCheckCircle, FaPaperPlane } from "react-icons/fa"
import API from "../services/api.js"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await API.post("/contact", formData)
      setSuccess(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-[#030712] text-white py-20 md:py-28 px-6 relative">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.02),transparent_45%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact <span className="gradient-text-indigo-emerald">Me</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-4xl font-light lg:whitespace-nowrap">
            Have an analytics challenge or looking to build a high-performance web system? Let&apos;s discuss details.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: INFO CARDS & SOCIAL LINKS (Spans 5 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Live Consulting Status Badge */}
            <div className="glass-card bento-card-green p-6 rounded-xl border border-emerald-500/10 flex items-center gap-5 shadow-lg relative overflow-hidden">
              {/* Pulsating green availability node */}
              <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-emerald-400 opacity-25"></span>
                <FaCheckCircle className="text-xl" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-mono">Current Availability</span>
                <p className="text-sm font-semibold text-slate-200">
                  Open for select freelance projects & consulting engagements.
                </p>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="glass-card p-6 sm:p-8 rounded-xl border border-white/5 space-y-6 shadow-lg">
              <h3 className="text-xl font-extrabold text-white tracking-wide border-b border-white/5 pb-3">
                Connect Directly
              </h3>

              <div className="space-y-4">
                {/* Email Address */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-indigo-400">
                    <FaEnvelope className="text-base" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">Primary Email</span>
                    <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ID}`} className="text-sm font-semibold text-slate-300 hover:text-indigo-300 transition duration-300">
                      {process.env.NEXT_PUBLIC_EMAIL_ID}
                    </a>
                  </div>
                </div>

                {/* Physical Location */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-emerald-400">
                    <FaPhoneAlt className="text-base" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">Contact Number</span>
                    <span className="text-sm font-semibold text-slate-300">
                      {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels widget */}
            <div className="glass-card p-6 rounded-xl border border-white/5 space-y-4 shadow-lg">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block">Professional links</span>
              <div className="flex gap-4">
                <a
                  href={process.env.NEXT_PUBLIC_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white hover:border-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <FaGithubIcon className="text-xl" />
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white hover:border-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedinIcon className="text-xl" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: FROSTED CONTACT FORM (Spans 7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card border border-white/5 p-6 sm:p-8 rounded-xl space-y-6 shadow-2xl relative"
            >
              {/* Form Info header */}
              <div className="space-y-1.5 border-b border-white/5 pb-4 mb-6">
                <h3 className="text-xl font-extrabold text-white tracking-wide">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  Share your project goals, timeline, and the best way to reach you.
                </p>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Mano Ranjan"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#070b18]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-xl focus:outline-none transition-all duration-300 text-sm tracking-wide shadow-inner text-slate-200"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">Your Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#070b18]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-xl focus:outline-none transition-all duration-300 text-sm tracking-wide shadow-inner text-slate-200"
                />
              </div>

              {/* Message text area */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">Project Scope / Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Describe your analytical objectives or full stack goals..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#070b18]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-xl focus:outline-none transition-all duration-300 text-sm tracking-wide resize-none shadow-inner text-slate-200"
                ></textarea>
              </div>

              {/* Status Alert Panels */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-semibold animate-fadeIn">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs font-semibold animate-fadeIn flex items-center gap-2">
                  <FaCheckCircle />
                  <span>Message sent successfully. I will reach out shortly.</span>
                </div>
              )}

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-4 rounded-xl font-bold tracking-wide hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_30px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_45px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 text-sm uppercase cursor-pointer"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default Contact
