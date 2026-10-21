import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, CONCERNS, PRODUCTS } from '../data/products'

export default function Shop() {
  const [sp, setSp] = useSearchParams()
  const category = sp.get('category') || ''
  const concern = sp.get('concern') || ''
  const q = (sp.get('q') || '').toLowerCase()
  const filter = sp.get('filter') || ''
  const sort = sp.get('sort') || 'featured'

  const set = (k, v) => {
    const n = new URLSearchParams(sp)
    v ? n.set(k, v) : n.delete(k)
    setSp(n)
  }

  const list = useMemo(() => {
    let r = PRODUCTS.filter(
      (p) =>
        (!category || p.category === category) &&
        (!concern || p.concern === concern) &&
        (filter !== 'new' || p.isNew) &&
        (!q || (p.name + p.short + p.category + p.concern).toLowerCase().includes(q))
    )
    if (sort === 'low') r = [...r].sort((a, b) => a.price - b.price)
    if (sort === 'high') r = [...r].sort((a, b) => b.price - a.price)
    if (sort === 'best') r = [...r].sort((a, b) => Number(b.bestseller) - Number(a.bestseller))
    return r
  }, [category, concern, q, filter, sort])

  const title = filter === 'new' ? 'New Arrivals' : CATEGORIES.find((c) => c.id === category)?.name || (q ? `Results for "${q}"` : 'All Products')

  return (
    <div className="container section">
      <div className="section-head"><span className="eyebrow">KEMY</span><h1 className="h2">{title}</h1></div>
      <div className="shop">
        <aside className="filters">
          <h4>Category</h4>
          <button className={!category ? 'on' : ''} onClick={() => set('category', '')}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} className={category === c.id ? 'on' : ''} onClick={() => set('category', c.id)}>{c.name}</button>
          ))}
          <h4>Skin Concern</h4>
          <button className={!concern ? 'on' : ''} onClick={() => set('concern', '')}>All</button>
          {CONCERNS.map((c) => (
            <button key={c} className={concern === c ? 'on' : ''} onClick={() => set('concern', c)}>{c}</button>
          ))}
        </aside>
        <div>
          <div className="toolbar">
            <span className="muted">{list.length} products</span>
            <select value={sort} onChange={(e) => set('sort', e.target.value)} aria-label="Sort">
              <option value="featured">Featured</option>
              <option value="best">Best sellers</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
          {list.length ? (
            <div className="grid g3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          ) : (
            <p className="muted center pad">No products match your filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}
