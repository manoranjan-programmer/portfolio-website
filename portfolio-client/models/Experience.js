import mongoose from "mongoose"

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    present: { type: Boolean, default: false },
    duration: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Experience || mongoose.model("Experience", experienceSchema)
