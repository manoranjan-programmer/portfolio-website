import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCertificate, FaAward, FaFilePdf, FaTimes, FaTrophy } from "react-icons/fa"
import API from "../services/api.js"



function Certifications() {
  const [certifications, setCertifications] = useState([])
  const [selectedCertification, setSelectedCertification] = useState(null)
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [loading, setLoading] = useState(true)

  const getCertificationDescription = (cert) =>
    cert.description ||
    `Credential issued by ${cert.organization}, validating practical knowledge and professional learning in this area.`

  const hasAchievement = (cert) => Boolean(cert.achievementPlace || cert.achievementImage)

  const fetchCertifications = async () => {
    try {
      const response = await API.get("/certifications")
      if (response.data && response.data.length > 0) {
        setCertifications(response.data)
      } else {
        setCertifications([])
      }
    } catch {
      console.log("Error fetching certifications")
      setCertifications([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const load = async () => {
      await fetchCertifications()
    }

    load()
  }, [])

  if (!loading && certifications.length === 0) return null;

  return (
    <section id="certifications" className="bg-[#030712] text-white py-20 md:py-28 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.01),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            My <span className="gradient-text-indigo-emerald">Certifications</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl font-light">
            Verified expertise from leading cloud and data service providers.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedCertification(cert)}
              className="glass-card rounded-xl overflow-hidden hover:border-emerald-400/40 transition-all duration-300 flex flex-col group h-full shadow-lg border border-white/5 cursor-pointer"
            >
              {/* Graphic Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-white/5">
                {cert.image?.toLowerCase().endsWith(".pdf") ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-slate-300 px-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-red-500/10 text-red-300 text-2xl">
                      <FaFilePdf />
                    </div>
                    <p className="text-center text-sm font-semibold">PDF Certificate</p>
                    <p className="text-[11px] text-slate-400">Click to preview</p>
                  </div>
                ) : (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop"
                    }}
                  />
                )}

                {/* Badge Overlay */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#070b18]/80 backdrop-blur-md border border-indigo-400/20 flex items-center justify-center text-indigo-300">
                  <FaCertificate className="text-sm" />
                </div>
              </div>

              {/* Text Context */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors duration-300 tracking-wide">
                    {cert.title}
                  </h3>
                  <p className="text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                    {cert.organization}
                  </p>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
                      About this certificate
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {getCertificationDescription(cert)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5 font-mono text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <FaAward className="text-emerald-400" />
                    {cert.date}
                  </span>
                  
                  <span className="text-[10px] text-indigo-400 font-bold group-hover:text-white transition-colors duration-300">
                    VERIFIED CREDENTIAL
                  </span>
                </div>

                {hasAchievement(cert) && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      setSelectedAchievement(cert)
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-xs font-bold uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-500 hover:text-white"
                  >
                    <FaTrophy />
                    View Achievements
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {selectedCertification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="glass-card relative max-w-7xl w-full max-h-[88vh] flex flex-col md:flex-row rounded-2xl border border-white/10 bg-[#070b18] shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedCertification(null)}
                className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
                aria-label="Close certification details"
              >
                <FaTimes />
              </button>

              {/* Image Section - Left Side */}
              <div className="relative w-full md:w-[45%] bg-slate-900 overflow-auto flex items-center justify-center">
                {selectedCertification.image?.toLowerCase().endsWith(".pdf") ? (
                  <object data={selectedCertification.image} type="application/pdf" className="h-full w-full">
                    <div className="h-full w-full flex flex-col items-center justify-center gap-3 bg-[#0b1329] text-slate-400 px-6 text-center">
                      <FaFilePdf className="text-4xl text-red-400" />
                      <p>PDF preview is not available in this browser.</p>
                      <a
                        href={selectedCertification.image}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                      >
                        Open PDF
                      </a>
                    </div>
                  </object>
                ) : (
                  <img
                    src={selectedCertification.image}
                    alt={selectedCertification.title}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop"
                    }}
                  />
                )}
              </div>

              {/* Details Section - Right Side */}
              <div className="w-full md:w-[55%] flex flex-col text-white overflow-auto">
                <div className="space-y-6 p-8 sm:p-10 flex-1 flex flex-col justify-between">
                  {/* Title and Description */}
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      {selectedCertification.title}
                    </h2>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
                        About this certificate
                      </p>
                      <p className="text-slate-300 leading-relaxed font-light text-base">
                        {getCertificationDescription(selectedCertification)}
                      </p>
                    </div>
                  </div>

                  {/* Credential Details Section */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      <span>Credential Details</span>
                    </h4>
                    
                    {/* Details Grid - First Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="space-y-1">
                        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Organization:</p>
                        <p className="text-slate-200 font-bold text-base">{selectedCertification.organization}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Date Issued:</p>
                        <p className="text-emerald-300 font-bold text-base">{selectedCertification.date}</p>
                      </div>
                    </div>

                    {/* Details Grid - Second Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="space-y-1">
                        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Credential Type:</p>
                        <p className="text-slate-200 font-bold text-base">Digital Certificate</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Status:</p>
                        <p className="text-emerald-300 font-bold text-base">Verified</p>
                      </div>
                    </div>
                  </div>

                  {/* Close Button */}
                  {hasAchievement(selectedCertification) && (
                    <button
                      onClick={() => setSelectedAchievement(selectedCertification)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 text-sm font-bold uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-500 hover:text-white"
                    >
                      <FaTrophy />
                      View Achievements
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedCertification(null)}
                    className="w-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 text-slate-900 py-4 rounded-xl font-bold uppercase text-sm tracking-wider transition hover:shadow-[0_4px_25px_rgba(99,102,241,0.3)] duration-300 cursor-pointer"
                  >
                    Close Credential
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="glass-card relative w-full max-w-4xl max-h-[88vh] overflow-auto rounded-2xl border border-white/10 bg-[#070b18] shadow-2xl"
            >
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
                aria-label="Close achievement details"
              >
                <FaTimes />
              </button>

              <div className="grid md:grid-cols-[1.15fr_0.85fr]">
                <div className="min-h-[280px] bg-slate-900 flex items-center justify-center">
                  {selectedAchievement.achievementImage ? (
                    <img
                      src={selectedAchievement.achievementImage}
                      alt={`${selectedAchievement.title} achievement`}
                      className="h-full max-h-[70vh] w-full object-contain p-4"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 p-8 text-center text-slate-400">
                      <FaTrophy className="text-5xl text-emerald-400" />
                      <p className="text-sm">Achievement photo was not uploaded.</p>
                    </div>
                  )}
                </div>

                <div className="p-8 sm:p-10 space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                    <FaTrophy />
                    Achievement
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-3xl font-extrabold tracking-tight text-white">
                      {selectedAchievement.title}
                    </h3>
                    <p className="text-indigo-300 text-sm font-bold uppercase tracking-wider">
                      {selectedAchievement.organization}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                      Prize / Place
                    </p>
                    <p className="text-emerald-300 text-xl font-extrabold">
                      {selectedAchievement.achievementPlace || "Achievement details added"}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:shadow-[0_4px_25px_rgba(16,185,129,0.25)]"
                  >
                    Close Achievement
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </section>
  )
}

export default Certifications
