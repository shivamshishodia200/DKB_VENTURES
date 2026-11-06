import { useParams, Link } from 'react-router-dom'
import { COMPANY_INFO, getWholesaleEnquiryWhatsApp } from '../data/companyInfo'
import { getProductsByBrand } from '../data/products'
import ProductCard from '../components/ProductCard'
import { IconWhatsApp, IconSparkles } from '../components/Icons'
import { useSEO } from '../hooks/useSEO'

const BRAND_VISUALS = {
  'cotx-luxury-skincare': '/images/brand-cotx.jpg',
  'green-herbs-ayurveda': '/images/brand-ayurveda.jpg',
  'divya-tea': '/images/brand-tea.jpg',
}

export default function BrandDetail() {
  const { brandSlug } = useParams()

  const brand = COMPANY_INFO.brands.find(
    (b) => b.id === brandSlug || b.key === brandSlug
  )

  useSEO(
    brand ? `${brand.name} Portfolio` : 'Brand Portfolio',
    brand ? `${brand.description} Available through DKB Ventures for retail and wholesale supply.` : ''
  )

  if (!brand) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--dkb-green-dark)', marginBottom: '16px' }}>
          Brand Not Found
        </h1>
        <p style={{ color: 'var(--dkb-muted)', marginBottom: '24px' }}>
          The requested brand portfolio does not exist in DKB Ventures.
        </p>
        <Link to="/brands" className="btn btn-primary">
          View All Brands
        </Link>
      </div>
    )
  }

  const products = getProductsByBrand(brand.key)
  const wholesaleWhatsApp = getWholesaleEnquiryWhatsApp(brand.name)

  return (
    <div>
      {/* Brand Hero */}
      <section
        style={{
          background: `linear-gradient(145deg, #022013 0%, ${brand.themeColor} 70%, #063b23 100%)`,
          color: 'var(--dkb-white)',
          padding: '64px 0 70px',
          borderBottom: '2px solid var(--dkb-gold)',
        }}
      >
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--dkb-gold-light)',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(199, 160, 82, 0.35)',
              padding: '4px 14px',
              borderRadius: 'var(--radius-full)',
              marginBottom: '16px',
            }}
          >
            ✦ {brand.badge}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 4.5vw, 54px)',
              color: '#ffffff',
              marginBottom: '14px',
            }}
          >
            {brand.name}
          </h1>
          <p style={{ fontSize: '18px', color: '#c9dbd1', marginBottom: '24px' }}>
            {brand.tagline}
          </p>

          {/* Brand Visual Imagery */}
          <div style={{ maxWidth: '540px', margin: '0 auto 28px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(199, 160, 82, 0.4)', boxShadow: '0 16px 36px rgba(0,0,0,0.4)' }}>
            <img
              src={BRAND_VISUALS[brand.id] || '/images/brand-cotx.jpg'}
              alt={brand.name}
              style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={wholesaleWhatsApp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <IconWhatsApp size={18} />
              <span>Request Wholesale Catalogue</span>
            </a>
            <Link to={`/wholesale?brand=${brand.key}`} className="btn btn-gold">
              <span>Submit Business Enquiry</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Overview & Categories */}
      <section className="section container">
        <div className="grid grid-2" style={{ gap: '40px', alignItems: 'center', marginBottom: '56px' }}>
          <div>
            <span className="eyebrow">Portfolio Details</span>
            <h2 className="section-title" style={{ fontSize: '32px' }}>
              About {brand.name}
            </h2>
            <p style={{ color: 'var(--dkb-text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
              {brand.description}
            </p>
            <div style={{ background: 'var(--dkb-white)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--dkb-border)' }}>
              <h4 style={{ fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--dkb-gold-dark)', marginBottom: '8px', fontWeight: 700 }}>
                Distribution Status
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--dkb-text)' }}>
                Represented and distributed by <b>DKB Ventures</b>. Available for direct retail ordering and B2B wholesale supply across India.
              </p>
            </div>
          </div>

          <div style={{ background: 'var(--dkb-ivory)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-md)', padding: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--dkb-green-dark)', marginBottom: '16px' }}>
              Product Categories in this Brand
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--dkb-text)' }}>
              {brand.categories.map((cat, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--dkb-gold)' }}>✦</span>
                  <span>{cat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand Products Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="eyebrow">Active Catalogue</span>
              <h2 className="section-title" style={{ marginBottom: 0, fontSize: '30px' }}>
                Available Products ({products.length})
              </h2>
            </div>
            <Link to={`/shop?brand=${brand.key}`} className="btn btn-outline btn-sm">
              Filter in Full Shop →
            </Link>
          </div>

          {products.length === 0 ? (
            <p style={{ color: 'var(--dkb-muted)', textAlign: 'center', padding: '40px' }}>
              Products for this brand are currently being updated. Contact our team for the latest catalogue.
            </p>
          ) : (
            <div className="grid grid-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

