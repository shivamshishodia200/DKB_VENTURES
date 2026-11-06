import mongoose from 'mongoose'

const EnquirySchema = new mongoose.Schema(
  {
    refId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    businessName: { type: String, required: true },
    mobile: { type: String, required: true },
    whatsapp: { type: String },
    email: { type: String },
    businessType: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    brand: { type: String, default: 'All Brands' },
    productsOfInterest: { type: String },
    approxQty: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Quotation Shared', 'Closed', 'Archived'],
      default: 'New',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Enquiry', EnquirySchema)

