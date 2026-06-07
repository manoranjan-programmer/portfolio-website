import { useState, useEffect } from "react"
import Link from "next/link"
import { FaBars, FaTimes, FaUserShield } from "react-icons/fa"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    "Home",
    "About",
    "Education",
    "Skills",
    "Experience",
    "Projects",
    "Certifications",
    "Contact",
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "glass-card bg-[#070b18]/85 border-indigo-500/20 py-3 px-5 md:px-8 shadow-[0_15px_40px_rgba(3,7,18,0.6)]"
            : "backdrop-blur-md bg-[#070b18]/60 border-white/5 py-4 px-5 md:px-8 shadow-lg"
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white group-hover:scale-105 transition-all duration-300">
              Mano
              <span className="text-indigo-400 group-hover:text-emerald-400 transition-colors duration-300">
                Ranjan
              </span>
              <span className="text-emerald-400 animate-pulse">.</span>
            </h1>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-5 text-slate-200 font-medium">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative py-2 text-sm tracking-wide text-slate-300 hover:text-white transition-colors duration-300 group"
                >
                  {item}

                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}

            {/* Admin Portal */}
            <li>
              <Link
                href="/admin-login"
                className="flex items-center gap-2 text-xs uppercase tracking-widest bg-white/5 border border-white/10 hover:border-indigo-400/40 text-indigo-300 px-4 py-2 rounded-xl font-bold hover:bg-indigo-500/10 transition duration-300"
              >
                <FaUserShield className="text-sm" />
                <span>Admin Portal</span>
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center text-white text-xl w-10 h-10 rounded-xl bg-white/5 border border-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <FaTimes className="text-indigo-400" />
            ) : (
              <FaBars />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto glass-card bg-[#070b18]/95 border-indigo-500/20 p-4 rounded-2xl space-y-2 shadow-2xl animate-fadeIn">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block py-3 px-4 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 transition"
            >
              {item}
            </a>
          ))}

          <div className="pt-2 border-t border-white/5">
            <Link
              href="/admin-login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-indigo-300 font-semibold hover:bg-indigo-500/10 transition"
            >
              <FaUserShield />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar