import mongoose from "mongoose"

const leadershipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Leadership || mongoose.model("Leadership", leadershipSchema)
