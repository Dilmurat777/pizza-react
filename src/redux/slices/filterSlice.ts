import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SortType = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
};

interface filterSliceState {
  categoryId: number;
  currentPage: number;
  sort: SortType;
  value: string;
  searchId: string;
}

const initialState: filterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  value: '',
  searchId: '',
};
export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortTypeId: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setSearchId: (state, action: PayloadAction<string>) => {
      state.searchId = action.payload;
    },
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<filterSliceState>) => {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectCategory = (state: RootState) => state.filter.categoryId;
export const selectSearch = (state: RootState) => state.filter;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSortTypeId, setSearchId, setCurrentPage, setFilters, setValue } =
  filterSlice.actions;

export default filterSlice.reducer;
