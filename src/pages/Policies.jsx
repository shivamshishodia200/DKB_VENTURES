import { Link, useLocation } from 'react-router-dom'
import { COMPANY_INFO } from '../data/companyInfo'
import { useSEO } from '../hooks/useSEO'

export default function Policies() {
  const { pathname } = useLocation()

  useSEO('Policies & Terms', 'Official legal policies, shipping terms, and return procedures for DKB Ventures.')

  // Determine policy by route
  const getPolicyDetails = () => {
    if (pathname.includes('privacy')) {
      return {
        title: 'Privacy Policy',
        eyebrow: 'Data Protection & Trust',
        content: (
          <>
            <p>
              At <b>{COMPANY_INFO.name}</b> ("we", "our", or "us"), operating from {COMPANY_INFO.headOffice.fullAddress}, we are committed to safeguarding the privacy and personal information of our retail customers, wholesale buyers, and business partners.
            </p>
            <h3>1. Information We Collect</h3>
            <p>
              We collect information provided directly by you when you place an order, submit a wholesale enquiry, register for distribution, or contact our support team. This includes your name, business name, phone number, WhatsApp number, email address, shipping destination, and billing address.
            </p>
            <h3>2. How We Use Your Information</h3>
            <p>
              Your information is exclusively used for:
            </p>
            <ul>
              <li>• Processing, packing, and dispatching your orders and sample requests.</li>
              <li>• Generating valid GST invoices under GSTIN: {COMPANY_INFO.gstin}.</li>
              <li>• Communicating order confirmations, tracking details, and quotation sheets via phone, SMS, and WhatsApp.</li>
              <li>• Responding to commercial partnership enquiries and product availability queries.</li>
            </ul>
            <h3>3. Data Protection & Sharing</h3>
            <p>
              We do not sell, rent, or trade your contact or business information to third-party advertisers. Information is only shared with verified logistics/courier partners solely to facilitate delivery to your location.
            </p>
            <h3>4. Contact Us</h3>
            <p>
              If you have any questions regarding your data privacy, you may contact our office at <b>{COMPANY_INFO.phones[0]}</b> or visit our registered address at {COMPANY_INFO.headOffice.fullAddress}.
            </p>
          </>
        ),
      }
    }

    if (pathname.includes('terms')) {
      return {
        title: 'Terms & Conditions',
        eyebrow: 'Commercial & Trade Terms',
        content: (
          <>
            <p>
              Welcome to the official platform of <b>{COMPANY_INFO.name}</b> (GSTIN: {COMPANY_INFO.gstin}), having its principal trading office at {COMPANY_INFO.headOffice.fullAddress}. By browsing, placing retail orders, or requesting wholesale quotes, you agree to the following terms.
            </p>
            <h3>1. Nature of Business</h3>
            <p>
              DKB Ventures is a registered commercial trading, wholesale, distribution, and retail marketing firm. We represent and supply authentic personal care, beauty, Ayurvedic, and tea products across India.
            </p>
            <h3>2. Pricing & Quotations</h3>
            <p>
              Retail prices displayed on this website are inclusive of applicable taxes. For B2B wholesale enquiries, quotations are issued based on quantity tiers, transport logistics, and commercial payment terms agreed upon in writing or direct communication.
            </p>
            <h3>3. Invoicing & Taxation</h3>
            <p>
              All formal commercial transactions are backed by official tax invoices bearing GSTIN: {COMPANY_INFO.gstin}. Registered business buyers must furnish their GST registration details prior to billing to claim input tax credit (ITC).
            </p>
            <h3>4. Jurisdiction</h3>
            <p>
              All trade disputes and commercial agreements are subject to the exclusive jurisdiction of the competent courts in Delhi, India.
            </p>
          </>
        ),
      }
    }

    if (pathname.includes('shipping')) {
      return {
        title: 'Shipping & Delivery Policy',
        eyebrow: 'Logistics & Dispatch',
        content: (
          <>
            <p>
              <b>{COMPANY_INFO.name}</b> operates its primary warehousing and dispatch facility from Budh Vihar, Delhi – 110086. We partner with reputable courier networks and transport services for dependable deliveries across India.
            </p>
            <h3>1. Dispatch Timelines</h3>
            <p>
              Confirmed retail and wholesale orders are inspected, securely packed, and dispatched within <b>24 to 48 business hours</b> of order confirmation (excluding Sundays and national holidays).
            </p>
            <h3>2. Estimated Transit Times</h3>
            <ul>
              <li>• <b>Delhi NCR & Neighboring Regions:</b> 2 to 4 business days.</li>
              <li>• <b>Metro Cities & Tier 1/2 Cities:</b> 3 to 6 business days.</li>
              <li>• <b>Remote & Rest of India:</b> 5 to 8 business days.</li>
              <li>• <b>Commercial Bulk Sacks / Master Cartons:</b> Dispatched via road transport/cargo lines per client requirement.</li>
            </ul>
            <h3>3. Shipping Charges</h3>
            <p>
              Retail orders valued at <b>₹1,499 and above</b> qualify for complimentary free shipping across India. For orders below ₹1,499, a flat nominal shipping fee of ₹79 applies.
            </p>
            <h3>4. Tracking Updates</h3>
            <p>
              Once dispatched, consignment tracking details are shared with the customer via WhatsApp and SMS. You can also track your shipment through our <Link to="/track-order" style={{ color: 'var(--dkb-green-dark)', textDecoration: 'underline' }}>Track Order Portal</Link>.
            </p>
          </>
        ),
      }
    }

    // Default: return & refund policy
    return {
      title: 'Return & Refund Policy',
      eyebrow: 'Customer Satisfaction Guarantee',
      content: (
        <>
          <p>
            At <b>{COMPANY_INFO.name}</b>, we prioritize quality, product safety, and customer satisfaction in all our retail and commercial deliveries.
          </p>
          <h3>1. Damaged or Incorrect Items</h3>
          <p>
            If you receive a package that is visibly damaged, tampered with in transit, or if an incorrect product has been delivered, please notify our team within <b>7 calendar days</b> of delivery.
          </p>
          <p>
            To initiate a replacement or refund, send photos of the damaged item and packing slip to our WhatsApp support at <b>{COMPANY_INFO.phones[0]}</b>.
          </p>
          <h3>2. Free Replacement Process</h3>
          <p>
            Upon verification of damaged or defective items, DKB Ventures will dispatch a fresh replacement free of charge or initiate a full refund to your original payment mode within 3–5 business days.
          </p>
          <h3>3. Non-Returnable Items</h3>
          <p>
            Due to hygiene and quality control standards, opened or used skincare creams, facial kits, oils, or loose tea products cannot be returned unless found defective upon initial receipt.
          </p>
          <h3>4. Cancellation Policy</h3>
          <p>
            Orders can be cancelled free of charge prior to physical dispatch from our Delhi hub by calling our support desk at <b>{COMPANY_INFO.phones.join(' / ')}</b>.
          </p>
        </>
      ),
    }
  }

  const policy = getPolicyDetails()

  return (
    <div className="container section" style={{ maxWidth: '840px' }}>
      <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '32px' }}>
        <span className="eyebrow">{policy.eyebrow}</span>
        <h1 className="section-title" style={{ fontSize: '36px', marginBottom: 0 }}>
          {policy.title}
        </h1>
      </div>

      <div
        style={{
          background: 'var(--dkb-white)',
          border: '1px solid var(--dkb-border)',
          borderRadius: 'var(--radius-md)',
          padding: '40px',
          boxShadow: 'var(--shadow-sm)',
          lineHeight: 1.8,
          color: 'var(--dkb-text-secondary)',
          fontSize: '14.5px',
        }}
        className="policy-content-body"
      >
        {policy.content}

        <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--dkb-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: 'var(--dkb-muted)' }}>
            DKB VENTURES · GSTIN: {COMPANY_INFO.gstin}
          </span>
          <Link to="/" className="btn btn-outline btn-sm">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

