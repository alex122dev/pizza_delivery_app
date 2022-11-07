import { StatusesService } from '../../services/StatusesService';
import { setStatuses } from '../slices/statusesSlice';
import { AppDispatch } from '../store';

export const getAllStatuses = () => async (dispatch: AppDispatch) => {
    try {
        const response = await StatusesService.getAll();
        dispatch(setStatuses(response.data));
    } catch (e: any) {
        throw e;
    }
};
