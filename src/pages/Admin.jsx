import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, inr } from '../data/products'
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyInfo'
import { useSEO } from '../hooks/useSEO'

const ADMIN_DEFAULT_PIN = 'dkb2024'

export default function Admin() {
  useSEO('Operations & Admin Desk', 'Internal operations and dispatch management desk for DKB Ventures.')
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('dkb_admin_session') === 'active'
  })
  const [pinInput, setPinInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState('orders')

  // Loaded data state
  const [orders, setOrders] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [distributionApps, setDistributionApps] = useState([])

  // Load records from localStorage
  const loadRecords = () => {
    try {
      const o = JSON.parse(localStorage.getItem('dkb_customer_orders') || '[]')
      const w = JSON.parse(localStorage.getItem('dkb_wholesale_enquiries') || '[]')
      const d = JSON.parse(localStorage.getItem('dkb_distribution_apps') || '[]')
      setOrders(o)
      setEnquiries(w)
      setDistributionApps(d)
    } catch {
      // Ignore
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadRecords()
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (pinInput.trim() === ADMIN_DEFAULT_PIN) {
      sessionStorage.setItem('dkb_admin_session', 'active')
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Incorrect Admin Passcode. Please check with DKB Ventures management.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('dkb_admin_session')
    setIsAuthenticated(false)
    setPinInput('')
  }

  // Update order status in localStorage
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    setOrders(updated)
    localStorage.setItem('dkb_customer_orders', JSON.stringify(updated))
  }

  // CSV Exporter Helper
  const exportToCSV = (data, filename) => {
    if (!data.length) {
      alert('No records available to export.')
      return
    }
    const headers = Object.keys(data[0])
    const rows = data.map((obj) =>
      headers
        .map((header) => {
          let val = obj[header]
          if (typeof val === 'object' && val !== null) {
            val = JSON.stringify(val).replace(/"/g, '""')
          } else {
            val = String(val || '').replace(/"/g, '""')
          }
          return `"${val}"`
        })
        .join(',')
    )
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // ==========================================
  // 1. Password Protection Gate
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="container section" style={{ maxWidth: '440px', padding: '100px 20px' }}>
        <div
          style={{
            background: 'var(--dkb-white)',
            border: '1px solid var(--dkb-border)',
            borderRadius: 'var(--radius-md)',
            padding: '36px 32px',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'var(--dkb-green-subtle)',
              color: 'var(--dkb-green-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 16px',
              border: '1px solid var(--dkb-gold)',
            }}
          >
            🔒
          </div>

          <span className="eyebrow">Internal Access</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--dkb-green-dark)', marginBottom: '8px' }}>
            DKB Operations Portal
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--dkb-muted)', marginBottom: '24px' }}>
            Enter your management access passcode to view customer orders, wholesale inquiries, and distributor leads.
          </p>

          {authError && (
            <div style={{ background: '#fdf2f2', border: '1px solid #f8b4b4', color: '#9b1c1c', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '12px', marginBottom: '16px' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Admin PIN"
                className="form-input"
                style={{ textAlign: 'center', letterSpacing: '0.2em', fontSize: '18px' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--dkb-muted)', display: 'block', marginTop: '6px' }}>
                Default PIN: <b>dkb2024</b>
              </span>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Unlock Portal →
            </button>
          </form>

          <div style={{ marginTop: '24px' }}>
            <Link to="/" style={{ fontSize: '12px', color: 'var(--dkb-green-dark)', textDecoration: 'underline' }}>
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)

  return (
    <div className="container section">
      {/* Admin Top Header */}
      <div
        style={{
          background: 'linear-gradient(145deg, var(--dkb-green-dark), var(--dkb-green))',
          color: 'var(--dkb-white)',
          padding: '24px 32px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
          border: '1px solid var(--dkb-gold)',
        }}
      >
        <div>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--dkb-gold-light)', fontWeight: 700 }}>
            ✦ Management Dashboard
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: '#ffffff', margin: '4px 0 2px' }}>
            DKB VENTURES Operations Desk
          </h1>
          <span style={{ fontSize: '12px', color: '#b7c7be' }}>
            Budh Vihar Hub, Delhi · GSTIN: {COMPANY_INFO.gstin}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="btn btn-outline-gold btn-sm" onClick={loadRecords}>
            ↻ Refresh Records
          </button>
          <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }} onClick={handleLogout}>
            Sign Out ⎋
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-4" style={{ marginBottom: '32px' }}>
        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-sm)', padding: '20px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--dkb-muted)', fontWeight: 600 }}>Total Retail Orders</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--dkb-green-dark)', margin: '4px 0' }}>
            {orders.length}
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--dkb-success)' }}>{inr(totalRevenue)} total volume</span>
        </div>

        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-sm)', padding: '20px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--dkb-muted)', fontWeight: 600 }}>Wholesale Enquiries</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--dkb-gold-dark)', margin: '4px 0' }}>
            {enquiries.length}
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--dkb-muted)' }}>Salons, parlours & bulk buyers</span>
        </div>

        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-sm)', padding: '20px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--dkb-muted)', fontWeight: 600 }}>Distributor Applications</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--dkb-green-dark)', margin: '4px 0' }}>
            {distributionApps.length}
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--dkb-muted)' }}>Regional trade proposals</span>
        </div>

        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-sm)', padding: '20px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--dkb-muted)', fontWeight: 600 }}>Active Portfolio Items</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--dkb-green-dark)', margin: '4px 0' }}>
            {PRODUCTS.length}
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--dkb-muted)' }}>COTX · Green Herbs · Divya</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', borderBottom: '2px solid var(--dkb-border)', marginBottom: '24px', gap: '8px' }}>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '10px 20px',
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: 600,
            color: activeTab === 'orders' ? 'var(--dkb-green-dark)' : 'var(--dkb-muted)',
            borderBottom: activeTab === 'orders' ? '3px solid var(--dkb-gold)' : '3px solid transparent',
            marginBottom: '-2px',
          }}
        >
          Customer Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('wholesale')}
          style={{
            padding: '10px 20px',
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: 600,
            color: activeTab === 'wholesale' ? 'var(--dkb-green-dark)' : 'var(--dkb-muted)',
            borderBottom: activeTab === 'wholesale' ? '3px solid var(--dkb-gold)' : '3px solid transparent',
            marginBottom: '-2px',
          }}
        >
          Wholesale Enquiries ({enquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('distribution')}
          style={{
            padding: '10px 20px',
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: 600,
            color: activeTab === 'distribution' ? 'var(--dkb-green-dark)' : 'var(--dkb-muted)',
            borderBottom: activeTab === 'distribution' ? '3px solid var(--dkb-gold)' : '3px solid transparent',
            marginBottom: '-2px',
          }}
        >
          Distributor Leads ({distributionApps.length})
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          style={{
            padding: '10px 20px',
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: 600,
            color: activeTab === 'catalog' ? 'var(--dkb-green-dark)' : 'var(--dkb-muted)',
            borderBottom: activeTab === 'catalog' ? '3px solid var(--dkb-gold)' : '3px solid transparent',
            marginBottom: '-2px',
          }}
        >
          Product Catalogue ({PRODUCTS.length})
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: RETAIL ORDERS */}
      {/* ============================================================== */}
      {activeTab === 'orders' && (
        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--dkb-green-dark)' }}>
              Retail Customer Orders
            </h3>
            <button className="btn btn-outline btn-sm" onClick={() => exportToCSV(orders, 'dkb_orders')}>
              ⬇ Export Orders to CSV
            </button>
          </div>

          {orders.length === 0 ? (
            <p style={{ color: 'var(--dkb-muted)', textAlign: 'center', padding: '40px' }}>
              No retail customer orders placed yet. As customers check out on the website, their orders will appear here automatically.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--dkb-ivory)', borderBottom: '1px solid var(--dkb-border)' }}>
                    <th style={{ padding: '10px 14px' }}>Order ID</th>
                    <th style={{ padding: '10px 14px' }}>Date</th>
                    <th style={{ padding: '10px 14px' }}>Customer Name</th>
                    <th style={{ padding: '10px 14px' }}>Phone</th>
                    <th style={{ padding: '10px 14px' }}>Destination</th>
                    <th style={{ padding: '10px 14px' }}>Items</th>
                    <th style={{ padding: '10px 14px' }}>Total</th>
                    <th style={{ padding: '10px 14px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.orderId} style={{ borderBottom: '1px solid var(--dkb-border-light)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--dkb-green-dark)' }}>
                        #{o.orderId}
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--dkb-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(o.date).toLocaleDateString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <b>{o.customer?.firstName} {o.customer?.lastName}</b>
                        <div style={{ fontSize: '11px', color: 'var(--dkb-muted)' }}>{o.customer?.email}</div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <a href={`tel:${o.customer?.phone}`} style={{ color: 'var(--dkb-green-dark)', fontWeight: 600 }}>
                          {o.customer?.phone}
                        </a>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        {o.customer?.city}, {o.customer?.state} ({o.customer?.pincode})
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ fontSize: '12px' }}>
                          {o.items?.map((it) => `${it.name} (${it.size}) × ${it.qty}`).join(', ')}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: 700 }}>
                        {inr(o.total)}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <select
                          value={o.status || 'Confirmed'}
                          onChange={(e) => handleUpdateOrderStatus(o.orderId, e.target.value)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--dkb-border)',
                            fontSize: '12px',
                            background:
                              o.status === 'Delivered'
                                ? '#eef7f1'
                                : o.status === 'Dispatched'
                                ? '#fbf7ee'
                                : 'var(--dkb-white)',
                          }}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packing">Packing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: WHOLESALE ENQUIRIES */}
      {/* ============================================================== */}
      {activeTab === 'wholesale' && (
        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--dkb-green-dark)' }}>
              B2B & Salon Wholesale Enquiries
            </h3>
            <button className="btn btn-outline btn-sm" onClick={() => exportToCSV(enquiries, 'dkb_wholesale_enquiries')}>
              ⬇ Export Wholesale Leads to CSV
            </button>
          </div>

          {enquiries.length === 0 ? (
            <p style={{ color: 'var(--dkb-muted)', textAlign: 'center', padding: '40px' }}>
              No wholesale enquiries submitted yet. As salons and retail partners submit requests on <b>/wholesale</b>, they will be listed here.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--dkb-ivory)', borderBottom: '1px solid var(--dkb-border)' }}>
                    <th style={{ padding: '10px 14px' }}>Ref ID</th>
                    <th style={{ padding: '10px 14px' }}>Date</th>
                    <th style={{ padding: '10px 14px' }}>Business / Salon</th>
                    <th style={{ padding: '10px 14px' }}>Contact Person</th>
                    <th style={{ padding: '10px 14px' }}>Phone / WhatsApp</th>
                    <th style={{ padding: '10px 14px' }}>Location</th>
                    <th style={{ padding: '10px 14px' }}>Interested Brand</th>
                    <th style={{ padding: '10px 14px' }}>Requirements</th>
                    <th style={{ padding: '10px 14px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((w) => {
                    const waLink = getWhatsAppUrl(
                      `Hello ${w.fullName}, regarding your wholesale enquiry (${w.refId}) for ${w.businessName} on DKB Ventures:`,
                      w.whatsapp?.replace(/\D/g, '') || w.mobile?.replace(/\D/g, '')
                    )

                    return (
                      <tr key={w.refId} style={{ borderBottom: '1px solid var(--dkb-border-light)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--dkb-gold-dark)' }}>
                          {w.refId}
                        </td>
                        <td style={{ padding: '12px 14px', color: 'var(--dkb-muted)', whiteSpace: 'nowrap' }}>
                          {new Date(w.date).toLocaleDateString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <b>{w.businessName}</b>
                          <div style={{ fontSize: '11px', color: 'var(--dkb-muted)' }}>{w.businessType}</div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>{w.fullName}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <a href={`tel:${w.mobile}`} style={{ color: 'var(--dkb-green-dark)', fontWeight: 600 }}>
                            {w.mobile}
                          </a>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {w.city}, {w.state}
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--dkb-green-dark)' }}>
                          {w.brand}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ fontSize: '12px' }}>{w.productsOfInterest}</div>
                          {w.approxQty && <div style={{ fontSize: '11px', color: 'var(--dkb-muted)' }}>Qty: {w.approxQty}</div>}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm" style={{ padding: '4px 10px', fontSize: '11px' }}>
                            WhatsApp 💬
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: DISTRIBUTOR LEADS */}
      {/* ============================================================== */}
      {activeTab === 'distribution' && (
        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--dkb-green-dark)' }}>
              Regional Distributor & Partner Proposals
            </h3>
            <button className="btn btn-outline btn-sm" onClick={() => exportToCSV(distributionApps, 'dkb_distributors')}>
              ⬇ Export Distributor Leads to CSV
            </button>
          </div>

          {distributionApps.length === 0 ? (
            <p style={{ color: 'var(--dkb-muted)', textAlign: 'center', padding: '40px' }}>
              No distributor applications received yet. As regional stockists apply on <b>/distribution</b>, their proposals will be listed here.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--dkb-ivory)', borderBottom: '1px solid var(--dkb-border)' }}>
                    <th style={{ padding: '10px 14px' }}>App ID</th>
                    <th style={{ padding: '10px 14px' }}>Date</th>
                    <th style={{ padding: '10px 14px' }}>Firm Name</th>
                    <th style={{ padding: '10px 14px' }}>Applicant</th>
                    <th style={{ padding: '10px 14px' }}>Phone</th>
                    <th style={{ padding: '10px 14px' }}>Territory</th>
                    <th style={{ padding: '10px 14px' }}>Role</th>
                    <th style={{ padding: '10px 14px' }}>Experience & Reach</th>
                  </tr>
                </thead>
                <tbody>
                  {distributionApps.map((d) => (
                    <tr key={d.appRef} style={{ borderBottom: '1px solid var(--dkb-border-light)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--dkb-green-dark)' }}>
                        {d.appRef}
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--dkb-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(d.date).toLocaleDateString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <b>{d.companyName}</b>
                      </td>
                      <td style={{ padding: '12px 14px' }}>{d.applicantName}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <a href={`tel:${d.phone}`} style={{ color: 'var(--dkb-green-dark)', fontWeight: 600 }}>
                          {d.phone}
                        </a>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        {d.city}, {d.state}
                      </td>
                      <td style={{ padding: '12px 14px' }}>{d.businessCategory}</td>
                      <td style={{ padding: '12px 14px', fontSize: '12px', color: 'var(--dkb-text-secondary)' }}>
                        {d.experienceYears || 'Standard territory application'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: PRODUCT CATALOGUE QUICK VIEW */}
      {/* ============================================================== */}
      {activeTab === 'catalog' && (
        <div style={{ background: 'var(--dkb-white)', border: '1px solid var(--dkb-border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--dkb-green-dark)' }}>
              Verified Portfolio Formulations ({PRODUCTS.length})
            </h3>
            <Link to="/shop" className="btn btn-outline btn-sm">
              View Public Shop ↗
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--dkb-ivory)', borderBottom: '1px solid var(--dkb-border)' }}>
                  <th style={{ padding: '10px 14px' }}>SKU</th>
                  <th style={{ padding: '10px 14px' }}>Brand</th>
                  <th style={{ padding: '10px 14px' }}>Product Name</th>
                  <th style={{ padding: '10px 14px' }}>Category</th>
                  <th style={{ padding: '10px 14px' }}>Size / Pack</th>
                  <th style={{ padding: '10px 14px' }}>Selling Price</th>
                  <th style={{ padding: '10px 14px' }}>MRP</th>
                  <th style={{ padding: '10px 14px' }}>Pricing Mode</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--dkb-border-light)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--dkb-muted)' }}>
                      {p.sku}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--dkb-green-dark)' }}>
                      {p.brandName}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <Link to={`/product/${p.slug}`} style={{ color: 'var(--dkb-text)', fontWeight: 600 }}>
                        {p.name}
                      </Link>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--dkb-muted)' }}>{p.categoryName}</td>
                    <td style={{ padding: '12px 14px' }}>{p.size}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--dkb-green-dark)' }}>
                      {p.price > 0 ? inr(p.price) : 'Quote Only'}
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--dkb-muted)' }}>
                      {p.mrp > 0 ? inr(p.mrp) : '—'}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          background: p.pricingMode === 'fixed' ? 'var(--dkb-green-subtle)' : 'var(--dkb-gold-subtle)',
                          color: p.pricingMode === 'fixed' ? 'var(--dkb-green-dark)' : 'var(--dkb-gold-dark)',
                          fontWeight: 700,
                        }}
                      >
                        {p.pricingMode?.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

