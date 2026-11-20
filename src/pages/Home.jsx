import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { COMPANY_INFO, getWholesaleEnquiryWhatsApp, getGeneralEnquiryWhatsApp } from '../data/companyInfo'
import { getFeaturedProducts, CATEGORIES } from '../data/products'
import { useSEO } from '../hooks/useSEO'
import {
  IconBox,
  IconShieldCheck,
  IconGrid,
  IconTruck,
  IconPhoneCall,
  IconPhoneWhatsApp,
  IconWhatsApp,
  IconCheckCircle,
  IconSparkles,
  IconTeaCup,
  IconLeaf,
} from '../components/Icons'

const BRAND_VISUALS = {
  'cotx-luxury-skincare': '/images/brand-cotx-luxury-skincare.webp',
  'divya-tea': '/images/divya-tea-showcase.webp',
  'cotx-fine-tea': '/images/divya-tea-showcase.webp',
}

const HERO_SLIDES = [
  {
    id: 'all',
    tabLabel: '✦ Full Portfolio',
    badge: 'Official Delhi B2B Trading & Retail Firm',
    title: 'Beauty. Wellness.',
    titleAccent: 'Trusted Partnerships.',
    desc: 'Connecting premium skincare, salon facial kits, and fine estate tea with retailers, salons, beauty parlours, distributors, and individual customers from Budh Vihar, Delhi.',
    image: '/images/dkb-portfolio-hero.webp',
    chip1: 'Curated Portfolio',
    chip1Sub: 'COTX Luxury Skincare & Divya Tea',
    chip2: 'Direct Delhi Supply',
    chip2Sub: 'Budh Vihar Hub · GST Registered',
    exploreLink: '/shop',
    exploreText: 'Explore All Products →',
    b2bLink: '/wholesale',
    b2bText: 'Wholesale & Salon Pricing',
  },
  {
    id: 'cotx-skincare',
    tabLabel: '✨ COTX Luxury Skincare',
    badge: 'Everyday Beauty & Salon Formulations',
    title: 'COTX Luxury Skincare,',
    titleAccent: 'Radiance Refined.',
    desc: 'Sulfate-free foaming face washes, active Vitamin C & Glutathione serums, SPF 50++ sun protection, and 6-step bridal salon facial kits.',
    image: '/images/brand-cotx-luxury-skincare.webp',
    chip1: 'Salon Professional Care',
    chip1Sub: '6-Step Bridal & Glass Skin Kits',
    chip2: 'Targeted Daily Actives',
    chip2Sub: 'Vitamin C, Kojic Acid & SPF 50++',
    exploreLink: '/shop?category=facial-kits',
    exploreText: 'Explore COTX Skincare →',
    b2bLink: '/wholesale?brand=cotx',
    b2bText: 'COTX Salon Wholesale Quote',
  },
  {
    id: 'divya-tea',
    tabLabel: '☕ Divya Tea',
    badge: 'Artisanal CTC & Wholesale Bulk Supply',
    title: 'Divya Tea,',
    titleAccent: 'Rich Aroma & Bold Flavor.',
    desc: 'Finest Assam CTC leaf tea, royal spiced masala chai, and commercial catering bulk cartons (5 kg & 25 kg) for daily retail enjoyment and wholesale distributors.',
    image: '/images/divya-tea-showcase.webp',
    chip1: 'Daily Kadak Chai',
    chip1Sub: 'Assam CTC & Masala Chai',
    chip2: 'Commercial Master Cartons',
    chip2Sub: '5 kg & 25 kg Wholesale Supply',
    exploreLink: '/shop?category=daily-premium-tea',
    exploreText: 'Explore Tea Blends →',
    b2bLink: '/wholesale?brand=divya-tea',
    b2bText: 'Divya Tea Wholesale Supply Quote',
  },
]

