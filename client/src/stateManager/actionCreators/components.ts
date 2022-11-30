import { ComponentsService } from '../../services/ComponentsService';
import { setAllComponents } from '../slices/componentsSlice';
import { AppDispatch } from '../store';

export const getAllComponents = () => async (dispatch: AppDispatch) => {
  try {
    const response = await ComponentsService.getAll();
    dispatch(setAllComponents(response.data));
  } catch (e: any) {
    throw e;
  }
};
