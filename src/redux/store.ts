import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import itemsReducer from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';


export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    items: itemsReducer,
  },
});

type FuncType = typeof store.getState

export type RootState = ReturnType<FuncType>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 