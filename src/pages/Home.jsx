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
  'cotx-luxury-skincare': '/images/brand-cotx.jpg',
  'green-herbs-ayurveda': '/images/brand-ayurveda.jpg',
  'divya-tea': '/images/brand-tea.jpg',
}

const HERO_SLIDES = [
  {
    id: 'all',
    tabLabel: '✦ Full Portfolio',
    badge: 'Official Delhi B2B Trading & Retail Firm',
    title: 'Beauty. Wellness.',
    titleAccent: 'Trusted Partnerships.',
    desc: 'Connecting premium skincare, authentic Ayurveda, and fine tea with retailers, salons, beauty parlours, distributors, and individual customers from Budh Vihar, Delhi.',
    image: '/images/hero-showcase.jpg',
    chip1: '3 Curated Brands',
    chip1Sub: 'COTX · Green Herbs · Divya Tea',
    chip2: 'Direct Delhi Supply',
    chip2Sub: 'Budh Vihar Hub · GST Registered',
    exploreLink: '/shop',
    exploreText: 'Explore All Products →',
    b2bLink: '/wholesale',
    b2bText: 'Wholesale & Salon Pricing',
  },
  {
    id: 'cotx',
    tabLabel: '✨ COTX Luxury Skincare',
    badge: 'Everyday Beauty & Salon Formulations',
    title: 'COTX Luxury Skincare,',
    titleAccent: 'Radiance Refined.',
    desc: 'Sulfate-free foaming face washes, 24K gold radiance serums, royal silk moisturizers, hair growth therapies, and 6-step bridal salon facial kits.',
    image: '/images/brand-cotx.jpg',
    chip1: 'Salon Professional Care',
    chip1Sub: '6-Step Bridal Facial Regimens',
    chip2: 'Hair & Beard Therapies',
    chip2Sub: 'Advanced Growth & Nourishing Oils',
    exploreLink: '/shop?brand=cotx',
    exploreText: 'Explore COTX Products →',
    b2bLink: '/wholesale?brand=cotx',
    b2bText: 'COTX Salon Wholesale Quote',
  },
  {
    id: 'green-herbs',
    tabLabel: '🌿 Green Herbs Ayurveda',
    badge: 'Herbal Wellness & Pure Botanicals',
    title: 'Green Herbs Ayurveda,',
    titleAccent: 'Nature’s Authentic Purity.',
    desc: 'Pure soothing aloe vera gel, saffron ubtan night cream, Bhringraj-Amla herbal hair therapy, and steam-distilled rose water inspired by traditional Ayurveda.',
    image: '/images/brand-ayurveda.jpg',
    chip1: '100% Herbal Purity',
    chip1Sub: 'Pure Aloe Vera & Saffron Ubtan',
    chip2: 'Ayurvedic Formulations',
    chip2Sub: 'Bhringraj, Amla & Sandalwood',
    exploreLink: '/shop?brand=green-herbs',
    exploreText: 'Explore Ayurvedic Range →',
    b2bLink: '/wholesale?brand=green-herbs',
    b2bText: 'Ayurveda Bulk Supply Quote',
  },
  {
    id: 'divya-tea',
    tabLabel: '☕ Divya Tea Blends',
    badge: 'Artisanal CTC & Wholesale Bulk Supply',
    title: 'Divya Tea,',
    titleAccent: 'Rich Aroma & Bold Flavor.',
    desc: 'Finest CTC leaf tea, royal spiced masala chai, and commercial catering bulk bags (5kg & 25kg) for daily retail enjoyment, tea stalls, and wholesale distributors.',
    image: '/images/brand-tea.jpg',
    chip1: 'Daily Kadak Chai',
    chip1Sub: 'CTC Leaf & Royal Spiced Masala',
    chip2: 'Commercial Bulk Packs',
    chip2Sub: '5 kg & 25 kg Wholesale Supply',
    exploreLink: '/shop?brand=divya-tea',
    exploreText: 'Explore Tea Blends →',
    b2bLink: '/wholesale?brand=divya-tea',
    b2bText: 'Wholesale Tea Supply Quote',
  },
]

