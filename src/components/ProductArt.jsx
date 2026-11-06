import { useState } from 'react'

export default function ProductArt({
  product,
  tone = '#063B23',
  shape = 'pump',
  alt = 'DKB Ventures Product',
  className = '',
}) {
  const [imgError, setImgError] = useState(false)

  // Determine image source
  const imageSrc = product?.image || (product?.shape === 'box' ? '/products/glow-ritual-set.jpg' : null)

  const getBrandAbbr = (brandId) => {
    switch (brandId) {
      case 'cotx':
        return 'COTX'
      case 'green-herbs':
        return 'GH'
      case 'divya-tea':
        return 'DIVYA'
      default:
        return 'DKB'
    }
  }

  const renderShapeIcon = (shapeType) => {
    switch (shapeType) {
      case 'dropper':
        return (
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="m14 7 3 3" />
            <path d="M5 19l6.5-6.5" />
            <path d="m16.5 4.5 3 3-2 2-3-3z" />
            <path d="m4.5 19.5 2-2" />
            <path d="M9 10l-4 4 1 1 4-4" />
          </svg>
        )
      case 'jar':
        return (
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="9" width="18" height="12" rx="3" />
            <path d="M5 5h14v4H5z" />
            <line x1="7" y1="5" x2="17" y2="5" />
          </svg>
        )
      case 'box':
        return (
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        )
      case 'pump':
      default:
        return (
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="6" y="10" width="12" height="12" rx="2" />
            <path d="M12 6v4" />
            <path d="M10 6h4" />
            <path d="M12 3v3" />
            <path d="M9 3h5" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
        )
    }
  }

  const brandAbbr = getBrandAbbr(product?.brandId)
  const resolvedTone = product?.tone || tone

  return (
    <div className={`product-art-container ${className}`}>
      {imageSrc && !imgError ? (
        <div className="product-image-wrapper">
          <img
            src={imageSrc}
            alt={alt}
            className="product-main-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div
          className="art-packaging-graphic"
          style={{
            background: `linear-gradient(145deg, ${resolvedTone} 0%, #022013 100%)`,
            border: '1px solid rgba(199, 160, 82, 0.4)',
          }}
        >
          <span className="art-brand-abbr">{brandAbbr}</span>
          <div className="art-icon-shape">{renderShapeIcon(product?.shape || shape)}</div>
        </div>
      )}
    </div>
  )
}
