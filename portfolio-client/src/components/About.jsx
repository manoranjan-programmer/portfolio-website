import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import API from "../services/api.js"

function About() {
  const [about, setAbout] = useState(null)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await API.get("/about")
        if (response.data && response.data.length > 0) {
          setAbout(Array.isArray(response.data) ? response.data[0] : response.data)
        } else if (response.data && typeof response.data === "object" && !Array.isArray(response.data)) {
          setAbout(response.data)
        }
      } catch (error) {
        console.log("Using local default about data")
      }
    }
    fetchAbout()
  }, [])

  return (
    <section id="about" className="bg-[#030712] text-white py-20 md:py-28 px-6 relative overflow-hidden">
      
      {/* Background subtle radial glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About <span className="gradient-text-indigo-emerald">Me</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl font-light">
            A professional blend of statistical intelligence and full-scale software engineering.
          </p>
        </motion.div>

        {/* Professional Biography Text Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start max-w-6xl border-l border-indigo-400/20 pl-5 sm:pl-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-7"
          >
            <div className="space-y-4">
              <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest font-mono">
                Professional Profile
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {about?.role || "Aspiring Data Scientist"}
              </h3>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-light max-w-3xl">
                {about?.description ||
                  "Hello, I'm Manoranjan, Artificial Intelligence and Data Science student at KPR Institute of Engineering and Technology and an aspiring Data Scientist. I am passionate about Data Analytics, Machine Learning, Python, and SQL, with a strong interest in extracting meaningful insights from data. I continuously learn new technologies and build projects that enhance my analytical and problem-solving skills, aiming to create impactful data-driven solutions."}
              </p>
            </div>
          </motion.div>

          <div className="space-y-4">
            <div className="bg-[#070b18]/60 border border-white/5 p-6 rounded-3xl hover:border-indigo-500/20 transition duration-300">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
                Full Name
              </span>
              <p className="font-semibold text-slate-200 text-lg sm:text-xl">
                {about?.name || "Mano Ranjan G"}
              </p>
            </div>
            <div className="bg-[#070b18]/60 border border-white/5 p-6 rounded-3xl hover:border-emerald-500/20 transition duration-300">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
                Project Deliverables
              </span>
              <p className="font-semibold text-slate-200 text-lg sm:text-xl">
                {about?.projectsCompleted || "12+ Finished Systems"}
              </p>
            </div>

            {about?.resume && (
              <div className="bg-[#070b18]/80 border border-white/5 rounded-3xl p-6">
                <a
                  href={about.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center bg-gradient-to-r from-indigo-500 to-emerald-500 text-white px-6 py-4 rounded-2xl font-bold tracking-wide shadow-[0_4px_30px_rgba(99,102,241,0.2)] hover:scale-[1.02] transition-all duration-300 uppercase text-xs cursor-pointer"
                >
                  Download Career Brief / Resume
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
