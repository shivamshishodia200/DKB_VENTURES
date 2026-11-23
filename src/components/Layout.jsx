import { useEffect, useState, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useCart, FREE_SHIPPING_THRESHOLD } from '../context/CartContext'
import { COMPANY_INFO, getGeneralEnquiryWhatsApp } from '../data/companyInfo'
import { inr } from '../data/products'
import WhatsAppButton from './WhatsAppButton'
import { IconLocationPin, IconPhoneCall, IconWhatsApp } from './Icons'
import dkbLogo from '../asset/DKB-logo.png'

const ANNOUNCEMENTS = [
  'Wholesale & Retail Enquiries Welcome — Direct Supply from Delhi',
  'Official Portfolio: COTX Luxury Skincare · Divya Tea',
  'Complimentary Shipping on Retail Orders Above ₹1,499 Across India',
  'Connect with DKB Ventures: 9999148167',
]

function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="top-announcement" aria-live="polite">
      <span className="sparkle">✦</span>
      <span className="announcement-text">{ANNOUNCEMENTS[index]}</span>
      <span className="sparkle">✦</span>
    </div>
  )
}

function Header() {
  const { count, setDrawerOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const menuBtnRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Keyboard accessibility: Close mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        menuBtnRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="site-header">
      <AnnouncementBar />
      <div className="container header-inner">
        {/* Mobile menu toggle */}
        <button
          ref={menuBtnRef}
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="header-logo-wrap" aria-label="DKB VENTURES Home" onClick={closeMenu}>
          <img
            src={dkbLogo}
            alt="DKB VENTURES — Beauty, Personal Care & Wellness"
            className="header-logo-img"
          />
        </Link>

        {/* Main Desktop & Mobile Navigation */}
        <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Primary navigation">
          <NavLink to="/" end className="nav-link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link" onClick={closeMenu}>
            About Us
          </NavLink>
          <NavLink to="/brands" className="nav-link" onClick={closeMenu}>
            Our Brands
          </NavLink>
          <NavLink to="/shop" className="nav-link" onClick={closeMenu}>
            Shop All
          </NavLink>
          <NavLink to="/wholesale" className="nav-link" onClick={closeMenu}>
            Wholesale <span className="nav-badge-pill">B2B</span>
          </NavLink>
          <NavLink to="/distribution" className="nav-link" onClick={closeMenu}>
            Distribution
          </NavLink>
          <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
            Contact
          </NavLink>
        </nav>

        {/* Mobile Menu Backdrop Scrim */}
        {mobileMenuOpen && (
          <div
            className="mobile-nav-scrim"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        {/* Header Search */}
        <form onSubmit={handleSearchSubmit} className="header-search" role="search">
          <span className="header-search-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />
        </form>

        {/* Header Actions (Cart) */}
        <div className="header-actions">
          <button
            className="header-icon-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label={`Bag containing ${count} items`}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-badge-count">{count}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, subtotal, setQty, remove, isFreeShipping, amountNeededForFreeShipping } =
    useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!drawerOpen) return
    document.body.classList.add('cart-drawer-open')
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('cart-drawer-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [drawerOpen, setDrawerOpen])

  const navigateTo = (path) => {
    setDrawerOpen(false)
    navigate(path)
  }

  return (
    <>
      <div
        className={`cart-drawer-scrim ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer ${drawerOpen ? 'open' : ''}`}
        aria-hidden={!drawerOpen}
        aria-label="Shopping bag"
      >
        <div className="drawer-header">
          <h3>Your Bag ({lines.length})</h3>
          <button
            className="header-icon-btn"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close bag drawer"
          >
            ✕
          </button>
        </div>

        {lines.length > 0 && (
          <div style={{ padding: '12px 24px', background: 'var(--dkb-green-subtle)', borderBottom: '1px solid var(--dkb-border)' }}>
            <p style={{ fontSize: '12px', color: 'var(--dkb-green-dark)', fontWeight: 600 }}>
              {isFreeShipping ? (
                <>✦ You have unlocked <b>Free Shipping</b> across India!</>
              ) : (
                <>Add <b>{inr(amountNeededForFreeShipping)}</b> more to unlock <b>Free Shipping</b></>
              )}
            </p>
          </div>
        )}

        <div className="drawer-body">
          {lines.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '16px', color: 'var(--dkb-muted)', marginBottom: '20px' }}>
                Your shopping bag is empty.
              </p>
              <button className="btn btn-primary" onClick={() => navigateTo('/shop')}>
                Explore Catalog
              </button>
            </div>
          ) : (
            lines.map((line) => {
              const itemImg = line.image || line.product?.image
              return (
                <div className="drawer-item" key={`${line.id}-${line.variantId}`}>
                  <div className="drawer-item-thumb">
                    {itemImg ? (
                      <img
                        src={itemImg}
                        alt={line.name}
                        className="drawer-item-img"
                        loading="lazy"
                      />
                    ) : (
                      <span>{line.brandName?.split(' ')[0] || 'DKB'}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="drawer-item-title">{line.name}</h4>
                    <div className="drawer-item-variant">{line.size}</div>
                    <div className="qty-counter">
                      <button
                        onClick={() => setQty(line.id, line.variantId, line.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{line.qty}</span>
                      <button
                        onClick={() => setQty(line.id, line.variantId, line.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ display: 'block', fontSize: '14px', color: 'var(--dkb-green-dark)' }}>
                      {inr((line.price || 0) * line.qty)}
                    </strong>
                    <button
                      style={{ fontSize: '11px', color: 'var(--dkb-error)', textDecoration: 'underline', marginTop: '8px' }}
                      onClick={() => remove(line.id, line.variantId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {lines.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-row">
              <span>Subtotal</span>
              <strong>{inr(subtotal)}</strong>
            </div>
            <div className="drawer-row total">
              <span>Estimated Total</span>
              <strong>{inr(subtotal)}</strong>
            </div>
            <button className="btn btn-primary btn-full" style={{ marginTop: '12px' }} onClick={() => navigateTo('/checkout')}>
              Proceed to Checkout
            </button>
            <button
              className="btn btn-outline btn-full"
              style={{ marginTop: '8px' }}
              onClick={() => navigateTo('/cart')}
            >
              View Full Bag
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Col 1: Identity & Profile */}
        <div>
          <img
            src={dkbLogo}
            alt="DKB VENTURES Logo"
            className="footer-logo-img"
          />
          <p className="footer-company-desc">
            <b>{COMPANY_INFO.name}</b> is a Delhi-based trading and distribution firm engaged in wholesale supply, retail marketing, and channel partnerships for beauty, personal care, Ayurveda-inspired, and tea products.
          </p>
          <div className="footer-gstin-chip">GSTIN: {COMPANY_INFO.gstin}</div>
        </div>

        {/* Col 2: Brand Portfolio */}
        <div className="footer-col">
          <h4>Brand Portfolio</h4>
          <div className="footer-links-list">
            <Link to="/brands/cotx-luxury-skincare">COTX Luxury Skincare</Link>
            <Link to="/brands/divya-tea">Divya Tea</Link>
            <Link to="/shop">All Collections</Link>
            <Link to="/shop?category=facial-kits">6-Step Facial Kits</Link>
            <Link to="/shop?category=wholesale-bulk-tea">Wholesale Bulk Tea</Link>
          </div>
        </div>

        {/* Col 3: Business & Trading */}
        <div className="footer-col">
          <h4>Business & Trade</h4>
          <div className="footer-links-list">
            <Link to="/wholesale">Wholesale Supply</Link>
            <Link to="/distribution">Distribution Partnerships</Link>
            <Link to="/about">About DKB Ventures</Link>
            <Link to="/track-order">Track Your Order</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
            <Link to="/shipping-policy">Shipping Policy</Link>
            <Link to="/return-refund-policy">Return & Refund Policy</Link>
          </div>
        </div>

        {/* Col 4: Contact & Location */}
        <div className="footer-col">
          <h4>Head Office & Support</h4>
          <div className="footer-contact-item">
            <span style={{ color: 'var(--dkb-gold-light)', flexShrink: 0, marginTop: '2px' }}>
              <IconLocationPin size={18} />
            </span>
            <span>{COMPANY_INFO.headOffice.fullAddress}</span>
          </div>
          <div className="footer-contact-item">
            <span style={{ color: 'var(--dkb-gold-light)', flexShrink: 0, marginTop: '2px' }}>
              <IconPhoneCall size={18} />
            </span>
            <div>
              <a href={`tel:+91${COMPANY_INFO.primaryPhone}`}>+91 {COMPANY_INFO.primaryPhone}</a>
            </div>
          </div>
          <div className="footer-contact-item">
            <span style={{ color: '#25d366', flexShrink: 0, marginTop: '2px' }}>
              <IconWhatsApp size={18} />
            </span>
            <a href={getGeneralEnquiryWhatsApp()} target="_blank" rel="noopener noreferrer">
              WhatsApp Support (Direct Chat)
            </a>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Link to="/contact" className="btn btn-outline-gold btn-sm btn-full">
              Send Business Enquiry
            </Link>
          </div>
        </div>
      </div>

      <div className="container footer-bottom-bar">
        <span>© {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.</span>
        <span>Trading · Wholesale · Distribution · Retail Marketing</span>
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  )
}
