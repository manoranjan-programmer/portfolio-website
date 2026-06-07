import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import API from "../services/api.js"
import { SiC } from "react-icons/si"
import { DiJava } from "react-icons/di"
import {
  FaGithub,
  FaGitAlt,
  FaBrain,
  FaGlobe,
  FaServer,
  FaDatabase,
  FaCode,
  FaAws,
  FaChartBar,
  FaTerminal,
} from "react-icons/fa"

import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiNumpy,
  SiPandas,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiDocker,
  SiTypescript,
} from "react-icons/si"



const iconMap = {
  python: { icon: SiPython, color: "text-yellow-400" },
  pytorch: { icon: SiPytorch, color: "text-orange-500" },
  numpy: { icon: SiNumpy, color: "text-blue-400" },
  pandas: { icon: SiPandas, color: "text-blue-500" },

  react: { icon: SiReact, color: "text-cyan-400" },

  javascript: { icon: SiJavascript, color: "text-yellow-400" },
  js: { icon: SiJavascript, color: "text-yellow-400" },

  typescript: { icon: SiTypescript, color: "text-blue-500" },
  ts: { icon: SiTypescript, color: "text-blue-500" },

  tailwind: { icon: SiTailwindcss, color: "text-cyan-400" },

  node: { icon: SiNodedotjs, color: "text-green-500" },
  express: { icon: SiExpress, color: "text-slate-300" },

  mongodb: { icon: SiMongodb, color: "text-emerald-500" },
  mongo: { icon: SiMongodb, color: "text-emerald-500" },

  postgres: { icon: SiPostgresql, color: "text-blue-400" },
  postgresql: { icon: SiPostgresql, color: "text-blue-400" },
  sql: { icon: SiPostgresql, color: "text-blue-400" },

  "power bi": { icon: FaChartBar, color: "text-amber-500" },
  powerbi: { icon: FaChartBar, color: "text-amber-500" },

  matplotlib: { icon: FaChartBar, color: "text-indigo-400" },

  html: { icon: SiHtml5, color: "text-orange-500" },
  css: { icon: SiCss, color: "text-blue-400" },

  docker: { icon: SiDocker, color: "text-sky-500" },

  aws: { icon: FaAws, color: "text-amber-500" },

  git: { icon: FaGitAlt, color: "text-orange-600" },
  github: { icon: FaGithub, color: "text-slate-200" },

  java: {
  icon: DiJava,
  color: "text-orange-500",
},

"c programming": {
  icon: SiC,
  color: "text-blue-500",
},

  "machine learning": {
    icon: FaBrain,
    color: "text-purple-400",
  },

  ml: {
    icon: FaBrain,
    color: "text-purple-400",
  },
}

const getSkillIcon = (name) => {
  const cleanName = (name || "").toLowerCase().trim()

  for (const key in iconMap) {
    if (cleanName.includes(key)) {
      return iconMap[key]
    }
  }

  return {
    icon: FaCode,
    color: "text-indigo-400",
  }
}

function Skills() {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await API.get("/skills")
        if (response.data && response.data.length > 0) {
          setSkills(response.data)
        } else {
          setSkills([])
        }
      } catch (error) {
        console.log("Skills fetch failed; no fallback skills loaded.")
        setSkills([])
      }
    }
    fetchSkills()
  }, [])

  // Group skills dynamically by their exact category from the database
  const categorized = {}
  skills.forEach(skill => {
    const cat = skill.category || "General Skills";
    if (!categorized[cat]) {
      categorized[cat] = [];
    }
    categorized[cat].push(skill);
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section id="skills" className="bg-[#030712] text-white py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.02),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            My <span className="gradient-text-indigo-emerald">Skills</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-4xl font-light lg:whitespace-nowrap">
            A focused overview of the tools and technologies I use to build data products, web applications, and reliable backend systems.
          </p>
        </motion.div>

        {/* Grouped Skills Columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2"
        >
          {Object.entries(categorized).map(([catName, catSkills], index) => {
            if (catSkills.length === 0) return null;

            let CatIcon = FaCode;
            const lowerCat = catName.toLowerCase();
            if (lowerCat.includes("science") || lowerCat.includes("ai")) CatIcon = FaBrain;
            else if (lowerCat.includes("frontend")) CatIcon = FaGlobe;
            else if (lowerCat.includes("backend")) CatIcon = FaServer;
            else if (lowerCat.includes("database") || lowerCat.includes("pipeline") || lowerCat.includes("bi") || lowerCat.includes("analytics")) CatIcon = FaDatabase;
            else if (lowerCat.includes("programming") || lowerCat.includes("language")) CatIcon = FaTerminal;

            return (
              <motion.div
                key={catName}
                variants={cardVariants}
                className="glass-card p-6 sm:p-8 rounded-xl border border-white/5 bg-[#0b1329]/30 hover:border-indigo-500/10 transition-all duration-300 shadow-2xl"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                  <CatIcon className="text-indigo-400 w-6 h-6" />
                  <h3 className="text-xl font-bold text-white tracking-wide">{catName}</h3>
                </div>

                {/* Sub Grid of Skills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {catSkills.map((skill, sIdx) => {
                    const { icon: SkillIcon, color: iconColor } = getSkillIcon(skill.name);
                    return (
                      <div
                        key={skill._id || sIdx}
                        className="bg-[#030712]/60 hover:bg-[#030712]/90 border border-white/5 hover:border-indigo-500/20 transition-all duration-300 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 min-h-32"
                      >
                        <SkillIcon className={`${iconColor} w-8 h-8`} />
                        <span className="text-sm font-bold text-white tracking-wide mt-1">
                          {skill.name}
                        </span>
                        <span className="text-[9px] font-bold font-mono text-slate-500 uppercase tracking-widest">
                          {skill.level}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Category Legend Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-mono mt-12">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            Data / AI
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            UI / UX
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            Backend Services
          </span>
        </div>

      </div>
    </section>
  )
}

export default Skills
