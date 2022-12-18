import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 0,
  totalPrice: 0,
  itemsInCart: []
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const indexOfPizzaInPizzaItems = state.itemsInCart.findIndex(item => item.idGenerated === action.payload.idGenerated)
      if (indexOfPizzaInPizzaItems > -1) {
        state.itemsInCart[indexOfPizzaInPizzaItems].count += 1
      } else {

        state.itemsInCart.push(action.payload)
      }
      state.totalPrice = state.itemsInCart.reduce((acc, iter) => {
        return acc + (iter.count * iter.price)
      }, 0)
      state.totalItems = state.itemsInCart.reduce((acc, iter) => {
        return acc + iter.count
      }, 0)
      // state.sort = state.sort 
      // state.name = state.name 
      // state.direction = state.direction 
    },
    clearCart: (state, action) => {
      state.totalItems = 0
      state.totalPrice = 0
      state.itemsInCart = []
    },
    removeItemFromCart: (state, action) => {
      // const index = state.itemsInCart.findIndex(item => item.idGenerated === String(action.payload.idGenerated))
      // console.log(index)

      // const f = state.itemsInCart.slice(0, index)
      // const s = state.itemsInCart.slice(index)
      state.itemsInCart = state.itemsInCart.filter(item => item.idGenerated !== action.payload.idGenerated)
      state.totalPrice = state.itemsInCart.reduce((acc, iter) => {
        return acc + (Number(iter.count) * Number(iter.price))
      }, 0)
      state.totalItems = state.itemsInCart.reduce((acc, iter) => {
        return acc + Number(iter.count)
      }, 0)
    },
    incrementAmountOfPizzaInCart: (state, action) => {
      const itemToIncrement = state.itemsInCart.find(item => item.idGenerated === action.payload.idGenerated)
      itemToIncrement.count++
      state.totalPrice = state.itemsInCart.reduce((acc, iter) => {
        return acc + (Number(iter.count) * Number(iter.price))
      }, 0)
      state.totalItems = state.itemsInCart.reduce((acc, iter) => {
        return acc + Number(iter.count)
      }, 0)
    },
    decrementAmountOfPizzaInCart: (state, action) => {
      const itemToIncrement = state.itemsInCart.find(item => item.idGenerated === action.payload.idGenerated)
      if (itemToIncrement.count === 1) {
        state.itemsInCart = state.itemsInCart.filter(item => item.idGenerated !== action.payload.idGenerated)
        state.totalPrice = state.itemsInCart.reduce((acc, iter) => {
          return acc + (Number(iter.count) * Number(iter.price))
        }, 0)
        state.totalItems = state.itemsInCart.reduce((acc, iter) => {
          return acc + Number(iter.count)
        }, 0)
      } else {
        itemToIncrement.count--
        state.totalPrice = state.itemsInCart.reduce((acc, iter) => {
          return acc + (Number(iter.count) * Number(iter.price))
        }, 0)
        state.totalItems = state.itemsInCart.reduce((acc, iter) => {
          return acc + Number(iter.count)
        }, 0)
      }
    }
    // setSort: (state, action) => {
    //   state.sort = action.payload.sort
    //   state.name = action.payload.name
    //   state.direction = action.payload.direction
    // },
    // setPage: (state, action) => {
    //   state.page = action.payload.page
    // },
    // setStateFromURL: (state, action) => {
    //   state.sort = action.payload.sort
    //   state.name = action.payload.name
    //   state.category = Number(action.payload.category)
    //   state.page = Number(action.payload.page)
    //   state.direction = action.payload.direction
    // }
  }
})

export const {
  addItem,
  clearCart,
  removeItemFromCart,
  incrementAmountOfPizzaInCart,
  decrementAmountOfPizzaInCart
} = cartSlice.actions;
export default cartSlice.reducer;