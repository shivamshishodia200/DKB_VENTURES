// API Integration Service for DKB VENTURES
// Supports local fallback mode and remote REST API synchronization

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export const apiService = {
  /**
   * Submit a customer order
   */
  async submitOrder(orderData) {
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        })
        if (res.ok) return await res.json()
      } catch (err) {
        console.warn('API submission failed, falling back to local storage', err)
      }
    }
    // Fallback: Local storage persistence
    try {
      const orders = JSON.parse(localStorage.getItem('dkb_customer_orders') || '[]')
      orders.push(orderData)
      localStorage.setItem('dkb_customer_orders', JSON.stringify(orders))
      localStorage.setItem('dkb_latest_order', JSON.stringify(orderData))
    } catch {
      // Ignore
    }
    return { ok: true, orderId: orderData.orderId, offline: true }
  },

  /**
   * Submit a wholesale B2B enquiry
   */
  async submitWholesaleEnquiry(enquiryData) {
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/enquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(enquiryData),
        })
        if (res.ok) return await res.json()
      } catch (err) {
        console.warn('API submission failed, falling back to local storage', err)
      }
    }
    try {
      const existing = JSON.parse(localStorage.getItem('dkb_wholesale_enquiries') || '[]')
      existing.push(enquiryData)
      localStorage.setItem('dkb_wholesale_enquiries', JSON.stringify(existing))
    } catch {
      // Ignore
    }
    return { ok: true, refId: enquiryData.refId, offline: true }
  },

  /**
   * Submit a distributor / partner application
   */
  async submitDistributorApp(appData) {
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/distribution`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appData),
        })
        if (res.ok) return await res.json()
      } catch (err) {
        console.warn('API submission failed, falling back to local storage', err)
      }
    }
    try {
      const apps = JSON.parse(localStorage.getItem('dkb_distribution_apps') || '[]')
      apps.push(appData)
      localStorage.setItem('dkb_distribution_apps', JSON.stringify(apps))
    } catch {
      // Ignore
    }
    return { ok: true, appRef: appData.appRef, offline: true }
  },
}

