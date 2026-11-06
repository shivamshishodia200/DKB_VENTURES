import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { inr } from '../data/products'
import { apiService } from '../services/api'
import { useSEO } from '../hooks/useSEO'

export default function Checkout() {
  useSEO('Checkout & Shipping Address', 'Complete your retail order with DKB Ventures for verified beauty and tea products.')
  const { lines, subtotal, shipping, total, clear } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Delhi',
    pincode: '',
    paymentMethod: 'cod',
    orderNotes: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  if (lines.length === 0) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--dkb-green-dark)', marginBottom: '12px' }}>
          Your Bag is Empty
        </h1>
        <p style={{ color: 'var(--dkb-muted)', marginBottom: '24px' }}>
          Add products to your cart before proceeding to checkout.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')

    // Basic PIN code validation (6 digits)
    const cleanPin = formData.pincode.replace(/\D/g, '')
    if (cleanPin.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code.')
      return
    }

    // Phone validation (10 digits)
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.')
      return
    }

    // Generate Order ID
    const orderId = 'DKB-' + Date.now().toString().slice(-7)

    // Save order through API Service (local fallback + remote sync)
    const orderRecord = {
      orderId,
      date: new Date().toISOString(),
      customer: formData,
      items: lines,
      subtotal,
      shipping,
      total,
      status: 'Confirmed',
    }

    apiService.submitOrder(orderRecord)

    clear()
    navigate(`/order-confirmation/${orderId}`)
  }

  return (
    <div className="container section">
      <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '32px' }}>
        <span className="eyebrow">Direct Dispatch Order</span>
        <h1 className="section-title" style={{ fontSize: '32px', marginBottom: 0 }}>
          Checkout & Shipping Address
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.8fr', gap: '48px', alignItems: 'flex-start' }} className="checkout-grid-layout">
        {/* Left: Customer Info Form */}
        <div className="form-card">
          {errorMsg && (
            <div style={{ background: '#fdf2f2', border: '1px solid #f8b4b4', color: '#9b1c1c', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '24px', fontSize: '13px' }}>
              {errorMsg}
            </div>
          )}

          {/* Section 1: Contact Details */}
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--dkb-green-dark)', marginBottom: '16px', borderBottom: '1px solid var(--dkb-border-light)', paddingBottom: '8px' }}>
            1. Contact Information
          </h2>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                Mobile Number (for delivery updates) <span className="req">*</span>
              </label>
              <input
                type="tel"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="10-digit mobile number"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Email Address <span className="req">*</span>
              </label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--dkb-green-dark)', marginTop: '20px', marginBottom: '16px', borderBottom: '1px solid var(--dkb-border-light)', paddingBottom: '8px' }}>
            2. Shipping Address
          </h2>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                First Name <span className="req">*</span>
              </label>
              <input
                type="text"
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                placeholder="First name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Last Name <span className="req">*</span>
              </label>
              <input
                type="text"
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Complete Street Address / House / Flat No. <span className="req">*</span>
            </label>
            <input
              type="text"
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Flat 301, Tower B, Budh Vihar Main Road"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                City <span className="req">*</span>
              </label>
              <input
                type="text"
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. New Delhi, Noida, Gurgaon"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                6-Digit PIN Code <span className="req">*</span>
              </label>
              <input
                type="text"
                required
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. 110086"
                maxLength={6}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              State / Union Territory <span className="req">*</span>
            </label>
            <input
              type="text"
              required
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Delhi, Uttar Pradesh, Haryana"
            />
          </div>

          {/* Section 3: Payment Options */}
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--dkb-green-dark)', marginTop: '20px', marginBottom: '16px', borderBottom: '1px solid var(--dkb-border-light)', paddingBottom: '8px' }}>
            3. Payment Method
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                border: `1.5px solid ${formData.paymentMethod === 'cod' ? 'var(--dkb-green)' : 'var(--dkb-border)'}`,
                borderRadius: 'var(--radius-sm)',
                background: formData.paymentMethod === 'cod' ? 'var(--dkb-green-subtle)' : 'var(--dkb-white)',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={handleChange}
              />
              <div>
                <b style={{ color: 'var(--dkb-green-dark)', fontSize: '14px' }}>Cash on Delivery (COD) / Pay upon Delivery</b>
                <p style={{ fontSize: '12px', color: 'var(--dkb-muted)', margin: 0 }}>Pay with cash or UPI to delivery executive at your doorstep.</p>
              </div>
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                border: `1.5px solid ${formData.paymentMethod === 'upi_manual' ? 'var(--dkb-green)' : 'var(--dkb-border)'}`,
                borderRadius: 'var(--radius-sm)',
                background: formData.paymentMethod === 'upi_manual' ? 'var(--dkb-green-subtle)' : 'var(--dkb-white)',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="upi_manual"
                checked={formData.paymentMethod === 'upi_manual'}
                onChange={handleChange}
              />
              <div>
                <b style={{ color: 'var(--dkb-green-dark)', fontSize: '14px' }}>Direct UPI / Bank Transfer Confirmation</b>
                <p style={{ fontSize: '12px', color: 'var(--dkb-muted)', margin: 0 }}>Pay via official DKB Ventures business UPI / account after order review.</p>
              </div>
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Confirm Order · {inr(total)} →
          </button>
        </div>

        {/* Right: Order Summary Preview */}
        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-md)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--dkb-green-dark)', marginBottom: '16px', borderBottom: '1px solid var(--dkb-border-light)', paddingBottom: '8px' }}>
            Order Items ({lines.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {lines.map((item) => (
              <div key={`${item.id}-${item.variantId}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--dkb-green-dark)' }}>{item.name}</span>
                  <div style={{ fontSize: '11px', color: 'var(--dkb-muted)' }}>
                    {item.size} × {item.qty}
                  </div>
                </div>
                <strong>{inr((item.price || 0) * item.qty)}</strong>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--dkb-border-light)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span>{inr(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping Fee</span>
              <span>{shipping === 0 ? <b style={{ color: 'var(--dkb-success)' }}>FREE</b> : inr(shipping)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 700, borderTop: '1px dashed var(--dkb-border)', paddingTop: '12px', marginTop: '4px', color: 'var(--dkb-green-dark)' }}>
              <span>Total Payable</span>
              <span>{inr(total)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
