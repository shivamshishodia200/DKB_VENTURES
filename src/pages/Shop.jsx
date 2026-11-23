import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { BRANDS, CATEGORIES, CONCERNS, PRODUCTS } from '../data/products'
import { useSEO } from '../hooks/useSEO'

function FilterSections({ currentBrand, currentCategory, currentConcern, searchQuery, updateParam, clearAllFilters, onSelect }) {
  const handleBrandClick = (id) => {
    updateParam('brand', id)
    onSelect?.()
  }

  const handleCategoryClick = (id) => {
    updateParam('category', id)
    onSelect?.()
  }

  const handleConcernClick = (c) => {
    updateParam('concern', c)
    onSelect?.()
  }

  return (
    <>
      <div className="shop-filter-header-row">
        <h3 className="shop-filter-heading">Filters</h3>
        {(currentBrand || currentCategory || currentConcern || searchQuery) && (
          <button
            onClick={clearAllFilters}
            className="shop-filter-reset-btn"
          >
            Reset All
          </button>
        )}
      </div>

      {/* 1. Brand Filter */}
      <div className="shop-filter-group">
        <h4 className="shop-filter-subheading">Portfolio Brand</h4>
        <div className="shop-filter-options">
          <button
            onClick={() => handleBrandClick('')}
            className={`shop-filter-option ${!currentBrand ? 'active' : ''}`}
          >
            All Brands
          </button>
          {BRANDS.map((b) => (
            <button
              key={b.id}
              onClick={() => handleBrandClick(b.id)}
              className={`shop-filter-option ${currentBrand === b.id ? 'active' : ''}`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Category Filter */}
      <div className="shop-filter-group">
        <h4 className="shop-filter-subheading">Category</h4>
        <div className="shop-filter-options shop-filter-options-scroll">
          <button
            onClick={() => handleCategoryClick('')}
            className={`shop-filter-option ${!currentCategory ? 'active' : ''}`}
          >
            All Categories
          </button>
          {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategoryClick(c.id)}
              className={`shop-filter-option ${currentCategory === c.id ? 'active' : ''}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Concern Filter */}
      <div className="shop-filter-group">
        <h4 className="shop-filter-subheading">Benefit / Concern</h4>
        <div className="shop-filter-options">
          <button
            onClick={() => handleConcernClick('')}
            className={`shop-filter-option ${!currentConcern ? 'active' : ''}`}
          >
            All Concerns
          </button>
          {CONCERNS.map((con) => (
            <button
              key={con}
              onClick={() => handleConcernClick(con)}
              className={`shop-filter-option ${currentConcern === con ? 'active' : ''}`}
            >
              {con}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default function Shop() {
  useSEO(
    'Catalogue & Store — Luxury Skincare & Divya Tea',
    'Browse the full multi-brand catalogue of DKB Ventures: COTX Luxury Skincare and Divya Tea with wholesale & retail availability.'
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  const currentBrand = searchParams.get('brand') || ''
  const currentCategory = searchParams.get('category') || ''
  const currentConcern = searchParams.get('concern') || ''
  const searchQuery = (searchParams.get('q') || '').toLowerCase().trim()
  const currentSort = searchParams.get('sort') || 'featured'

  const activeFilterCount = (currentBrand ? 1 : 0) + (currentCategory ? 1 : 0) + (currentConcern ? 1 : 0) + (searchQuery ? 1 : 0)

  // Lock body scroll and handle Escape key for filter drawer
  useEffect(() => {
    if (!filterDrawerOpen) return
    document.body.classList.add('modal-open')
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFilterDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [filterDrawerOpen])

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
      if (currentBrand) {
        const isTea = currentBrand === 'divya-tea' || currentBrand === 'cotx-tea' || currentBrand === 'cotx-fine-tea'
        if (isTea) {
          if (p.brandId !== 'divya-tea' && p.brandId !== 'cotx-tea') return false
        } else if (p.brandId !== currentBrand) {
          return false
        }
      }
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
        img: '/images/cotx-skincare-showcase.webp',
        eyebrow: '✦ COTX Luxury Skincare',
        title: 'Premium Skincare & Salon Regimens',
        desc: 'Sulfate-free cleansers, targeted active serums, skin creams, and 6-step bridal salon facial kits.',
      }
    }
    if (currentBrand === 'divya-tea' || currentBrand === 'cotx-tea' || currentBrand === 'cotx-fine-tea') {
      return {
        img: '/images/divya-tea-showcase.webp',
        eyebrow: '☕ Divya Tea',
        title: 'Estate Tea & Commercial Bulk Cartons',
        desc: 'Assam high-grown tea, authentic spiced royal chai, and commercial catering cartons (5 kg & 25 kg).',
      }
    }
    return {
      img: '/images/dkb-portfolio-hero.webp',
      eyebrow: '✦ DKB Ventures Portfolio',
      title: 'Curated Beauty, Skincare & Tea Portfolio',
      desc: 'Genuine direct supply for retail customers, beauty salons, retail stores, and wholesale buyers across India.',
    }
  }

  const banner = getBannerData()

  return (
    <div className="container section shop-page-container">
      {/* Page Title & Breadcrumb */}
      <div className="section-title-wrap shop-page-title-wrap">
        <span className="eyebrow">DKB Ventures Portfolio</span>
        <h1 className="section-title shop-page-heading">
          {getPageTitle()}
        </h1>
        <p className="section-subtitle">
          Showing {filteredProducts.length} verified products across our 8 portfolio categories.
        </p>
      </div>

      <div className="shop-layout-grid">
        {/* Desktop Filters Sidebar */}
        <aside className="shop-filters-sidebar">
          <FilterSections
            currentBrand={currentBrand}
            currentCategory={currentCategory}
            currentConcern={currentConcern}
            searchQuery={searchQuery}
            updateParam={updateParam}
            clearAllFilters={clearAllFilters}
          />
        </aside>

        {/* Mobile Filters Drawer & Scrim */}
        <div
          className={`shop-filter-scrim ${filterDrawerOpen ? 'open' : ''}`}
          onClick={() => setFilterDrawerOpen(false)}
          aria-hidden="true"
        />
        <aside
          className={`shop-filter-drawer ${filterDrawerOpen ? 'open' : ''}`}
          aria-label="Filter products drawer"
          aria-hidden={!filterDrawerOpen}
        >
          <div className="shop-drawer-header">
            <h3>Filters ({filteredProducts.length})</h3>
            <button
              className="shop-drawer-close-btn"
              onClick={() => setFilterDrawerOpen(false)}
              aria-label="Close filter drawer"
            >
              ✕
            </button>
          </div>
          <div className="shop-drawer-body">
            <FilterSections
              currentBrand={currentBrand}
              currentCategory={currentCategory}
              currentConcern={currentConcern}
              searchQuery={searchQuery}
              updateParam={updateParam}
              clearAllFilters={clearAllFilters}
            />
          </div>
          <div className="shop-drawer-footer">
            <button
              className="btn btn-primary btn-full"
              onClick={() => setFilterDrawerOpen(false)}
            >
              View {filteredProducts.length} Results
            </button>
          </div>
        </aside>

        {/* Product Grid & Top Sort Bar */}
        <div className="shop-main-content">
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

          {/* Results Toolbar */}
          <div className="shop-toolbar">
            <div className="shop-toolbar-left">
              {/* Mobile Filter Toggle Button */}
              <button
                className="shop-mobile-filter-trigger"
                onClick={() => setFilterDrawerOpen(true)}
                aria-label="Open product filters"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="shop-filter-badge">{activeFilterCount}</span>
                )}
              </button>

              <span className="shop-results-count">
                Showing <b>{filteredProducts.length}</b> items
              </span>
            </div>

            <div className="shop-toolbar-right">
              <label htmlFor="sort-select" className="shop-sort-label">
                Sort By:
              </label>
              <select
                id="sort-select"
                value={currentSort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="shop-sort-select"
              >
                <option value="featured">Featured Items</option>
                <option value="latest">New Arrivals First</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Product Name (A–Z)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="shop-active-chips-bar">
              {currentBrand && (
                <button
                  className="shop-active-chip"
                  onClick={() => updateParam('brand', '')}
                  title="Remove brand filter"
                >
                  Brand: {BRANDS.find((b) => b.id === currentBrand)?.name || currentBrand} ✕
                </button>
              )}
              {currentCategory && (
                <button
                  className="shop-active-chip"
                  onClick={() => updateParam('category', '')}
                  title="Remove category filter"
                >
                  Category: {CATEGORIES.find((c) => c.id === currentCategory)?.name || currentCategory} ✕
                </button>
              )}
              {currentConcern && (
                <button
                  className="shop-active-chip"
                  onClick={() => updateParam('concern', '')}
                  title="Remove concern filter"
                >
                  Concern: {currentConcern} ✕
                </button>
              )}
              {searchQuery && (
                <button
                  className="shop-active-chip"
                  onClick={() => updateParam('q', '')}
                  title="Remove search filter"
                >
                  Search: "{searchQuery}" ✕
                </button>
              )}
              <button
                className="shop-clear-all-link"
                onClick={clearAllFilters}
              >
                Clear All
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="shop-empty-state">
              <h3 className="shop-empty-heading">
                No Products Match Your Criteria
              </h3>
              <p className="shop-empty-desc">
                Try resetting your filters or search keywords.
              </p>
              <button className="btn btn-outline btn-sm" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="shop-products-grid">
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
