import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Certifications from "../components/Certifications"
import Experience from "../components/Experience"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import EducationLeadership from "../components/EducationLeadership";

function Home() {
  return (
    <div className="overflow-x-hidden bg-[#030712] text-white">
      <Navbar />
      <Hero />
      <About />
      <EducationLeadership />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
