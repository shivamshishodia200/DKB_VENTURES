import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductBySlug, PRODUCTS, inr, discount } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductArt from '../components/ProductArt'
import ProductCard from '../components/ProductCard'
import { getProductEnquiryWhatsApp } from '../data/companyInfo'
import { IconWhatsApp } from '../components/Icons'
import { useSEO } from '../hooks/useSEO'

export default function Product() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  useSEO(
    product ? `${product.name} — ${product.brandName}` : 'Product Details',
    product ? `${product.short} Available from DKB Ventures for retail and wholesale supply.` : ''
  )

  const { add } = useCart()
  const navigate = useNavigate()

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  if (!product) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--dkb-green-dark)', marginBottom: '16px' }}>
          Product Not Found
        </h1>
        <p style={{ color: 'var(--dkb-muted)', marginBottom: '24px' }}>
          The product you are looking for is unavailable or has been relocated.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Back to Catalogue
        </Link>
      </div>
    )
  }

  const p = product
  const variants = p.variants || []
  const activeVariant = variants[selectedVariantIndex] || { size: p.size, price: p.price, mrp: p.mrp }
  const currentPrice = activeVariant.price !== undefined ? activeVariant.price : p.price
  const currentMrp = activeVariant.mrp !== undefined ? activeVariant.mrp : p.mrp
  const hasDiscount = currentMrp > currentPrice && currentPrice > 0
  const isEnquiryOnly = p.pricingMode === 'wholesale' || p.pricingMode === 'enquiry' || currentPrice <= 0

  const handleWhatsAppEnquiry = () => {
    const url = getProductEnquiryWhatsApp(p.name, `${activeVariant.size} (Qty: ${qty})`, p.slug)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleBuyNow = () => {
    add(p, qty, activeVariant)
    navigate('/checkout')
  }

  const relatedProducts = PRODUCTS.filter(
    (item) => (item.brandId === p.brandId || item.categoryId === p.categoryId) && item.id !== p.id
  ).slice(0, 4)

  return (
    <div className="container section">
      {/* Breadcrumb Navigation */}
      <nav style={{ fontSize: '12px', color: 'var(--dkb-muted)', marginBottom: '24px', letterSpacing: '0.04em' }}>
        <Link to="/" style={{ color: 'var(--dkb-green)' }}>Home</Link> /{' '}
        <Link to="/shop" style={{ color: 'var(--dkb-green)' }}>Catalogue</Link> /{' '}
        <Link to={`/shop?brand=${p.brandId}`} style={{ color: 'var(--dkb-green)' }}>{p.brandName}</Link> /{' '}
        <span style={{ color: 'var(--dkb-text)' }}>{p.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="pdp-grid">
        {/* Left: Media Display */}
        <div className="pdp-gallery-wrap">
          <div className="pdp-media-box">
            <ProductArt product={p} tone={p.tone} shape={p.shape} alt={p.name} />
          </div>
        </div>

        {/* Right: Details & Buying Flow */}
        <div className="pdp-details">
          <span className="pdp-brand-lead">✦ {p.brandName}</span>
          <h1 className="pdp-title">{p.name}</h1>
          <p className="pdp-short-desc">{p.short}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '12.5px', color: 'var(--dkb-muted)' }}>
            <span>SKU: <b>{p.sku || 'DKB-PRD'}</b></span>
            <span>·</span>
            <span>Category: <b>{p.categoryName}</b></span>
            <span>·</span>
            <span style={{ color: 'var(--dkb-success)', fontWeight: 600 }}>In Stock & Available</span>
          </div>

          {/* Pricing Box */}
          <div className="pdp-price-box">
            {isEnquiryOnly ? (
              <div>
                <strong className="pdp-main-price" style={{ color: 'var(--dkb-gold)' }}>
                  Commercial / Wholesale Quote Only
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--dkb-muted)', marginTop: '4px' }}>
                  Tiered trade pricing available based on order volume.
                </p>
              </div>
            ) : (
              <>
                <strong className="pdp-main-price">{inr(currentPrice)}</strong>
                {currentMrp > currentPrice && (
                  <>
                    <span style={{ fontSize: '16px', color: 'var(--dkb-muted)', textDecoration: 'line-through' }}>
                      {inr(currentMrp)}
                    </span>
                    <span className="product-badge badge-discount">
                      {discount(currentMrp, currentPrice)}% Off
                    </span>
                  </>
                )}
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--dkb-muted)' }}>
                  Inclusive of all taxes
                </span>
              </>
            )}
          </div>

          {/* Variants Selector (if multiple exist) */}
          {variants.length > 1 && (
            <div style={{ marginBottom: '24px' }}>
              <div className="pdp-variants-label">Select Size / Pack:</div>
              <div className="pdp-variants-grid">
                {variants.map((v, idx) => (
                  <button
                    key={v.id}
                    className={`pdp-variant-chip ${selectedVariantIndex === idx ? 'selected' : ''}`}
                    onClick={() => setSelectedVariantIndex(idx)}
                  >
                    {v.size} {v.price > 0 ? `(${inr(v.price)})` : ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          {!isEnquiryOnly ? (
            <>
              <div className="pdp-actions-row">
                <div className="qty-counter" style={{ height: '48px', padding: '0 8px' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                    −
                  </button>
                  <span style={{ fontSize: '15px' }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => add(p, qty, activeVariant)}
                >
                  <span>Add to Bag</span>
                  <span>+</span>
                </button>

                <button className="btn btn-gold" onClick={handleBuyNow}>
                  <span>Buy Now</span>
                </button>
              </div>
            </>
          ) : null}

          {/* B2B Wholesale Box */}
          <div className="pdp-b2b-box">
            <div className="pdp-b2b-info">
              <h4>Bulk / Salon / Wholesale Purchase?</h4>
              <p>Request master carton pricing, salon packs, or distributorship terms.</p>
            </div>
            <button className="btn btn-whatsapp btn-sm" onClick={handleWhatsAppEnquiry}>
              <IconWhatsApp size={16} />
              <span>WhatsApp Quote</span>
            </button>
          </div>

          {/* Tabs for Description, Ingredients, How to Use */}
          <div>
            <div className="pdp-tabs-nav">
              <button
                className={`pdp-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description & Benefits
              </button>
              {p.ingredients && (
                <button
                  className={`pdp-tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ingredients')}
                >
                  Ingredients
                </button>
              )}
              {p.howToUse && (
                <button
                  className={`pdp-tab-btn ${activeTab === 'howToUse' ? 'active' : ''}`}
                  onClick={() => setActiveTab('howToUse')}
                >
                  How to Use
                </button>
              )}
            </div>

            <div className="pdp-tab-content">
              {activeTab === 'description' && (
                <div>
                  <p style={{ marginBottom: '16px' }}>{p.description}</p>
                  {p.benefits && (
                    <div>
                      <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--dkb-green-dark)', marginBottom: '8px', fontWeight: 700 }}>
                        Key Formulations & Benefits:
                      </h4>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {p.benefits.map((b, idx) => (
                          <li key={idx} style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ color: 'var(--dkb-gold)' }}>✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div>
                  <p>{p.ingredients}</p>
                </div>
              )}

              {activeTab === 'howToUse' && (
                <div>
                  <p>{p.howToUse}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '72px', borderTop: '1px solid var(--dkb-border)', paddingTop: '48px' }}>
          <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '32px' }}>
            <span className="eyebrow">Complementary Formulations</span>
            <h2 className="section-title" style={{ fontSize: '28px', marginBottom: 0 }}>
              You May Also Be Interested In
            </h2>
          </div>
          <div className="grid grid-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
