import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import AboutUs from './components/AboutUs.jsx'
import ProductList from './components/ProductList.jsx'
import CartItem from './components/CartItem.jsx'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <div className="landing-card">
        <h2 className="landing-title">Paradise Nursery</h2>
        <p className="landing-subtitle">
          Welcome to your cozy corner of green. Browse hand-picked houseplants, add favorites to your cart, and build
          your own little paradise.
        </p>

        <div className="cta-row">
          <button className="primary-btn" onClick={() => navigate('/plants')}>
            Get Started
          </button>
          <button className="secondary-btn" onClick={() => navigate('/about')}>
            About Us
          </button>
        </div>

        <div className="toast">
          Tip: Add a plant once — the button disables, and your cart count updates instantly.
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        {/* Landing page intentionally has no navbar to keep it clean */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <main className="page">
                <AboutUs />
              </main>
            </>
          }
        />
        <Route
          path="/plants"
          element={
            <>
              <Navbar />
              <main className="page">
                <ProductList />
              </main>
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <main className="page">
                <CartItem />
              </main>
            </>
          }
        />
      </Routes>
    </div>
  )
}
