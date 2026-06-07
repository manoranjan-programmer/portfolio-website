import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaBriefcase, FaCalendarAlt, FaChevronRight } from "react-icons/fa"
import API from "../services/api.js"



function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchExperience = async () => {
    try {
      const response = await API.get("/experience")
      if (response.data && response.data.length > 0) {
        const sorted = [...response.data].sort((a, b) => {
          const dateA = a.startDate ? new Date(a.startDate) : new Date(0)
          const dateB = b.startDate ? new Date(b.startDate) : new Date(0)
          return dateB - dateA
        })
        setExperiences(sorted)
      } else {
        setExperiences([])
      }
    } catch (error) {
      console.log("Error fetching experience")
      setExperiences([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExperience()
  }, [])

  if (!loading && experiences.length === 0) return null;

  const formatExperienceDuration = (item) => {
    if (item.startDate) {
      const start = new Date(item.startDate)
      const end = item.present ? null : item.endDate ? new Date(item.endDate) : null
      const options = { month: "short", year: "numeric" }
      const startLabel = start.toLocaleDateString(undefined, options)
      const endLabel = item.present
        ? "Present"
        : end
        ? end.toLocaleDateString(undefined, options)
        : ""
      return `${startLabel} - ${endLabel}`
    }
    return item.duration || ""
  }

  return (
    <section id="experience" className="bg-[#030712] text-white py-20 md:py-28 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.01),transparent_40%)] pointer-events-none"></div>

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
            Work <span className="gradient-text-cyan-emerald">Experience</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-4xl font-light lg:whitespace-nowrap">
            Practical experience across data workflows, production systems, and full-stack delivery.
          </p>
        </motion.div>

        {/* Pulsing Timeline Structure */}
        <div className="relative max-w-full lg:max-w-6xl border-l-2 border-dashed border-indigo-500/20 pl-8 md:pl-12 ml-4 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline Orb Checkpoint Node */}
              <div className="absolute -left-[41px] md:-left-[53px] top-2 flex items-center justify-center">
                <div className="relative w-5 h-5 rounded-full bg-emerald-400 border-4 border-[#030712] shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
              </div>

              {/* Timeline Card */}
              <div className="glass-card rounded-xl p-6 sm:p-8 hover:border-indigo-400/30 border border-white/5 space-y-4 relative overflow-hidden group">
                {/* Visual Corner Badge Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-bl-3xl pointer-events-none"></div>

                {/* Card Top Information */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-extrabold text-white group-hover:text-emerald-400 transition-colors duration-300 tracking-wide flex items-center gap-2">
                      <FaBriefcase className="text-indigo-400 text-lg" />
                      {exp.role}
                    </h3>
                    <p className="text-indigo-300 font-bold text-sm sm:text-base uppercase tracking-wide">
                      {exp.company}
                    </p>
                  </div>

                  {/* Date Badge */}
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] font-mono font-bold text-slate-300 whitespace-nowrap self-start">
                    <FaCalendarAlt className="text-emerald-400" />
                    {formatExperienceDuration(exp)}
                  </span>
                </div>

                {/* Description Text */}
                <p className="text-slate-400 leading-relaxed font-light text-sm sm:text-base pt-2">
                  {exp.description}
                </p>

                {/* Micro Actions (bullet point indicators) */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5 font-mono text-[10px] text-slate-500">
                  <span className="flex items-center gap-1"><FaChevronRight className="text-emerald-400 text-[8px]" /> ETL Pipelines</span>
                  <span className="flex items-center gap-1"><FaChevronRight className="text-indigo-400 text-[8px]" /> Production ML Deployments</span>
                  <span className="flex items-center gap-1"><FaChevronRight className="text-cyan-400 text-[8px]" /> Full Stack React Systems</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Experience
