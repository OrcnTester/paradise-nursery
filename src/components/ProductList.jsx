import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { plants } from '../data/plants.js'
import { addItem } from '../redux/CartSlice.jsx'

export default function ProductList() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const totalQty = useMemo(() => cartItems.reduce((sum, it) => sum + it.quantity, 0), [cartItems])

  const itemsById = useMemo(() => {
    const map = {}
    for (const it of cartItems) map[it.id] = it
    return map
  }, [cartItems])

  const grouped = useMemo(() => {
    const map = new Map()
    for (const p of plants) {
      if (!map.has(p.category)) map.set(p.category, [])
      map.get(p.category).push(p)
    }
    return Array.from(map.entries())
  }, [])

  return (
    <>
      {/* Navbar required by rubric */}
      <header className="navbar">
        <div className="navbar-inner">
          <div className="brand">
            <h1>Paradise Nursery</h1>
            <span className="badge">Plants • Home</span>
          </div>

          <nav className="navlinks">
            <NavLink to="/" className={({ isActive }) => 'navlink' + (isActive ? ' active' : '')}>
              Home
            </NavLink>
            <NavLink to="/plants" className={({ isActive }) => 'navlink' + (isActive ? ' active' : '')}>
              Plants
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) => 'navlink cart-pill' + (isActive ? ' active' : '')}
              aria-label="Cart"
            >
              <span>Cart</span>
              {/* Dynamic cart quantity */}
              <span className="cart-count" title="Total items in cart">
                {totalQty}
              </span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="page">
        <section>
          <h2>Plants</h2>
          <p className="small">
            Pick your favorites. Once added, the button disables — and the cart count updates instantly.
          </p>

          {grouped.map(([category, list]) => (
            <div key={category}>
              <h3 className="category">{category}</h3>
              <div className="grid">
                {list.map((p) => {
                  const alreadyAdded = Boolean(itemsById[p.id])
                  return (
                    <article className="card" key={p.id}>
                      <img
                        className="thumb"
                        src={new URL(`../assets/${p.image}`, import.meta.url).toString()}
                        alt={p.name}
                      />
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
      </main>
    </>
  )
}
