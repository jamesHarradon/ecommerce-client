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


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        hasFailed: false,
        products: [],
        term: null
    },
    reducers: {
        setTerm: (state, action) => { state.term = action.payload }
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
        }
    }
})


export const selectIsLoading = (state) => state.products.isLoading;
export const selectHasFailed = (state) => state.products.hasFailed;
export const selectProducts = (state) => state.products.products;
export const selectTerm = (state) => state.products.term;

export const { setTerm } = productsSlice.actions;

export default productsSlice.reducer;