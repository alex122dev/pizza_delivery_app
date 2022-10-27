import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryDto } from '../../dtos/categories/category.dto';

interface IInitialState {
    categories: CategoryDto[];
}

const initialState: IInitialState = {
    categories: [],
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<CategoryDto[]>) => {
            state.categories = action.payload;
        },
    },
});

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
