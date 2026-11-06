import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProductBySlug } from '../data/products'

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

const STORAGE_KEY = 'dkb-cart-v1'
export const FREE_SHIPPING_THRESHOLD = 1499
export const STANDARD_SHIPPING_FEE = 79

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore write errors (e.g. private browsing)
    }
  }, [items])

  /**
   * Add item to bag
   * @param {Object} product - Product object
   * @param {number} qty - Quantity
   * @param {Object} variant - Optional variant { id, size, price }
   */
  const add = (product, qty = 1, variant = null) => {
    const pId = product.id || product.slug
    const vId = variant?.id || 'standard'
    const vSize = variant?.size || product.size || ''
    const vPrice = variant?.price !== undefined ? variant.price : product.price || 0
    const pImage = product.image || variant?.image || ''

    setItems((current) => {
      const existingIndex = current.findIndex((i) => i.id === pId && i.variantId === vId)
      if (existingIndex > -1) {
        return current.map((item, index) =>
          index === existingIndex ? { ...item, qty: item.qty + qty, image: item.image || pImage } : item
        )
      }
      return [
        ...current,
        {
          id: pId,
          slug: product.slug || pId,
          name: product.name,
          brandName: product.brandName,
          brandId: product.brandId,
          image: pImage,
          variantId: vId,
          size: vSize,
          price: vPrice,
          pricingMode: product.pricingMode,
          tone: product.tone || '#063B23',
          shape: product.shape || 'jar',
          qty,
        },
      ]
    })
    setDrawerOpen(true)
  }

  const setQty = (id, variantId, newQty) => {
    setItems((current) => {
      if (newQty <= 0) {
        return current.filter((i) => !(i.id === id && i.variantId === variantId))
      }
      return current.map((i) =>
        i.id === id && i.variantId === variantId ? { ...i, qty: newQty } : i
      )
    })
  }

  const remove = (id, variantId) => {
    setItems((current) => current.filter((i) => !(i.id === id && i.variantId === variantId)))
  }

  const clear = () => {
    setItems([])
  }

  const totals = useMemo(() => {
    const lines = items.map((i) => {
      const fullProduct = getProductBySlug(i.slug || i.id)
      const resolvedImage = i.image || fullProduct?.image || ''
      return {
        ...i,
        image: resolvedImage,
        product: fullProduct || i,
      }
    })

    const count = lines.reduce((acc, line) => acc + line.qty, 0)
    const subtotal = lines.reduce((acc, line) => {
      const itemPrice = line.price || 0
      return acc + itemPrice * line.qty
    }, 0)

    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
    const shipping = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE
    const total = subtotal + shipping

    return {
      lines,
      count,
      subtotal,
      shipping,
      total,
      isFreeShipping,
      amountNeededForFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    }
  }, [items])

  return (
    <CartContext.Provider
      value={{
        ...totals,
        add,
        setQty,
        remove,
        clear,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
