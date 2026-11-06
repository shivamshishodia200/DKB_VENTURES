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
  phones: ['9355698422', '9999148167'],
  primaryPhone: '9355698422',
  secondaryPhone: '9999148167',
  whatsappNumber: '919355698422',
  whatsappSecondary: '919999148167',
  email: 'care@dkbventures.in', // Official communication placeholder
  gstin: '07CHBPS3702D4ZM',
  establishedYear: '2024',

  brands: [
    {
      id: 'cotx-luxury-skincare',
      key: 'cotx',
      name: 'COTX Luxury Skincare',
      tagline: 'Premium skincare and personal care for everyday beauty & grooming',
      description:
        'Premium skincare and personal care products designed for everyday beauty and grooming needs. Formulated with targeted actives to elevate daily self-care rituals for women and men.',
      badge: 'Luxury Skincare',
      themeColor: '#0A3B24',
      accentColor: '#C7A052',
      categories: [
        'Face washes and facial care',
        'Skin creams and moisturizers',
        'Hand and body lotions',
        'Hair care products and hair growth oil',
        'Beard oil and personal grooming products',
        'Facial kits and beauty care essentials',
      ],
      features: [
        'Clinically balanced formulations',
        'Rich nourishing textures',
        'Professional salon & bridal kits',
        'Targeted active skincare',
      ],
    },
    {
      id: 'green-herbs-ayurveda',
      key: 'green-herbs',
      name: 'Green Herbs Ayurveda',
      tagline: 'Ayurveda-inspired wellness & pure botanical personal care',
      description:
        'Ayurveda-inspired products for customers seeking herbal, natural and wellness-oriented personal care options. Crafted with time-tested herbs, pure extracts, and gentle botanicals.',
      badge: 'Ayurvedic & Herbal',
      themeColor: '#1B5E20',
      accentColor: '#81C784',
      categories: [
        'Herbal skincare products',
        'Face packs and aloe vera products',
        'Hair care products and herbal oils',
        'Selected Ayurvedic and personal care essentials',
      ],
      features: [
        'Pure botanical & herbal extracts',
        'Gentle on sensitive Indian skin',
        'Traditional Ayurvedic wisdom',
        'Cruelty-free & clean formulation',
      ],
    },
    {
      id: 'divya-tea',
      key: 'divya-tea',
      name: 'Divya Tea',
      tagline: 'Aromatic tea blends for daily enjoyment & wholesale supply',
      description:
        'High-quality tea products for everyday consumption, retail sale, and commercial wholesale opportunities. Sourced from fine tea gardens to deliver robust flavor, rich color, and refreshing aroma.',
      badge: 'Fine Tea Blends',
      themeColor: '#4E342E',
      accentColor: '#D7CCC8',
      categories: [
        'Everyday CTC Leaf Tea',
        'Green Tea & Botanical Blends',
        'Spiced Masala Chai',
        'Commercial Wholesale Bulk Packs',
      ],
      features: [
        'Finest garden-fresh tea leaves',
        'Rich aroma & full-bodied liquor',
        'Retail consumer packs & bulk catering packs',
        'Consistent blend quality',
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

export const getProductEnquiryWhatsApp = (productName, variant = '', slug = '') => {
  const variantText = variant ? ` (${variant})` : ''
  return getWhatsAppUrl(
    `Hello DKB Ventures, I am interested in ordering/enquiring about "${productName}${variantText}". Please share availability, pricing, and ordering process.`
  )
}

