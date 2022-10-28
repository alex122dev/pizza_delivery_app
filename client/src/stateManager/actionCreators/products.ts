import { ProductsService } from '../../services/ProductsService';
import { setCurrentProduct, setIsFetching } from '../slices/productsSlice';
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