const CONCERNS_DATA = [
  {
    title: '6-Step Facial Kits',
    brand: 'COTX Luxury',
    brandId: 'cotx',
    path: '/shop?category=facial-kits',
    image: '/images/category-facial-kits-salon-packs.webp',
    sub: '6-Step Bridal, Glass Skin & Gold',
  },
  {
    title: 'Face Washes & Cleansers',
    brand: 'COTX Luxury',
    brandId: 'cotx',
    path: '/shop?category=face-washes-cleansers',
    image: '/images/category-face-care-cleansers.webp',
    sub: 'Charcoal Detox, Korean & Sakura Wash',
  },
  {
    title: 'Face Serums & Toners',
    brand: 'COTX Luxury',
    brandId: 'cotx',
    path: '/shop?category=face-serums-toners',
    image: '/images/category-face-serums-toners.webp',
    sub: 'Vitamin C, Kojic Acid & Rice Toner',
  },
  {
    title: 'Creams & Sun Protection',
    brand: 'COTX Luxury',
    brandId: 'cotx',
    path: '/shop?category=creams-sun-care',
    image: '/images/category-creams-moisturisers.webp',
    sub: 'Brightening Cream & SPF 50++',
  },
  {
    title: 'Body & Hand Care',
    brand: 'COTX Luxury',
    brandId: 'cotx',
    path: '/shop?category=body-hand-care',
    image: '/images/category-body-hand-care.webp',
    sub: 'Royal Silk & Soothing Lavender',
  },
  {
    title: 'Estate Tea & Bulk Cartons',
    brand: 'COTX Tea',
    brandId: 'cotx',
    path: '/shop?category=daily-premium-tea',
    image: '/images/category-daily-premium-tea.webp',
    sub: 'Assam CTC, Masala & Wholesale Cartons',
  },
]

const TESTIMONIALS = [
  {
    quote: 'The COTX 6-step facial kits and Vitamin C serum have given exceptional client satisfaction in our bridal packages. The packaging and formulation quality feel truly high-end.',
    author: 'Simran Malik',
    role: 'Salon Director, Aura Beauty Lounge (Rohini, Delhi)',
    stars: 5,
  },
  {
    quote: 'Fast dispatch, genuine products, and proper GST input tax invoices every single time. DKB Ventures is our most dependable skincare and personal care trading partner.',
    author: 'Rajesh Khanna',
    role: 'Managing Partner, Modern Cosmetic & Retail (Pitampura, Delhi)',
    stars: 5,
  },
  {
    quote: 'The COTX Japanese Cherry Blossom face wash and Sun Block SPF 50++ are consistent bestsellers in our retail store. The Assam CTC tea and Masala Chai are also favorites.',
    author: 'Anita Verma',
    role: 'Retail Store Owner (Delhi NCR)',
    stars: 5,
  },
]

