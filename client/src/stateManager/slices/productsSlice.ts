import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDto } from '../../dtos/products/product.dto';
import { ProductsFilterDto } from '../../dtos/products/productsFilter.dto';

interface IInitialState {
  currentProduct: ProductDto | null;
  isFetching: boolean;
  allProducts: ProductDto[];
  editingProducts: number[];
  isFetchingAllProducts: boolean;
  currentPage: number;
  pageSize: number;
  totalProductsCount: number;
  filter: ProductsFilterDto;
}

const initialState: IInitialState = {
  currentProduct: null,
  isFetching: false,
  allProducts: [],
  editingProducts: [],
  isFetchingAllProducts: false,
  currentPage: 1,
  pageSize: 5,
  totalProductsCount: 0,
  filter: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<ProductDto | null>) => {
      state.currentProduct = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setAllProducts: (state, action: PayloadAction<ProductDto[]>) => {
      state.allProducts = action.payload;
    },
    addToEditingProducts: (state, action: PayloadAction<number>) => {
      state.editingProducts.push(action.payload);
    },
    removeFromEditingProducts: (state, action: PayloadAction<number>) => {
      state.editingProducts = state.editingProducts.filter(
        (id) => id !== action.payload,
      );
    },
    replaceUpdatedInAllProducts: (
      state,
      action: PayloadAction<{ id: number; product: ProductDto }>,
    ) => {
      const productIndex = state.allProducts.findIndex(
        (product) => product.id === action.payload.id,
      );

      if (productIndex >= 0) {
        state.allProducts[productIndex] = action.payload.product;
      }
    },
    setIsFetchingAllProducts: (state, action: PayloadAction<boolean>) => {
      state.isFetchingAllProducts = action.payload;
    },
    setProductsFilter: (state, action: PayloadAction<ProductsFilterDto>) => {
      state.filter = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalProductsCount: (state, action: PayloadAction<number>) => {
      state.totalProductsCount = action.payload;
    },
  },
});

export const {
  setCurrentProduct,
  setIsFetching,
  setAllProducts,
  addToEditingProducts,
  removeFromEditingProducts,
  replaceUpdatedInAllProducts,
  setIsFetchingAllProducts,
  setProductsFilter,
  setCurrentPage,
  setTotalProductsCount,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
