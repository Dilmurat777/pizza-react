import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  searchId: '',
}
export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload
    },
    setSortTypeId: (state, action) => {
      state.sort = action.payload
    },
    setSearchId: (state, action) => {
      state.searchId = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  }
})

export const { setCategoryId, setSortTypeId, setSearchId, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer