# 🌟 DKB VENTURES — Official Platform Documentation
## 📋 Premium Multi-Brand E-Commerce, Wholesale & Distribution Platform

**Company Name:** DKB VENTURES  
**Tagline:** Your Trusted Partner in Beauty, Personal Care & Wellness Products  
**Head Office:** M-2/18, Main Market Road, Budh Vihar, Phase-1, Delhi – 110086  
**Contact Numbers:** 9355698422 | 9999148167  
**GSTIN:** 07CHBPS3702D4ZM  
**Business Nature:** Trading, Wholesale, Distribution and Retail Marketing  

---

## 🏛️ 1. Company Profile & Overview

**DKB Ventures** is a Delhi-based trading firm engaged in the distribution, wholesale, and retail marketing of beauty, skincare, personal care, Ayurvedic, and tea products.

The platform has been designed to serve two primary pillars:
1. **B2C (Retail Consumers):** Individual customers discovering and purchasing daily beauty, skincare, and tea products with pan-India delivery.
2. **B2B (Commercial & Trade Buyers):** Salons, beauty parlours, retailers, wholesalers, resellers, and distributors requesting catalogues, trade pricing tiers, master cartons, and long-term channel partnerships.

---

## 🏷️ 2. Official Brand Portfolio

DKB Ventures represents and distributes three distinct brand portfolios:

### 1. COTX Luxury Skincare
*Premium skincare and personal care products designed for everyday beauty and grooming needs.*
- Face washes and facial cleansers
- Skin creams and moisturizers
- Hand and body lotions
- Hair care products and hair growth oil
- Beard oil and personal grooming products
- Professional 6-step facial kits and salon packs

### 2. Green Herbs Ayurveda
*Ayurveda-inspired products for customers seeking herbal and wellness-oriented personal care options.*
- Herbal skincare products
- Face packs, ubtan, and aloe vera soothing gels
- Traditional Ayurvedic hair oils (Bhringraj, Amla, Brahmi)
- Steam-distilled pure rose water hydrosols & wellness essentials

### 3. Divya Tea
*Tea products for everyday consumption, retail sale, and commercial wholesale opportunities.*
- Everyday CTC leaf tea blends (Assam & Dooars blend)
- Royal spiced masala chai with whole natural spices
- Commercial wholesale bulk sacks (5 kg / 25 kg) for caterers, grocers, and institutions

---

## 💻 3. Technology Stack & Design System

| Component | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (Functional Components, Hooks, Context API) |
| **Build Tool & Bundler** | Vite 5.4.8 (Sub-second HMR, optimized production chunks) |
| **Routing** | React Router DOM v6 (Nested layouts, dynamic routes, query params) |
| **Cart & State** | React Context (`CartContext`) with `localStorage` persistence |
| **Color System** | Deep Emerald Green (`#063B23`), Metallic Gold (`#C7A052`), Ivory (`#FAF8F2`), White (`#FFFFFF`) |
| **Typography** | Headings: *Cormorant Garamond* (Serif) · Body: *Montserrat* (Sans-serif) |
| **B2B Handoff** | Dynamic WhatsApp URL generator with pre-filled enquiry parameters |
| **SEO & Discovery** | Semantic HTML5, Open Graph tags, `robots.txt`, and XML `sitemap.xml` |

---

## 📁 4. Project File Structure

