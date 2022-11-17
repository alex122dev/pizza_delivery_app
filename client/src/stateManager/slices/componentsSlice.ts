import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentDto } from '../../dtos/components/component.dto';

interface IInitialState {
    allComponents: ComponentDto[];
}

const initialState: IInitialState = {
    allComponents: [],
};

const componentsSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        setAllComponents: (state, action: PayloadAction<ComponentDto[]>) => {
            state.allComponents = action.payload;
        },
    },
});

export const { setAllComponents } = componentsSlice.actions;

export const componentsReducer = componentsSlice.reducer;
