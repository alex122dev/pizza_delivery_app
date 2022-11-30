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
    addProduct: (
      state,
      action: PayloadAction<Omit<ProductDto, 'category' | 'components'>>,
    ) => {
      const orderItem: CreateOrderItemDto = {
        product: action.payload,
        quantity: 1,
      };

      state.orderItems = [...state.orderItems, orderItem];
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.orderItems = state.orderItems.filter(
        (orderItem) => orderItem.product.id !== action.payload,
      );
    },
    clearCart: (state, action: PayloadAction) => {
      state.orderItems = [];
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.orderItems.find(
        (orderItem) => orderItem.product.id === action.payload,
      );
      if (product && product.quantity > 1) {
        product.quantity--;
      } else if (product && product.quantity === 1) {
        state.orderItems = state.orderItems.filter(
          (orderItem) => orderItem.product.id !== action.payload,
        );
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.orderItems.find(
        (orderItem) => orderItem.product.id === action.payload,
      );
      if (product) {
        product.quantity++;
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
