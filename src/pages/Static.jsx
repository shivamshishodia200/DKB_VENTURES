import { Link, useParams } from 'react-router-dom'

const POLICIES = {
  shipping: ['Shipping Policy', 'Orders are dispatched within 1–2 business days. Delivery takes 3–7 business days across India. Shipping is free on orders above ₹1,999; otherwise a flat ₹99 applies.'],
  returns: ['Return Policy', 'Unopened products can be returned within 7 days of delivery for a full refund. Damaged or incorrect items are replaced free of charge — contact care@kemyskin.com with photos.'],
  privacy: ['Privacy Policy', 'We collect only what we need to process your order and never sell your data. Replace this placeholder text with your final legal copy.'],
  terms: ['Terms & Conditions', 'By using this site you agree to our terms of sale. Replace this placeholder text with your final legal copy.'],
}

export function Policy() {
  const { slug } = useParams()
  const [t, body] = POLICIES[slug] || ['Not found', '']
  return (
    <div className="container section narrow">
      <h1 className="h2">{t}</h1>
      <p>{body}</p>
      <Link to="/" className="link">← Back home</Link>
    </div>
  )
}

export function About() {
  return (
    <div className="container section narrow">
      <span className="eyebrow">Our Story</span>
      <h1 className="h2">KEMY — luxury, made accessible.</h1>
      <p>KEMY was created on a simple belief: exceptional skincare should feel as good as it works. Every formula blends clinically-proven actives with precious botanicals and a touch of gold, crafted in small batches and tested rigorously.</p>
      <p>Replace this with your brand's real story, founder note and certifications.</p>
      <Link to="/shop" className="btn">Explore the collection</Link>
    </div>
  )
}
