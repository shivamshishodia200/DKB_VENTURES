import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import apiRoutes from './routes/api.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || ''
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*'

// Middlewares
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mount API routes
app.use('/api', apiRoutes)

// Root Endpoint
app.get('/', (req, res) => {
  res.send({
    message: 'DKB VENTURES Official Backend & API Server is running.',
    headOffice: 'Budh Vihar, Delhi – 110086',
    gstin: '07CHBPS3702D4ZM',
    endpoints: {
      health: '/api/health',
      orders: '/api/orders',
      enquiries: '/api/enquiries',
      distribution: '/api/distribution',
      products: '/api/products',
    },
  })
})

// Database Connection & Server Start
async function startServer() {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI)
      console.log('✓ Successfully connected to MongoDB for DKB VENTURES.')
    } catch (err) {
      console.warn('! MongoDB connection failed. Running in standalone memory mode.', err.message)
    }
  } else {
    console.log('ℹ No MONGODB_URI provided in server/.env. API running with in-memory handlers.')
  }

  app.listen(PORT, () => {
    console.log(`🚀 DKB VENTURES API Server listening on port ${PORT}`)
    console.log(`➜ Local API: http://localhost:${PORT}/api/health`)
  })
}

startServer()