```text
DKB_VENTURES/
├── public/                       # स्टैटिक एसेट्स
│   ├── dkb-logo.jpg              # DKB Ventures का ऑफिशियल लोगो
│   ├── dkb-logo.png              # DKB Ventures लोगो (PNG फॉर्मेट)
│   ├── robots.txt                # सर्च इंजन क्रॉलर निर्देश
│   └── sitemap.xml               # सर्च इंजन XML साइटमैप
├── src/
│   ├── components/               # रीयूजेबल कंपोनेंट्स
│   │   ├── Layout.jsx            # हेडर, मोबाइल मेनू, फुटर, कार्ट ड्रॉअर, अनाउंसमेंट बार
│   │   ├── ProductArt.jsx        # ब्रांड-टोन आधारित पैकेजिंग आर्ट और विजुअल सिलहूट्स
│   │   ├── ProductCard.jsx       # डायनामिक प्रोडक्ट कार्ड (प्राइसिंग मोड, डिस्काउंट, WhatsApp बटन)
│   │   └── WhatsAppButton.jsx    # फ्लोटिंग डायरेक्ट WhatsApp इंक्वायरी विजेट
│   ├── context/
│   │   └── CartContext.jsx       # कार्ट स्टेट, वेरिएंट हैंडलिंग, फ्री शिपिंग कैलकुलेटर
│   ├── data/
│   │   ├── companyInfo.js        # ऑफिशियल कंपनी प्रोफाइल, पते, फोन, GSTIN, WhatsApp टेम्पलेट्स
│   │   └── products.js           # मल्टी-ब्रांड कैटलॉग (COTX, Green Herbs, Divya Tea)
│   ├── pages/                    # 14+ डेडिकेटेड पेजेस
│   │   ├── Home.jsx              # फ्लैगशिप होमपेज
│   │   ├── About.jsx             # अबाउट अस (मिशन, विजन, हु वी सर्व)
│   │   ├── Brands.jsx            # ब्रांड पोर्टफोलियो ओवरव्यू
│   │   ├── BrandDetail.jsx       # सिंगल ब्रांड शोकेस (/brands/:brandSlug)
│   │   ├── Shop.jsx              # कैटलॉग (ब्रांड, कैटेगरी, सर्च और सॉर्ट फ़िल्टर)
│   │   ├── Product.jsx           # सिंगल प्रोडक्ट डिटेल पेज (वेरिएंट्स, टैब्स, B2B कोट)
│   │   ├── Wholesale.jsx         # B2B होलसेल इंक्वायरी फॉर्म पेज
│   │   ├── Distribution.jsx      # रीजनल डिस्ट्रीब्यूशन और पार्टनरशिप एप्लीकेशन
│   │   ├── Contact.jsx           # संपर्क पेज (हेड ऑफिस, फोन, GSTIN, फॉर्म)
│   │   ├── Cart.jsx              # शॉपिंग बैग (वेरिएंट्स, फ्री शिपिंग बार, WhatsApp चेकआउट)
│   │   ├── Checkout.jsx          # चेकआउट फॉर्म (एड्रेस, पिन कोड वैलिडेशन, COD/UPI)
│   │   ├── OrderConfirmation.jsx # आर्डर कन्फर्मेशन स्क्रीन (रेफरेंस आईडी के साथ)
│   │   ├── TrackOrder.jsx        # लाइव आर्डर स्टेटस व डिस्पैच ट्रैकिंग पोर्टल
│   │   └── Policies.jsx          # प्राइवेसी, टर्म्स, शिपिंग और रिटर्न नीतियां
│   ├── App.jsx                   # रूट राउटिंग ट्री
│   ├── main.jsx                  # ऐप माउंट पॉइंट
│   └── styles.css                # एमराल्ड ग्रीन और गोल्ड लग्जरी स्टाइलशीट
├── index.html                    # SEO मेटा टैग्स, ओपन ग्राफ, फॉन्ट्स
├── package.json                  # डिपेंडेंसीज व स्क्रिप्ट्स
└── vite.config.js                # Vite कॉन्फ़िगरेशन
```

---

## 🌐 5. All Website Pages & Route Guide (सभी पेजेस का पूरा विवरण)

