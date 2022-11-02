import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDto } from '../../dtos/orders/Order.dto';

interface IInitialState {
    orders: OrderDto[];
    cancelError: string;
}

const initialState: IInitialState = {
    orders: [],
    cancelError: '',
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<OrderDto[]>) => {
            state.orders = action.payload;
        },
        cancelOrderById: (
            state,
            action: PayloadAction<{ id: number; order: OrderDto }>,
        ) => {
            const order = state.orders.find(
                (order) => order.id === action.payload.id,
            );

            if (order) {
                order.status = action.payload.order.status;
            }
        },
        setCancelError: (state, action: PayloadAction<string>) => {
            state.cancelError = action.payload;
        },
    },
});

export const { setOrders, cancelOrderById, setCancelError } =
    ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
