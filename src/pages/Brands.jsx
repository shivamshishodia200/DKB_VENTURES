import { Link } from 'react-router-dom'
import { COMPANY_INFO } from '../data/companyInfo'
import { getProductsByBrand } from '../data/products'
import { useSEO } from '../hooks/useSEO'

const BRAND_VISUALS = {
  'cotx-luxury-skincare': '/images/brand-cotx.jpg',
  'green-herbs-ayurveda': '/images/brand-ayurveda.jpg',
  'divya-tea': '/images/brand-tea.jpg',
}

export default function Brands() {
  useSEO(
    'Our Brand Portfolio — COTX, Green Herbs Ayurveda & Divya Tea',
    'Explore the 3 distinct brand portfolios of DKB Ventures: COTX Luxury Skincare, Green Herbs Ayurveda, and Divya Tea with wholesale and retail supply.'
  )

  return (
    <div className="container section">
      <div className="section-title-wrap">
        <span className="eyebrow">Portfolio Architecture</span>
        <h1 className="section-title">Our Brand Portfolio</h1>
        <p className="section-subtitle">
          DKB Ventures represents and distributes three distinct brand portfolios across luxury skincare, Ayurveda-inspired wellness, and daily tea products.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {COMPANY_INFO.brands.map((brand) => {
          const brandProducts = getProductsByBrand(brand.key)

          return (
            <div
              key={brand.id}
              style={{
                background: 'var(--dkb-white)',
                border: '1px solid var(--dkb-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(6, 59, 35, 0.08)',
              }}
            >
              {/* Header with High-Res Brand Hero Cover */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <img
                  src={BRAND_VISUALS[brand.id] || '/images/brand-cotx.jpg'}
                  alt={brand.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(2, 32, 19, 0.2) 0%, rgba(2, 32, 19, 0.9) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '32px 40px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--dkb-gold-light)',
                      marginBottom: '8px',
                      fontWeight: 700,
                    }}
                  >
                    ✦ {brand.badge}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '34px', color: '#ffffff', marginBottom: '4px' }}>
                    {brand.name}
                  </h2>
                  <p style={{ color: '#d1ded8', fontSize: '15px' }}>{brand.tagline}</p>
                </div>
              </div>

              <div style={{ padding: '36px 40px' }}>
                <p style={{ color: 'var(--dkb-text-secondary)', fontSize: '15.5px', lineHeight: 1.7, marginBottom: '28px' }}>
                  {brand.description}
                </p>

                <div className="grid grid-2" style={{ gap: '32px', marginBottom: '28px' }}>
                  <div style={{ background: 'var(--dkb-ivory)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--dkb-border-light)' }}>
                    <h3 style={{ fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dkb-gold-dark)', marginBottom: '14px', fontWeight: 700 }}>
                      Portfolio Product Categories
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--dkb-text)' }}>
                      {brand.categories.map((c, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: 'var(--dkb-gold)' }}>✦</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ background: 'var(--dkb-ivory)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--dkb-border-light)' }}>
                    <h3 style={{ fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dkb-gold-dark)', marginBottom: '14px', fontWeight: 700 }}>
                      Brand Characteristics & Formulations
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--dkb-text)' }}>
                      {brand.features.map((f, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: 'var(--dkb-success)' }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--dkb-border-light)', paddingTop: '20px', flexWrap: 'wrap', gap: '16px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--dkb-muted)' }}>
                    Active formulations in catalogue: <b>{brandProducts.length} items</b>
                  </span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Link to={`/brands/${brand.id}`} className="btn btn-outline btn-sm">
                      Brand Story & Details →
                    </Link>
                    <Link to={`/shop?brand=${brand.key}`} className="btn btn-primary btn-sm">
                      Browse Brand Products
                    </Link>
                    <Link to={`/wholesale?brand=${brand.key}`} className="btn btn-gold btn-sm">
                      Wholesale Supply Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
