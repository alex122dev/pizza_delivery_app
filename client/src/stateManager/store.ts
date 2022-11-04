import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { cartReducer } from './slices/cartSlice';
import { categoriesReducer } from './slices/categoriesSlice';
import { ordersReducer } from './slices/ordersSlice';
import { productsReducer } from './slices/productsSlice';
import { statusesReducer } from './slices/statusesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        products: productsReducer,
        cart: cartReducer,
        orders: ordersReducer,
        statuses: statusesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
