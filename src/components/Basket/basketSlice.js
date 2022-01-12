import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBasketByCustId = createAsyncThunk(
    'basket/getBasketByCustId', async (id) => {
        const response = await fetch(`http://localhost:4000/api/cart/${id}`, {credentials: 'include'});
        const json = await response.json();
        return json;
    }
)

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        isLoading: false,
        hasFailed: false,
        basket: []
    },
    extraReducers: {
        [getBasketByCustId.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getBasketByCustId.fulfilled]: (state, action) => {
            state.basket = [action.payload];
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getBasketByCustId.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.basket.isLoading;
export const selectHasFailed = (state) => state.basket.hasFailed;
export const selectBasket = (state) => state.basket.basket;

export default basketSlice.reducer;