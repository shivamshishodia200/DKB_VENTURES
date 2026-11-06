import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      paymentMethod: { type: String, default: 'cod' },
    },
    items: [
      {
        id: String,
        name: String,
        brandName: String,
        size: String,
        price: Number,
        qty: Number,
      },
    ],
    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Confirmed', 'Packing', 'Dispatched', 'Delivered', 'Cancelled'],
      default: 'Confirmed',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema)

