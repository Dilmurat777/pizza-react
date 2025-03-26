import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizza = createAsyncThunk('pizza/fetchByIdStatus', async (params) => {
  const { page, sortBy, order, category, search } = params;
  const { data } = await axios.get(
	  `https://67c6c90cc19eb8753e7750a7.mockapi.io/items?${page}&sortBy=${sortBy}&order=${order}${category}${search}`

  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchPizza.pending, (state) => {
			state.status = 'loading';
			state.items = [];
		})
		.addCase(fetchPizza.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		})
		.addCase(fetchPizza.rejected, (state) => {
		  state.status = 'error';
		  state.items = [];
		});
	},
});

export const selectInitialState = (state) => state.items

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
