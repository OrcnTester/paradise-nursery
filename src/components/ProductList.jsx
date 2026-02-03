import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { plants } from '../data/plants.js'
import { addItem, selectCartItemsById } from '../redux/CartSlice.jsx'

export default function ProductList() {
  const dispatch = useDispatch()
  const itemsById = useSelector(selectCartItemsById)

  const grouped = useMemo(() => {
    const map = new Map()
    for (const p of plants) {
      if (!map.has(p.category)) map.set(p.category, [])
      map.get(p.category).push(p)
    }
    return Array.from(map.entries())
  }, [])

  return (
    <section>
      <h2>Plants</h2>
      <p className="small">Pick your favorites. Once added, the button disables — your cart count updates instantly.</p>

      {grouped.map(([category, list]) => (
        <div key={category}>
          <h3 className="category">{category}</h3>
          <div className="grid">
            {list.map((p) => {
              const alreadyAdded = Boolean(itemsById[p.id])
              return (
                <article className="card" key={p.id}>
                  <img className="thumb" src={new URL(`../assets/${p.image}`, import.meta.url).toString()} alt={p.name} />
                  <div className="card-body">
                    <h4 className="card-title">{p.name}</h4>
                    <div className="small">{p.description}</div>
                    <div className="price-row">
                      <span className="price">${p.price.toFixed(2)}</span>
                      <button
                        className="add-btn"
                        disabled={alreadyAdded}
                        onClick={() => dispatch(addItem(p))}
                        aria-label={`Add ${p.name} to cart`}
                      >
                        {alreadyAdded ? 'Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