const CONCERNS_DATA = [
  {
    title: 'Facial Kits & Salon Care',
    brand: 'COTX Luxury',
    brandId: 'cotx',
    path: '/shop?category=facial-kits',
    image: '/products/glow-ritual-set.jpg',
    sub: '6-Step Bridal & Parlour Glow',
  },
  {
    title: 'Hair Growth & Scalp Therapy',
    brand: 'COTX Luxury',
    brandId: 'cotx',
    path: '/shop?category=hair-care',
    image: '/products/gold-radiance-serum.jpg',
    sub: 'Root Activation & Density Oil',
  },
  {
    title: 'Natural Aloe & Herbal Care',
    brand: 'Green Herbs',
    brandId: 'green-herbs',
    path: '/shop?category=herbal-skincare',
    image: '/products/saffron-night-cream.jpg',
    sub: '100% Pure Soothing Aloe & Rose',
  },
  {
    title: 'Radiance Creams & Day Care',
    brand: 'COTX Luxury',
    brandId: 'cotx',
    path: '/shop?category=creams-moisturizers',
    image: '/products/royal-silk-cream.jpg',
    sub: 'Hydra-Silk 24hr Moisture Barrier',
  },
  {
    title: 'Beard Grooming & Styling',
    brand: 'COTX Luxury',
    brandId: 'cotx',
    path: '/shop?category=beard-grooming',
    image: '/products/retinol-night-elixir.jpg',
    sub: 'Conditioning Beard Oils & Care',
  },
  {
    title: 'Whole Leaf & CTC Tea Supply',
    brand: 'Divya Tea',
    brandId: 'divya-tea',
    path: '/shop?category=tea-retail',
    image: '/products/divya-tea-blend.png',
    sub: 'Assam CTC & Commercial Sacks',
  },
]

const TESTIMONIALS = [
  {
    quote: 'The COTX 6-step facial kits and hair growth oils have given exceptional client satisfaction in our bridal packages. The packaging and formulation quality feel truly high-end.',
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
    quote: 'Green Herbs pure aloe vera gel and saffron night cream have authentic Ayurvedic purity. The Divya Tea royal masala blend is also a hot seller in our wellness section.',
    author: 'Dr. Anita Verma',
    role: 'Ayurvedic Wellness Consultant (Delhi NCR)',
    stars: 5,
  },
]

