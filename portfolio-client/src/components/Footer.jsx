function Footer() {
  return (
    <footer className="bg-[#030712] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold text-white">
            Mano<span className="text-indigo-400">Ranjan</span>
            <span className="text-emerald-400">.</span>
          </span>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-8 text-xs font-medium text-slate-400">
          <a
            href="#home"
            className="hover:text-indigo-300 transition duration-300"
          >
            Home
          </a>

          <a
            href="#about"
            className="hover:text-indigo-300 transition duration-300"
          >
            About
          </a>

          <a
            href="#education"
            className="hover:text-indigo-300 transition duration-300"
          >
            Education
          </a>

          <a
            href="#skills"
            className="hover:text-indigo-300 transition duration-300"
          >
            Skills
          </a>

          <a
            href="#experience"
            className="hover:text-indigo-300 transition duration-300"
          >
            Experience
          </a>

          <a
            href="#projects"
            className="hover:text-indigo-300 transition duration-300"
          >
            Projects
          </a>

          <a
            href="#certifications"
            className="hover:text-indigo-300 transition duration-300"
          >
            Certifications
          </a>

          <a
            href="#contact"
            className="hover:text-indigo-300 transition duration-300"
          >
            Contact
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[11px] font-mono text-slate-500">
          © {new Date().getFullYear()} Mano Ranjan. Built for clear data and
          engineering work.
        </p>

      </div>
    </footer>
  )
}

export default Footer