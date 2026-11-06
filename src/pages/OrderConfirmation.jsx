import { useParams, Link } from 'react-router-dom'
import { inr } from '../data/products'
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyInfo'
import { useSEO } from '../hooks/useSEO'

export default function OrderConfirmation() {
  const { orderId } = useParams()
  useSEO(`Order Confirmed #${orderId}`, 'Thank you for your order with DKB Ventures.')

  // Retrieve stored order if available
  let orderData = null
  try {
    const raw = localStorage.getItem('dkb_latest_order')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.orderId === orderId) {
        orderData = parsed
      }
    }
  } catch {
    // Ignore
  }

  const orderSupportWhatsApp = getWhatsAppUrl(
    `Hello DKB Ventures, I have placed an order with Order ID #${orderId}. Please share dispatch and tracking updates.`
  )

  return (
    <div className="container section" style={{ maxWidth: '780px' }}>
      <div
        style={{
          background: 'var(--dkb-white)',
          border: '1px solid var(--dkb-border)',
          borderRadius: 'var(--radius-md)',
          padding: '48px 36px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--dkb-green-subtle)',
            color: 'var(--dkb-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            margin: '0 auto 20px',
            border: '2px solid var(--dkb-gold)',
          }}
        >
          ✓
        </div>

        <span className="eyebrow">Order Placed Successfully</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--dkb-green-dark)', marginBottom: '8px' }}>
          Thank You for Sourcing from DKB Ventures
        </h1>
        <p style={{ color: 'var(--dkb-text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
          Order Reference: <b style={{ color: 'var(--dkb-green-dark)', fontSize: '18px' }}>#{orderId}</b>
        </p>

        <div
          style={{
            background: 'var(--dkb-ivory)',
            border: '1px solid var(--dkb-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '24px',
            textAlign: 'left',
            marginBottom: '32px',
          }}
        >
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--dkb-gold-dark)', fontWeight: 700, marginBottom: '14px' }}>
            Dispatch & Delivery Details
          </h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--dkb-text)' }}>
            <li><b>Dispatch Hub:</b> M-2/18, Main Market Road, Budh Vihar, Phase-1, Delhi – 110086</li>
            <li><b>Estimated Delivery:</b> 2–4 business days (Delhi NCR) | 4–7 business days (Pan-India)</li>
            <li><b>Order Status:</b> <span style={{ color: 'var(--dkb-success)', fontWeight: 700 }}>Confirmed & Queued for Packing</span></li>
            {orderData?.total && <li><b>Total Payable:</b> {inr(orderData.total)}</li>}
            {orderData?.customer?.phone && <li><b>Updates will be sent to:</b> {orderData.customer.phone}</li>}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={orderSupportWhatsApp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <span>Track on WhatsApp</span>
            <span>💬</span>
          </a>
          <Link to="/track-order" className="btn btn-outline">
            <span>Order Status Portal</span>
          </Link>
          <Link to="/shop" className="btn btn-primary">
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

