import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useCart, FREE_SHIPPING_AT } from '../context/CartContext'
import { CATEGORIES, PRODUCTS, inr } from '../data/products'
import ProductArt from './ProductArt'

const PROMOS = [
  'Complimentary shipping on orders above ₹1,999',
  'Use code WELCOME10 for 10% off your first order',
  'Free luxury sample with every order',
]

function Announcement() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % PROMOS.length), 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="announce" aria-live="polite">
      <span className="announce-sparkle">✦</span>
      <span className="announce-text">{PROMOS[i]}</span>
      <span className="announce-sparkle">✦</span>
    </div>
  )
}

function Header() {
  const { count, setDrawerOpen } = useCart()
  const [menu, setMenu] = useState(false)
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    setMenu(false)
  }, [pathname])
  const search = (e) => {
    e.preventDefault()
    nav(`/shop?q=${encodeURIComponent(q)}`)
  }
  return (
    <header className="header">
      <Announcement />
      <div className="container header-row">
        <button className="icon-btn menu-btn" aria-label="Menu" onClick={() => setMenu(!menu)}>☰</button>
        <Link to="/" className="logo" aria-label="KEMY Luxury Skincare — home">
          <img src="/kemy-logo-crop.png" alt="KEMY Luxury Skincare" />
        </Link>
        <nav className={'nav' + (menu ? ' open' : '')}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop All</NavLink>
          <NavLink to="/shop?category=serums">Serums</NavLink>
          <NavLink to="/shop?category=sets">Gift Sets</NavLink>
          <NavLink to="/shop?filter=new">New Arrivals</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </nav>
        <div className="header-actions">
          <form onSubmit={search} className="search" role="search">
            <span className="search-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search rituals..." aria-label="Search products" />
          </form>
          <button className="bag-btn" onClick={() => setDrawerOpen(true)} aria-label={`Bag, ${count} items`}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="bag-label">Bag</span>
            <span className="count">{count}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, subtotal, setQty, remove } = useCart()
  const nav = useNavigate()
  const left = Math.max(0, FREE_SHIPPING_AT - subtotal)
  const go = (to) => { setDrawerOpen(false); nav(to) }
  return (
    <>
      <div className={'scrim' + (drawerOpen ? ' show' : '')} onClick={() => setDrawerOpen(false)} />
      <aside className={'drawer' + (drawerOpen ? ' open' : '')} aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <h3>Your Bag</h3>
          <button className="icon-btn" onClick={() => setDrawerOpen(false)} aria-label="Close">✕</button>
        </div>
        {lines.length > 0 && (
          <p className="ship-note">
            {left > 0 ? <>Add <b>{inr(left)}</b> more for free shipping</> : <>You've unlocked <b>free shipping</b> ✦</>}
            <span className="bar"><i style={{ width: Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100) + '%' }} /></span>
          </p>
        )}
        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="empty">
              <p>Your bag is empty.</p>
              <button className="btn" onClick={() => go('/shop')}>Start Shopping</button>
            </div>
          ) : lines.map(({ id, qty, product: p }) => (
            <div className="line" key={id}>
              <div className="thumb"><ProductArt product={p} id={id} tone={p.tone} shape={p.shape} alt={p.name} /></div>
              <div className="line-info">
                <b>{p.name}</b>
                <span className="muted">{p.size}</span>
                <div className="qty">
                  <button onClick={() => setQty(id, qty - 1)} aria-label="Decrease">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(id, qty + 1)} aria-label="Increase">+</button>
                </div>
              </div>
              <div className="line-price">
                {inr(p.price * qty)}
                <button className="link" onClick={() => remove(id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        {lines.length > 0 && (
          <div className="drawer-foot">
            <div className="row"><span>Subtotal</span><b>{inr(subtotal)}</b></div>
            <button className="btn full" onClick={() => go('/checkout')}>Checkout</button>
            <button className="btn btn-outline full" onClick={() => go('/cart')}>View Bag</button>
          </div>
        )}
      </aside>
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="/kemy-logo-crop.png" alt="KEMY" className="footer-logo" />
          <p className="muted">Science-led, gold-standard skincare crafted to reveal your most radiant skin.</p>
        </div>
        <div>
          <h4>Shop</h4>
          {CATEGORIES.map((c) => <Link key={c.id} to={`/shop?category=${c.id}`}>{c.name}</Link>)}
        </div>
        <div>
          <h4>Help</h4>
          <Link to="/about">About Us</Link>
          <Link to="/policy/shipping">Shipping Policy</Link>
          <Link to="/policy/returns">Return Policy</Link>
          <Link to="/policy/privacy">Privacy Policy</Link>
          <Link to="/policy/terms">Terms &amp; Conditions</Link>
        </div>
        <div>
          <h4>Stay in touch</h4>
          <p className="muted">Email: care@kemyskin.com<br />Support: Mon–Sat, 10am–7pm</p>
          <form className="news" onSubmit={(e) => { e.preventDefault(); e.target.reset(); alert('Thank you for subscribing!') }}>
            <input type="email" required placeholder="Your email" aria-label="Email" />
            <button className="btn">Join</button>
          </form>
        </div>
      </div>
      <div className="copy">© {new Date().getFullYear()} KEMY Luxury Skincare. All rights reserved.</div>
    </footer>
  )
}

export default function Layout() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <CartDrawer />
    </>
  )
}
