import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk(
    'products/getProducts', async () => {
        const response = await fetch('http://localhost:4000/products');
        const json = await response.json();
        return json;
})

export const getProductsByTerm = createAsyncThunk(
    'products/getProductsByTerm', async (term) => {
        const response = await fetch(`http://localhost:4000/products/search/${term}`);
        const json = await response.json();
        return json;
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        hasFailed: false,
        products: []
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        },
        [getProductsByTerm.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getProductsByTerm.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getProductsByTerm.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.products.isLoading;
export const selectHasFailed = (state) => state.products.hasFailed;
export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer;