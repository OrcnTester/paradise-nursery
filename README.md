# Paradise Nursery — Shopping Cart (React + Redux Toolkit)

A simple e-commerce style shopping cart app for an online plant shop.

## Features
- Landing page with background image and **Get Started** CTA
- Product listing grouped into **3 categories**, each with **6 plants**
- Add to Cart (button disables once added)
- Redux cart: add, remove, update quantity
- Cart icon shows **dynamic total quantity**
- Cart page: per-item total, cart total, quantity controls, delete, checkout (Coming Soon)

## Tech
- React (Vite)
- React Router
- Redux Toolkit + React-Redux

## Run locally
```bash
npm install
npm run dev
```

## Project structure (key files)
- `src/App.jsx` (Landing + routes)
- `src/App.css` (Landing background image)
- `src/components/AboutUs.jsx`
- `src/components/ProductList.jsx`
- `src/components/CartItem.jsx`
- `src/redux/CartSlice.jsx`
