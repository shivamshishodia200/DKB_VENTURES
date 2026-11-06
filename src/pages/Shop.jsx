import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { BRANDS, CATEGORIES, CONCERNS, PRODUCTS } from '../data/products'
import { useSEO } from '../hooks/useSEO'

export default function Shop() {
  useSEO(
    'Catalogue & Store — Skincare, Ayurveda & Tea',
    'Browse the full multi-brand catalogue of DKB Ventures: COTX Luxury Skincare, Green Herbs Ayurveda, and Divya Tea with wholesale & retail availability.'
  )

  const [searchParams, setSearchParams] = useSearchParams()

  const currentBrand = searchParams.get('brand') || ''
  const currentCategory = searchParams.get('category') || ''
  const currentConcern = searchParams.get('concern') || ''
  const searchQuery = (searchParams.get('q') || '').toLowerCase().trim()
  const currentSort = searchParams.get('sort') || 'featured'

  const updateParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value) {
      nextParams.set(key, value)
    } else {
      nextParams.delete(key)
    }
    setSearchParams(nextParams)
  }

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams())
  }

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      if (currentBrand && p.brandId !== currentBrand) return false
      if (currentCategory && p.categoryId !== currentCategory) return false
      if (currentConcern && p.concern !== currentConcern) return false
      if (searchQuery) {
        const hay = `${p.name} ${p.short} ${p.categoryName} ${p.brandName} ${p.ingredients}`.toLowerCase()
        if (!hay.includes(searchQuery)) return false
      }
      return true
    })

    // Sorting
    switch (currentSort) {
      case 'low':
        result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'high':
        result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case 'latest':
        result = [...result].sort((a, b) => Number(b.newArrival) - Number(a.newArrival))
        break
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
      default:
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
        break
    }

    return result
  }, [currentBrand, currentCategory, currentConcern, searchQuery, currentSort])

  const getPageTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`
    if (currentBrand) {
      const b = BRANDS.find((x) => x.id === currentBrand)
      return b ? b.name : 'Brand Collection'
    }
    if (currentCategory) {
      const c = CATEGORIES.find((x) => x.id === currentCategory)
      return c ? c.name : 'Category Collection'
    }
    return 'Complete Product Catalogue'
  }

  const getBannerData = () => {
    if (currentBrand === 'cotx') {
      return {
        img: '/images/brand-cotx.jpg',
        eyebrow: '✦ COTX Luxury Skincare',
        title: 'Everyday Beauty & Salon Formulations',
        desc: 'Sulfate-free cleansers, 24K gold serums, royal silk moisturizers, and 6-step bridal salon facial kits.',
      }
    }
    if (currentBrand === 'green-herbs') {
      return {
        img: '/images/brand-ayurveda.jpg',
        eyebrow: '🌿 Green Herbs Ayurveda',
        title: 'Pure Botanical & Herbal Wellness',
        desc: 'Pure soothing aloe vera gels, saffron ubtan night cream, and Bhringraj-Amla herbal hair therapy.',
      }
    }
    if (currentBrand === 'divya-tea') {
      return {
        img: '/images/brand-tea.jpg',
        eyebrow: '☕ Divya Tea Blends',
        title: 'Artisanal CTC & Wholesale Bulk Packs',
        desc: 'Finest everyday CTC tea, royal spiced chai, and 5kg/25kg commercial catering bags.',
      }
    }
    return {
      img: '/images/hero-showcase.jpg',
      eyebrow: '✦ DKB Ventures Multi-Brand Store',
      title: 'Curated Beauty, Wellness & Tea Portfolio',
      desc: 'Genuine direct supply for retail customers, beauty salons, retail stores, and wholesale buyers across India.',
    }
  }

  const banner = getBannerData()

  return (
    <div className="container section">
      {/* Page Title & Breadcrumb */}
      <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '32px' }}>
        <span className="eyebrow">DKB Ventures Portfolio</span>
        <h1 className="section-title" style={{ fontSize: '36px', marginBottom: '8px' }}>
          {getPageTitle()}
        </h1>
        <p className="section-subtitle">
          Showing {filteredProducts.length} verified products across our 3 portfolio brands.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '36px', alignItems: 'flex-start' }} className="shop-layout-grid">
        {/* Filters Sidebar */}
        <aside
          style={{
            background: 'var(--dkb-white)',
            border: '1px solid var(--dkb-border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            position: 'sticky',
            top: '90px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dkb-green-dark)', fontWeight: 700 }}>
              Filters
            </h3>
            {(currentBrand || currentCategory || currentConcern || searchQuery) && (
              <button
                onClick={clearAllFilters}
                style={{ fontSize: '11px', color: 'var(--dkb-error)', textDecoration: 'underline' }}
              >
                Reset All
              </button>
            )}
          </div>

          {/* 1. Brand Filter */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--dkb-muted)', marginBottom: '10px', fontWeight: 600 }}>
              Portfolio Brand
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => updateParam('brand', '')}
                style={{
                  textAlign: 'left',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  background: !currentBrand ? 'var(--dkb-green-subtle)' : 'transparent',
                  color: !currentBrand ? 'var(--dkb-green-dark)' : 'var(--dkb-text)',
                  fontWeight: !currentBrand ? 700 : 500,
                }}
              >
                All Brands
              </button>
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => updateParam('brand', b.id)}
                  style={{
                    textAlign: 'left',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    background: currentBrand === b.id ? 'var(--dkb-green-subtle)' : 'transparent',
                    color: currentBrand === b.id ? 'var(--dkb-green-dark)' : 'var(--dkb-text)',
                    fontWeight: currentBrand === b.id ? 700 : 500,
                  }}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Category Filter */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--dkb-muted)', marginBottom: '10px', fontWeight: 600 }}>
              Category
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '260px', overflowY: 'auto' }}>
              <button
                onClick={() => updateParam('category', '')}
                style={{
                  textAlign: 'left',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  background: !currentCategory ? 'var(--dkb-green-subtle)' : 'transparent',
                  color: !currentCategory ? 'var(--dkb-green-dark)' : 'var(--dkb-text)',
                  fontWeight: !currentCategory ? 700 : 500,
                }}
              >
                All Categories
              </button>
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <button
                  key={c.id}
                  onClick={() => updateParam('category', c.id)}
                  style={{
                    textAlign: 'left',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    background: currentCategory === c.id ? 'var(--dkb-green-subtle)' : 'transparent',
                    color: currentCategory === c.id ? 'var(--dkb-green-dark)' : 'var(--dkb-text)',
                    fontWeight: currentCategory === c.id ? 700 : 500,
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Concern Filter */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--dkb-muted)', marginBottom: '10px', fontWeight: 600 }}>
              Benefit / Concern
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => updateParam('concern', '')}
                style={{
                  textAlign: 'left',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  background: !currentConcern ? 'var(--dkb-green-subtle)' : 'transparent',
                  color: !currentConcern ? 'var(--dkb-green-dark)' : 'var(--dkb-text)',
                  fontWeight: !currentConcern ? 700 : 500,
                }}
              >
                All Concerns
              </button>
              {CONCERNS.map((con) => (
                <button
                  key={con}
                  onClick={() => updateParam('concern', con)}
                  style={{
                    textAlign: 'left',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    background: currentConcern === con ? 'var(--dkb-green-subtle)' : 'transparent',
                    color: currentConcern === con ? 'var(--dkb-green-dark)' : 'var(--dkb-text)',
                    fontWeight: currentConcern === con ? 700 : 500,
                  }}
                >
                  {con}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid & Top Sort Bar */}
        <div>
          {/* Dynamic Luxury Brand Banner */}
          <div className="shop-brand-banner">
            <img
              src={banner.img}
              alt={banner.title}
              className="shop-brand-banner-img"
            />
            <div className="shop-brand-banner-overlay">
              <span className="shop-brand-banner-eyebrow">{banner.eyebrow}</span>
              <h2 className="shop-brand-banner-title">{banner.title}</h2>
              <p className="shop-brand-banner-desc">{banner.desc}</p>
            </div>
          </div>

          <div
            style={{
              background: 'var(--dkb-white)',
              border: '1px solid var(--dkb-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '13px', color: 'var(--dkb-muted)' }}>
              Showing <b>{filteredProducts.length}</b> items
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label htmlFor="sort-select" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--dkb-green-dark)', fontWeight: 600 }}>
                Sort By:
              </label>
              <select
                id="sort-select"
                value={currentSort}
                onChange={(e) => updateParam('sort', e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--dkb-border)',
                  background: 'var(--dkb-ivory)',
                  fontSize: '13px',
                  color: 'var(--dkb-text)',
                }}
              >
                <option value="featured">Featured Items</option>
                <option value="latest">New Arrivals First</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Product Name (A–Z)</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--dkb-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--dkb-border)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--dkb-green-dark)', marginBottom: '8px' }}>
                No Products Match Your Criteria
              </h3>
              <p style={{ color: 'var(--dkb-muted)', marginBottom: '20px', fontSize: '14px' }}>
                Try resetting your filters or search keywords.
              </p>
              <button className="btn btn-outline btn-sm" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-3">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
