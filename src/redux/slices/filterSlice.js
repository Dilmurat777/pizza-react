import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  value: '',
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
    setValue: (state, action) => {
      state.value = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action) => {
      state.sort.sortProperty = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    }
  }
})

export const selectCategory = (state) => state.filter.categoryId
export const selectSearch = (state) => state.filter
export const selectFilter = (state) => state.filter

export const { setCategoryId, setSortTypeId, setSearchId, setCurrentPage, setFilters, setValue } = filterSlice.actions

export default filterSlice.reducer