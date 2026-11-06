import { useState } from 'react'
import { COMPANY_INFO, getWholesaleEnquiryWhatsApp } from '../data/companyInfo'
import { IconPhoneCall, IconLocationPin, IconWhatsApp, IconCheckCircle } from '../components/Icons'
import { apiService } from '../services/api'
import { useSEO } from '../hooks/useSEO'

const BUSINESS_TYPES = [
  'Beauty Salon / Parlour',
  'Makeup Artist / Studio',
  'Cosmetic & General Retail Store',
  'Wholesaler / Sub-Distributor',
  'Independent Reseller / Home Entrepreneur',
  'Pharmacy / Wellness Counter',
  'Corporate / Institutional Buyer',
  'Other Commercial Buyer',
]

export default function Wholesale() {
  useSEO(
    'Wholesale Beauty, Personal Care & Wellness Supply Delhi',
    'B2B wholesale supply for salons, beauty parlours, retailers, and distributors from DKB Ventures Delhi.'
  )

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    businessType: 'Beauty Salon / Parlour',
    city: '',
    state: '',
    brand: 'All Brands',
    productsOfInterest: '',
    approxQty: '',
    message: '',
  })

  const [submittedRef, setSubmittedRef] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')

    // Basic mobile validation
    const cleanMobile = formData.mobile.replace(/\D/g, '')
    if (cleanMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.')
      return
    }

    // Generate unique reference
    const refId = 'DKB-WHL-' + Math.floor(100000 + Math.random() * 900000)
    setSubmittedRef(refId)

    // Save through API Service (local fallback + remote sync)
    apiService.submitWholesaleEnquiry({
      refId,
      date: new Date().toISOString(),
      ...formData,
    })
  }

  const handleWhatsAppHandoff = () => {
    const customMsg = `Hello DKB Ventures, I am submitting a wholesale enquiry.\nBusiness Name: ${formData.businessName || 'N/A'}\nContact Person: ${formData.fullName || 'N/A'}\nCity: ${formData.city || 'N/A'}\nInterested Brand: ${formData.brand}\nProducts: ${formData.productsOfInterest || 'General Catalogue'}`
    const encoded = encodeURIComponent(customMsg)
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="container section">
      {/* Page Title */}
      <div className="section-title-wrap">
        <span className="eyebrow">B2B Commercial Sourcing</span>
        <h1 className="section-title">Wholesale Beauty, Personal Care & Wellness Supply</h1>
        <p className="section-subtitle">
          Partner with DKB Ventures for bulk orders, salon kits, retail inventory, and dependable commercial supply across North India and pan-India.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'flex-start' }} className="wholesale-grid-layout">
        {/* Left: Wholesale Form */}
        <div className="form-card">
          {submittedRef ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ fontSize: '42px', color: 'var(--dkb-success)', marginBottom: '16px' }}>✓</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--dkb-green-dark)', marginBottom: '8px' }}>
                Enquiry Successfully Received!
              </h2>
              <p style={{ color: 'var(--dkb-text-secondary)', marginBottom: '16px' }}>
                Your enquiry reference is: <b style={{ color: 'var(--dkb-green-dark)', fontSize: '16px' }}>{submittedRef}</b>
              </p>
              <p style={{ fontSize: '14px', color: 'var(--dkb-muted)', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Our commercial desk at Budh Vihar, Delhi will review your requirements and share wholesale rate sheets, MOQ, and terms on your contact number.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn btn-whatsapp" onClick={handleWhatsAppHandoff}>
                  <span>Connect Immediately on WhatsApp</span>
                  <span>💬</span>
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSubmittedRef(null)
                    setFormData({
                      fullName: '',
                      businessName: '',
                      mobile: '',
                      whatsapp: '',
                      email: '',
                      businessType: 'Beauty Salon / Parlour',
                      city: '',
                      state: '',
                      brand: 'All Brands',
                      productsOfInterest: '',
                      approxQty: '',
                      message: '',
                    })
                  }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--dkb-green-dark)', marginBottom: '20px', borderBottom: '1px solid var(--dkb-border-light)', paddingBottom: '10px' }}>
                Wholesale Enquiry & Catalogue Request
              </h2>

              {errorMsg && (
                <div style={{ background: '#fdf2f2', border: '1px solid #f8b4b4', color: '#9b1c1c', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '13px' }}>
                  {errorMsg}
                </div>
              )}

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Business / Salon / Store Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Aura Beauty Salon, Green Mart"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    Mobile Number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">WhatsApp Number (Optional)</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="If different from mobile"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Business Type</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {BUSINESS_TYPES.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Brand of Interest</label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="All Brands">All Brands (Complete Catalogue)</option>
                    <option value="COTX Luxury Skincare">COTX Luxury Skincare</option>
                    <option value="Green Herbs Ayurveda">Green Herbs Ayurveda</option>
                    <option value="Divya Tea">Divya Tea (Retail & Bulk)</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    City <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Delhi, Lucknow, Jaipur"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    State <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Delhi NCR, Uttar Pradesh"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Products of Interest & Approximate Quantity</label>
                <input
                  type="text"
                  name="productsOfInterest"
                  value={formData.productsOfInterest}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. Facial Kits 20 pcs, Aloe Gel 50 tubs, Divya CTC 100 kg"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Additional Requirements / Notes</label>
                <textarea
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Describe your requirement, preferred delivery schedule, or payment terms..."
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Submit Wholesale Enquiry →
              </button>
            </form>
          )}
        </div>

        {/* Right: Wholesale Benefits & Direct Info */}
        <div>
          {/* Professional Salon Showroom Visual Frame */}
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(199, 160, 82, 0.4)', marginBottom: '24px', boxShadow: '0 8px 24px rgba(6, 59, 35, 0.08)' }}>
            <img
              src="/images/wholesale-salon.jpg"
              alt="Professional Salon & Distributor Display Showroom"
              style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '16px 20px', background: 'var(--dkb-white)', borderTop: '2px solid var(--dkb-gold)' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dkb-green-dark)' }}>
                Salon, Parlour & Retail Supply Program
              </div>
              <div style={{ fontSize: '12px', color: 'var(--dkb-muted)', marginTop: '4px' }}>
                Tiered trade margins (25% to 40%) with GST input credit and fast Delhi dispatch.
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(145deg, var(--dkb-green-dark), var(--dkb-green))',
              color: 'var(--dkb-white)',
              borderRadius: 'var(--radius-md)',
              padding: '32px',
              border: '1px solid var(--dkb-gold)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '24px',
            }}
          >
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--dkb-gold-light)', fontWeight: 700 }}>
              ✦ Instant Communication
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#ffffff', marginTop: '6px', marginBottom: '14px' }}>
              Need Direct Phone Quotation?
            </h3>
            <p style={{ fontSize: '13.5px', color: '#c9dbd1', lineHeight: 1.6, marginBottom: '20px' }}>
              For urgent requirements, rate confirmation, or sample pack requests, speak directly with our commercial team.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--dkb-gold-light)' }}><IconPhoneCall size={16} /></span>
                <span><b>Phone 1:</b> <a href={`tel:${COMPANY_INFO.primaryPhone}`} style={{ color: 'var(--dkb-gold-light)' }}>{COMPANY_INFO.primaryPhone}</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--dkb-gold-light)' }}><IconPhoneCall size={16} /></span>
                <span><b>Phone 2:</b> <a href={`tel:${COMPANY_INFO.secondaryPhone}`} style={{ color: 'var(--dkb-gold-light)' }}>{COMPANY_INFO.secondaryPhone}</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--dkb-gold-light)' }}><IconLocationPin size={16} /></span>
                <span><b>Head Office:</b> Budh Vihar, Phase-1, Delhi – 110086</span>
              </div>
            </div>
            <a
              href={getWholesaleEnquiryWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-full btn-sm"
            >
              <IconWhatsApp size={16} />
              <span>Instant WhatsApp Discussion</span>
            </a>
          </div>

          <div
            style={{
              background: 'var(--dkb-white)',
              borderRadius: 'var(--radius-md)',
              padding: '28px',
              border: '1px solid var(--dkb-border)',
            }}
          >
            <h4 style={{ fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dkb-green-dark)', fontWeight: 700, marginBottom: '16px' }}>
              Why Source from DKB Ventures?
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--dkb-text-secondary)' }}>
              <li>✓ Direct trading supply without unnecessary intermediary markups.</li>
              <li>✓ Authentic GST invoicing (GSTIN: {COMPANY_INFO.gstin}).</li>
              <li>✓ Special back-bar and salon-size formulations.</li>
              <li>✓ Commercial tea sacks (5kg / 25kg) for catering and grocers.</li>
              <li>✓ Direct Delhi dispatch with dependable transport tie-ups.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

