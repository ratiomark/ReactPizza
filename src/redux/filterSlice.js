import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sort: "rating",
  name: "популярности",
  direction: undefined,
  page: 1
}
// const initialState = {
//   category: 0,
//   sort: "rating",
//   name: "популярности",
//   direction: undefined
// }

const filterSortSlice = createSlice({
  name: "filterSort",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload.category
      // state.sort = state.sort 
      // state.name = state.name 
      // state.direction = state.direction 
    },
    setSort: (state, action) => {
      state.sort = action.payload.sort
      state.name = action.payload.name
      state.direction = action.payload.direction
    },
    setPage: (state, action) => {
      state.page = action.payload.page + 1
    },
    setStateFromURL: (state, action) => {
      state.sort = action.payload.sort
      state.name = action.payload.name
      state.category = Number(action.payload.category)
      state.page = Number(action.payload.page)
      state.direction = action.payload.direction
    }
  }
})

export const { setCategory, setSort, setPage, setStateFromURL } = filterSortSlice.actions;
export default filterSortSlice.reducer;