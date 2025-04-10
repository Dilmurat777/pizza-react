import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: CartItem[]
}

const items = JSON.parse(localStorage.getItem('cart') || '[]');

const initialState: CartSliceState = {
  items,
  totalPrice: items.reduce((sum: number, item: CartItem) => sum + item.price * item.count, 0),
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    plusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
    },
	  minusItem: (state, action: PayloadAction<string>) => {
		  const findItem = state.items.find((item) => item.id === action.payload)
		  if (findItem) {
			  findItem.count--;
		  }
	},
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart
export const selectCartById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem, plusItem } = cartSlice.actions;

export default cartSlice.reducer;
