import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brandId: { type: String, required: true }, // 'cotx' | 'green-herbs' | 'divya-tea'
    brandName: { type: String, required: true },
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String },
    pricingMode: { type: String, enum: ['fixed', 'enquiry', 'wholesale'], default: 'fixed' },
    price: { type: Number, default: 0 },
    mrp: { type: Number, default: 0 },
    size: { type: String },
    variants: [
      {
        id: String,
        size: String,
        price: Number,
        mrp: Number,
        inStock: Boolean,
      },
    ],
    ingredients: { type: String },
    howToUse: { type: String },
    benefits: [String],
    bestseller: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)

