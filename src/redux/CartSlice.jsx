import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  /** items: { id, name, price, image, quantity }[] */
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem(product)
    addItem: (state, action) => {
      const product = action.payload
      const existing = state.items.find((it) => it.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
      }
    },

    // removeItem(id)
    removeItem: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((it) => it.id !== id)
    },

    // updateQuantity({ id, quantity })
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((it) => it.id === id)
      if (!item) return
      item.quantity = Math.max(1, Number(quantity) || 1)
    },
  },
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions
export default cartSlice.reducer

// Selectors (derived state)
export const selectCartItems = (state) => state.cart.items

export const selectCartItemsById = (state) => {
  const map = {}
  for (const it of state.cart.items) map[it.id] = it
  return map
}

export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((sum, it) => sum + it.quantity, 0)

export const selectTotalAmount = (state) =>
  state.cart.items.reduce((sum, it) => sum + it.quantity * it.price, 0)
