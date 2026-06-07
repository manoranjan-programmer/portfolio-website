import mongoose from "mongoose"

const certificationFields = {
  title: { type: String, required: true },
  organization: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, trim: true, default: "" },
  image: { type: String, required: true },
  achievementPlace: { type: String, trim: true, default: "" },
  achievementImage: { type: String, trim: true, default: "" },
}

const certificationSchema = new mongoose.Schema(certificationFields)

if (mongoose.models.Certification) {
  mongoose.models.Certification.schema.add({
    description: certificationFields.description,
    achievementPlace: certificationFields.achievementPlace,
    achievementImage: certificationFields.achievementImage,
  })
}

export default mongoose.models.Certification || mongoose.model("Certification", certificationSchema)
