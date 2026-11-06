import express from 'express'
import Order from '../models/Order.js'
import Enquiry from '../models/Enquiry.js'
import Partner from '../models/Partner.js'
import Product from '../models/Product.js'

const router = express.Router()

// ==========================================
// 1. Health & Status Check
// ==========================================
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'DKB VENTURES API Engine',
    timestamp: new Date().toISOString(),
  })
})

// ==========================================
// 2. Retail Orders
// ==========================================
router.post('/orders', async (req, res) => {
  try {
    const orderData = req.body
    if (!orderData.orderId || !orderData.customer || !orderData.items) {
      return res.status(400).json({ error: 'Missing mandatory order details.' })
    }
    const newOrder = await Order.create(orderData)
    res.status(201).json({ success: true, order: newOrder })
  } catch (error) {
    console.error('Failed to create order:', error)
    res.status(500).json({ error: 'Internal server error while saving order.' })
  }
})

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders.' })
  }
})

// ==========================================
// 3. Wholesale B2B Enquiries
// ==========================================
router.post('/enquiries', async (req, res) => {
  try {
    const enquiryData = req.body
    if (!enquiryData.refId || !enquiryData.fullName || !enquiryData.mobile) {
      return res.status(400).json({ error: 'Missing mandatory enquiry details.' })
    }
    const newEnquiry = await Enquiry.create(enquiryData)
    res.status(201).json({ success: true, enquiry: newEnquiry })
  } catch (error) {
    console.error('Failed to save wholesale enquiry:', error)
    res.status(500).json({ error: 'Internal server error while saving enquiry.' })
  }
})

router.get('/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 })
    res.json(enquiries)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve enquiries.' })
  }
})

// ==========================================
// 4. Regional Distribution Applications
// ==========================================
router.post('/distribution', async (req, res) => {
  try {
    const appData = req.body
    if (!appData.appRef || !appData.applicantName || !appData.phone) {
      return res.status(400).json({ error: 'Missing mandatory partner application details.' })
    }
    const newApp = await Partner.create(appData)
    res.status(201).json({ success: true, partnerApp: newApp })
  } catch (error) {
    console.error('Failed to save distribution application:', error)
    res.status(500).json({ error: 'Internal server error while saving application.' })
  }
})

router.get('/distribution', async (req, res) => {
  try {
    const apps = await Partner.find().sort({ createdAt: -1 })
    res.json(apps)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve distribution applications.' })
  }
})

// ==========================================
// 5. Products Catalogue Sync
// ==========================================
router.get('/products', async (req, res) => {
  try {
    const { brand, category } = req.query
    const filter = {}
    if (brand) filter.brandId = brand
    if (category) filter.categoryId = category
    const products = await Product.find(filter)
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products catalogue.' })
  }
})

export default router

