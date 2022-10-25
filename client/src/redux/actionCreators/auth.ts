import { SignInDto } from '../../dtos/SignIn.dto';
import { SignUpDto } from '../../dtos/SignUp.dto';
import { AuthService } from '../../services/AuthService';
import { setUser } from '../slices/authSlice';
import { AppDispatch } from '../store';

export const signUp = (dto: SignUpDto) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.signUp(dto);
        console.log(response.data);
        dispatch(setUser(response.data.user));
        localStorage.setItem('accessToken', response.data.accessToken);
    } catch (e: any) {
        throw e;
        //console.log(e.response?.data?.message);
    }
};

export const signIn = (dto: SignInDto) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.signIn(dto);
        console.log(response.data);
        dispatch(setUser(response.data.user));
        localStorage.setItem('accessToken', response.data.accessToken);
    } catch (e: any) {
        throw e;
        //console.log(e.response?.data?.message);
    }
};

export const signOut = () => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.signOut();
        console.log(response.data);
        dispatch(setUser(null));
        localStorage.removeItem('accessToken');
    } catch (e: any) {
        console.log(e.response?.data?.message);
    }
};

export const checkIsAuth = () => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.checkIsAuth();
        console.log(response.data);
        dispatch(setUser(response.data.user));
        localStorage.setItem('accessToken', response.data.accessToken);
    } catch (e: any) {
        console.log(e.response?.data?.message);
    }
};
