import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductArt from '../components/ProductArt'
import { CATEGORIES, PRODUCTS, getProduct, inr } from '../data/products'

const PERKS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Dermatologist Tested',
    subtitle: 'Clinically proven & safe for sensitive skin',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    title: '100% Cruelty Free',
    subtitle: 'Ethically sourced, clean botanicals',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: 'Complimentary Shipping',
    subtitle: 'On all orders above ₹1,999 across India',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
    title: '7-Day Easy Returns',
    subtitle: 'Hassle-free guarantee & full refund',
  },
]

export default function Home() {
  const best = PRODUCTS.filter((p) => p.bestseller).slice(0, 4)
  const fresh = PRODUCTS.filter((p) => p.isNew).slice(0, 4)
  const hero = getProduct('gold-radiance-serum')
  const giftSet = getProduct('glow-ritual-set')

  return (
    <>
      <section className="hero">
        <div className="hero-ambient-orb orb-1" />
        <div className="hero-ambient-orb orb-2" />
        <div className="hero-ambient-orb orb-3" />
        <div className="hero-decor-ring" />

        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-pill">
              <span className="hero-pill-sparkle">✦</span>
              <span className="hero-pill-text">Haute Cosmétique · 24K Gold Formulations</span>
              <span className="hero-pill-badge">Paris & Ayurveda</span>
            </div>

            <h1 className="hero-title">
              Radiance, <span className="hero-title-accent">refined in gold.</span>
            </h1>

            <p className="hero-desc">
              Clinically-proven actives meet rare, precious botanicals. Discover gold-standard skincare designed to elevate your daily ritual into pure indulgence.
            </p>

            <div className="hero-highlights">
              <div className="hero-highlight-chip">
                <span className="chip-icon">✦</span>
                <span>24K Colloidal Gold</span>
              </div>
              <div className="hero-highlight-chip">
                <span className="chip-icon">✦</span>
                <span>Triple Peptides & Vit-C</span>
              </div>
              <div className="hero-highlight-chip">
                <span className="chip-icon">✦</span>
                <span>Dermatologist Approved</span>
              </div>
            </div>

            <div className="hero-cta">
              <Link to="/shop" className="btn btn-hero-primary">
                <span>Shop the Collection</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/shop?filter=new" className="btn btn-hero-glass">
                <span>Explore New Arrivals</span>
              </Link>
            </div>

            <div className="hero-trust">
              <div className="avatar-stack">
                <img src="/avatars/user1.jpg" alt="Glowing skin client" className="avatar" />
                <img src="/avatars/user2.jpg" alt="Satisfied customer" className="avatar" />
                <img src="/avatars/user3.jpg" alt="Verified customer" className="avatar" />
                <span className="avatar-more">+10k</span>
              </div>
              <div className="hero-trust-details">
                <div className="stars-row">
                  <span className="stars">★★★★★</span>
                  <span className="rating-num">4.9 / 5</span>
                </div>
                <span className="hero-trust-text">trusted by 10,000+ radiant skin rituals</span>
              </div>
            </div>
          </div>

          <div className="hero-showcase">
            <div className="hero-showcase-pedestal">
              <div className="hero-halo" />
              <div className="hero-light-sweep" />

              <Link to={`/product/${hero.id}`} className="hero-art-link" aria-label={hero.name}>
                <div className="hero-image-wrapper">
                  <img
                    src={hero.image || '/products/gold-radiance-serum.jpg'}
                    alt={hero.name}
                    className="hero-main-img"
                  />
                </div>

                <div className="hero-floating-card top-left">
                  <div className="floating-icon-box gold-trophy">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
                      <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
                      <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                  </div>
                  <div className="floating-text">
                    <span className="floating-tag">Award Winner</span>
                    <strong className="floating-title">2026 Elle Beauty Awards</strong>
                  </div>
                </div>

                <div className="hero-floating-card bottom-right">
                  <div className="floating-icon-box gold-sparkle">
                    <span className="gold-sparkle-symbol">✦</span>
                  </div>
                  <div className="floating-text">
                    <span className="floating-tag">Infused With</span>
                    <strong className="floating-title">Real 24K Gold Flakes</strong>
                  </div>
                </div>

                <div className="hero-product-pill">
                  <div className="product-pill-info">
                    <span className="product-pill-name">{hero.name}</span>
                    <span className="product-pill-size">{hero.size} · Active Elixir</span>
                  </div>
                  <div className="product-pill-price">
                    <strong>{inr(hero.price)}</strong>
                    <span className="product-pill-view">View Ritual ↗</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Perks Bar with luxury cards */}
      <section className="perks">
        <div className="container perks-grid">
          {PERKS.map((p) => (
            <div key={p.title} className="perk-item">
              <div className="perk-icon-wrapper">
                <div className="perk-icon">{p.icon}</div>
              </div>
              <div className="perk-text">
                <b className="perk-title">{p.title}</b>
                <span className="perk-subtitle">{p.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Press / Editorial Credibility Strip */}
      <section className="press-strip">
        <div className="container press-content">
          <span className="press-label">Celebrated in Global Luxury Editorials</span>
          <div className="press-logos">
            <span className="press-item">ELLE</span>
            <span className="press-dot">✦</span>
            <span className="press-item">VOGUE</span>
            <span className="press-dot">✦</span>
            <span className="press-item">HARPER'S BAZAAR</span>
            <span className="press-dot">✦</span>
            <span className="press-item">L'OFFICIEL</span>
            <span className="press-dot">✦</span>
            <span className="press-item">GQ LUXURY</span>
          </div>
          <p className="press-quote">
            "The gold standard in active cell regeneration — delivers an unmistakable lit-from-within glow."
            <span className="press-author"> — ELLE Beauty Awards 2026</span>
          </p>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section className="section container">
        <div className="section-head">
          <span className="eyebrow">Curated Collections</span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-sub">Targeted botanical treatments formulated for each step of your daily ritual</p>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((c) => {
            const sample = PRODUCTS.find((p) => p.category === c.id)
            return (
              <Link key={c.id} to={`/shop?category=${c.id}`} className="cat-card">
                <div className="cat-media">
                  <div className="cat-halo" />
                  <ProductArt product={sample} id={sample?.id} tone={sample?.tone} shape={sample?.shape} alt={c.name} />
                </div>
                <div className="cat-info">
                  <h3 className="cat-name">{c.name}</h3>
                  <span className="cat-blurb">{c.blurb}</span>
                  <span className="cat-link">Explore Ritual <span className="cat-arrow">→</span></span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 4. Customer Favourites (Most Loved) */}
      <section className="section container">
        <div className="section-head-split">
          <div className="head-copy">
            <span className="eyebrow">Award-Winning Formulas</span>
            <h2 className="section-title">Most Loved Formulations</h2>
            <p className="section-sub-left">Clinically proven bestsellers trusted for everyday radiance</p>
          </div>
          <Link to="/shop" className="link-arrow-btn">
            <span>View All Formulations</span>
            <span className="arrow">→</span>
          </Link>
        </div>
        <div className="grid">{best.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      {/* 5. The Science of Gold Feature Section */}
      <section className="feature">
        <div className="feature-ambient-orb" />
        <div className="container feature-grid">
          <div className="feature-copy">
            <span className="eyebrow gold">Cellular Regeneration</span>
            <h2 className="feature-title">24K Pure Gold + Stabilised Actives</h2>
            <p className="feature-lead">
              Gold has been revered for centuries as a natural cell regenerator. At KEMY, we suspend pure 24K colloidal gold with stabilised Vitamin C, peptides, and triple-weight hyaluronic acid to stimulate collagen synthesis, neutralize free radicals, and impart an unmistakable golden hour glow.
            </p>

            <div className="clinical-grid">
              <div className="clinical-card">
                <strong className="clinical-metric">28 Days</strong>
                <span className="clinical-label">Visible reduction in fine lines & texture</span>
              </div>
              <div className="clinical-card">
                <strong className="clinical-metric">98%</strong>
                <span className="clinical-label">Reported firmer, deeply luminous skin</span>
              </div>
              <div className="clinical-card">
                <strong className="clinical-metric">3.2×</strong>
                <span className="clinical-label">Increase in natural collagen synthesis</span>
              </div>
            </div>

            <ul className="feature-list">
              <li><span className="gold-check">✦</span> Pure 24K French Colloidal Gold suspensions</li>
              <li><span className="gold-check">✦</span> Time-released actives with zero irritation</li>
              <li><span className="gold-check">✦</span> Non-comedogenic & 100% Dermatologist Approved</li>
            </ul>

            <div className="feature-actions">
              <Link to="/product/gold-radiance-serum" className="btn btn-hero-primary">
                <span>Experience Gold Radiance</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/about" className="btn btn-dark-outline">
                <span>Our Science</span>
              </Link>
            </div>
          </div>

          <div className="feature-art-wrap">
            <div className="feature-halo" />
            <div className="feature-pedestal">
              <ProductArt product={giftSet} id={giftSet?.id} shape="box" tone="#d9a441" alt="KEMY Luxury Gift Set" className="feature-art" />
              <div className="feature-floating-badge">
                <span className="badge-sparkle">✦</span>
                <div className="badge-text">
                  <span className="badge-tag">Collector's Edition</span>
                  <strong>The Glow Ritual Luxury Box</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Client Testimonials: Rituals of Radiance */}
      <section className="section container testimonials-section">
        <div className="section-head">
          <span className="eyebrow">Client Endorsements</span>
          <h2 className="section-title">Rituals of Radiance</h2>
          <p className="section-sub">Read authentic experiences from over 10,000+ radiant skincare journeys</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">
              "Within two weeks of using the 24K Gold Radiance Serum, my skin texture completely transformed. It looks lit from within even on zero sleep."
            </p>
            <div className="testimonial-author">
              <img src="/avatars/user1.jpg" alt="Ananya S." className="testimonial-avatar" />
              <div className="author-info">
                <strong className="author-name">Ananya S.</strong>
                <span className="author-meta">Mumbai · Combination Skin · Verified Buyer</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card featured">
            <div className="featured-ribbon">Most Loved Review</div>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">
              "The Royal Silk Cream feels like pure couture on the skin. It hydrates all day without greasiness. I have replaced three luxury department store serums with KEMY."
            </p>
            <div className="testimonial-author">
              <img src="/avatars/user2.jpg" alt="Priyanka M." className="testimonial-avatar" />
              <div className="author-info">
                <strong className="author-name">Priyanka M.</strong>
                <span className="author-meta">New Delhi · Normal/Dry Skin · Verified Buyer</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">
              "I was skeptical about gold in skincare, but the clinical difference is obvious. My forehead lines have softened and my makeup glides on like glass."
            </p>
            <div className="testimonial-author">
              <img src="/avatars/user3.jpg" alt="Natasha K." className="testimonial-avatar" />
              <div className="author-info">
                <strong className="author-name">Natasha K.</strong>
                <span className="author-meta">Bengaluru · Mature Skin · Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals */}
      <section className="section container">
        <div className="section-head-split">
          <div className="head-copy">
            <span className="eyebrow">Just Landed</span>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-sub-left">Freshly formulated botanical treatments for targeted skin renewal</p>
          </div>
          <Link to="/shop?filter=new" className="link-arrow-btn">
            <span>Explore New Releases</span>
            <span className="arrow">→</span>
          </Link>
        </div>
        <div className="grid">{fresh.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
    </>
  )
}
