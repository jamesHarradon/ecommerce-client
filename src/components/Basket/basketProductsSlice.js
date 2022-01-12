import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBasketProductsByCustId = createAsyncThunk(
    'basketProducts/getBasketProductsByCustId', async (id) => {
        const response = await fetch(`http://localhost:4000/api/cart/products/${id}`, {credentials: 'include'});
        const json = await response.json();
        return json;
    }
)

const basketProductsSlice = createSlice({
    name: 'basketProducts',
    initialState: {
        isLoading: false,
        hasFailed: false,
        basketProducts: []
    },
    extraReducers: {
        [getBasketProductsByCustId.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getBasketProductsByCustId.fulfilled]: (state, action) => {
            state.basketProducts = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getBasketProductsByCustId.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.basketProducts.isLoading;
export const selectHasFailed = (state) => state.basketProducts.hasFailed;
export const selectBasketProducts = (state) => state.basketProducts.basketProducts;

export default basketProductsSlice.reducer;