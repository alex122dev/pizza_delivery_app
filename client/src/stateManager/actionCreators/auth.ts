import { SignInDto } from '../../dtos/auth/SignIn.dto';
import { SignUpDto } from '../../dtos/auth/SignUp.dto';
import { AuthService } from '../../services/AuthService';
import { setUser } from '../slices/authSlice';
import { AppDispatch } from '../store';

export const signUp = (dto: SignUpDto) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.signUp(dto);
        dispatch(setUser(response.data.user));
        localStorage.setItem('accessToken', response.data.accessToken);
    } catch (e: any) {
        throw e;
    }
};

export const signIn = (dto: SignInDto) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.signIn(dto);
        dispatch(setUser(response.data.user));
        localStorage.setItem('accessToken', response.data.accessToken);
    } catch (e: any) {
        throw e;
    }
};

export const signOut = () => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.signOut();
        dispatch(setUser(null));
        localStorage.removeItem('accessToken');
    } catch (e: any) {
        throw e;
    }
};

export const checkIfUserAuthorized = () => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.checkIfUserAuthorized();
        dispatch(setUser(response.data.user));
        localStorage.setItem('accessToken', response.data.accessToken);
    } catch (e: any) {
        throw e;
    }
};
