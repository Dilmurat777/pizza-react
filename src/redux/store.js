import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import itemsReducer from './slices/pizzaSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    filter: filterReducer,
    cart: cartReducer,
    items: itemsReducer,
  },
});
