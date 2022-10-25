import axios, { AxiosResponse } from 'axios';
import { AuthReturnDto } from '../dtos/AuthReturn.dto';
import { SignInDto } from '../dtos/SignIn.dto';
import { SignOutDto } from '../dtos/SignOut.dto';
import { SignUpDto } from '../dtos/SignUp.dto';
import { $api, API_URL } from '../http/http';

export class AuthService {
    static async signUp(dto: SignUpDto): Promise<AxiosResponse<AuthReturnDto>> {
        return $api.post<AuthReturnDto>('/auth/signup', dto);
    }

    static async signIn(dto: SignInDto): Promise<AxiosResponse<AuthReturnDto>> {
        return $api.post<AuthReturnDto>('/auth/signin', dto);
    }

    static async signOut(): Promise<AxiosResponse<SignOutDto>> {
        return $api.post<SignOutDto>('/auth/signout');
    }

    static async checkIsAuth(): Promise<AxiosResponse<AuthReturnDto>> {
        return axios.get<AuthReturnDto>(`${API_URL}/auth/refresh`, {
            withCredentials: true,
        });
    }
}
