// Official DKB VENTURES Company Profile & Information
export const COMPANY_INFO = {
  name: 'DKB VENTURES',
  legalName: 'DKB VENTURES',
  tagline: 'Your Trusted Partner in Beauty, Personal Care & Wellness Products',
  businessType: 'Trading, Wholesale, Distribution and Retail Marketing',
  headOffice: {
    addressLine: 'M-2/18, Main Market Road, Budh Vihar, Phase-1',
    city: 'Delhi',
    pincode: '110086',
    state: 'Delhi',
    country: 'India',
    fullAddress: 'M-2/18, Main Market Road, Budh Vihar, Phase-1, Delhi – 110086',
  },
  phones: ['9999148167'],
  primaryPhone: '9999148167',
  secondaryPhone: '9999148167',
  whatsappNumber: '919999148167',
  whatsappSecondary: '919999148167',
  email: 'care@dkbventures.in', // Official communication placeholder
  gstin: '07CHBPS3702D4ZM',
  establishedYear: '2024',

  brands: [
    {
      id: 'cotx-luxury-skincare',
      key: 'cotx',
      name: 'COTX Luxury Skincare',
      tagline: 'Premium skincare, hair care, and salon facial kits',
      description:
        'Premium skincare and personal care products designed for everyday beauty and grooming needs. Formulated with targeted actives, rich textures, and 6-step bridal regimens for salons and retail.',
      badge: 'Luxury Skincare',
      themeColor: '#0A3B24',
      accentColor: '#C7A052',
      categories: [
        'Face Washes & Cleansers',
        'Face Serums & Toners',
        'Creams & Sun Care',
        'Body & Hand Care',
        'Shampoo & Conditioner',
        '6-Step Professional Facial Kits',
      ],
      features: [
        'Clinically balanced active formulations',
        'Targeted serums & SPF 50++ protection',
        'Professional salon & bridal 6-step kits',
        'Direct trading supply from Delhi hub',
      ],
    },
    {
      id: 'divya-tea',
      key: 'divya-tea',
      name: 'Divya Tea',
      tagline: 'Aromatic garden-fresh tea blends & commercial wholesale cartons',
      description:
        'High-quality estate tea products for everyday consumption, retail sale, and commercial wholesale opportunities. Sourced from fine Assam tea gardens to deliver robust flavor, rich color, and refreshing aroma.',
      badge: 'Fine Tea Blends',
      themeColor: '#4E342E',
      accentColor: '#D7CCC8',
      categories: [
        'Assam CTC High-Grown Tea',
        'Authentic Spiced Masala Chai',
        'Commercial 5 kg Master Cartons',
        'Commercial 25 kg Wholesale Cartons',
      ],
      features: [
        'Finest garden-fresh Assam tea leaves',
        'Rich aroma & full-bodied liquor',
        'Retail consumer pouches & commercial cartons',
        'Direct Delhi dispatch for trade & caterers',
      ],
    },
  ],

  businessActivities: [
    {
      title: 'Wholesale Supply',
      description:
        'Consistent and dependable product supply for retailers, beauty salons, parlour chains, makeup studios, and bulk buyers with competitive commercial terms.',
      icon: 'box',
    },
    {
      title: 'Brand Distribution',
      description:
        'Connecting reputable brands and emerging personal care products with local regional markets, pharmacy counters, and retail networks across North India and beyond.',
      icon: 'truck',
    },
    {
      title: 'Retail Marketing',
      description:
        'Making premium beauty, skincare, and everyday wellness items conveniently accessible to individual consumers through direct-to-consumer and retail channels.',
      icon: 'store',
    },
    {
      title: 'Business Partnerships',
      description:
        'Developing long-term, mutually rewarding associations with beauty salon owners, freelance artists, retail shopkeepers, and independent reseller entrepreneurs.',
      icon: 'handshake',
    },
    {
      title: 'Product Promotion',
      description:
        'Active promotion, digital catalogue sharing, product demonstrations, and direct client support to maximize product velocity and brand visibility.',
      icon: 'megaphone',
    },
  ],

  whoWeServe: [
    { title: 'Beauty Salons & Parlours', desc: 'Professional salon packs, facial kits, oils and back-bar supplies.' },
    { title: 'Makeup Artists & Skin Experts', desc: 'High-performance skin prep, moisturizers, and post-makeup cleansing essentials.' },
    { title: 'Cosmetic & General Retail Stores', desc: 'Fast-moving consumer beauty, Ayurvedic and beverage inventory with solid margins.' },
    { title: 'Wholesalers & Sub-Distributors', desc: 'Bulk quantities, master carton packing, and regional trade support.' },
    { title: 'Resellers & Home Entrepreneurs', desc: 'Accessible minimum order quantities and direct communication for growing ventures.' },
    { title: 'Individual Retail Customers', desc: 'Direct purchasing of trusted daily beauty and wellness products.' },
  ],

  whyChooseUs: [
    { title: 'Multi-Category Portfolio', desc: 'Skincare, personal care, Ayurveda, and tea products all under one trusted roof.' },
    { title: 'B2B & Retail Flexibility', desc: 'Single unit retail purchases to full carton wholesale supply with transparent terms.' },
    { title: 'Direct Management Communication', desc: 'Direct phone & WhatsApp access to decision-makers for fast quotes and order processing.' },
    { title: 'Delhi Market Hub', desc: 'Strategically located in Budh Vihar, Delhi with efficient regional logistics and dispatch.' },
    { title: 'Long-Term Partnership Model', desc: 'We grow when our partners grow, focusing on repeat supply and mutual commercial success.' },
    { title: 'Verified Business Entity', desc: 'Legitimate GST-registered trading firm (GSTIN: 07CHBPS3702D4ZM) with authentic invoicing.' },
  ],

  vision:
    'To build DKB Ventures into a trusted trading and distribution partner by expanding our product portfolio, strengthening customer relationships, and connecting quality brands with growing markets.',
  mission:
    'To provide customers and business partners with convenient access to a diverse range of products while maintaining professional service, transparent communication, and a commitment to long-term business growth.',
}

// WhatsApp Helper functions
export const getWhatsAppUrl = (message, number = COMPANY_INFO.whatsappNumber) => {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${encoded}`
}

export const getGeneralEnquiryWhatsApp = () => {
  return getWhatsAppUrl(
    'Hello DKB Ventures, I would like to enquire about your products and services. Please share availability and details.'
  )
}

export const getWholesaleEnquiryWhatsApp = (brand = '') => {
  const brandText = brand ? ` regarding ${brand}` : ''
  return getWhatsAppUrl(
    `Hello DKB Ventures, I am interested in wholesale supply${brandText}. Please share your product catalogue and wholesale pricing information.`
  )
}

export const getProductEnquiryWhatsApp = (productName, variant = '', quantity = '') => {
  const variantText = variant && variant !== 'Pending' ? ` (${variant})` : ''
  const qtyText = quantity ? ` | Quantity: ${quantity}` : ''
  return getWhatsAppUrl(
    `Hello DKB Ventures, I am interested in ordering/enquiring about "${productName}${variantText}"${qtyText}. Please share availability, pricing, and ordering process.`
  )
}

export const getBulkTeaEnquiryWhatsApp = (cartonSize = '5 kg carton', quantity = 1) => {
  const qtyText = quantity ? ` (${quantity} carton${quantity > 1 ? 's' : ''})` : ''
  return getWhatsAppUrl(
    `Hello DKB Ventures, I would like to request a wholesale quote for Bulk Tea - ${cartonSize}${qtyText}. Please share carton pricing, GST terms, and shipping schedule.`
  )
}