export default function Home() {
  useSEO(
    'Trusted Partner in Beauty, Personal Care & Wellness',
    'DKB Ventures connects quality brands (COTX Luxury Skincare & Divya Tea) with retailers, salons, beauty parlours, distributors, and individual customers.'
  )

  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const currentSlide = HERO_SLIDES[activeHeroIndex]

  const [activeCategoryTab, setActiveCategoryTab] = useState('all')

  const featuredList = getFeaturedProducts().slice(0, 8)
  const wholesaleWhatsAppUrl = getWholesaleEnquiryWhatsApp()
  const generalWhatsAppUrl = getGeneralEnquiryWhatsApp()

  const getCategoryIcon = (catId) => {
    if (catId.includes('tea')) return <IconTeaCup size={18} />
    if (catId.includes('herbal') || catId.includes('ayurvedic')) return <IconLeaf size={18} />
    return <IconSparkles size={18} />
  }

  return (
    <>
      {/* 1. ULTRA-LUXURY REDESIGNED HERO SECTION */}
      <section className="hero-section">
        {/* Ambient Atmospheric Lighting & Fine Mesh Pattern */}
        <div className="hero-glow-ambient" />
        <div className="hero-glow-accent" />
        <div className="hero-ambient-pattern" />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          {/* Luxury Runway Brand Switcher */}
          <div className="hero-brand-nav-bar">
            <span className="hero-nav-label">Curated Collections:</span>
            <div className="hero-nav-tabs">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`hero-nav-tab ${activeHeroIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveHeroIndex(idx)}
                  aria-label={`Switch to ${slide.tabLabel}`}
                >
                  <span className="hero-nav-pip">✦</span>
                  <span className="hero-nav-text">{slide.tabLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main 2-Column Hero Stage */}
          <div className="hero-main-stage">
            {/* Left Column: Prestigious Editorial Typography & Actions */}
            <div className="hero-editorial-col">
              {/* Refined Live Status Eyebrow Badge */}
              <div className="hero-status-eyebrow">
                <span className="hero-status-pulse" />
                <span className="hero-status-text">{currentSlide.badge}</span>
                <span className="hero-status-dot">·</span>
                <span className="hero-status-hub">Delhi B2B & Retail</span>
              </div>

              {/* Majestic Headline */}
              <h1 className="hero-headline">
                {currentSlide.title} <br />
                <span className="hero-headline-shimmer">{currentSlide.titleAccent}</span>
              </h1>

              {/* Narrative Subtitle */}
              <p className="hero-narrative">
                {currentSlide.desc}
              </p>

              {/* Action Buttons */}
              <div className="hero-action-buttons">
                <Link to={currentSlide.exploreLink} className="hero-btn-gold">
                  <span>{currentSlide.exploreText}</span>
                  <span className="hero-btn-arrow">→</span>
                </Link>
                <Link to={currentSlide.b2bLink} className="hero-btn-glass">
                  <span>{currentSlide.b2bText}</span>
                </Link>
                <a
                  href={wholesaleWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn-trade-desk"
                  aria-label="Direct WhatsApp Trade Desk"
                >
                  <IconWhatsApp size={16} />
                  <span>Trade Desk</span>
                </a>
              </div>

              {/* Enterprise Trust Metrics Row */}
              <div className="hero-trust-metrics">
                <div className="hero-metric-item">
                  <div className="hero-metric-value">3</div>
                  <div className="hero-metric-label">Premier Brands</div>
                </div>
                <div className="hero-metric-divider" />
                <div className="hero-metric-item">
                  <div className="hero-metric-value">100%</div>
                  <div className="hero-metric-label">Verified Authentic</div>
                </div>
                <div className="hero-metric-divider" />
                <div className="hero-metric-item">
                  <div className="hero-metric-value">Pan-India</div>
                  <div className="hero-metric-label">Delhi Hub Dispatch</div>
                </div>
              </div>
            </div>

            {/* Right Column: Masterpiece Visual Showcase */}
            <div className="hero-showcase-col">
              <div className="hero-masterpiece-card">
                {/* Image Stage Frame */}
                <div className="hero-canvas-frame">
                  <img
                    key={currentSlide.id}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="hero-masterpiece-img"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="hero-canvas-gradient-scrim" />
                </div>

                {/* Floating Brand Signature Chip */}
                <div className="hero-brand-signature-chip">
                  <span className="hero-signature-sparkle">✦</span>
                  <span className="hero-signature-title">
                    {currentSlide.id === 'all'
                      ? 'DKB Multi-Brand House'
                      : currentSlide.tabLabel.replace(/[^a-zA-Z0-9 ]/g, '').trim()}
                  </span>
                </div>

                {/* Streamlined Bottom Feature Deck (Docked at Base) */}
                <div className="hero-docked-feature-deck">
                  <div className="hero-deck-pill">
                    <div className="hero-deck-icon">
                      <IconCheckCircle size={16} />
                    </div>
                    <div>
                      <div className="hero-deck-title">{currentSlide.chip1}</div>
                      <div className="hero-deck-sub">{currentSlide.chip1Sub}</div>
                    </div>
                  </div>
                  <div className="hero-deck-divider" />
                  <div className="hero-deck-pill">
                    <div className="hero-deck-icon">
                      <IconTruck size={16} />
                    </div>
                    <div>
                      <div className="hero-deck-title">{currentSlide.chip2}</div>
                      <div className="hero-deck-sub">{currentSlide.chip2Sub}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sleek Minimal Slide Indicators */}
              <div className="hero-slide-nav-pips">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`hero-slide-pip ${activeHeroIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveHeroIndex(idx)}
                    aria-label={`Go to ${s.tabLabel}`}
                  >
                    <span className="hero-pip-bar" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION STRIP (EXACT 5-CARD LUXURY TRUST MOSAIC) */}
      <section className="perks-strip">
        <div className="container perks-grid">
          <Link to="/wholesale" className="perk-card">
            <div className="perk-icon-box">
              <IconBox size={22} />
            </div>
            <span className="perk-eyebrow">— TRADE & RETAIL —</span>
            <div className="perk-info">
              <h4>B2B & Retail Supply</h4>
              <p>Flexible supply from individual retail items to bulk master carton lots with GST invoice.</p>
            </div>
          </Link>

          <Link to="/brands" className="perk-card">
            <div className="perk-icon-box">
              <IconShieldCheck size={22} />
            </div>
            <span className="perk-eyebrow">— WHOLESALE TERMS —</span>
            <div className="perk-info">
              <h4>Verified Portfolio</h4>
              <p>Curated luxury skincare, Ayurveda-inspired formulations and tea blends sourced for reliable business supply.</p>
            </div>
          </Link>

          <Link to="/brands" className="perk-card">
            <div className="perk-icon-box">
              <IconGrid size={22} />
            </div>
            <span className="perk-eyebrow">— EXPLORE BRANDS —</span>
            <div className="perk-info">
              <h4>Multi-Brand Selection</h4>
              <p>Discover COTX Luxury Skincare and Divya Tea in one trusted portfolio.</p>
            </div>
          </Link>

          <Link to="/contact" className="perk-card">
            <div className="perk-icon-box">
              <IconTruck size={22} />
            </div>
            <span className="perk-eyebrow">— DELHI LOCATION —</span>
            <div className="perk-info">
              <h4>Delhi Logistics Hub</h4>
              <p>Budh Vihar based operations with dependable dispatch support for Delhi NCR and beyond.</p>
            </div>
          </Link>

          <a href={wholesaleWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="perk-card">
            <div className="perk-icon-box">
              <IconPhoneWhatsApp size={22} />
            </div>
            <span className="perk-eyebrow">— DIRECT DIAL —</span>
            <div className="perk-info">
              <h4>Direct Management Line</h4>
              <p>Immediate phone and WhatsApp communication for pricing, MOQ and business enquiries.</p>
            </div>
          </a>
        </div>
      </section>

      {/* 3. EXPLORE OUR BRANDS (CINEMATIC 2-PANEL SHOWCASE) */}
      <section className="section brand-showcase-section">
        <div className="container">
          <div className="brand-showcase-header">
            <div className="brand-showcase-eyebrow">
              <span className="rule" />
              <span className="wordmark">DKB VENTURES</span>
              <span className="rule" />
            </div>
            <h2 className="brand-showcase-heading">Explore Our Brands</h2>
            <p className="brand-showcase-subtitle">
              Two distinct brand pillars curated for everyday beauty rituals, professional salon treatments, and authentic Indian tea traditions.
            </p>
          </div>

          <div className="brand-showcase-frame">
            {/* Left Panel: COTX Luxury Skincare */}
            <div className="brand-showcase-panel brand-showcase-panel-skincare">
              <img
                src="/images/cotx-skincare-showcase.webp"
                alt="COTX Luxury Skincare"
                className="brand-showcase-bg"
                loading="lazy"
              />
              <div className="brand-showcase-overlay" />
              <div className="brand-showcase-badge">
                <span>✦ Luxury Skincare & Care</span>
              </div>
              <div className="brand-showcase-content">
                <span className="brand-showcase-tagline">Everyday Beauty & Salon Formulations</span>
                <h3 className="brand-showcase-panel-title">COTX Luxury Skincare</h3>
                <p className="brand-showcase-panel-desc">
                  Targeted facial cleansers, active brightening serums, SPF 50++ defense, and 6-step bridal salon facial kits.
                </p>
                <div className="brand-showcase-chips">
                  <span className="showcase-chip">22 Formulations</span>
                  <span className="showcase-chip">Salon Professional</span>
                  <span className="showcase-chip">Retail Packs</span>
                </div>
                <Link to="/brands/cotx-luxury-skincare" className="brand-showcase-btn">
                  <span>Explore Skincare</span>
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>

            {/* Right Panel: Divya Tea */}
            <div className="brand-showcase-panel brand-showcase-panel-tea">
              <img
                src="/images/divya-tea-showcase.webp"
                alt="Divya Tea"
                className="brand-showcase-bg"
                loading="lazy"
              />
              <div className="brand-showcase-overlay" />
              <div className="brand-showcase-badge">
                <span>✦ Garden Fresh & Wholesale</span>
              </div>
              <div className="brand-showcase-content">
                <span className="brand-showcase-tagline">Estate Sourced Kadak & Spiced Blends</span>
                <h3 className="brand-showcase-panel-title">Divya Tea</h3>
                <p className="brand-showcase-panel-desc">
                  High-grown Assam CTC leaf tea, authentic royal masala chai, and commercial 5 kg & 25 kg wholesale master cartons.
                </p>
                <div className="brand-showcase-chips">
                  <span className="showcase-chip">Garden Fresh</span>
                  <span className="showcase-chip">Daily Kadak Chai</span>
                  <span className="showcase-chip">5kg & 25kg Cartons</span>
                </div>
                <Link to="/brands/divya-tea" className="brand-showcase-btn">
                  <span>Explore Tea</span>
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOURCING BY CONCERN & SPECIALTY — ULTRA-LUXURY REDESIGN */}
      <section className="section concern-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="eyebrow">✦ Targeted Solutions & Needs ✦</span>
            <h2 className="section-title">Source by Need & Formulation</h2>
            <p className="section-subtitle">
              Quickly navigate our product portfolio tailored for salon professionals, retailers, and discerning customers.
            </p>
          </div>

          <div className="concern-grid">
            {CONCERNS_DATA.map((item, idx) => (
              <Link key={idx} to={item.path} className="concern-card">
                <div className="concern-avatar-frame">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="concern-avatar-img"
                    loading="lazy"
                  />
                </div>

                <span className={`concern-brand-pill concern-brand-${item.brandId}`}>
                  {item.brand}
                </span>

                <h4 className="concern-title">{item.title}</h4>
                <p className="concern-sub">{item.sub}</p>

                <div className="concern-link-row">
                  <span>Explore</span>
                  <span className="concern-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SHOP BY CATEGORY — ULTRA-LUXURY SHOWCASE */}
      <section className="section category-showcase-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="eyebrow">✦ Diverse Range & Curated Supply ✦</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Explore 8 specialized product categories across luxury skincare, salon facial kits, and fine estate tea for personal use, salons, and wholesale retail supply.
            </p>

            {/* Interactive Category Filter Tabs */}
            <div className="category-filter-tabs">
              <button
                type="button"
                className={`category-tab-btn ${activeCategoryTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('all')}
              >
                <span>✦ All Collections</span>
                <span className="category-tab-count">8</span>
              </button>
              <button
                type="button"
                className={`category-tab-btn ${activeCategoryTab === 'skincare' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('skincare')}
              >
                <span>✨ Skincare & Care</span>
                <span className="category-tab-count">6</span>
              </button>
              <button
                type="button"
                className={`category-tab-btn ${activeCategoryTab === 'tea' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('tea')}
              >
                <span>☕ Estate Tea & Wholesale</span>
                <span className="category-tab-count">2</span>
              </button>
            </div>
          </div>

          {/* Luxury Visual Grid */}
          <div className="category-showcase-grid">
            {CATEGORIES.filter((c) => {
              if (c.id === 'all') return false
              if (activeCategoryTab === 'all') return true
              if (activeCategoryTab === 'skincare') {
                return ['face-washes-cleansers', 'face-serums-toners', 'creams-sun-care', 'body-hand-care', 'shampoo-conditioner', 'facial-kits'].includes(c.id)
              }
              if (activeCategoryTab === 'tea') {
                return ['daily-premium-tea', 'wholesale-bulk-tea'].includes(c.id)
              }
              return true
            }).map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="category-showcase-card"
              >
                {/* Visual Header with Real Packaging Photography */}
                <div className="cat-card-media">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="cat-card-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="cat-card-fallback">
                      <span className="cat-fallback-icon">{getCategoryIcon(cat.id)}</span>
                      <span className="cat-fallback-brand">{cat.brandName}</span>
                    </div>
                  )}
                  <div className="cat-card-media-overlay" />
                  <div className={`cat-brand-badge cat-brand-${cat.brandId}`}>
                    {cat.brandName}
                  </div>
                  {cat.badge && (
                    <div className="cat-badge-chip">
                      {cat.badge}
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="cat-card-body">
                  <div className="cat-card-meta">
                    <span className="cat-tag-pill">{cat.tag}</span>
                    <span className="cat-symbol">{getCategoryIcon(cat.id)}</span>
                  </div>

                  <h3 className="cat-card-title">{cat.name}</h3>
                  <p className="cat-card-desc">{cat.subtitle}</p>

                  <div className="cat-card-footer">
                    <span className="cat-footer-label">Explore Formulations</span>
                    <span className="cat-footer-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS GRID */}
      <section className="section container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="eyebrow">Handpicked Formulations</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Featured Products
            </h2>
          </div>
          <Link to="/shop" className="btn btn-outline btn-sm">
            <span>View Complete Catalogue</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-4">
          {featuredList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. WHOLESALE & DISTRIBUTION B2B SECTION (WITH SALON SHOWCASE PHOTO) */}
      <section className="wholesale-promo-section">
        <div className="container wholesale-promo-grid">
          <div className="wholesale-promo-copy">
            <span className="eyebrow" style={{ color: 'var(--dkb-gold-light)' }}>
              Commercial & Trade Supply
            </span>
            <h2>Grow Your Salon or Retail Business with DKB Ventures</h2>
            <p>
              Are you a beauty salon director, cosmetic retailer, skincare specialist, or regional distributor? Partner with DKB Ventures for consistent product supply, generous trade margins, and prompt Delhi dispatch.
            </p>

            <div className="wholesale-bullets">
              <div className="wholesale-bullet-item">
                <span className="check"><IconCheckCircle size={16} /></span>
                <span>Beauty Salons & Parlour Supplies</span>
              </div>
              <div className="wholesale-bullet-item">
                <span className="check"><IconCheckCircle size={16} /></span>
                <span>Cosmetic & Pharmacy Retail Supply</span>
              </div>
              <div className="wholesale-bullet-item">
                <span className="check"><IconCheckCircle size={16} /></span>
                <span>Regional Distributor Enquiries</span>
              </div>
              <div className="wholesale-bullet-item">
                <span className="check"><IconCheckCircle size={16} /></span>
                <span>Wholesale Bulk Catering Tea Packs</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/wholesale" className="btn btn-gold">
                <span>Submit Wholesale Enquiry</span>
                <span>→</span>
              </Link>
              <Link to="/distribution" className="btn btn-outline-gold">
                <span>Distribution Opportunities</span>
              </Link>
              <a
                href={wholesaleWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <IconWhatsApp size={18} />
                <span>WhatsApp Trade Desk</span>
              </a>
            </div>

            {/* B2B Margin Tier Strip */}
            <div className="b2b-tier-strip">
              <div className="b2b-tier-box">
                <span className="b2b-tier-badge">Tier 1 · Salons</span>
                <div className="b2b-tier-margin">25% Margin</div>
                <div className="b2b-tier-desc">Orders from ₹10,000+. Free Delhi dispatch & trial testers.</div>
              </div>
              <div className="b2b-tier-box">
                <span className="b2b-tier-badge">Tier 2 · Retail Stores</span>
                <div className="b2b-tier-margin">33% Margin</div>
                <div className="b2b-tier-desc">Orders from ₹25,000+. Marketing display materials & collateral.</div>
              </div>
              <div className="b2b-tier-box">
                <span className="b2b-tier-badge">Tier 3 · Stockists</span>
                <div className="b2b-tier-margin">40% Margin</div>
                <div className="b2b-tier-desc">Orders from ₹50,000+. Dedicated commercial account manager.</div>
              </div>
            </div>
          </div>

          {/* Right Side: Professional Salon Showroom Visual */}
          <div className="wholesale-image-card">
            <img
              src="/images/wholesale-salon-display.webp"
              alt="Professional Salon & Distributor Display Showroom"
              className="wholesale-image-display"
              loading="lazy"
            />
            <div className="wholesale-image-overlay" />
            <div className="wholesale-image-badge">
              <span>Salon & Distribution Network</span>
            </div>

            <div className="wholesale-image-footer">
              <div>
                <strong style={{ color: '#ffffff', fontSize: '13px', display: 'block' }}>
                  Commercial Inquiries Welcome
                </strong>
                <span style={{ color: '#a9beba', fontSize: '11px' }}>
                  MOQ, wholesale rates & credit terms confirmed on request
                </span>
              </div>
              <Link to="/wholesale" className="btn btn-gold btn-sm">
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLIENT & SALON PARTNER TESTIMONIALS */}
      <section className="section container">
        <div className="section-title-wrap">
          <span className="eyebrow">Client Feedback</span>
          <h2 className="section-title">Trusted by Salons, Retailers & Professionals</h2>
          <p className="section-subtitle">
            Hear from our trade partners and customers across Delhi NCR about their experience with DKB Ventures.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="testimonial-card">
              <div>
                <div className="testimonial-stars">
                  {'★'.repeat(item.stars)}
                </div>
                <p className="testimonial-quote">“{item.quote}”</p>
              </div>
              <div style={{ borderTop: '1px solid var(--dkb-border-light)', paddingTop: '16px' }}>
                <div className="testimonial-author-name">{item.author}</div>
                <div className="testimonial-author-role">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. WHY CHOOSE DKB VENTURES */}
      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="section-title-wrap">
          <span className="eyebrow">Our Business Advantage</span>
          <h2 className="section-title">Why Choose DKB Ventures?</h2>
          <p className="section-subtitle">
            A customer-focused trading firm built on clear terms, dependable supply, and long-term mutual growth.
          </p>
        </div>

        <div className="grid grid-3">
          {COMPANY_INFO.whyChooseUs.map((item, index) => (
            <div
              key={index}
              style={{
                background: 'var(--dkb-white)',
                border: '1px solid var(--dkb-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '28px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ color: 'var(--dkb-gold)', marginBottom: '12px' }}>
                <IconCheckCircle size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--dkb-green-dark)', marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--dkb-text-secondary)', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. BUSINESS ENQUIRY BANNER */}
      <section className="section-sm" style={{ background: 'var(--dkb-cream)', borderTop: '1px solid var(--dkb-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <span className="eyebrow">Let's Grow Together</span>
          <h2 className="section-title" style={{ fontSize: '32px' }}>
            Ready to Connect with DKB Ventures?
          </h2>
          <p style={{ color: 'var(--dkb-text-secondary)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>
            For product catalogues, wholesale pricing, retail orders, distribution enquiries, and business partnerships, contact DKB Ventures today.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <IconWhatsApp size={18} />
              <span>WhatsApp Us: {COMPANY_INFO.primaryPhone}</span>
            </a>
            <Link to="/contact" className="btn btn-primary">
              <span>Contact Our Team</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
