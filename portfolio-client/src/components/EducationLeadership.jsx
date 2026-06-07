import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaGraduationCap, FaUserTie } from "react-icons/fa"
import API from "../services/api.js"

function EducationLeadership() {
  const [education, setEducation] = useState([])
  const [leadership, setLeadership] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEducationLeadership = async () => {
      try {
        setLoading(true)
        setError("")
        const [educationRes, leadershipRes] = await Promise.all([
          API.get("/education"),
          API.get("/leadership"),
        ])

        setEducation(educationRes.data || [])
        setLeadership(leadershipRes.data || [])
      } catch (fetchError) {
        console.error(fetchError)
        setError("Unable to load education and leadership details.")
      } finally {
        setLoading(false)
      }
    }

    fetchEducationLeadership()
  }, [])

  return (
    <section
      id="education"
      className="py-28 px-6 bg-mesh text-white relative overflow-hidden"
    >
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold tracking-[0.18em] uppercase shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Academic Journey
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.05]">
            Education &{" "}
            <span className="gradient-text-indigo-emerald">Leadership</span>
          </h2>

          <p className="mt-5 text-slate-400 text-sm sm:text-base leading-relaxed max-w-4xl lg:max-w-6xl font-light">
            Building a strong foundation in Information Technology while developing leadership, teamwork, communication, and problem-solving skills through academic excellence and active participation.
          </p>
        </motion.div>

        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card hover-glow rounded-3xl p-8 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                <FaGraduationCap className="text-2xl text-indigo-400" />
              </div>

              <div>
                <h3 className="text-2xl font-bold">Education</h3>
                <p className="text-slate-400 text-sm">Academic Background</p>
              </div>
            </div>

            <div className="space-y-6">
              {loading ? (
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-slate-400 text-sm">
                  Loading education entries...
                </div>
              ) : education.length === 0 ? (
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-slate-400 text-sm">
                  Education entries will appear here soon.
                </div>
              ) : (
                education.map((item, index) => (
                  <div
                    key={item._id}
                    className={`bg-white/5 rounded-2xl p-5 border border-white/5 transition ${
                      index % 2 === 0 ? "hover:border-indigo-500/30" : "hover:border-emerald-500/30"
                    }`}
                  >
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h4 className="font-bold text-lg">{item.degree}</h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          index % 2 === 0
                            ? "bg-indigo-500/10 text-indigo-300"
                            : "bg-emerald-500/10 text-emerald-300"
                        }`}
                      >
                        {item.duration}
                      </span>
                    </div>

                    <p className="mt-2 text-slate-300">{item.institution}</p>
                    {item.score && (
                      <p className="mt-3 text-sm text-indigo-400 font-medium">{item.score}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card hover-glow rounded-3xl p-8 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <FaUserTie className="text-2xl text-emerald-400" />
              </div>

              <div>
                <h3 className="text-2xl font-bold">Leadership</h3>
                <p className="text-slate-400 text-sm">Positions of Responsibility</p>
              </div>
            </div>

            <div className="space-y-6">
              {loading ? (
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-slate-400 text-sm">
                  Loading leadership positions...
                </div>
              ) : leadership.length === 0 ? (
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-slate-400 text-sm">
                  Leadership positions will appear here soon.
                </div>
              ) : (
                leadership.map((item, index) => (
                  <div
                    key={item._id}
                    className={`bg-white/5 rounded-2xl p-5 border border-white/5 transition ${
                      index % 2 === 0 ? "hover:border-emerald-500/30" : "hover:border-indigo-500/30"
                    }`}
                  >
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          index % 2 === 0
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-indigo-500/10 text-indigo-300"
                        }`}
                      >
                        {item.duration}
                      </span>
                    </div>

                    <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default EducationLeadership
