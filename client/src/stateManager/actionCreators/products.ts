import { EditProductFormValuesDto } from '../../dtos/products/editProductFormValues.dto';
import { ProductsFilterDto } from '../../dtos/products/productsFilter.dto';
import { ProductsService } from '../../services/ProductsService';
import {
    replaceUpdatedInAllProducts,
    setAllProducts,
    setCurrentPage,
    setCurrentProduct,
    setIsFetching,
    setIsFetchingAllProducts,
    setProductsFilter,
    setTotalProductsCount,
} from '../slices/productsSlice';
import { AppDispatch } from '../store';

export const getProductById =
    (productId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsFetching(true));
            const response = await ProductsService.getById(productId);
            dispatch(setCurrentProduct(response.data));
        } catch (e: any) {
            throw e;
        } finally {
            dispatch(setIsFetching(false));
        }
    };

export const getAllProducts =
    (currentPage: number, pageSize: number, filter: ProductsFilterDto) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsFetchingAllProducts(true));
            dispatch(setCurrentPage(currentPage));
            const response = await ProductsService.getAll(
                currentPage,
                pageSize,
                filter,
            );
            dispatch(setProductsFilter(filter));
            dispatch(setAllProducts(response.data.products));
            dispatch(setTotalProductsCount(response.data.totalCount));
        } catch (e: any) {
            throw e;
        } finally {
            dispatch(setIsFetchingAllProducts(false));
        }
    };

export const createNewProduct =
    (dto: EditProductFormValuesDto) => async (dispatch: AppDispatch) => {
        try {
            const response = await ProductsService.create(dto);
        } catch (e: any) {
            throw e;
        }
    };

export const updateProduct =
    (id: number, dto: EditProductFormValuesDto) =>
    async (dispatch: AppDispatch) => {
        try {
            const response = await ProductsService.update(id, dto);
            dispatch(
                replaceUpdatedInAllProducts({ id, product: response.data }),
            );
        } catch (e: any) {
            throw e;
        }
    };
