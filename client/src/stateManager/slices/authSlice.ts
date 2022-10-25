import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from '../../dtos/users/User.dto';

interface IInitialState {
    user: UserDto | null;
}

const initialState: IInitialState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserDto | null>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
