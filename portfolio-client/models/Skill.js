import mongoose from "mongoose"

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Skill || mongoose.model("Skill", skillSchema)
