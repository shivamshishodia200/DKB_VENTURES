import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductArt from '../components/ProductArt'
import { useCart } from '../context/CartContext'
import { inr } from '../data/products'

export function Summary() {
  const { subtotal, discountAmt, shipping, total, coupon, applyCoupon } = useCart()
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState(null)
  return (
    <div className="summary">
      <h3>Order Summary</h3>
      <form className="coupon" onSubmit={(e) => { e.preventDefault(); if (code) setMsg(applyCoupon(code)) }}>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code (try WELCOME10)" aria-label="Coupon code" />
        <button className="btn btn-outline">Apply</button>
      </form>
      {msg && <p className={msg.ok ? 'ok' : 'err'}>{msg.msg}</p>}
      <div className="row"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
      {discountAmt > 0 && <div className="row ok"><span>Discount ({coupon.code})</span><span>− {inr(discountAmt)}</span></div>}
      <div className="row"><span>Shipping</span><span>{shipping ? inr(shipping) : 'Free'}</span></div>
      <div className="row total"><span>Total</span><span>{inr(total)}</span></div>
    </div>
  )
}

export default function Cart() {
  const { lines, setQty, remove } = useCart()
  if (!lines.length)
    return (
      <div className="container section center">
        <h1 className="h2">Your bag is empty</h1>
        <p className="muted">Discover something beautiful for your skin.</p>
        <Link to="/shop" className="btn">Continue Shopping</Link>
      </div>
    )
  return (
    <div className="container section">
      <div className="section-head"><h1 className="h2">Shopping Bag</h1></div>
      <div className="cart-grid">
        <div>
          {lines.map(({ id, qty, product: p }) => (
            <div className="line big" key={id}>
              <Link to={`/product/${id}`} className="thumb"><ProductArt product={p} id={id} tone={p.tone} shape={p.shape} alt={p.name} /></Link>
              <div className="line-info">
                <b>{p.name}</b><span className="muted">{p.size} · {inr(p.price)}</span>
                <div className="qty">
                  <button onClick={() => setQty(id, qty - 1)}>−</button><span>{qty}</span><button onClick={() => setQty(id, qty + 1)}>+</button>
                </div>
              </div>
              <div className="line-price">{inr(p.price * qty)}<button className="link" onClick={() => remove(id)}>Remove</button></div>
            </div>
          ))}
        </div>
        <div>
          <Summary />
          <Link to="/checkout" className="btn full">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  )
}
