import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'
import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  total: 0,
  amount: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('getCartItems/cart', async () => {
  try {
    const result = await axios.get(url)
    const data = await result.data
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
})

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
  // extraReducers: {
  //   [getCartItems.pending]: (state, action) => {
  //     state.isLoading = true
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     console.log('Action Data : ', action)
  //     state.isLoading = false
  //     state.cartItems = action.payload
  //   },
  //   [getCartItems.rejected]: (state) => {
  //     state.isLoading = false
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        console.log('Action Data : ', action)
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false
      })
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