### 1. Home Page (`/`)
* **फाइल:** `src/pages/Home.jsx`
* **विवरण:** DKB Ventures का मुख्य लैंडिंग पेज।
* **सेक्शन्स:**
  - **Emerald & Gold Hero:** "Beauty. Wellness. Trusted Partnerships." टैगलाइन, ऑफिशियल लोगो शोकेस, डायरेक्ट कॉल-टू-एक्शन बटन्स।
  - **Perks Bar:** B2B & Retail Supply, Verified Portfolio, Delhi Logistics Hub, Direct Management Line.
  - **Company Intro:** दिल्ली आधारित फर्म का प्रोफाइल, हेड ऑफिस एड्रेस, फोन और GSTIN।
  - **Explore Our Brands:** 3 मुख्य ब्रांड्स (COTX, Green Herbs, Divya Tea) के विजुअल कार्ड्स।
  - **Shop by Category:** 8 मुख्य कैटेगरीज में वन-क्लिक नेविगेशन।
  - **Featured Products:** एक्टिव कैटलॉग से चुनिंदा बेस्टसेलर प्रोडक्ट्स का ग्रिड।
  - **Wholesale & Trade Section:** सैलून, पार्लर और होलसेलर्स के लिए विशेष कमर्शियल एडवांटेज व डायरेक्ट WhatsApp कोट।
  - **Why Choose DKB Ventures:** 6 मुख्य व्यापारिक खूबियां।
  - **Let's Grow Together CTA:** त्वरित संपर्क बटन्स।

### 2. About Us (`/about`)
* **फाइल:** `src/pages/About.jsx`
* **विवरण:** कंपनी का आधिकारिक प्रोफाइल। इसमें हमारी व्यवसाय गतिविधियां (Wholesale Supply, Brand Distribution, Retail Marketing, Business Partnerships), हम किसकी सेवा करते हैं (Who We Serve), विजन, मिशन, और रजिस्टर्ड हेड ऑफिस की पूरी जानकारी शामिल है।

### 3. Our Brands (`/brands`)
* **फाइल:** `src/pages/Brands.jsx`
* **विवरण:** COTX Luxury Skincare, Green Herbs Ayurveda, और Divya Tea का विस्तृत पोर्टफोलियो शोकेस।

### 4. Brand Specific Showcase (`/brands/:brandSlug`)
* **फाइल:** `src/pages/BrandDetail.jsx`
* **रूट्स:**
  - `/brands/cotx-luxury-skincare`
  - `/brands/green-herbs-ayurveda`
  - `/brands/divya-tea`
* **फीचर्स:** ब्रांड हेडर, ब्रांड की खासियतें, कैटेगरी पिल्स, संबंधित प्रोडक्ट्स, और ब्रांड-स्पेसिफिक होलसेल कैटलॉग रिक्वेस्ट।

### 5. Shop / Catalog (`/shop`)
* **फाइल:** `src/pages/Shop.jsx`
* **फीचर्स:**
  - **Brand Filter:** All, COTX, Green Herbs, Divya Tea.
  - **Category Filter:** Face Care, Creams, Body, Hair, Grooming, Facial Kits, Aloe/Herbal, Face Packs, Tea Retail, Tea Wholesale.
  - **Benefit / Concern Filter:** Everyday Radiance, Deep Hydration, Hair Growth, Gentle Cleansing, Salon Care, Herbal Wellness, Fresh Tea.
  - **Live Search (`q`):** नाम, सामग्री और विवरण पर रियल-टाइम सर्च।
  - **Sort By:** Featured, New Arrivals, Price: Low to High, Price: High to Low, Name A–Z.

### 6. Product Detail Page / PDP (`/product/:slug`)
* **फाइल:** `src/pages/Product.jsx`
* **फीचर्स:**
  - ब्रेडक्रम्स नेविगेशन।
  - पैकेजिंग आर्ट और विजुअल डिस्प्ले।
  - प्राइसिंग मोड हैंडलिंग (फिक्स रिटेल प्राइस या "Wholesale / Quote Only")।
  - पैक/साइज वेरिएंट सिलेक्टर (उदा. 150ml, 250ml या 50g, 100g या 5kg, 25kg)।
  - "Add to Bag", "Buy Now", और B2B के लिए "WhatsApp Quote" बटन।
  - टैब्ड डिस्क्रिप्शन: Benefits, Key Ingredients, How to Use.
  - संबंधित रिकमेंडेड प्रोडक्ट्स।

