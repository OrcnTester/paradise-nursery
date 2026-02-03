import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import AboutUs from "./components/AboutUs.jsx";
import ProductList from "./components/ProductList.jsx";
import CartItem from "./components/CartItem.jsx";

function Landing({ onGetStarted }) {
  return (
    <div className="landing">
      <header>
        <h1>Welcome to Paradise Nursery</h1>
        <p>
          Discover beautiful plants for every space. Add to cart and grow your
          home jungle 🌿
        </p>
      </header>

      <button className="primary-btn" onClick={onGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
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
      <Route path="/about" element={<AboutUs />} />
      <Route path="/plants" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  );
}
