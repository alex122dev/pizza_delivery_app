import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDto } from '../../dtos/orders/Order.dto';

interface IInitialState {
    orders: OrderDto[];
    allOrders: OrderDto[];
    cancelError: string;
    editingOrders: number[];
}

const initialState: IInitialState = {
    orders: [],
    allOrders: [],
    cancelError: '',
    editingOrders: [],
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
        setAllOrders: (state, action: PayloadAction<OrderDto[]>) => {
            state.allOrders = action.payload;
        },
        addToEditingOrders: (state, action: PayloadAction<number>) => {
            state.editingOrders.push(action.payload);
        },
        removeFromEditingOrders: (state, action: PayloadAction<number>) => {
            state.editingOrders = state.editingOrders.filter(
                (id) => id !== action.payload,
            );
        },
        replaceUpdatedInAllOrder: (
            state,
            action: PayloadAction<{ id: number; order: OrderDto }>,
        ) => {
            const orderIndex = state.allOrders.findIndex(
                (order) => order.id === action.payload.id,
            );

            if (orderIndex >= 0) {
                state.allOrders[orderIndex] = action.payload.order;
            }
        },
    },
});

export const {
    setOrders,
    cancelOrderById,
    setCancelError,
    setAllOrders,
    addToEditingOrders,
    removeFromEditingOrders,
    replaceUpdatedInAllOrder,
} = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