### 7. Wholesale B2B Sourcing (`/wholesale`)
* **फाइल:** `src/pages/Wholesale.jsx`
* **विवरण:** कमर्शियल खरीदारों, सैलून और रीसेलर्स के लिए समर्पित पेज।
* **फीचर्स:**
  - डिटेल्ड इंक्वायरी फॉर्म (नाम, फर्म का नाम, मोबाइल, ईमेल, बिजनेस टाइप, शहर, राज्य, ब्रांड, संभावित क्वांटिटी)।
  - फॉर्म सबमिट होने पर यूनिक रेफरेंस नंबर जनरेट होता है (उदा. `DKB-WHL-849102`)।
  - वन-क्लिक डायरेक्ट WhatsApp हैंडऑफ बटन।

### 8. Distribution & Partnerships (`/distribution`)
* **फाइल:** `src/pages/Distribution.jsx`
* **विवरण:** रीजनल स्टॉकिस्ट, सुपर स्टॉकिस्ट और डिस्ट्रीब्यूटर पार्टनर्स के लिए एप्लीकेशन पोर्टल।

### 9. Contact Us (`/contact`)
* **फाइल:** `src/pages/Contact.jsx`
* **विवरण:** हेड ऑफिस का पूरा पता, क्लिक-टू-कॉल लिंक्स (`tel:9355698422`), डायरेक्ट WhatsApp लिंक, GSTIN, कार्य के घंटे, और जनरल इंक्वायरी फॉर्म।

### 10. Shopping Bag / Cart (`/cart`)
* **फाइल:** `src/pages/Cart.jsx`
* **फीचर्स:** लाइन आइटम्स, क्वांटिटी काउंटर, रिमूव बटन, फ्री शिपिंग प्रोग्रेस बार (थ्रेसहोल्ड: ₹1,499), और "Order via WhatsApp Direct" बटन।

### 11. Checkout (`/checkout`)
* **फाइल:** `src/pages/Checkout.jsx`
* **फीचर्स:** कस्टमर कॉन्टैक्ट, 6-डिजिट पिन कोड वैलिडेटेड शिपिंग एड्रेस, कैश ऑन डिलीवरी (COD) और डायरेक्ट UPI/बैंक ट्रांसफर विकल्प।

### 12. Order Confirmation (`/order-confirmation/:orderId`)
* **फाइल:** `src/pages/OrderConfirmation.jsx`
* **विवरण:** आर्डर प्लेस होने पर कन्फर्मेशन स्क्रीन विथ आर्डर रेफरेंस (उदा. `DKB-4819203`), डिस्पैच टाइमलाइन (2–4 दिन दिल्ली, 4–7 दिन पैन-इंडिया) और WhatsApp ट्रैकिंग लिंक।

### 13. Track Order Portal (`/track-order`)
* **फाइल:** `src/pages/TrackOrder.jsx`
* **विवरण:** आर्डर आईडी डालकर लाइव स्टेटस चेक करने का पोर्टल (Confirmed → Packing → Dispatched → Delivered)।

### 14. Policies (`/privacy-policy`, `/terms-and-conditions`, `/shipping-policy`, `/return-refund-policy`)
* **फाइल:** `src/pages/Policies.jsx`
* **विवरण:** DKB Ventures के पते और GSTIN के साथ तैयार की गई वास्तविक और वैधानिक नीतियां।

---

## ⚡ 6. How to Run & Build

```bash
# 1. डिपेंडेंसीज इनस्टॉल करें
npm install

# 2. डेवलपमेंट सर्वर शुरू करें (Local URL: http://localhost:5173/)
npm run dev

# 3. प्रोडक्शन बिल्ड तैयार करें
npm run build

# 4. प्रोडक्शन बिल्ड का प्रीव्यू देखें
npm run preview
```

---

## 📞 8. Official Communication Handles

- **Primary WhatsApp / Call:** `9355698422`
- **Secondary WhatsApp / Call:** `9999148167`
- **Registered GSTIN:** `07CHBPS3702D4ZM`
- **Head Office Address:** M-2/18, Main Market Road, Budh Vihar, Phase-1, Delhi – 110086
