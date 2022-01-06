import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const  getOrders = createAsyncThunk(
    'orders/getOrders', async (id) => {
        const response = await fetch(`http://localhost:4000/orders/history/${id}`, {credentials: 'include'});
        console.log(response)
        const json = await response.json();
        console.log(json)
        return json;
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        isLoading: false,
        hasFailed: false,
        orders: []
    },
    extraReducers: {
        [getOrders.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getOrders.fulfilled]: (state, action) => {
            state.orders = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getOrders.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.orders.isLoading;
export const selectHasFailed = (state) => state.orders.hasFailed;
export const selectOrders = (state) => state.orders.orders;

export default ordersSlice.reducer;