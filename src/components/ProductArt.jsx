import { useState } from 'react'

const SHAPE_IMAGE_MAP = {
  dropper: '/products/gold-radiance-serum.jpg',
  jar: '/products/royal-silk-cream.jpg',
  pump: '/products/rice-water-toner.jpg',
  tube: '/products/eye-lift-cream.jpg',
  box: '/products/glow-ritual-set.jpg',
}

export default function ProductArt({
  product,
  id,
  src,
  shape = 'dropper',
  tone = '#d9a441',
  alt = 'KEMY Luxury Skincare',
  className = '',
}) {
  const [hasError, setHasError] = useState(false)
  const resolvedSrc =
    src ||
    product?.image ||
    (id ? `/products/${id}.jpg` : '') ||
    SHAPE_IMAGE_MAP[shape] ||
    '/products/gold-radiance-serum.jpg'

  return (
    <div className={`art-container ${className}`}>
      {!hasError ? (
        <img
          src={resolvedSrc}
          alt={product?.name || alt}
          className="art-image"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="art-fallback" style={{ background: tone }}>
          <span className="art-fallback-label">{product?.name || 'KEMY'}</span>
        </div>
      )}
      <div className="art-ambient-glow" />
    </div>
  )
}

