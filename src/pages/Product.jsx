import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductArt from '../components/ProductArt'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { PRODUCTS, discount, getProduct, inr } from '../data/products'

export default function Product() {
  const { id } = useParams()
  const p = getProduct(id)
  const { add } = useCart()
  const nav = useNavigate()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')
  if (!p) return <div className="container section center"><h2>Product not found</h2><Link to="/shop" className="btn">Back to shop</Link></div>

  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)
  const tabs = { description: p.description, ingredients: p.ingredients, how: p.how }

  return (
    <div className="container section">
      <nav className="crumbs"><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{p.name}</span></nav>
      <div className="pdp">
        <div className="pdp-media"><ProductArt product={p} id={p.id} tone={p.tone} shape={p.shape} alt={p.name} className="pdp-art-main" /></div>
        <div className="pdp-info">
          <span className="eyebrow">{p.concern} · {p.size}</span>
          <h1>{p.name}</h1>
          <p className="muted lead">{p.short}</p>
          <div className="price-row big">
            <strong>{inr(p.price)}</strong>
            {p.mrp > p.price && <><s>{inr(p.mrp)}</s><span className="badge">{discount(p)}% off</span></>}
          </div>
          <span className="muted small">Inclusive of all taxes</span>
          <div className="buy">
            <div className="qty lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
            </div>
            <button className="btn grow" onClick={() => add(p.id, qty)}>Add to Bag</button>
          </div>
          <button className="btn btn-outline full" onClick={() => { add(p.id, qty); nav('/checkout') }}>Buy Now</button>
          <ul className="trust">
            <li>✦ Free shipping above ₹1,999</li>
            <li>✦ 7-day easy returns</li>
            <li>✦ Dermatologist tested</li>
          </ul>
          <div className="tabs">
            {[['description', 'Description'], ['ingredients', 'Key Ingredients'], ['how', 'How to Use']].map(([k, l]) => (
              <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>
          <p className="tab-body">{tabs[tab]}</p>
        </div>
      </div>
      {related.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>You May Also Like</h2></div>
          <div className="grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </div>
  )
}
