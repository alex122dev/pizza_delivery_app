import { CategoriesService } from '../../services/CategoriesService';
import { setCategories } from '../slices/categoriesSlice';
import { AppDispatch } from '../store';

export const getAllCategories = () => async (dispatch: AppDispatch) => {
    try {
        const response = await CategoriesService.getAll();
        dispatch(setCategories(response.data));
    } catch (e: any) {
        throw e;
    }
};