export default function Home() {
  useSEO(
    'Trusted Partner in Beauty, Personal Care & Wellness',
    'DKB Ventures connects quality brands (COTX Luxury Skincare, Green Herbs Ayurveda, Divya Tea) with retailers, salons, beauty parlours, distributors, and individual customers.'
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
      {/* 1. DISTINCTIVE MULTI-BRAND INTERACTIVE LUXURY HERO */}
      <section className="hero-section">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Top Segmented Brand Switcher Control */}
          <div className="hero-brand-selector-wrap">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                className={`hero-brand-tab-btn ${activeHeroIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveHeroIndex(idx)}
                aria-label={`Switch to ${slide.tabLabel}`}
              >
                <span>{slide.tabLabel}</span>
              </button>
            ))}
          </div>

          <div className="hero-grid" style={{ alignItems: 'center' }}>
            {/* Left Column: Dynamic Luxury Copy & Actions */}
            <div className="hero-copy">
              <div className="hero-pill-badge">
                <IconSparkles size={14} />
                <span>{currentSlide.badge}</span>
              </div>

              <h1 className="hero-heading">
                {currentSlide.title} <br />
                <span className="hero-heading-gold">{currentSlide.titleAccent}</span>
              </h1>

              <p className="hero-description">
                {currentSlide.desc}
              </p>

              <div className="hero-actions">
                <Link to={currentSlide.exploreLink} className="btn btn-gold">
                  <span>{currentSlide.exploreText}</span>
                </Link>
                <Link to={currentSlide.b2bLink} className="btn btn-outline-gold">
                  <span>{currentSlide.b2bText}</span>
                </Link>
                <a
                  href={wholesaleWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-hero"
                  aria-label="Direct WhatsApp Quote"
                >
                  <IconWhatsApp size={18} />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>

            {/* Right Column: Unique Arched Luxury Visual Frame with Monogram Crest */}
            <div className="hero-visual-showcase">
              <div className="hero-visual-arch">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="hero-arch-image"
                />
                <div className="hero-arch-overlay" />

                {/* Official Monogram Crest Badge */}
                <div className="hero-monogram-crest">
                  <IconShieldCheck size={18} color="var(--dkb-gold-light)" />
                  <div>
                    <div className="hero-crest-lettering">DKB VENTURES</div>
                    <div className="hero-crest-sub">Budh Vihar · Delhi</div>
                  </div>
                </div>

                {/* Floating Brand Badge */}
                <div className="hero-floating-pill">
                  <IconSparkles size={13} />
                  <span>{currentSlide.badge}</span>
                </div>

                {/* Bottom Floating Interactive Card */}
                <div className="hero-floating-card-bottom">
                  <div className="hero-floating-card-item">
                    <div className="hero-floating-icon">
                      <IconCheckCircle size={18} />
                    </div>
                    <div>
                      <div className="hero-floating-title">{currentSlide.chip1}</div>
                      <div className="hero-floating-sub">{currentSlide.chip1Sub}</div>
                    </div>
                  </div>

                  <div className="hero-floating-card-item">
                    <div className="hero-floating-icon">
                      <IconTruck size={18} />
                    </div>
                    <div>
                      <div className="hero-floating-title">{currentSlide.chip2}</div>
                      <div className="hero-floating-sub">{currentSlide.chip2Sub}</div>
                    </div>
                  </div>
                </div>
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
              <p>Discover COTX Luxury Skincare, Green Herbs Ayurveda and Divya Tea in one trusted portfolio.</p>
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

      {/* 3. EXPLORE OUR 3 BRANDS (HIGH-END EDITORIAL SHOWCASE) */}
      <section className="section brands-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="eyebrow">Curated Portfolio</span>
            <h2 className="section-title">Explore Our Brands</h2>
            <p className="section-subtitle">
              Three distinct brand portfolios addressing everyday beauty, traditional Ayurvedic care, and premium tea supply.
            </p>
          </div>

          <div className="grid grid-3">
            {COMPANY_INFO.brands.map((brand) => (
              <div key={brand.id} className="brand-card">
                {/* Brand Full-Bleed Cover Photo */}
                <div className="brand-card-cover-wrap">
                  <img
                    src={BRAND_VISUALS[brand.id] || '/images/brand-cotx.jpg'}
                    alt={brand.name}
                    className="brand-card-cover-img"
                    loading="lazy"
                  />
                  <div className="brand-card-cover-overlay" />
                  <span className="brand-card-cover-badge">{brand.badge}</span>
                </div>

                <div className="brand-card-header">
                  <h3 className="brand-card-title">{brand.name}</h3>
                  <p className="brand-card-tagline">{brand.tagline}</p>
                </div>

                <div className="brand-card-body">
                  <p style={{ fontSize: '13.5px', color: 'var(--dkb-text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                    {brand.description}
                  </p>
                  <div className="brand-card-categories">
                    <span className="brand-category-label">Key Categories:</span>
                    <div className="brand-pills-list">
                      {brand.categories.slice(0, 4).map((cat, idx) => (
                        <span key={idx} className="brand-pill">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="brand-card-actions">
                    <Link to={`/brands/${brand.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                      View Products →
                    </Link>
                    <a
                      href={wholesaleWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      title="Wholesale Pricing Inquiry"
                    >
                      Bulk Quote ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
              Explore 11 specialized product categories across luxury skincare, authentic Ayurveda, and fine estate tea for personal use, salons, and wholesale retail supply.
            </p>

            {/* Interactive Multi-Brand Filter Tabs */}
            <div className="category-filter-tabs">
              <button
                type="button"
                className={`category-tab-btn ${activeCategoryTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('all')}
              >
                <span>✦ All Collections</span>
                <span className="category-tab-count">11</span>
              </button>
              <button
                type="button"
                className={`category-tab-btn ${activeCategoryTab === 'cotx' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('cotx')}
              >
                <span>✨ COTX Luxury</span>
                <span className="category-tab-count">6</span>
              </button>
              <button
                type="button"
                className={`category-tab-btn ${activeCategoryTab === 'green-herbs' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('green-herbs')}
              >
                <span>🌿 Green Herbs Ayurveda</span>
                <span className="category-tab-count">3</span>
              </button>
              <button
                type="button"
                className={`category-tab-btn ${activeCategoryTab === 'divya-tea' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('divya-tea')}
              >
                <span>☕ Divya Tea Blends</span>
                <span className="category-tab-count">2</span>
              </button>
            </div>
          </div>

          {/* Luxury Visual Grid */}
          <div className="category-showcase-grid">
            {CATEGORIES.filter((c) => c.id !== 'all' && (activeCategoryTab === 'all' || c.brandId === activeCategoryTab)).map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="category-showcase-card"
              >
                {/* Visual Header with Real Packaging Photography */}
                <div className="cat-card-media">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="cat-card-img"
                    loading="lazy"
                  />
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
              src="/images/wholesale-salon.jpg"
              alt="Professional Salon & Distributor Display Showroom"
              className="wholesale-image-display"
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
