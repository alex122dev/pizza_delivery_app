import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDto } from '../../dtos/products/product.dto';

interface IInitialState {
    currentProduct: ProductDto | null;
    isFetching: boolean;
}

const initialState: IInitialState = {
    currentProduct: null,
    isFetching: false,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentProduct: (
            state,
            action: PayloadAction<ProductDto | null>,
        ) => {
            state.currentProduct = action.payload;
        },
        setIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },
    },
});

export const { setCurrentProduct, setIsFetching } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
