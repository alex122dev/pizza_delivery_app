import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDto } from '../../dtos/products/product.dto';

interface IInitialState {
    products: ProductDto[];
}

const initialState: IInitialState = {
    products: [],
};

const cartSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductDto>) => {
            state.products = [...state.products, action.payload]
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        },
        clearCart: (state, action: PayloadAction) => {
            state.products = []
        }
    },
});

export const { addProduct, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
