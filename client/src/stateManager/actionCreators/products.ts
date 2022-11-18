import { EditProductFormValuesDto } from '../../dtos/products/editProductFormValues.dto';
import { ProductsService } from '../../services/ProductsService';
import {
    replaceUpdatedInAllProducts,
    setAllProducts,
    setCurrentProduct,
    setIsFetching,
    setIsFetchingAllProducts,
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

export const getAllProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsFetchingAllProducts(true));
        const response = await ProductsService.getAll();
        dispatch(setAllProducts(response.data));
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
