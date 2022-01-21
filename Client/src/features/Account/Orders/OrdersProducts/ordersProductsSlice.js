import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getOrdersProducts = createAsyncThunk(
    'ordersProducts/getOrdersProducts', async (data, { rejectWithValue }) => {
        const response = await fetch(`/api/orders/single/${data.userId}/${data.orderId}`, {credentials: 'include'});
        try {
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

const ordersProductsSlice = createSlice({
    name: 'ordersProducts',
    initialState: {
        isLoading: false,
        hasFailed: false,
        ordersProducts: []
    },
    extraReducers: {
        [getOrdersProducts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getOrdersProducts.fulfilled]: (state, action) => {
            state.ordersProducts = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getOrdersProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.ordersProducts.isLoading;
export const selectHasFailed = (state) => state.ordersProducts.hasFailed;
export const selectOrdersProducts = (state) => state.ordersProducts.ordersProducts;

export default ordersProductsSlice.reducer;