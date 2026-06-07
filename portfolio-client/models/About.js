import mongoose from "mongoose"

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    resume: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    projectsCompleted: { type: String, default: "0+" },
    expertise: { type: String, default: "MERN Stack" },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.About || mongoose.model("About", aboutSchema)
