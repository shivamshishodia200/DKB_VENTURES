import { useState } from 'react'
import { COMPANY_INFO, getGeneralEnquiryWhatsApp } from '../data/companyInfo'
import { apiService } from '../services/api'
import { useSEO } from '../hooks/useSEO'

export default function Distribution() {
  useSEO(
    'Distribution & Regional Business Partnerships',
    'Apply to become a regional stockist or distributor partner for COTX, Green Herbs Ayurveda, and Divya Tea with DKB Ventures.'
  )

  const [formData, setFormData] = useState({
    applicantName: '',
    companyName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    businessCategory: 'Distributor / Stockist',
    brandsOfInterest: 'All 3 Brands',
    experienceYears: '',
    expectedVolume: '',
    notes: '',
  })

  const [submittedId, setSubmittedId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const appRef = 'DKB-DIST-' + Math.floor(100000 + Math.random() * 900000)
    setSubmittedId(appRef)

    await apiService.submitDistributorApp({
      appRef,
      date: new Date().toISOString(),
      ...formData,
    })
  }

  return (
    <div className="container section">
      <div className="section-title-wrap">
        <span className="eyebrow">Channel Expansion</span>
        <h1 className="section-title">Distribution & Regional Business Partnerships</h1>
        <p className="section-subtitle">
          Join hands with DKB Ventures to distribute, stock, and represent COTX Luxury Skincare, Green Herbs Ayurveda, and Divya Tea in your regional market.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'flex-start' }} className="distribution-layout">
        <div className="form-card">
          {submittedId ? (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <div style={{ fontSize: '42px', color: 'var(--dkb-success)', marginBottom: '16px' }}>✓</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--dkb-green-dark)', marginBottom: '8px' }}>
                Application Received!
              </h2>
              <p style={{ color: 'var(--dkb-text-secondary)', marginBottom: '16px' }}>
                Application Reference: <b style={{ color: 'var(--dkb-green-dark)' }}>{submittedId}</b>
              </p>
              <p style={{ fontSize: '14px', color: 'var(--dkb-muted)', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Thank you for your interest in partnering with DKB Ventures. Our distribution team will review your market coverage and reach out for preliminary discussions.
              </p>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSubmittedId(null)
                  setFormData({
                    applicantName: '',
                    companyName: '',
                    phone: '',
                    email: '',
                    city: '',
                    state: '',
                    businessCategory: 'Distributor / Stockist',
                    brandsOfInterest: 'All 3 Brands',
                    experienceYears: '',
                    expectedVolume: '',
                    notes: '',
                  })
                }}
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--dkb-green-dark)', marginBottom: '16px', borderBottom: '1px solid var(--dkb-border-light)', paddingBottom: '10px' }}>
                Channel Partner Application
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--dkb-muted)', marginBottom: '20px' }}>
                * Note: Submitting this form is an expression of interest and commercial enquiry, not an automatic grant of exclusive territory.
              </p>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    Applicant / Proprietor Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Full Name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Firm / Enterprise Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Trading / Distribution Firm"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    Phone / Mobile Number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="official@company.com"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    City & Region <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Kanpur, Jaipur, Dehradun"
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
                    placeholder="State / Union Territory"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Business Nature</label>
                  <select
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Distributor / Stockist">Regional Distributor / Stockist</option>
                    <option value="Wholesaler / Trader">Wholesaler / Trader</option>
                    <option value="Super Stockist">Super Stockist</option>
                    <option value="Retail Chain Owner">Retail Chain / Multi-Outlet Owner</option>
                    <option value="Salon Franchise Operator">Salon Franchise / Parlour Chain</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Brands of Interest</label>
                  <select
                    name="brandsOfInterest"
                    value={formData.brandsOfInterest}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="All 3 Brands">All 3 Brands (COTX, Green Herbs, Divya Tea)</option>
                    <option value="COTX Luxury Skincare Only">COTX Luxury Skincare Only</option>
                    <option value="Green Herbs Ayurveda Only">Green Herbs Ayurveda Only</option>
                    <option value="Divya Tea Only">Divya Tea (Retail & Bulk) Only</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Current Distribution Network & Market Experience</label>
                <textarea
                  rows="3"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Tell us about your current retail reach (e.g. 50+ retail counters, 20 salons), delivery vehicles, or years in distribution..."
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Submit Partnership Application →
              </button>
            </form>
          )}
        </div>

        <div>
          <div
            style={{
              background: 'var(--dkb-white)',
              border: '1px solid var(--dkb-border)',
              borderRadius: 'var(--radius-md)',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '24px',
            }}
          >
            <span className="eyebrow">Mutual Growth</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--dkb-green-dark)', marginBottom: '14px' }}>
              Why Distribute with DKB Ventures?
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'var(--dkb-text-secondary)', lineHeight: 1.6 }}>
              <li>✦ <b>Diverse Portfolio:</b> Skincare, personal care, Ayurveda, and tea in one vendor relationship.</li>
              <li>✦ <b>Transparent Terms:</b> Realistic minimum order quantities and authentic commercial billing.</li>
              <li>✦ <b>Trade Margins:</b> Designed to provide healthy margins for distributors and retailers alike.</li>
              <li>✦ <b>Delhi Logistics:</b> Centrally managed inventory from Budh Vihar, Delhi for swift dispatches.</li>
              <li>✦ <b>Marketing Collateral:</b> Product catalogues, specifications, and digital marketing assets provided.</li>
            </ul>
          </div>

          <div
            style={{
              background: 'var(--dkb-cream)',
              border: '1px solid var(--dkb-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '24px',
            }}
          >
            <h4 style={{ fontSize: '14px', color: 'var(--dkb-green-dark)', fontWeight: 700, marginBottom: '8px' }}>
              Direct Channel Inquiries
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--dkb-text-secondary)', marginBottom: '16px' }}>
              Prefer an introductory discussion before filling the form? Reach out directly to our management.
            </p>
            <a
              href={getGeneralEnquiryWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm btn-full"
            >
              <span>Connect on WhatsApp</span>
              <span>💬</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

