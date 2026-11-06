import { useState } from 'react'
import { Link } from 'react-router-dom'
import { inr } from '../data/products'
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyInfo'
import { useSEO } from '../hooks/useSEO'

export default function TrackOrder() {
  useSEO('Track Your Order', 'Track the dispatch and delivery status of your DKB Ventures order.')
  const [queryId, setQueryId] = useState('')
  const [searched, setSearched] = useState(false)
  const [foundOrder, setFoundOrder] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    setSearched(true)

    const clean = queryId.trim().toUpperCase()
    try {
      const orders = JSON.parse(localStorage.getItem('dkb_customer_orders') || '[]')
      const matched = orders.find(
        (o) => o.orderId?.toUpperCase() === clean || o.orderId?.toUpperCase() === `DKB-${clean}`
      )
      setFoundOrder(matched || null)
    } catch {
      setFoundOrder(null)
    }
  }

  const whatsappTrackUrl = getWhatsAppUrl(
    `Hello DKB Ventures, I am enquiring about my order status for Order ID #${queryId || 'DKB-ORDER'}. Please update dispatch details.`
  )

  return (
    <div className="container section" style={{ maxWidth: '780px' }}>
      <div className="section-title-wrap">
        <span className="eyebrow">Dispatch Tracking</span>
        <h1 className="section-title">Track Your Order</h1>
        <p className="section-subtitle">
          Enter your DKB Ventures order reference number to check dispatch status from our Delhi facility.
        </p>
      </div>

      <div className="form-card" style={{ marginBottom: '36px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            required
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
            placeholder="Enter Order ID (e.g. DKB-4819203)"
            className="form-input"
            style={{ flex: 1, minWidth: '220px' }}
          />
          <button type="submit" className="btn btn-primary">
            Check Status →
          </button>
        </form>
      </div>

      {searched && (
        <div>
          {foundOrder ? (
            <div
              style={{
                background: 'var(--dkb-white)',
                border: '1px solid var(--dkb-border)',
                borderRadius: 'var(--radius-md)',
                padding: '32px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--dkb-border-light)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--dkb-gold)' }}>
                    Verified Order
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--dkb-green-dark)' }}>
                    #{foundOrder.orderId}
                  </h3>
                </div>
                <span style={{ background: 'var(--dkb-green-subtle)', color: 'var(--dkb-green-dark)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: 700 }}>
                  ● {foundOrder.status || 'Confirmed'}
                </span>
              </div>

              {/* Progress Timeline */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '28px 0', textAlign: 'center' }}>
                <div style={{ borderTop: '3px solid var(--dkb-success)', paddingTop: '10px' }}>
                  <b style={{ fontSize: '12px', color: 'var(--dkb-green-dark)', display: 'block' }}>1. Confirmed</b>
                  <span style={{ fontSize: '10.5px', color: 'var(--dkb-muted)' }}>Received</span>
                </div>
                <div style={{ borderTop: '3px solid var(--dkb-gold)', paddingTop: '10px' }}>
                  <b style={{ fontSize: '12px', color: 'var(--dkb-gold-dark)', display: 'block' }}>2. Packing</b>
                  <span style={{ fontSize: '10.5px', color: 'var(--dkb-muted)' }}>Quality Check</span>
                </div>
                <div style={{ borderTop: '3px solid var(--dkb-border)', paddingTop: '10px' }}>
                  <b style={{ fontSize: '12px', color: 'var(--dkb-muted)', display: 'block' }}>3. Dispatched</b>
                  <span style={{ fontSize: '10.5px', color: 'var(--dkb-muted)' }}>Delhi Hub</span>
                </div>
                <div style={{ borderTop: '3px solid var(--dkb-border)', paddingTop: '10px' }}>
                  <b style={{ fontSize: '12px', color: 'var(--dkb-muted)', display: 'block' }}>4. Delivered</b>
                  <span style={{ fontSize: '10.5px', color: 'var(--dkb-muted)' }}>Doorstep</span>
                </div>
              </div>

              <div style={{ background: 'var(--dkb-ivory)', padding: '20px', borderRadius: 'var(--radius-sm)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div><b>Customer:</b> {foundOrder.customer?.firstName} {foundOrder.customer?.lastName} ({foundOrder.customer?.city}, {foundOrder.customer?.state})</div>
                <div><b>Order Items:</b> {foundOrder.items?.map((i) => `${i.name} (${i.size}) × ${i.qty}`).join(', ')}</div>
                <div><b>Total Order Value:</b> {inr(foundOrder.total)}</div>
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <a href={whatsappTrackUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                  <span>Chat with Dispatch Team on WhatsApp</span>
                  <span>💬</span>
                </a>
              </div>
            </div>
          ) : (
            <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-md)', padding: '36px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--dkb-green-dark)', marginBottom: '8px' }}>
                Order Details Not Located
              </h3>
              <p style={{ color: 'var(--dkb-text-secondary)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                We could not locate local records for "{queryId}". If you placed an order via phone or WhatsApp, please reach out directly to our dispatch desk.
              </p>
              <a href={whatsappTrackUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <span>Check Status via WhatsApp</span>
                <span>💬</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

