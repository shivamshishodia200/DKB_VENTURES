import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products'

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

const KEY = 'kemy-cart-v1'
export const FREE_SHIPPING_AT = 1999
export const SHIPPING_FEE = 99

const COUPONS = {
  WELCOME10: { label: '10% off', type: 'pct', value: 10 },
  KEMY200: { label: '₹200 off (min ₹1499)', type: 'flat', value: 200, min: 1499 },
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
  })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [coupon, setCoupon] = useState(null)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* ignore */ }
  }, [items])

  const add = (id, qty = 1) => {
    setItems((cur) => {
      const found = cur.find((i) => i.id === id)
      return found ? cur.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)) : [...cur, { id, qty }]
    })
    setDrawerOpen(true)
  }
  const setQty = (id, qty) =>
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty } : i))))
  const remove = (id) => setItems((cur) => cur.filter((i) => i.id !== id))
  const clear = () => { setItems([]); setCoupon(null) }

  const applyCoupon = (code) => {
    const c = COUPONS[code.trim().toUpperCase()]
    if (!c) return { ok: false, msg: 'Invalid coupon code' }
    setCoupon({ code: code.trim().toUpperCase(), ...c })
    return { ok: true, msg: `${c.label} applied` }
  }

  const totals = useMemo(() => {
    const lines = items
      .map((i) => ({ ...i, product: getProduct(i.id) }))
      .filter((l) => l.product)
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const subtotal = lines.reduce((s, l) => s + l.qty * l.product.price, 0)
    let discountAmt = 0
    if (coupon && (!coupon.min || subtotal >= coupon.min)) {
      discountAmt = coupon.type === 'pct' ? Math.round((subtotal * coupon.value) / 100) : coupon.value
    }
    const shipping = subtotal === 0 || subtotal - discountAmt >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE
    return { lines, count, subtotal, discountAmt, shipping, total: Math.max(0, subtotal - discountAmt + shipping) }
  }, [items, coupon])

  return (
    <CartContext.Provider
      value={{ ...totals, add, setQty, remove, clear, coupon, applyCoupon, drawerOpen, setDrawerOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}
