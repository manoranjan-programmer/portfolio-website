import mongoose from "mongoose"

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    score: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Education || mongoose.model("Education", educationSchema)
