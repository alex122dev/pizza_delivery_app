import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { ProductDto } from '../../dtos/products/product.dto';

interface IInitialState {
    orderItems: CreateOrderItemDto[];
}

const initialState: IInitialState = {
    orderItems: [],
};

const cartSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Omit<ProductDto, 'category' | 'components'>>) => {
            const orderItem: CreateOrderItemDto = {
                product: action.payload,
                count: 1
            }

            state.orderItems = [...state.orderItems, orderItem]
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.orderItems = state.orderItems.filter(orderItem => orderItem.product.id !== action.payload)
        },
        clearCart: (state, action: PayloadAction) => {
            state.orderItems = []
        },
        decrementCount: (state, action: PayloadAction<number>) => {
            const product = state.orderItems.find(orderItem => orderItem.product.id === action.payload)
            if (product && product.count > 1) {
                product.count--
            } else if (product && product.count === 1) {
                state.orderItems = state.orderItems.filter(orderItem => orderItem.product.id !== action.payload)
            }
        },
        incrementCount: (state, action: PayloadAction<number>) => {
            const product = state.orderItems.find(orderItem => orderItem.product.id === action.payload)
            if (product) {
                product.count++
            }
        }
    },
});

export const { addProduct, removeProduct, clearCart, incrementCount, decrementCount } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
