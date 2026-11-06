import { getGeneralEnquiryWhatsApp } from '../data/companyInfo'
import { IconWhatsApp } from './Icons'

export default function WhatsAppButton() {
  const url = getGeneralEnquiryWhatsApp()

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-widget"
      aria-label="Direct WhatsApp Enquiry with DKB Ventures"
    >
      <IconWhatsApp size={22} />
      <span>WhatsApp Enquiries</span>
    </a>
  )
}

