import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk(
    'products/getProducts', async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const json = await response.json();
                return json;
            } else {
                // cant seem to use rejectWithValue unless there is a value for arg
                const errorMsg = await response.json()
                throw new Error(errorMsg);
            }      
        } catch (err) {
            console.log(err)
        }   
    })

export const getProductsByTerm = createAsyncThunk(
    'products/getProductsByTerm', async (term, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/products/search/${term}`);
            if (response.ok) {
                const json = await response.json();
                return json;
            } else {
                rejectWithValue([]);
                const errorMsg = await response.json()
                throw new Error(errorMsg);
            }
        } catch (err) {
            console.log(err);
        }
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