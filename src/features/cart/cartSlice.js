import { createSlice } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'

const initialState = {
  cartItems: cartItems,
  total: 0,
  amount: 0,
  isLoading: true,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
      console.log('ACTION IS : ', action)
    },
    increaseAmt: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id == payload)
      cartItem.amount = cartItem.amount + 1
      console.log(payload)
    },
    decreaseAmt: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id == payload)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotal: (state) => {
      let total = 0
      let amount = 0
      state.cartItems.forEach((item) => {
        amount = amount + item.amount
        total = total + item.amount * item.price
      })
      state.amount = amount
      state.total = Math.floor(total * 10) / 10
    },
  },
})

export const {
  clearCart,
  removeItem,
  increaseAmt,
  decreaseAmt,
  calculateTotal,
} = cartSlice.actions

export default cartSlice.reducer

// console.log(cartSlice)
