import { Link, useNavigate } from 'react-router-dom'
import { useCart, FREE_SHIPPING_THRESHOLD } from '../context/CartContext'
import { inr } from '../data/products'
import { COMPANY_INFO } from '../data/companyInfo'
import { useSEO } from '../hooks/useSEO'

export default function Cart() {
  useSEO('Shopping Bag', 'Review and modify the beauty, wellness, and tea products in your bag.')
  const { lines, setQty, remove, subtotal, shipping, total, isFreeShipping, amountNeededForFreeShipping } = useCart()
  const navigate = useNavigate()

  if (lines.length === 0) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--dkb-green-dark)', marginBottom: '12px' }}>
          Your Shopping Bag is Empty
        </h1>
        <p style={{ color: 'var(--dkb-muted)', marginBottom: '24px' }}>
          Explore our portfolio of beauty, skincare, Ayurvedic essentials, and fine tea blends.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Explore All Products
        </Link>
      </div>
    )
  }

  const handleWhatsAppCheckout = () => {
    let orderText = `Hello DKB Ventures, I would like to order the following items:\n\n`
    lines.forEach((line, index) => {
      orderText += `${index + 1}. ${line.name} (${line.size}) x ${line.qty} = ${inr((line.price || 0) * line.qty)}\n`
    })
    orderText += `\nSubtotal: ${inr(subtotal)}`
    orderText += `\nShipping: ${shipping === 0 ? 'FREE' : inr(shipping)}`
    orderText += `\nEstimated Total: ${inr(total)}\n\nPlease confirm availability and payment details.`

    const encoded = encodeURIComponent(orderText)
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="container section">
      <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '32px' }}>
        <span className="eyebrow">Review Your Selection</span>
        <h1 className="section-title" style={{ fontSize: '32px', marginBottom: 0 }}>
          Shopping Bag ({lines.length} items)
        </h1>
      </div>

      {/* Free Shipping Alert */}
      <div
        style={{
          background: isFreeShipping ? '#eef7f1' : 'var(--dkb-gold-subtle)',
          border: `1px solid ${isFreeShipping ? '#7ec295' : 'var(--dkb-gold)'}`,
          color: isFreeShipping ? '#1a562f' : 'var(--dkb-gold-dark)',
          padding: '14px 20px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '13.5px',
          fontWeight: 600,
        }}
      >
        <span>✦</span>
        <span>
          {isFreeShipping
            ? 'Congratulations! You have unlocked Free Shipping across India.'
            : `Add ${inr(amountNeededForFreeShipping)} more to unlock Free Shipping across India (Threshold: ${inr(FREE_SHIPPING_THRESHOLD)}).`}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '40px', alignItems: 'flex-start' }} className="cart-grid-layout">
        {/* Cart Items List */}
        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
          {lines.map((line) => (
            <div
              key={`${line.id}-${line.variantId}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '20px',
                padding: '20px 0',
                borderBottom: '1px solid var(--dkb-border-light)',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--dkb-ivory)',
                  border: '1px solid var(--dkb-border)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {line.image || line.product?.image ? (
                  <img
                    src={line.image || line.product?.image}
                    alt={line.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                ) : (
                  <span style={{ fontWeight: 700, fontSize: '11px', color: 'var(--dkb-green-dark)', padding: '4px', textAlign: 'center' }}>
                    {line.brandName?.split(' ')[0] || 'DKB'}
                  </span>
                )}
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--dkb-gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {line.brandName}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--dkb-green-dark)', margin: '2px 0 4px' }}>
                  <Link to={`/product/${line.slug}`}>{line.name}</Link>
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--dkb-muted)', marginBottom: '8px' }}>
                  Pack / Variant: <b>{line.size}</b> · Unit: {inr(line.price)}
                </div>

                <div className="qty-counter">
                  <button onClick={() => setQty(line.id, line.variantId, line.qty - 1)}>−</button>
                  <span>{line.qty}</span>
                  <button onClick={() => setQty(line.id, line.variantId, line.qty + 1)}>+</button>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: '16px', color: 'var(--dkb-green-dark)', display: 'block' }}>
                  {inr((line.price || 0) * line.qty)}
                </strong>
                <button
                  onClick={() => remove(line.id, line.variantId)}
                  style={{ fontSize: '12px', color: 'var(--dkb-error)', textDecoration: 'underline', marginTop: '10px' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Link to="/shop" className="btn btn-outline btn-sm">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--dkb-green-dark)', marginBottom: '18px', borderBottom: '1px solid var(--dkb-border-light)', paddingBottom: '10px' }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
            <span>Subtotal</span>
            <strong>{inr(subtotal)}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
            <span>Estimated Shipping</span>
            <span>{shipping === 0 ? <b style={{ color: 'var(--dkb-success)' }}>FREE</b> : inr(shipping)}</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '2px solid var(--dkb-border)',
              marginBottom: '24px',
              fontSize: '18px',
            }}
          >
            <strong style={{ color: 'var(--dkb-green-dark)' }}>Total Amount</strong>
            <strong style={{ color: 'var(--dkb-green-dark)' }}>{inr(total)}</strong>
          </div>

          <button className="btn btn-primary btn-full" style={{ marginBottom: '12px' }} onClick={() => navigate('/checkout')}>
            Proceed to Checkout →
          </button>

          <button className="btn btn-whatsapp btn-full btn-sm" onClick={handleWhatsAppCheckout}>
            <span>Order via WhatsApp Direct</span>
            <span>💬</span>
          </button>

          <div style={{ marginTop: '20px', fontSize: '12px', color: 'var(--dkb-muted)', lineHeight: 1.5, textAlign: 'center' }}>
            GST Invoicing and pan-India insured dispatch from Delhi.
          </div>
        </div>
      </div>
    </div>
  )
}
