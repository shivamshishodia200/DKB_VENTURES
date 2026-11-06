import mongoose from 'mongoose'

const PartnerSchema = new mongoose.Schema(
  {
    appRef: { type: String, required: true, unique: true },
    applicantName: { type: String, required: true },
    companyName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    businessCategory: { type: String, default: 'Distributor / Stockist' },
    brandsOfInterest: { type: String, default: 'All 3 Brands' },
    experienceYears: { type: String },
    status: {
      type: String,
      enum: ['Under Review', 'Interview Scheduled', 'Approved', 'Rejected'],
      default: 'Under Review',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Partner', PartnerSchema)

