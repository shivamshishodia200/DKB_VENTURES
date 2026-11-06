import { useState } from 'react'
import { COMPANY_INFO, getGeneralEnquiryWhatsApp } from '../data/companyInfo'
import { IconLocationPin, IconPhoneCall, IconDocumentCheck, IconWhatsApp, IconCheckCircle } from '../components/Icons'
import { useSEO } from '../hooks/useSEO'

export default function Contact() {
  useSEO(
    'Contact Us — Head Office, Phones & WhatsApp',
    'Get in touch with DKB Ventures head office at Budh Vihar, Delhi – 110086. Phone/WhatsApp: 9355698422 | 9999148167. GSTIN: 07CHBPS3702D4ZM.'
  )
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Product / Price Enquiry',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const whatsappUrl = getGeneralEnquiryWhatsApp()

  return (
    <div className="container section">
      <div className="section-title-wrap">
        <span className="eyebrow">Get in Touch</span>
        <h1 className="section-title">Contact DKB Ventures</h1>
        <p className="section-subtitle">
          We welcome queries from retail customers, salon professionals, retailers, distributors, and business partners.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'flex-start' }} className="contact-grid-layout">
        {/* Left: Official Contact Card */}
        <div>
          <div
            style={{
              background: 'linear-gradient(145deg, var(--dkb-green-dark), var(--dkb-green))',
              color: 'var(--dkb-white)',
              borderRadius: 'var(--radius-md)',
              padding: '36px',
              border: '1px solid var(--dkb-gold)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '24px',
            }}
          >
            <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dkb-gold-light)', fontWeight: 700 }}>
              ✦ Official Head Office
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: '#ffffff', marginTop: '6px', marginBottom: '16px' }}>
              DKB VENTURES
            </h3>
            <p style={{ color: '#c9dbd1', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
              Your Trusted Partner in Beauty, Personal Care & Wellness Products. Registered trading & distribution firm in Delhi.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: 'var(--dkb-gold-light)', flexShrink: 0, marginTop: '2px' }}>
                  <IconLocationPin size={20} />
                </span>
                <div>
                  <b style={{ display: 'block', color: 'var(--dkb-gold-light)', fontSize: '12px', textTransform: 'uppercase' }}>Address</b>
                  <span>{COMPANY_INFO.headOffice.fullAddress}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: 'var(--dkb-gold-light)', flexShrink: 0, marginTop: '2px' }}>
                  <IconPhoneCall size={20} />
                </span>
                <div>
                  <b style={{ display: 'block', color: 'var(--dkb-gold-light)', fontSize: '12px', textTransform: 'uppercase' }}>Call / WhatsApp</b>
                  <div>
                    <a href={`tel:${COMPANY_INFO.primaryPhone}`} style={{ color: '#ffffff' }}>
                      {COMPANY_INFO.primaryPhone}
                    </a>
                    <span> | </span>
                    <a href={`tel:${COMPANY_INFO.secondaryPhone}`} style={{ color: '#ffffff' }}>
                      {COMPANY_INFO.secondaryPhone}
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: 'var(--dkb-gold-light)', flexShrink: 0, marginTop: '2px' }}>
                  <IconDocumentCheck size={20} />
                </span>
                <div>
                  <b style={{ display: 'block', color: 'var(--dkb-gold-light)', fontSize: '12px', textTransform: 'uppercase' }}>GSTIN</b>
                  <span style={{ color: 'var(--dkb-gold-light)', fontWeight: 700 }}>{COMPANY_INFO.gstin}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px' }}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-full">
                <IconWhatsApp size={18} />
                <span>Direct WhatsApp Chat</span>
              </a>
            </div>
          </div>

          <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-sm)', padding: '24px' }}>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--dkb-green-dark)', fontWeight: 700, marginBottom: '8px' }}>
              Business Hours & Support
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--dkb-text-secondary)', lineHeight: 1.6 }}>
              Monday to Saturday: 10:00 AM – 7:30 PM <br />
              Sunday: Prior appointment for wholesale client meetings.
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="form-card">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '42px', color: 'var(--dkb-success)', marginBottom: '16px' }}>✓</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--dkb-green-dark)', marginBottom: '8px' }}>
                Thank You for Contacting Us
              </h2>
              <p style={{ color: 'var(--dkb-text-secondary)', marginBottom: '24px', fontSize: '14.5px' }}>
                We have received your message. A representative from DKB Ventures will get in touch with you shortly.
              </p>
              <button className="btn btn-primary btn-sm" onClick={() => setSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--dkb-green-dark)', marginBottom: '20px', borderBottom: '1px solid var(--dkb-border-light)', paddingBottom: '10px' }}>
                Send an Enquiry
              </h2>

              <div className="form-group">
                <label className="form-label">
                  Your Full Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    Mobile Number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Enquiry Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-select"
                >
                  <option value="Product / Price Enquiry">Product / Price Enquiry</option>
                  <option value="Salon & Beauty Parlour Supply">Salon & Beauty Parlour Supply</option>
                  <option value="Wholesale Bulk Purchase">Wholesale Bulk Purchase</option>
                  <option value="Retail Distribution Enquiry">Retail Distribution Enquiry</option>
                  <option value="Other Business Association">Other Business Association</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Your Message / Requirement <span className="req">*</span>
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                  placeholder="Please describe what products, brands, or supply terms you would like to know about..."
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Submit Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

