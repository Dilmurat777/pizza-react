import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

	
type Pizza = {
	id: string;
	title: string;
	price: number;
	types: number[];
	imageUrl: string;
	sizes: number[];
	count: number;
  }

  export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
  }

export const fetchPizza = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchByIdStatus', async (params) => {
  const { page, sortBy, order, category, search } = params;
  const { data } = await axios.get<Pizza[]>(
    `https://67c6c90cc19eb8753e7750a7.mockapi.io/items?${page}&sortBy=${sortBy}&order=${order}${category}${search}`,
  );
  return data;
});


interface PizzaSliceState  {
	items: Pizza[],
	status: Status,
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectInitialState = (state: RootState) => state.items;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
