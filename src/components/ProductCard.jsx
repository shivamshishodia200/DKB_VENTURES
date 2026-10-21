import { Link } from 'react-router-dom'
import ProductArt from './ProductArt'
import { useCart } from '../context/CartContext'
import { discount, inr } from '../data/products'

export default function ProductCard({ p }) {
  const { add } = useCart()
  return (
    <article className="card">
      <Link to={`/product/${p.id}`} className="card-media" aria-label={p.name}>
        <ProductArt product={p} id={p.id} tone={p.tone} shape={p.shape} alt={p.name} />
        <div className="badges">
          {p.bestseller && <span className="badge gold">✦ Bestseller</span>}
          {p.isNew && <span className="badge dark">New</span>}
          {p.mrp > p.price && <span className="badge save">{discount(p)}% Off</span>}
        </div>
        <div className="card-media-glow" />
      </Link>
      <div className="card-body">
        <div className="card-meta">
          <span className="card-concern">{p.concern} · {p.size}</span>
          {p.rating && (
            <span className="rating" title={`${p.rating} out of 5 stars`}>
              <span className="stars">★★★★★</span>
              <span className="score">{p.rating}</span>
            </span>
          )}
        </div>
        <h3 className="card-title">
          <Link to={`/product/${p.id}`}>{p.name}</Link>
        </h3>
        <p className="card-desc">{p.short}</p>
        <div className="price-row">
          <strong className="current-price">{inr(p.price)}</strong>
          {p.mrp > p.price && <s className="mrp-price">{inr(p.mrp)}</s>}
          {p.mrp > p.price && <span className="save-chip">Save {inr(p.mrp - p.price)}</span>}
        </div>
        <button className="btn btn-card-add full" onClick={() => add(p.id)} aria-label={`Add ${p.name} to bag`}>
          <span>Add to Bag</span>
          <span className="btn-plus">+</span>
        </button>
      </div>
    </article>
  )
}
