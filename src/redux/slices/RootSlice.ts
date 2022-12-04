import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        name: 'Name',
        type: 'Type',
        price: 'Price',
        ingredients: 'Ingredients',
    },
    reducers: {
        chooseName: (state, action) => {state.name = action.payload},
        chooseType: (state, action) => {state.type = action.payload},
        choosePrice: (state, action) => {state.price = action.payload},
        chooseIngredients: (state, action) => {state.ingredients = action.payload},
    }
})

export const reducer = rootSlice.reducer;
export const { chooseName, chooseType, choosePrice, chooseIngredients } = rootSlice.actions;