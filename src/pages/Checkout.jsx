import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Summary } from './Cart'
import { inr } from '../data/products'

export default function Checkout() {
  const { lines, total, clear } = useCart()
  const [done, setDone] = useState(null)
  const [pay, setPay] = useState('cod')

  if (done)
    return (
      <div className="container section center">
        <span className="eyebrow">Thank you</span>
        <h1 className="h2">Your order is confirmed ✦</h1>
        <p>Order <b>{done.id}</b> · {inr(done.total)}</p>
        <p className="muted">A confirmation will be sent to {done.email}.</p>
        <Link to="/shop" className="btn">Continue Shopping</Link>
      </div>
    )

  if (!lines.length)
    return <div className="container section center"><h1 className="h2">Nothing to checkout</h1><Link to="/shop" className="btn">Shop now</Link></div>

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    // TODO: connect a real payment gateway (Razorpay / Stripe) and backend here.
    setDone({ id: 'KEMY-' + Date.now().toString().slice(-7), total, email: f.get('email') })
    clear()
  }

  return (
    <div className="container section">
      <div className="section-head"><h1 className="h2">Checkout</h1></div>
      <form className="cart-grid" onSubmit={submit}>
        <div className="form">
          <h3>Contact</h3>
          <input name="email" type="email" required placeholder="Email" />
          <input name="phone" type="tel" required placeholder="Phone number" pattern="[0-9+ ]{10,14}" />
          <h3>Shipping address</h3>
          <div className="two">
            <input name="first" required placeholder="First name" />
            <input name="last" required placeholder="Last name" />
          </div>
          <input name="address" required placeholder="Address" />
          <div className="two">
            <input name="city" required placeholder="City" />
            <input name="pin" required placeholder="PIN code" pattern="[0-9]{6}" />
          </div>
          <input name="state" required placeholder="State" />
          <h3>Payment</h3>
          {[['cod', 'Cash on Delivery'], ['upi', 'UPI'], ['card', 'Credit / Debit Card']].map(([k, l]) => (
            <label key={k} className={'radio' + (pay === k ? ' on' : '')}>
              <input type="radio" name="pay" checked={pay === k} onChange={() => setPay(k)} /> {l}
            </label>
          ))}
          <p className="muted small">Demo checkout — no real payment is taken.</p>
        </div>
        <div>
          <Summary />
          <button className="btn full">Place Order · {inr(total)}</button>
        </div>
      </form>
    </div>
  )
}
