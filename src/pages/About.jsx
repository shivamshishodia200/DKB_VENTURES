import { Link } from 'react-router-dom'
import { COMPANY_INFO, getGeneralEnquiryWhatsApp } from '../data/companyInfo'
import { useSEO } from '../hooks/useSEO'

export default function About() {
  useSEO(
    'About Us & Company Profile',
    'DKB Ventures is a Delhi-based trading firm engaged in the distribution, wholesale, and retail marketing of beauty, skincare, personal care, Ayurvedic, and tea products.'
  )

  const whatsappUrl = getGeneralEnquiryWhatsApp()

  return (
    <div className="container section">
      {/* 1. Page Header */}
      <div className="section-title-wrap">
        <span className="eyebrow">Company Profile</span>
        <h1 className="section-title">About DKB Ventures</h1>
        <p className="section-subtitle">
          Your Trusted Partner in Beauty, Personal Care & Wellness Products
        </p>
      </div>

      {/* 2. Official Profile Box */}
      <div
        style={{
          background: 'var(--dkb-white)',
          padding: '40px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--dkb-border)',
          marginBottom: '56px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="grid grid-2" style={{ gap: '40px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--dkb-green-dark)', marginBottom: '16px' }}>
              Building Long-Term Business Relationships
            </h2>
            <p style={{ color: 'var(--dkb-text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              <b>DKB Ventures</b> is a Delhi-based trading firm engaged in the distribution, wholesale, and retail marketing of beauty, skincare, personal care, Ayurvedic, and tea products.
            </p>
            <p style={{ color: 'var(--dkb-text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              We aim to connect quality brands with retailers, salons, beauty parlours, distributors, and individual customers by offering a diverse product range and dependable business support.
            </p>
            <p style={{ color: 'var(--dkb-text-secondary)', lineHeight: 1.7 }}>
              Our focus is on building long-term business relationships, expanding product availability, and creating mutually beneficial opportunities for our customers and business partners.
            </p>
          </div>

          <div style={{ background: 'var(--dkb-ivory)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-sm)', padding: '28px' }}>
            <h3 style={{ fontSize: '13px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dkb-gold-dark)', marginBottom: '16px', fontWeight: 700 }}>
              Official Entity Verification
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--dkb-text)' }}>
              <li>
                <b>Business Name:</b> {COMPANY_INFO.name}
              </li>
              <li>
                <b>Business Nature:</b> {COMPANY_INFO.businessType}
              </li>
              <li>
                <b>GSTIN:</b> <span style={{ color: 'var(--dkb-green-dark)', fontWeight: 700 }}>{COMPANY_INFO.gstin}</span>
              </li>
              <li>
                <b>Head Office:</b> {COMPANY_INFO.headOffice.fullAddress}
              </li>
              <li>
                <b>Direct Lines:</b> {COMPANY_INFO.phones.join(' / ')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Brand Portfolio */}
      <div style={{ marginBottom: '56px' }}>
        <div className="section-title-wrap">
          <span className="eyebrow">Portfolio</span>
          <h2 className="section-title">Our Brand Portfolio</h2>
          <p className="section-subtitle">
            Three distinct focus areas catering to diverse customer preferences and market segments.
          </p>
        </div>

        <div className="grid grid-3">
          {COMPANY_INFO.brands.map((b) => (
            <div
              key={b.id}
              style={{
                background: 'var(--dkb-white)',
                border: '1px solid var(--dkb-border)',
                borderRadius: 'var(--radius-md)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: '11px', color: 'var(--dkb-gold-dark)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
                {b.badge}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--dkb-green-dark)', marginBottom: '10px' }}>
                {b.name}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--dkb-text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                {b.description}
              </p>
              <div style={{ marginTop: 'auto' }}>
                <Link to={`/brands/${b.id}`} className="btn btn-outline btn-sm btn-full">
                  Explore {b.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Business Activities */}
      <div style={{ marginBottom: '56px' }}>
        <div className="section-title-wrap">
          <span className="eyebrow">What We Do</span>
          <h2 className="section-title">Our Business Activities</h2>
        </div>

        <div className="grid grid-3">
          {COMPANY_INFO.businessActivities.map((act, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--dkb-white)',
                border: '1px solid var(--dkb-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '24px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--dkb-green-dark)', marginBottom: '8px' }}>
                {act.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--dkb-text-secondary)', lineHeight: 1.6 }}>
                {act.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Who We Serve */}
      <div style={{ marginBottom: '56px' }}>
        <div className="section-title-wrap">
          <span className="eyebrow">Customer Segments</span>
          <h2 className="section-title">Who We Serve</h2>
          <p className="section-subtitle">
            We welcome enquiries and business opportunities from diverse commercial and individual clients.
          </p>
        </div>

        <div className="grid grid-3">
          {COMPANY_INFO.whoWeServe.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--dkb-ivory)',
                border: '1px solid var(--dkb-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '20px',
              }}
            >
              <h4 style={{ fontSize: '15px', color: 'var(--dkb-green-dark)', fontWeight: 700, marginBottom: '6px' }}>
                ✦ {s.title}
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--dkb-text-secondary)', lineHeight: 1.5 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Vision & Mission */}
      <div className="grid grid-2" style={{ gap: '28px', marginBottom: '56px' }}>
        <div
          style={{
            background: 'linear-gradient(145deg, #022013, #063b23)',
            color: 'var(--dkb-white)',
            padding: '36px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--dkb-gold)',
          }}
        >
          <span className="eyebrow" style={{ color: 'var(--dkb-gold-light)' }}>
            Strategic Aspiration
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--dkb-white)', marginBottom: '14px' }}>
            Our Vision
          </h3>
          <p style={{ fontSize: '15px', color: '#c9dbd1', lineHeight: 1.7 }}>
            "{COMPANY_INFO.vision}"
          </p>
        </div>

        <div
          style={{
            background: 'linear-gradient(145deg, #124029, #032719)',
            color: 'var(--dkb-white)',
            padding: '36px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--dkb-gold)',
          }}
        >
          <span className="eyebrow" style={{ color: 'var(--dkb-gold-light)' }}>
            Daily Commitment
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--dkb-white)', marginBottom: '14px' }}>
            Our Mission
          </h3>
          <p style={{ fontSize: '15px', color: '#c9dbd1', lineHeight: 1.7 }}>
            "{COMPANY_INFO.mission}"
          </p>
        </div>
      </div>

      {/* 7. Contact Call to Action */}
      <div
        style={{
          background: 'var(--dkb-white)',
          border: '1px solid var(--dkb-border)',
          borderRadius: 'var(--radius-md)',
          padding: '36px',
          textAlign: 'center',
        }}
      >
        <span className="eyebrow">Connect Today</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', color: 'var(--dkb-green-dark)', marginBottom: '12px' }}>
          Business Enquiries & Orders
        </h2>
        <p style={{ maxWidth: '640px', margin: '0 auto 24px', color: 'var(--dkb-text-secondary)', fontSize: '14.5px' }}>
          For product catalogues, wholesale pricing, retail orders, distribution enquiries, and business partnerships, contact DKB Ventures today. Let’s grow together!
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <span>Direct WhatsApp Enquiry</span>
          </a>
          <Link to="/contact" className="btn btn-primary">
            <span>Contact Information</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

