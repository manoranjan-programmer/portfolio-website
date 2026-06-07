import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaTimes, FaDatabase, FaLayerGroup, FaBolt, FaArrowRight } from "react-icons/fa"
import API from "../services/api.js"

function Projects() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      const response = await API.get("/projects")
      if (response.data && response.data.length > 0) {
        setProjects(response.data)
      } else {
        setProjects([])
      }
    } catch (error) {
      console.log("Projects fetch failed; no fallback projects loaded.")
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="bg-[#030712] text-white py-20 md:py-28 px-6 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(99,102,241,0.02),transparent_40%)] pointer-events-none"></div>

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
            My <span className="gradient-text-indigo-emerald">Projects</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-4xl font-light lg:whitespace-nowrap">
            Selected applications and computational tools, organized for quick review and deeper technical inspection.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-xl overflow-hidden hover:border-indigo-400/40 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer shadow-lg"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-900 border-b border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop"
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-all duration-300"></div>
                
                {/* Tech tag indicator (first tag overlay) */}
                {project.technologies && project.technologies.length > 0 && (
                  <span className="absolute top-4 left-4 bg-[#070b18]/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">
                    {project.technologies[0]}
                  </span>
                )}
              </div>

              {/* Textual Area */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-indigo-300 transition-colors duration-300 tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-light text-sm line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Badges list */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="bg-white/5 border border-white/5 text-slate-300 px-3 py-1 rounded-full text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 4 && (
                      <span className="bg-white/5 border border-white/5 text-slate-500 px-2 py-1 rounded-full text-xs font-mono">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Interactive Trigger text */}
                  <div className="flex items-center text-xs font-bold text-indigo-400 group-hover:text-emerald-400 transition-colors duration-300 gap-1.5 pt-2 border-t border-white/5">
                    <span>View Specifications</span>
                    <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Advanced Project Specification Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card bg-[#070b18] border border-white/10 rounded-2xl max-w-3xl w-full overflow-hidden relative shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 z-10 bg-white/5 border border-white/10 hover:border-red-400 hover:text-red-400 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 cursor-pointer"
                aria-label="Close project modal"
              >
                <FaTimes />
              </button>

              {/* Graphic Banner */}
              <div className="h-56 sm:h-72 w-full relative bg-slate-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b18] via-transparent to-transparent"></div>
              </div>

              {/* Content Panel */}
              <div className="p-8 sm:p-10 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {selectedProject.title}
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-light text-base">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Specs Table/Grid Details (Highly professional layout) */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold flex items-center gap-2">
                    <FaDatabase className="text-indigo-400" />
                    <span>Technical Architecture Specs</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 rounded-xl p-5 border border-white/5 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 sm:pb-0 sm:border-b-0 border-b border-white/5">
                      <span className="text-slate-400 uppercase">System Class:</span>
                      <span className="font-semibold text-slate-200">{selectedProject.specs?.type || "Full Stack Application"}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 sm:pb-0 sm:border-b-0 border-b border-white/5">
                      <span className="text-slate-400 uppercase">Data Repository:</span>
                      <span className="font-semibold text-slate-200">{selectedProject.specs?.db || "MongoDB NoSQL"}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 sm:pb-0 sm:border-b-0 border-b border-white/5">
                      <span className="text-slate-400 uppercase">Core Framework:</span>
                      <span className="font-semibold text-slate-200">{selectedProject.technologies?.[1] || "React Context"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 uppercase">Performance:</span>
                      <span className="font-semibold text-emerald-400">{selectedProject.specs?.accuracy || selectedProject.specs?.throughput || "Optimized Core Layers"}</span>
                    </div>
                  </div>
                </div>

                {/* Technologies used */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold flex items-center gap-2">
                    <FaLayerGroup className="text-emerald-400" />
                    <span>Complete Technology Stack</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-mono font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link Buttons */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-white/10 hover:border-indigo-400/40 transition duration-300"
                    >
                      <FaGithub className="text-lg" />
                      <span>Code Repository</span>
                    </a>
                  )}
                  {selectedProject.liveDemo && (
                    <a
                      href={selectedProject.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(16,185,129,0.3)] transition duration-300"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                      <span>Launch Application</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
