import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import AboutUs from './components/AboutUs.jsx'
import ProductList from './components/ProductList.jsx'
import CartItem from './components/CartItem.jsx'

function Landing() {
  return (
    <div className="landing">
      <div className="landing-card">
        <h1 className="landing-title">Paradise Nursery</h1>
        <p className="landing-subtitle">
          Welcome to your cozy corner of green. Browse hand-picked houseplants, add favorites to your cart, and build
          your own little paradise.
        </p>

        <div className="cta-row">
          <Link className="primary-btn" to="/plants">
            Get Started
          </Link>
          <Link className="secondary-btn" to="/about">
            About Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/about"
          element={
            <main className="page">
              <AboutUs />
            </main>
          }
        />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </div>
  )
}
