import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import AboutUs from './components/AboutUs.jsx'
import ProductList from './components/ProductList.jsx'
import CartItem from './components/CartItem.jsx'

function Landing({ onGetStarted }) {
  return (
    <div className="landing">
      <div className="landing-card">
        <header>
          <h1>Welcome to Paradise Nursery</h1>
          <p className="landing-subtitle">
            Paradise Nursery is your cozy corner of green — browse plants, add favorites, and grow your home jungle.
          </p>
        </header>

        <div className="cta-row">
          <button className="primary-btn" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [showProductList, setShowProductList] = useState(false)

  return (
    <div className="app-shell">
      <Routes>
        <Route
          path="/"
          element={
            showProductList ? (
              <ProductList />
            ) : (
              <Landing onGetStarted={() => setShowProductList(true)} />
            )
          }
        />
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
