import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  FaBriefcase, 
  FaAward, 
  FaDatabase, 
  FaEnvelope, 
  FaLink, 
  FaSignOutAlt, 
  FaChevronRight, 
  FaRegEdit, 
  FaTrashAlt, 
  FaUpload,
  FaArrowLeft,
  FaGraduationCap,
  FaUserTie
} from "react-icons/fa"
import API from "../services/api.js"

function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({})
  const [about, setAbout] = useState(null)
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [certifications, setCertifications] = useState([])
  const [skills, setSkills] = useState([])
  const [contacts, setContacts] = useState([])
  const [education, setEducation] = useState([])
  const [leadership, setLeadership] = useState([])

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    liveDemo: "",
    technologies: "",
  })
  const [projectImageFile, setProjectImageFile] = useState(null)

  const [experienceForm, setExperienceForm] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    present: false,
    description: "",
  })

  const [certificationForm, setCertificationForm] = useState({
    title: "",
    organization: "",
    date: "",
    description: "",
    image: "",
    achievementPlace: "",
    achievementImage: "",
  })
  const [certificationImageFile, setCertificationImageFile] = useState(null)
  const [certificationAchievementImageFile, setCertificationAchievementImageFile] = useState(null)
  const [showCertificationAchievement, setShowCertificationAchievement] = useState(false)

  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "",
    level: "",
  })

  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    duration: "",
    score: "",
  })

  const [leadershipForm, setLeadershipForm] = useState({
    title: "",
    duration: "",
    description: "",
  })

  const [aboutForm, setAboutForm] = useState({
    name: "",
    role: "",
    description: "",
    image: "",
    resume: "",
    github: "",
    linkedin: "",
    instagram: "",
    projectsCompleted: "",
    expertise: "",
  })

  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [selectedCertification, setSelectedCertification] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [selectedEducation, setSelectedEducation] = useState(null)
  const [selectedLeadership, setSelectedLeadership] = useState(null)
  const [aboutId, setAboutId] = useState(null)
  const [messageState, setMessageState] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    type: "",
    id: null,
    title: ""
  })

  const fetchAdminData = useCallback(async () => {
    try {
      const [
        statsRes,
        aboutRes,
        projectsRes,
        expRes,
        certRes,
        skillsRes,
        contactsRes,
        educationRes,
        leadershipRes,
      ] =
        await Promise.all([
          API.get("/admin/stats"),
          API.get("/about"),
          API.get("/projects"),
          API.get("/experience"),
          API.get("/certifications"),
          API.get("/skills"),
          API.get("/contact"),
          API.get("/education"),
          API.get("/leadership"),
        ])

      setStats(statsRes.data)
      setAbout(aboutRes.data)
      setProjects(projectsRes.data)
      setExperiences(expRes.data)
      setCertifications(certRes.data)
      setSkills(skillsRes.data)
      setContacts(contactsRes.data)
      setEducation(educationRes.data)
      setLeadership(leadershipRes.data)

      if (aboutRes.data?._id) {
        setAboutId(aboutRes.data._id)
        setAboutForm({
          name: aboutRes.data.name || "",
          role: aboutRes.data.role || "",
          description: aboutRes.data.description || "",
          image: aboutRes.data.image || "",
          resume: aboutRes.data.resume || "",
          github: aboutRes.data.github || "",
          linkedin: aboutRes.data.linkedin || "",
          instagram: aboutRes.data.instagram || "",
          projectsCompleted: aboutRes.data.projectsCompleted || "",
          expertise: aboutRes.data.expertise || "",
        })
      }
    } catch (error) {
      console.error(error)
      if (error.response?.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        router.replace("/admin-login")
      }
    }
  }, [router])

  useEffect(() => {
    fetchAdminData()
  }, [fetchAdminData])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("admin")
    router.push("/admin-login")
  }

  const handleProjectChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value })
  }

  const handleProjectImageChange = (e) => {
    setProjectImageFile(e.target.files?.[0] || null)
  }

  const handleExperienceChange = (e) => {
    const { name, value, type, checked } = e.target
    setExperienceForm({
      ...experienceForm,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleCertificationChange = (e) => {
    setCertificationForm({ ...certificationForm, [e.target.name]: e.target.value })
  }

  const handleCertificationImageChange = (e) => {
    setCertificationImageFile(e.target.files?.[0] || null)
  }

  const handleCertificationAchievementImageChange = (e) => {
    setCertificationAchievementImageFile(e.target.files?.[0] || null)
  }

  const handleSkillChange = (e) => {
    setSkillForm({ ...skillForm, [e.target.name]: e.target.value })
  }

  const handleEducationChange = (e) => {
    setEducationForm({ ...educationForm, [e.target.name]: e.target.value })
  }

  const handleLeadershipChange = (e) => {
    setLeadershipForm({ ...leadershipForm, [e.target.name]: e.target.value })
  }

  const handleAboutChange = (e) => {
    setAboutForm({ ...aboutForm, [e.target.name]: e.target.value })
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...projectForm,
        technologies: projectForm.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      }

      let requestData = payload
      if (projectImageFile) {
        const formData = new FormData()
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value)
          }
        })
        formData.append("image", projectImageFile)
        requestData = formData
      }

      if (selectedProject) {
        await API.put(`/projects/${selectedProject._id}`, requestData)
        setMessage("Project updated successfully ✅")
      } else {
        await API.post("/projects", requestData)
        setMessage("Project created successfully ✅")
      }

      setProjectForm({
        title: "",
        description: "",
        image: "",
        github: "",
        liveDemo: "",
        technologies: "",
      })
      setProjectImageFile(null)
      setSelectedProject(null)
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error saving project ❌")
    }
  }

  const handleExperienceSubmit = async (e) => {
    e.preventDefault()
    try {
      const requestData = {
        company: experienceForm.company,
        role: experienceForm.role,
        startDate: experienceForm.startDate,
        endDate: experienceForm.present ? null : experienceForm.endDate,
        present: experienceForm.present,
        description: experienceForm.description,
      }

      if (selectedExperience) {
        await API.put(`/experience/${selectedExperience._id}`, requestData)
        setMessage("Experience updated successfully ✅")
      } else {
        await API.post("/experience", requestData)
        setMessage("Experience created successfully ✅")
      }

      setExperienceForm({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        present: false,
        description: "",
      })
      setSelectedExperience(null)
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error saving experience ❌")
    }
  }

  const handleCertificationSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      Object.entries(certificationForm).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value)
        }
      })
      if (certificationImageFile) {
        formData.append("image", certificationImageFile)
      }
      if (certificationAchievementImageFile) {
        formData.append("achievementImage", certificationAchievementImageFile)
      }

      if (selectedCertification) {
        await API.put(`/certifications/${selectedCertification._id}`, formData)
        setMessage("Certification updated successfully ✅")
      } else {
        await API.post("/certifications", formData)
        setMessage("Certification created successfully ✅")
      }

      setCertificationForm({
        title: "",
        organization: "",
        date: "",
        description: "",
        image: "",
        achievementPlace: "",
        achievementImage: "",
      })
      setCertificationImageFile(null)
      setCertificationAchievementImageFile(null)
      setShowCertificationAchievement(false)
      setSelectedCertification(null)
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error saving certification ❌")
    }
  }

  const handleSkillSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedSkill) {
        await API.put(`/skills/${selectedSkill._id}`, skillForm)
        setMessage("Skill updated successfully ✅")
      } else {
        await API.post("/skills", skillForm)
        setMessage("Skill created successfully ✅")
      }

      setSkillForm({
        name: "",
        category: "",
        level: "",
      })
      setSelectedSkill(null)
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error saving skill ❌")
    }
  }

  const handleEducationSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedEducation) {
        await API.put(`/education/${selectedEducation._id}`, educationForm)
        setMessage("Education updated successfully")
      } else {
        await API.post("/education", educationForm)
        setMessage("Education added successfully")
      }

      setEducationForm({
        degree: "",
        institution: "",
        duration: "",
        score: "",
      })
      setSelectedEducation(null)
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage(error.response?.data?.message || "Error saving education")
    }
  }

  const handleLeadershipSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedLeadership) {
        await API.put(`/leadership/${selectedLeadership._id}`, leadershipForm)
        setMessage("Leadership position updated successfully")
      } else {
        await API.post("/leadership", leadershipForm)
        setMessage("Leadership position added successfully")
      }

      setLeadershipForm({
        title: "",
        duration: "",
        description: "",
      })
      setSelectedLeadership(null)
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage(error.response?.data?.message || "Error saving leadership position")
    }
  }

  const handleAboutSubmit = async (e) => {
    e.preventDefault()
    try {
      if (aboutId) {
        await API.put(`/about/${aboutId}`, aboutForm)
        setMessage("About section updated successfully ✅")
      } else {
        await API.post("/about", aboutForm)
        setMessage("About section created successfully ✅")
      }
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error updating About Me ❌")
    }
  }

  const removeProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`)
      setMessage("Project deleted successfully 🗑️")
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error deleting project ❌")
    }
  }

  const removeExperience = async (id) => {
    try {
      await API.delete(`/experience/${id}`)
      setMessage("Experience deleted successfully 🗑️")
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error deleting experience ❌")
    }
  }

  const removeCertification = async (id) => {
    try {
      await API.delete(`/certifications/${id}`)
      setMessage("Certification deleted successfully 🗑️")
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error deleting certification ❌")
    }
  }

  const removeSkill = async (id) => {
    try {
      await API.delete(`/skills/${id}`)
      setMessage("Skill deleted successfully 🗑️")
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error deleting skill ❌")
    }
  }

  const removeEducation = async (id) => {
    try {
      await API.delete(`/education/${id}`)
      setMessage("Education deleted successfully")
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error deleting education")
    }
  }

  const removeLeadership = async (id) => {
    try {
      await API.delete(`/leadership/${id}`)
      setMessage("Leadership position deleted successfully")
      fetchAdminData()
    } catch (error) {
      console.error(error)
      setMessage("Error deleting leadership position")
    }
  }

  const setMessage = (msg) => {
    setMessageState(msg)
    setTimeout(() => setMessageState(""), 4500)
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24 relative overflow-hidden">
      {/* Background visual highlights */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-10">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-white transition duration-300 uppercase tracking-widest font-mono">
                <FaArrowLeft className="text-[10px]" /> Portfolio
              </Link>
              <span className="text-white/10">|</span>
              <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-indigo-500/20">
                JWT Auth Mode
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight pt-1">
              Admin <span className="gradient-text-indigo-emerald">Control Dashboard</span>
            </h1>
            <p className="text-slate-400 text-sm font-light">
              Add, update, or remove portfolio nodes securely.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3.5 rounded-2xl font-bold hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer self-start md:self-auto text-sm"
          >
            <FaSignOutAlt className="text-sm" />
            <span>End Session</span>
          </button>
        </div>

        {/* Global Toast Alert */}
        {messageState && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-indigo-500/30 bg-[#070b18]/80 backdrop-blur-md p-4 text-sm font-mono text-indigo-300 shadow-xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {messageState}
          </motion.div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
          <div className="glass-card p-5 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-indigo-400/20 transition-all duration-300">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-bold flex items-center gap-1.5">
              <FaDatabase className="text-indigo-400" /> Skills
            </span>
            <span className="text-3xl font-extrabold text-white mt-3 font-mono">
              {stats.skillCount ?? 0}
            </span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-indigo-400/20 transition-all duration-300">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-bold flex items-center gap-1.5">
              <FaLink className="text-indigo-400" /> Projects
            </span>
            <span className="text-3xl font-extrabold text-white mt-3 font-mono">
              {stats.projectCount ?? 0}
            </span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-emerald-400/20 transition-all duration-300">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-bold flex items-center gap-1.5">
              <FaBriefcase className="text-emerald-400" /> Careers
            </span>
            <span className="text-3xl font-extrabold text-white mt-3 font-mono">
              {stats.experienceCount ?? 0}
            </span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-indigo-400/20 transition-all duration-300">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-bold flex items-center gap-1.5">
              <FaAward className="text-indigo-400" /> Credentials
            </span>
            <span className="text-3xl font-extrabold text-white mt-3 font-mono">
              {stats.certificationCount ?? 0}
            </span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-emerald-400/20 transition-all duration-300">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-bold flex items-center gap-1.5">
              <FaEnvelope className="text-emerald-400" /> Messages
            </span>
            <span className="text-3xl font-extrabold text-white mt-3 font-mono">
              {stats.contactCount ?? 0}
            </span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-indigo-400/20 transition-all duration-300">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-bold flex items-center gap-1.5">
              <FaGraduationCap className="text-indigo-400" /> Education
            </span>
            <span className="text-3xl font-extrabold text-white mt-3 font-mono">
              {stats.educationCount ?? education.length}
            </span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-emerald-400/20 transition-all duration-300 col-span-2 lg:col-span-1">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-bold flex items-center gap-1.5">
              <FaUserTie className="text-emerald-400" /> Leadership
            </span>
            <span className="text-3xl font-extrabold text-white mt-3 font-mono">
              {stats.leadershipCount ?? leadership.length}
            </span>
          </div>
        </div>

        {/* Section Zone 1: About Info Grid & Inbox */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* About Section Management */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
            <h2 className="text-2xl font-extrabold text-white tracking-wide border-b border-white/5 pb-3">
              About Info Grid
            </h2>
            <form onSubmit={handleAboutSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={aboutForm.name}
                    onChange={handleAboutChange}
                    placeholder="e.g. Mano Ranjan"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={aboutForm.role}
                    onChange={handleAboutChange}
                    placeholder="e.g. Data Scientist"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Description</label>
                <textarea
                  name="description"
                  value={aboutForm.description}
                  onChange={handleAboutChange}
                  rows="4"
                  placeholder="Enter detailed bio context..."
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm resize-none transition duration-300"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={aboutForm.image}
                    onChange={handleAboutChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Resume URL</label>
                  <input
                    type="text"
                    name="resume"
                    value={aboutForm.resume}
                    onChange={handleAboutChange}
                    placeholder="https://example.com/resume.pdf"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">GitHub</label>
                  <input
                    type="text"
                    name="github"
                    value={aboutForm.github}
                    onChange={handleAboutChange}
                    placeholder="GitHub URL"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={aboutForm.linkedin}
                    onChange={handleAboutChange}
                    placeholder="LinkedIn URL"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    value={aboutForm.instagram}
                    onChange={handleAboutChange}
                    placeholder="Instagram URL"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Projects Completed</label>
                  <input
                    type="text"
                    name="projectsCompleted"
                    value={aboutForm.projectsCompleted}
                    onChange={handleAboutChange}
                    placeholder="e.g. 15+"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Expertise / Core Focus</label>
                  <input
                    type="text"
                    name="expertise"
                    value={aboutForm.expertise}
                    onChange={handleAboutChange}
                    placeholder="e.g. Deep Learning Pipelines"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                  />
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-4.5 rounded-2xl font-bold hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_25px_rgba(99,102,241,0.15)] text-sm uppercase cursor-pointer">
                Save & Synchronize Biography
              </button>
            </form>
          </div>

          {/* Contact Inbox Messages */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white tracking-wide border-b border-white/5 pb-3">
                Inbound Message Logs
              </h2>
              <div className="space-y-4 max-h-[560px] overflow-y-auto pr-2 custom-scrollbar">
                {contacts.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 space-y-1">
                    <p className="font-semibold text-sm">Inbox Queue Empty</p>
                    <p className="text-xs font-light">No direct inquiries have been recorded yet.</p>
                  </div>
                ) : (
                  contacts.map((item) => (
                    <div key={item._id} className="rounded-2xl border border-white/5 bg-[#030712]/60 p-5 space-y-3 hover:border-indigo-400/20 transition duration-300">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-extrabold text-white text-sm tracking-wide">{item.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-indigo-400 font-mono text-xs truncate">{item.email}</p>
                      <p className="text-slate-300 leading-relaxed font-light text-sm bg-white/5 rounded-xl p-4 border border-white/5">
                        {item.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section Zone 2: Skills Management */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Skill Creator / Editor */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                {selectedSkill ? "Edit Skill Node" : "Publish Dynamic Skill"}
              </h2>
              <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-500/20">
                {skills.length} Total
              </span>
            </div>
            
            <form onSubmit={handleSkillSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Skill Name</label>
                  <input
                    name="name"
                    value={skillForm.name}
                    onChange={handleSkillChange}
                    placeholder="e.g. Python, React.js, PyTorch"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Skill Level</label>
                  <select
                    name="level"
                    value={skillForm.level}
                    onChange={handleSkillChange}
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-300 outline-none text-sm transition duration-300 cursor-pointer"
                    required
                  >
                    <option value="" disabled>Select Level</option>
                    <option value="Expert">Expert</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Skill Category</label>
                <select
                  name="category"
                  value={skillForm.category}
                  onChange={handleSkillChange}
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-300 outline-none text-sm transition duration-300 cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Programming Languages">Programming Languages</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="Frontend Systems">Frontend Systems</option>
                  <option value="Backend Systems">Backend Systems</option>
                  <option value="Database & Pipelines">Database & Pipelines</option>
                  <option value="Analytics & BI">Analytics & BI</option>
                </select>
              </div>

              <div className="flex gap-4 pt-2">
                <button className="flex-grow bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-4 rounded-2xl font-bold hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_25px_rgba(99,102,241,0.15)] text-sm uppercase cursor-pointer">
                  {selectedSkill ? "Update Skill Parameters" : "Publish Skill Live"}
                </button>
                {selectedSkill && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSkill(null)
                      setSkillForm({
                        name: "",
                        category: "",
                        level: "",
                      })
                    }}
                    className="bg-white/5 border border-white/5 text-slate-300 px-5 rounded-2xl font-semibold text-xs uppercase hover:bg-white/10 hover:border-red-400/20 hover:text-red-400 transition duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
              {skills.map((skill) => (
                <div key={skill._id} className="rounded-2xl border border-white/5 bg-[#030712]/60 p-5 hover:border-indigo-400/20 transition duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-base font-extrabold text-white tracking-wide">{skill.name}</h3>
                      <p className="text-slate-500 text-xs font-mono mt-1">
                        {skill.category} • <span className="text-indigo-400">{skill.level}</span>
                      </p>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setSelectedSkill(skill)
                          setSkillForm({
                            name: skill.name,
                            category: skill.category,
                            level: skill.level,
                          })
                        }}
                        className="p-2.5 rounded-xl border border-indigo-500/20 hover:border-indigo-400 text-indigo-400 hover:bg-indigo-500/10 transition duration-300"
                        title="Edit Skill"
                      >
                        <FaRegEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ show: true, type: "skill", id: skill._id, title: skill.name })}
                        className="p-2.5 rounded-xl border border-red-500/20 hover:border-red-500 text-red-400 hover:bg-red-500/10 transition duration-300"
                        title="Delete Skill"
                      >
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Operations Guide */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white tracking-wide border-b border-white/5 pb-3">
                Skills Operations Guide
              </h2>
              <div className="space-y-3 font-light text-slate-300 text-sm leading-relaxed">
                <p className="flex gap-2"><FaChevronRight className="text-indigo-400 text-[10px] mt-1.5 flex-shrink-0" /> Creating skills here will store them in the MongoDB collection for secure referencing.</p>
                <p className="flex gap-2"><FaChevronRight className="text-indigo-400 text-[10px] mt-1.5 flex-shrink-0" /> Rest assured, dynamic database updates are performed securely using verified REST sessions.</p>
              </div>
            </div>
            
            <div className="bg-[#030712]/80 border border-white/5 rounded-2xl p-5 font-mono text-[10px] text-slate-500 space-y-1 mt-6">
              <p>JWT TOKEN STATUS: ACTIVE (VERIFIED)</p>
              <p>ROLES PERMISSION: ROOT / WRITE-ACCESS</p>
              <p>PORTAL NODE: ADMIN-RESOURCES</p>
            </div>
          </div>
        </section>

        {/* Section Zone 3: Projects Showcase Control */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Projects Creator/Editor */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                {selectedProject ? "Edit Project Node" : "Publish Project"}
              </h2>
              <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-500/20">
                {projects.length} Total
              </span>
            </div>
            
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Project Title</label>
                  <input
                    name="title"
                    value={projectForm.title}
                    onChange={handleProjectChange}
                    placeholder="e.g. Predictive Analytics System"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Media Asset Upload</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProjectImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-[#030712]/60 border border-white/5 hover:border-indigo-400 p-3.5 rounded-2xl text-slate-400 text-xs flex items-center justify-center gap-2 transition duration-300">
                      <FaUpload className="text-indigo-400" />
                      <span>{projectImageFile ? projectImageFile.name : "Select Image Asset"}</span>
                    </div>
                  </div>
                  {!projectImageFile && projectForm.image && (
                    <p className="text-[10px] text-slate-500 truncate pt-1">Active: {projectForm.image}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Description Summary</label>
                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectChange}
                  placeholder="Summarize application, architecture, and technology specs..."
                  rows="4"
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm resize-none transition duration-300"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">GitHub URL</label>
                  <input
                    name="github"
                    value={projectForm.github}
                    onChange={handleProjectChange}
                    placeholder="Repository Link"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Live Demo URL</label>
                  <input
                    name="liveDemo"
                    value={projectForm.liveDemo}
                    onChange={handleProjectChange}
                    placeholder="Deployment Link"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Tech Badges (comma split)</label>
                  <input
                    name="technologies"
                    value={projectForm.technologies}
                    onChange={handleProjectChange}
                    placeholder="e.g. React, Node, Python"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button className="flex-grow bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-4 rounded-2xl font-bold hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_25px_rgba(99,102,241,0.15)] text-sm uppercase cursor-pointer">
                  {selectedProject ? "Update Project Parameters" : "Publish Project Live"}
                </button>
                {selectedProject && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(null)
                      setProjectImageFile(null)
                      setProjectForm({
                        title: "",
                        description: "",
                        image: "",
                        github: "",
                        liveDemo: "",
                        technologies: "",
                      })
                    }}
                    className="bg-white/5 border border-white/5 text-slate-300 px-5 rounded-2xl font-semibold text-xs uppercase hover:bg-white/10 hover:border-red-400/20 hover:text-red-400 transition duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
              {projects.map((project) => (
                <div key={project._id} className="rounded-2xl border border-white/5 bg-[#030712]/60 p-5 hover:border-indigo-400/20 transition duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-base font-extrabold text-white tracking-wide">{project.title}</h3>
                      <p className="text-slate-500 text-xs font-mono mt-1">{project.technologies?.join(" • ")}</p>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setSelectedProject(project)
                          setProjectImageFile(null)
                          setProjectForm({
                            title: project.title,
                            description: project.description,
                            image: project.image || "",
                            github: project.github || "",
                            liveDemo: project.liveDemo || "",
                            technologies: project.technologies?.join(", ") || "",
                          })
                        }}
                        className="p-2.5 rounded-xl border border-indigo-500/20 hover:border-indigo-400 text-indigo-400 hover:bg-indigo-500/10 transition duration-300"
                        title="Edit Project"
                      >
                        <FaRegEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ show: true, type: "project", id: project._id, title: project.title })}
                        className="p-2.5 rounded-xl border border-red-500/20 hover:border-red-500 text-red-400 hover:bg-red-500/10 transition duration-300"
                        title="Delete Project"
                      >
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience Timelines */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                {selectedExperience ? "Edit Career node" : "Publish Career Role"}
              </h2>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                {experiences.length} Total
              </span>
            </div>

            <form onSubmit={handleExperienceSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Company Name</label>
                  <input
                    name="company"
                    value={experienceForm.company}
                    onChange={handleExperienceChange}
                    placeholder="e.g. Apex Systems"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Role Designation</label>
                  <input
                    name="role"
                    value={experienceForm.role}
                    onChange={handleExperienceChange}
                    placeholder="e.g. Full-Stack Developer"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={experienceForm.startDate}
                    onChange={handleExperienceChange}
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-300 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={experienceForm.endDate}
                    onChange={handleExperienceChange}
                    disabled={experienceForm.present}
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-300 outline-none text-sm transition duration-300 disabled:cursor-not-allowed disabled:opacity-40"
                    required={!experienceForm.present}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#030712]/40 rounded-xl p-3 border border-white/5">
                <input
                  type="checkbox"
                  name="present"
                  checked={experienceForm.present}
                  onChange={handleExperienceChange}
                  id="present-check-db"
                  className="h-4.5 w-4.5 rounded border-white/10 bg-[#030712] text-indigo-500 focus:ring-indigo-500"
                />
                <label htmlFor="present-check-db" className="text-slate-300 text-xs font-semibold cursor-pointer">
                  Currently active in this position
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Role Details / Duties</label>
                <textarea
                  name="description"
                  value={experienceForm.description}
                  onChange={handleExperienceChange}
                  placeholder="Detail primary tech accomplishments, system architecture tasks..."
                  rows="3"
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm resize-none transition duration-300"
                  required
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button className="flex-grow bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-4 rounded-2xl font-bold hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_25px_rgba(99,102,241,0.15)] text-sm uppercase cursor-pointer">
                  {selectedExperience ? "Update Career Parameters" : "Publish Career Role Live"}
                </button>
                {selectedExperience && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedExperience(null)
                      setExperienceForm({
                        company: "",
                        role: "",
                        startDate: "",
                        endDate: "",
                        present: false,
                        description: "",
                      })
                    }}
                    className="bg-white/5 border border-white/5 text-slate-300 px-5 rounded-2xl font-semibold text-xs uppercase hover:bg-white/10 hover:border-red-400/20 hover:text-red-400 transition duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-3 max-h-[310px] overflow-y-auto pr-2 custom-scrollbar">
              {experiences.map((item) => (
                <div key={item._id} className="rounded-2xl border border-white/5 bg-[#030712]/60 p-5 hover:border-indigo-400/20 transition duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-base font-extrabold text-white tracking-wide">{item.role}</h3>
                      <p className="text-emerald-400 font-bold text-xs mt-0.5">{item.company}</p>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setSelectedExperience(item)
                          setExperienceForm({
                            company: item.company,
                            role: item.role,
                            startDate: item.startDate ? item.startDate.split("T")[0] : "",
                            endDate: item.endDate ? item.endDate.split("T")[0] : "",
                            present: item.present || false,
                            description: item.description,
                          })
                        }}
                        className="p-2.5 rounded-xl border border-indigo-500/20 hover:border-indigo-400 text-indigo-400 hover:bg-indigo-500/10 transition duration-300"
                        title="Edit Experience"
                      >
                        <FaRegEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ show: true, type: "experience", id: item._id, title: `${item.role} at ${item.company}` })}
                        className="p-2.5 rounded-xl border border-red-500/20 hover:border-red-500 text-red-400 hover:bg-red-500/10 transition duration-300"
                        title="Delete Experience"
                      >
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Zone 4: Education & Leadership */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                {selectedEducation ? "Edit Education" : "Add Education"}
              </h2>
              <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-500/20">
                {education.length} Total
              </span>
            </div>

            <form onSubmit={handleEducationSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Degree</label>
                  <input
                    name="degree"
                    value={educationForm.degree}
                    onChange={handleEducationChange}
                    placeholder="e.g. B.Tech Artificial Intelligence"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Institution</label>
                  <input
                    name="institution"
                    value={educationForm.institution}
                    onChange={handleEducationChange}
                    placeholder="e.g. KPR Institute of Engineering"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Duration</label>
                  <input
                    name="duration"
                    value={educationForm.duration}
                    onChange={handleEducationChange}
                    placeholder="e.g. 2024 - 2028"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Score</label>
                  <input
                    name="score"
                    value={educationForm.score}
                    onChange={handleEducationChange}
                    placeholder="e.g. CGPA: 8.7 or Percentage: 80%"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button className="flex-grow bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-4 rounded-2xl font-bold hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_25px_rgba(99,102,241,0.15)] text-sm uppercase cursor-pointer">
                  {selectedEducation ? "Update Education" : "Add Education"}
                </button>
                {selectedEducation && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEducation(null)
                      setEducationForm({
                        degree: "",
                        institution: "",
                        duration: "",
                        score: "",
                      })
                    }}
                    className="bg-white/5 border border-white/5 text-slate-300 px-5 rounded-2xl font-semibold text-xs uppercase hover:bg-white/10 hover:border-red-400/20 hover:text-red-400 transition duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-3 max-h-[310px] overflow-y-auto pr-2 custom-scrollbar">
              {education.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">No education entries yet.</div>
              ) : (
                education.map((item) => (
                  <div key={item._id} className="rounded-2xl border border-white/5 bg-[#030712]/60 p-5 hover:border-indigo-400/20 transition duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-base font-extrabold text-white tracking-wide">{item.degree}</h3>
                        <p className="text-indigo-400 font-bold text-xs mt-0.5">{item.institution}</p>
                        <p className="text-slate-500 text-xs font-mono mt-1">
                          {item.duration}
                          {item.score ? ` | ${item.score}` : ""}
                        </p>
                      </div>
                      <div className="flex gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            setSelectedEducation(item)
                            setEducationForm({
                              degree: item.degree || "",
                              institution: item.institution || "",
                              duration: item.duration || "",
                              score: item.score || "",
                            })
                          }}
                          className="p-2.5 rounded-xl border border-indigo-500/20 hover:border-indigo-400 text-indigo-400 hover:bg-indigo-500/10 transition duration-300"
                          title="Edit Education"
                        >
                          <FaRegEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ show: true, type: "education", id: item._id, title: item.degree })}
                          className="p-2.5 rounded-xl border border-red-500/20 hover:border-red-500 text-red-400 hover:bg-red-500/10 transition duration-300"
                          title="Delete Education"
                        >
                          <FaTrashAlt className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                {selectedLeadership ? "Edit Leadership" : "Add Leadership"}
              </h2>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                {leadership.length} Total
              </span>
            </div>

            <form onSubmit={handleLeadershipSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Position Title</label>
                  <input
                    name="title"
                    value={leadershipForm.title}
                    onChange={handleLeadershipChange}
                    placeholder="e.g. IEEE Design Lead"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Duration</label>
                  <input
                    name="duration"
                    value={leadershipForm.duration}
                    onChange={handleLeadershipChange}
                    placeholder="e.g. 2025 - Present"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Description</label>
                <textarea
                  name="description"
                  value={leadershipForm.description}
                  onChange={handleLeadershipChange}
                  placeholder="Describe responsibilities, impact, and activities..."
                  rows="4"
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm resize-none transition duration-300"
                  required
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button className="flex-grow bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-4 rounded-2xl font-bold hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_25px_rgba(99,102,241,0.15)] text-sm uppercase cursor-pointer">
                  {selectedLeadership ? "Update Leadership" : "Add Leadership Position"}
                </button>
                {selectedLeadership && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLeadership(null)
                      setLeadershipForm({
                        title: "",
                        duration: "",
                        description: "",
                      })
                    }}
                    className="bg-white/5 border border-white/5 text-slate-300 px-5 rounded-2xl font-semibold text-xs uppercase hover:bg-white/10 hover:border-red-400/20 hover:text-red-400 transition duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-3 max-h-[310px] overflow-y-auto pr-2 custom-scrollbar">
              {leadership.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">No leadership positions yet.</div>
              ) : (
                leadership.map((item) => (
                  <div key={item._id} className="rounded-2xl border border-white/5 bg-[#030712]/60 p-5 hover:border-emerald-400/20 transition duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-base font-extrabold text-white tracking-wide">{item.title}</h3>
                        <p className="text-emerald-400 font-bold text-xs mt-0.5">{item.duration}</p>
                        <p className="text-slate-400 text-sm mt-3 leading-relaxed">{item.description}</p>
                      </div>
                      <div className="flex gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            setSelectedLeadership(item)
                            setLeadershipForm({
                              title: item.title || "",
                              duration: item.duration || "",
                              description: item.description || "",
                            })
                          }}
                          className="p-2.5 rounded-xl border border-indigo-500/20 hover:border-indigo-400 text-indigo-400 hover:bg-indigo-500/10 transition duration-300"
                          title="Edit Leadership"
                        >
                          <FaRegEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ show: true, type: "leadership", id: item._id, title: item.title })}
                          className="p-2.5 rounded-xl border border-red-500/20 hover:border-red-500 text-red-400 hover:bg-red-500/10 transition duration-300"
                          title="Delete Leadership"
                        >
                          <FaTrashAlt className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Section Zone 5: Certifications & Ops Guide */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Certification Publish Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                {selectedCertification ? "Edit Certification" : "Publish Certification"}
              </h2>
              <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-500/20">
                {certifications.length} Total
              </span>
            </div>

            <form onSubmit={handleCertificationSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Certification Title</label>
                  <input
                    name="title"
                    value={certificationForm.title}
                    onChange={handleCertificationChange}
                    placeholder="e.g. AWS Solutions Architect"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Issuing Body</label>
                  <input
                    name="organization"
                    value={certificationForm.organization}
                    onChange={handleCertificationChange}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Date Issued</label>
                  <input
                    type="date"
                    name="date"
                    value={certificationForm.date}
                    onChange={handleCertificationChange}
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm transition duration-300"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Certificate File Upload</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleCertificationImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      required={!certificationForm.image && !certificationImageFile}
                    />
                    <div className="w-full bg-[#030712]/60 border border-white/5 hover:border-indigo-400 p-3.5 rounded-2xl text-slate-400 text-xs flex items-center justify-center gap-2 transition duration-300">
                      <FaUpload className="text-indigo-400" />
                      <span>{certificationImageFile ? certificationImageFile.name : "Select image or PDF file"}</span>
                    </div>
                  </div>
                  {!certificationImageFile && certificationForm.image && (
                    <p className="text-[10px] text-slate-500 truncate pt-1">Active: {certificationForm.image}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Certificate Description</label>
                <textarea
                  name="description"
                  value={certificationForm.description}
                  onChange={handleCertificationChange}
                  placeholder="Describe what this certificate validates, tools covered, or key learning..."
                  rows="4"
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-200 outline-none text-sm resize-none transition duration-300"
                />
              </div>

              <div className="rounded-2xl border border-white/5 bg-[#030712]/40 p-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Achievement Details</p>
                    <p className="text-xs text-slate-400 mt-1">Add only when this certificate is tied to a prize or achievement.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (showCertificationAchievement) {
                        setCertificationAchievementImageFile(null)
                        setCertificationForm({
                          ...certificationForm,
                          achievementPlace: "",
                          achievementImage: "",
                        })
                      }
                      setShowCertificationAchievement(!showCertificationAchievement)
                    }}
                    className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-3 rounded-2xl font-bold text-xs uppercase hover:bg-indigo-500 hover:text-white transition duration-300"
                  >
                    {showCertificationAchievement ? "Remove Achievement" : "Add Achievement Details"}
                  </button>
                </div>

                {showCertificationAchievement && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Prize / Place</label>
                      <select
                        name="achievementPlace"
                        value={certificationForm.achievementPlace}
                        onChange={handleCertificationChange}
                        className="w-full bg-[#030712]/60 border border-white/5 focus:border-indigo-400 p-4 rounded-2xl text-slate-300 outline-none text-sm transition duration-300 cursor-pointer"
                      >
                        <option value="">Select achievement result</option>
                        <option value="First Prize">First Prize</option>
                        <option value="Second Prize">Second Prize</option>
                        <option value="Third Prize">Third Prize</option>
                        <option value="Participant / No Prize">Participant / No Prize</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Achievement Photo</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCertificationAchievementImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full bg-[#030712]/60 border border-white/5 hover:border-emerald-400 p-3.5 rounded-2xl text-slate-400 text-xs flex items-center justify-center gap-2 transition duration-300">
                          <FaUpload className="text-emerald-400" />
                          <span>{certificationAchievementImageFile ? certificationAchievementImageFile.name : "Upload achievement photo"}</span>
                        </div>
                      </div>
                      {!certificationAchievementImageFile && certificationForm.achievementImage && (
                        <p className="text-[10px] text-slate-500 truncate pt-1">Active: {certificationForm.achievementImage}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-2">
                <button className="flex-grow bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-4 rounded-2xl font-bold hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_25px_rgba(99,102,241,0.15)] text-sm uppercase cursor-pointer">
                  {selectedCertification ? "Update Credentials" : "Publish Credentials Live"}
                </button>
                {selectedCertification && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCertification(null)
                      setCertificationImageFile(null)
                      setCertificationAchievementImageFile(null)
                      setShowCertificationAchievement(false)
                      setCertificationForm({
                        title: "",
                        organization: "",
                        date: "",
                        description: "",
                        image: "",
                        achievementPlace: "",
                        achievementImage: "",
                      })
                    }}
                    className="bg-white/5 border border-white/5 text-slate-300 px-5 rounded-2xl font-semibold text-xs uppercase hover:bg-white/10 hover:border-red-400/20 hover:text-red-400 transition duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-3 max-h-[310px] overflow-y-auto pr-2 custom-scrollbar">
              {certifications.map((item) => (
                <div key={item._id} className="rounded-2xl border border-white/5 bg-[#030712]/60 p-5 hover:border-indigo-400/20 transition duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-base font-extrabold text-white tracking-wide">{item.title}</h3>
                      <p className="text-indigo-400 font-bold text-xs mt-0.5">{item.organization}</p>
                      {item.description && (
                        <p className="text-slate-500 text-xs mt-2 line-clamp-2">{item.description}</p>
                      )}
                      {(item.achievementPlace || item.achievementImage) && (
                        <p className="text-emerald-400 text-[10px] font-mono mt-2 uppercase tracking-wider">
                          Achievement details added
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setSelectedCertification(item)
                          setCertificationImageFile(null)
                          setCertificationAchievementImageFile(null)
                          setShowCertificationAchievement(Boolean(item.achievementPlace || item.achievementImage))
                          setCertificationForm({
                            title: item.title,
                            organization: item.organization,
                            date: item.date,
                            description: item.description || "",
                            image: item.image,
                            achievementPlace: item.achievementPlace || "",
                            achievementImage: item.achievementImage || "",
                          })
                        }}
                        className="p-2.5 rounded-xl border border-indigo-500/20 hover:border-indigo-400 text-indigo-400 hover:bg-indigo-500/10 transition duration-300"
                        title="Edit Certification"
                      >
                        <FaRegEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ show: true, type: "certification", id: item._id, title: item.title })}
                        className="p-2.5 rounded-xl border border-red-500/20 hover:border-red-500 text-red-400 hover:bg-red-500/10 transition duration-300"
                        title="Delete Certification"
                      >
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Operations & Summary Guide */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white tracking-wide border-b border-white/5 pb-3">
                Operations Guide
              </h2>
              <div className="space-y-3 font-light text-slate-300 text-sm leading-relaxed">
                <p className="flex gap-2"><FaChevronRight className="text-indigo-400 text-[10px] mt-1.5 flex-shrink-0" /> Any image uploaded is processed via standard multipart server payload channels and stored directly on database resources.</p>
                <p className="flex gap-2"><FaChevronRight className="text-indigo-400 text-[10px] mt-1.5 flex-shrink-0" /> When editing components, form scopes will pre-fill. Click &apos;Cancel&apos; anytime to abort edit mode and flush forms.</p>
                <p className="flex gap-2"><FaChevronRight className="text-indigo-400 text-[10px] mt-1.5 flex-shrink-0" /> Dynamic synchronization triggers will automatically clear cache tags on client browsers for immediate delivery.</p>
              </div>
            </div>
            
            <div className="bg-[#030712]/80 border border-white/5 rounded-2xl p-5 font-mono text-[10px] text-slate-500 space-y-1 mt-6">
              <p>JWT TOKEN STATUS: ACTIVE (VERIFIED)</p>
              <p>ROLES PERMISSION: ROOT / WRITE-ACCESS</p>
              <p>PORTAL NODE: ADMIN-RESOURCES</p>
            </div>
          </div>
        </section>

      </div>

      {/* Custom Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card max-w-md w-full p-8 rounded-3xl border border-white/10 bg-[#0b1329] space-y-6 shadow-2xl text-center"
          >
            <h3 className="text-2xl font-extrabold text-white">Confirm Deletion</h3>
            <p className="text-slate-400 text-sm font-light">
              Are you sure you want to delete <span className="text-red-400 font-semibold">&quot;{deleteConfirm.title}&quot;</span>? This action cannot be undone.
            </p>
            <div className="flex gap-4 pt-2">
              <button
                onClick={async () => {
                  const { type, id } = deleteConfirm
                  setDeleteConfirm({ show: false, type: "", id: null, title: "" })
                  if (type === "project") await removeProject(id)
                  else if (type === "experience") await removeExperience(id)
                  else if (type === "certification") await removeCertification(id)
                  else if (type === "skill") await removeSkill(id)
                  else if (type === "education") await removeEducation(id)
                  else if (type === "leadership") await removeLeadership(id)
                }}
                className="flex-grow bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-2xl font-bold transition duration-300 text-sm uppercase cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirm({ show: false, type: "", id: null, title: "" })}
                className="flex-grow bg-white/5 border border-white/10 text-slate-300 py-3.5 rounded-2xl font-bold hover:bg-white/10 transition duration-300 text-sm uppercase cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
