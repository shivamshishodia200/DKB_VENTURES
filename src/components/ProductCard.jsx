import { Link } from 'react-router-dom'
import ProductArt from './ProductArt'
import { useCart } from '../context/CartContext'
import { discount, inr } from '../data/products'
import { getProductEnquiryWhatsApp } from '../data/companyInfo'
import { IconWhatsApp } from './Icons'

export default function ProductCard({ product }) {
  const { add } = useCart()
  const p = product

  const hasDiscount = p.mrp > p.price && p.price > 0
  const isEnquiryOnly = p.pricingMode === 'wholesale' || p.pricingMode === 'enquiry' || p.price <= 0

  const handleWhatsAppEnquiry = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const url = getProductEnquiryWhatsApp(p.name, p.size, p.slug)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className="product-card">
      <Link to={`/product/${p.slug}`} className="product-card-media" aria-label={p.name}>
        <span className="product-brand-tag">{p.brandName || 'DKB Ventures'}</span>

        <div className="product-badge-stack">
          {p.bestseller && <span className="product-badge badge-gold">✦ Bestseller</span>}
          {p.newArrival && <span className="product-badge badge-new">New</span>}
          {hasDiscount && <span className="product-badge badge-discount">{discount(p.mrp, p.price)}% Off</span>}
        </div>

        <ProductArt product={p} tone={p.tone} shape={p.shape} alt={p.name} />
      </Link>

      <div className="product-card-body">
        <div className="product-meta-row">
          <span className="product-category-name">{p.categoryName}</span>
          <span className="product-size-label">{p.size}</span>
        </div>

        <h3 className="product-title">
          <Link to={`/product/${p.slug}`}>{p.name}</Link>
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#e6a71e', marginBottom: '8px' }}>
          <span>★★★★★</span>
          <span style={{ color: 'var(--dkb-muted)', fontSize: '11px', fontWeight: 600 }}>4.9 (Verified)</span>
        </div>

        <p className="product-short-desc">{p.short}</p>

        <div className="product-price-row">
          {isEnquiryOnly ? (
            <strong className="current-price" style={{ color: 'var(--dkb-gold)' }}>
              Wholesale / Quote Only
            </strong>
          ) : (
            <>
              <strong className="current-price">{inr(p.price)}</strong>
              {p.mrp > p.price && <span className="mrp-price">{inr(p.mrp)}</span>}
              {hasDiscount && (
                <span className="discount-save-tag">Save {inr(p.mrp - p.price)}</span>
              )}
            </>
          )}
        </div>

        <div className="product-actions-row">
          {isEnquiryOnly ? (
            <button
              className="btn btn-outline-gold btn-full btn-sm"
              onClick={handleWhatsAppEnquiry}
              aria-label={`Enquire about ${p.name}`}
            >
              <span>Enquire Pricing</span>
              <span>↗</span>
            </button>
          ) : (
            <>
              <button
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                onClick={() => add(p, 1)}
                aria-label={`Add ${p.name} to bag`}
              >
                <span>Add to Bag</span>
                <span>+</span>
              </button>
              <button
                className="btn btn-whatsapp btn-sm"
                onClick={handleWhatsAppEnquiry}
                title="Quick WhatsApp Enquiry"
                aria-label="WhatsApp Enquiry"
              >
                <IconWhatsApp size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
