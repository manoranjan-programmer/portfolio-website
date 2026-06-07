import { motion } from "framer-motion"
import { SiLeetcode, SiHackerrank } from "react-icons/si"
import {
  FaGithub,
  FaLinkedin
} from "react-icons/fa"

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-mesh text-white px-6 py-28 md:py-32 relative overflow-hidden"
    >
      {/* Ambient background glowing particles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold tracking-[0.18em] uppercase shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Data Science & AI Systems
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
            Mano Ranjan{" "}
            <span className="gradient-text-indigo-emerald font-sans">
              G
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-300 tracking-wide">
            <span className="text-indigo-300 font-heading">
              Aspiring Data Scientist
            </span>
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
            Aspiring Data Scientist passionate about Data Analytics,
            Machine Learning, and transforming data into actionable insights.
          </p>

          {/* Expertise */}
          <div className="glass-card hover-glow p-5 rounded-xl border border-white/5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Expertise
            </span>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                Python
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                SQL
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                Machine Learning
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                Data Analytics
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                Data Science
              </span>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="glass-card hover-glow p-5 rounded-xl border border-white/5">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Focus Areas
            </span>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                Predictive Analytics
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                Data Visualization
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                Statistical Modeling
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                Artificial Intelligence
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                Decision Making
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-4 pt-6">

                      {/* Resume */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex whitespace-nowrap items-center justify-center bg-white/5 border border-white/10 text-white text-sm px-7 py-3.5 rounded-xl font-bold tracking-wide hover:bg-white/10 hover:border-red-400 hover:text-red-300 hover:scale-[1.02] transition-all duration-300"
          >
            My Resume
          </a>

          {/* Explore Projects */}
          <a
            href="#projects"
            className="inline-flex whitespace-nowrap items-center justify-center bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-sm px-7 py-3.5 rounded-xl font-bold tracking-wide shadow-[0_4px_30px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_40px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition-all duration-300"
          >
            Explore My Projects
          </a>

          {/* Contact */}
          <a
            href="#contact"
            className="inline-flex whitespace-nowrap items-center justify-center border border-white/10 text-slate-200 text-sm bg-white/5 px-7 py-3.5 rounded-xl font-bold tracking-wide hover:bg-white/10 hover:border-indigo-500/50 hover:text-indigo-200 hover:scale-[1.02] transition-all duration-300"
          >
            Get In Touch
          </a>
{/* Social Icons */}
<div className="flex items-center gap-3">

  <a
    href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="w-[52px] h-[52px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-gray-400 hover:scale-105 transition-all duration-300"
  >
    <FaGithub className="text-xl" />
  </a>

  <a
    href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="w-[52px] h-[52px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 hover:bg-white/10 hover:border-blue-400 hover:scale-105 transition-all duration-300"
  >
    <FaLinkedin className="text-xl" />
  </a>

  <a
    href={process.env.NEXT_PUBLIC_LEETCODE_URL || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="w-[52px] h-[52px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-orange-400 hover:scale-105 transition-all duration-300"
  >
    <SiLeetcode size={22} className="text-orange-400" />
  </a>

  <a
    href={process.env.NEXT_PUBLIC_HACKERRANK_URL || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="w-[52px] h-[52px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-green-400 hover:scale-105 transition-all duration-300"
  >
    <SiHackerrank size={22} className="text-green-400" />
  </a>

</div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center lg:justify-end py-10"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full p-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 shadow-[0_0_80px_rgba(99,102,241,0.3)]">

            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#030712] border-4 border-[#030712]">

              <img
                src={process.env.NEXT_PUBLIC_PROFILE_PIC_URL}
                alt="Mano Ranjan"
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-all duration-700"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop"
                }}
              />

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero