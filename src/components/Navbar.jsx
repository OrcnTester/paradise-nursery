import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalQuantity } from '../redux/CartSlice.jsx'

export default function Navbar() {
  const totalQty = useSelector(selectTotalQuantity)

  return (
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
            <span className="cart-count" title="Total items in cart">
              {totalQty}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
