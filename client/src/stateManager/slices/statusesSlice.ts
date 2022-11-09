import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusDto } from '../../dtos/orders/Status.dto';

interface IInitialState {
    statuses: StatusDto[];
}

const initialState: IInitialState = {
    statuses: [],
};

const statusesSlice = createSlice({
    name: 'statuses',
    initialState,
    reducers: {
        setStatuses: (state, action: PayloadAction<StatusDto[]>) => {
            state.statuses = action.payload;
        },
    },
});

export const { setStatuses } = statusesSlice.actions;

export const statusesReducer = statusesSlice.reducer;
